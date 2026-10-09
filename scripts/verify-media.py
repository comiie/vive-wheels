"""Check served media format, size budget, backups and alpha preservation."""
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageOps, ImageChops

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
rows = json.loads((ROOT / "source-media/public-originals/optimization-report.json").read_text())
assert not [p for p in PUBLIC.rglob("*") if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".mp4", ".mov"}]
images = list(PUBLIC.rglob("*.webp"))
for path in images:
    with Image.open(path) as image:
        image.load()
        assert image.format == "WEBP", path
    assert path.stat().st_size < 1_000_000, f"Image exceeds 1 MB budget: {path}"
for row in rows:
    output = PUBLIC / row["output"]
    original = ROOT / row["original"]
    assert original.stat().st_size == row["before"]
    assert hashlib.sha256(output.read_bytes()).hexdigest() == row["sha256"]
    with Image.open(original) as source, Image.open(output) as target:
        source = ImageOps.exif_transpose(source)
        source.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        assert source.size == target.size
        if "A" in source.getbands():
            difference = ImageChops.difference(source.convert("RGBA").getchannel("A"), target.convert("RGBA").getchannel("A"))
            assert difference.getbbox() is None, f"Transparency changed: {output}"
videos = list(PUBLIC.rglob("*.webm"))
for path in videos:
    with path.open("rb") as stream:
        header = stream.read(4096)
    assert header[:4] == bytes.fromhex("1a45dfa3") and b"webm" in header, path
print(f"PASS: {len(images)} genuine WebPs (<1 MB each), {len(videos)} WebMs, {len(rows)} recoverable originals; alpha preserved")
