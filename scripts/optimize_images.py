"""Konverterar originalbilderna i en källmapp till komprimerade WebP-filer i assets/img/.

Användning: python3 scripts/optimize_images.py <källmapp>
"""
import sys
from pathlib import Path
from PIL import Image

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

# filnamn -> (bredder, kvalitet)
JOBS = {
    "hero-temp.jpg": ([1000, 1920], 72),
    "mingel-skal.jpg": ([600, 1000], 76),
    "middag.jpg": ([600, 1000], 75),
    "musicquiz.jpg": ([600, 1000], 75),
    "kvall.jpg": ([600, 1000], 75),
    "daniel-portratt.jpg": ([600, 1000], 78),
    "bg-gold-navy-rot.png": ([1920], 60),
    "bg-upplagg.png": ([1920], 60),
}

for name, (widths, q) in JOBS.items():
    im = Image.open(SRC / name).convert("RGB")
    stem = Path(name).stem
    # Skala aldrig upp: bredder större än originalet blir originalbredden
    for w in sorted({min(w, im.width) for w in widths}):
        img = im if im.width == w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        dest = OUT / f"{stem}-{w}.webp"
        img.save(dest, "WEBP", quality=q, method=6)
        print(f"{dest.name}: {img.width}x{img.height}, {dest.stat().st_size // 1024} kB")
