"""For a region, find the sub-pixel shift that best aligns render to export.

Reports the offset in DESIGN px, so the number can be applied straight to the
authored coordinate. Run at 2x, so a reported 0.5 is one device pixel.
"""
from PIL import Image
import numpy as np, sys, json
Image.MAX_IMAGE_PIXELS = None

def mask(p, box, bg):
    a = np.asarray(Image.open(p).convert('RGB').crop(box)).astype(float)
    if bg == 'auto':
        e = np.concatenate([a[:, :30], a[:, -30:]], axis=1)
        d = np.linalg.norm(a - np.median(e, axis=1, keepdims=True), axis=2)
    elif bg == 'bright':
        d = np.clip(a.min(2) - 150, 0, None)
    else:
        d = np.linalg.norm(a - np.array(bg, float), axis=2)
    return d / max(d.max(), 1e-6)

for job in json.load(open(sys.argv[3])):
    box, bg = job['box'], job.get('bg', 'auto')
    A, B = mask(sys.argv[1], box, bg), mask(sys.argv[2], box, bg)
    best = None
    for dy in range(-8, 9):
        for dx in range(-8, 9):
            b = np.roll(np.roll(B, -dy, 0), -dx, 1)
            err = np.abs(A - b)[10:-10, 10:-10].sum()
            if best is None or err < best[0]: best = (err, dy, dx)
    base = np.abs(A - B)[10:-10, 10:-10].sum()
    print('%-30s shift render by dy=%+.1f dx=%+.1f design px   err %.0f -> %.0f  (ink %.0f)'
          % (job['label'], -best[1] / 2, -best[2] / 2, base, best[0], A.sum()))
