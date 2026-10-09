"""Optimize served raster assets; keep originals outside public for safe reruns.

Run with Python + Pillow after importing new assets. Existing compact WebPs,
SVG vectors and WebM videos are left untouched (no repeated lossy encoding).
"""
import hashlib
import io
import json
import shutil
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
BACKUP = ROOT / "source-media/public-originals"
REPORT = BACKUP / "optimization-report.json"
RASTER = {".png", ".jpg", ".jpeg", ".webp"}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def optimize(path, previous):
    relative = path.relative_to(PUBLIC)
    output = path.with_suffix(".webp")
    data = path.read_bytes()
    old = previous.get(str(output.relative_to(PUBLIC)))
    if old and old["sha256"] == digest(data):
        return old
    if path.suffix == ".webp" and len(data) < 180_000:
        return None
    if output != path and output.exists():
        raise RuntimeError(f"Refusing to overwrite an existing asset: {output}")

    with Image.open(io.BytesIO(data)) as original:
        if getattr(original, "is_animated", False):
            raise RuntimeError(f"Animated asset needs a separate conversion: {path}")
        image = ImageOps.exif_transpose(original)
        image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        alpha = "A" in image.getbands() or "transparency" in image.info
        image = image.convert("RGBA" if alpha else "RGB")
        # Logos/gradients remain exact; photographic alpha is retained losslessly
        # by WebP while its RGB channels use high-quality lossy compression.
        lossless = max(image.size) <= 200 or min(image.size) <= 8
        buffer = io.BytesIO()
        image.save(buffer, "WEBP", quality=88 if alpha else 84,
                   method=6, lossless=lossless, exact=True)
        encoded = buffer.getvalue()
        dimensions = list(image.size)
        with Image.open(io.BytesIO(encoded)) as check:
            check.load()
            assert check.format == "WEBP" and check.size == image.size
            # Encoders may discard an entirely opaque alpha channel.
            assert not alpha or image.getchannel("A").getextrema() == (255, 255) or check.mode == "RGBA"

    # Never replace an existing WebP with a larger encode.
    if output == path and len(encoded) >= len(data):
        return None
    backup = BACKUP / relative
    if backup.exists() and digest(backup.read_bytes()) != digest(data):
        backup = backup.with_name(f"{backup.stem}-{digest(data)[:12]}{backup.suffix}")
    backup.parent.mkdir(parents=True, exist_ok=True)
    if not backup.exists():
        shutil.copy2(path, backup)
    temporary = output.with_suffix(".webp.tmp")
    temporary.write_bytes(encoded)
    temporary.replace(output)
    if output != path:
        path.unlink()  # Original is preserved and verified in source-media.
    return {"source": str(relative), "output": str(output.relative_to(PUBLIC)),
            "original": str(backup.relative_to(ROOT)), "before": len(data),
            "after": len(encoded), "dimensions": dimensions,
            "sha256": digest(encoded)}


if __name__ == "__main__":
    previous = {row["output"]: row for row in json.loads(REPORT.read_text())} if REPORT.exists() else {}
    # Recover completed assets if a previous batch was interrupted before its
    # final report, without running a second lossy encode on those files.
    if not REPORT.exists() and BACKUP.exists():
        for original in BACKUP.rglob("*"):
            if original.suffix.lower() not in RASTER:
                continue
            relative = original.relative_to(BACKUP)
            output = PUBLIC / relative.with_suffix(".webp")
            if not output.exists() or output.read_bytes() == original.read_bytes():
                continue
            with Image.open(output) as image:
                previous[str(output.relative_to(PUBLIC))] = {
                    "source": str(relative), "output": str(output.relative_to(PUBLIC)),
                    "original": str(original.relative_to(ROOT)),
                    "before": original.stat().st_size, "after": output.stat().st_size,
                    "dimensions": list(image.size), "sha256": digest(output.read_bytes()),
                }
    paths = sorted(p for p in PUBLIC.rglob("*") if p.suffix.lower() in RASTER)
    with ThreadPoolExecutor(max_workers=3) as pool:
        rows = list(filter(None, pool.map(lambda p: optimize(p, previous), paths)))
    BACKUP.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(rows, indent=2) + "\n")
    before, after = sum(r["before"] for r in rows), sum(r["after"] for r in rows)
    print(f"{len(rows)} optimized assets: {before:,} -> {after:,} bytes")
    print(f"Originals and report: {BACKUP}")
