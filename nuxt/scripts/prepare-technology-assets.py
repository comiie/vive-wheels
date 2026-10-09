"""Optimize original Figma source images; never rasterize page screenshots."""
from pathlib import Path
from PIL import Image
from shutil import copyfile

root = Path(__file__).resolve().parents[2]
source = root / 'source-media/technology'
target = root / 'public/assets/technology'
target.mkdir(parents=True, exist_ok=True)
names = ['3e5fc', '4296b', '21fb3', 'c16b5', '42a6c', 'f05d4', '198cc', '0b9ee', '6417a', 'f7558']
for name in names + ['raw-1']:
    original = source / f'{name}.png'
    output = target / ('hero-poster.webp' if name == 'raw-1' else f'{name}.webp')
    with Image.open(original) as image:
        image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        image.save(output, 'WEBP', quality=86, method=6, lossless=name == '21fb3')
    print(f'{original.name}: {original.stat().st_size} -> {output.stat().st_size}')
for name in ['70ddc', 'c0e7e', '8d855']:
    copyfile(source / f'{name}.svg', target / f'{name}.svg')
