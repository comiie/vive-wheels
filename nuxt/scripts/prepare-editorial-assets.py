"""Optimize original editorial assets supplied by Figma, preserving source files."""
from pathlib import Path
from shutil import copyfile
from PIL import Image

root = Path(__file__).resolve().parents[2]
source = root / 'source-media/editorial'
target = root / 'public/assets/editorial'
target.mkdir(parents=True, exist_ok=True)
for path in source.iterdir():
    if path.suffix == '.svg':
        copyfile(path, target / path.name)
    elif path.suffix == '.png':
        with Image.open(path) as image:
            image.thumbnail((3200, 3200), Image.Resampling.LANCZOS)
            image.save(target / f'{path.stem}.webp', 'WEBP', quality=88, method=6)
        print(path.name)
with Image.open(root / 'source-media/technology/hero-hd.jpg') as image:
    image.thumbnail((3840, 3840), Image.Resampling.LANCZOS)
    image.save(root / 'public/assets/technology/hero-hd.webp', 'WEBP', quality=90, method=6)
