"""Generate web-ready assets from preserved originals (Pillow + FFmpeg)."""
import json
import os
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source-media"
DEST = ROOT / "public/assets"


def convert(path):
    if path.suffix.lower() in {".png", ".jpg", ".jpeg"}:
        dest = DEST / (path.stem + ".webp")
        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image)
            image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
            # Keep tiny logos and transparent gradients lossless.
            lossless = "A" in image.getbands() or max(image.size) <= 400
            image.save(dest, "WEBP", quality=84, method=6, lossless=lossless)
    elif path.suffix.lower() == ".mp4":
        dest = DEST / (path.stem + ".webm")
        subprocess.run([
            os.environ["FFMPEG"], "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(path), "-map", "0:v:0", "-map", "0:a?",
            "-vf", "scale=w='min(1920,iw)':h=-2,fps=30", "-c:v", "libvpx-vp9",
            "-crf", "34", "-b:v", "0", "-row-mt", "1", "-cpu-used", "3",
            "-threads", "4", "-pix_fmt", "yuv420p", "-c:a", "libopus", "-b:a", "96k",
            str(dest),
        ], check=True)
    else:
        return None
    return {"source": path.name, "output": dest.name,
            "before": path.stat().st_size, "after": dest.stat().st_size}


if __name__ == "__main__":
    DEST.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=3) as pool:
        rows = list(filter(None, pool.map(convert, sorted(SOURCE.iterdir()))))
    print(json.dumps(rows, indent=2))
    print("Total:", sum(r["before"] for r in rows), "->", sum(r["after"] for r in rows))
