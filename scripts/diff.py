"""Compare a rendered screenshot against the Figma export, line of ink at a time.

Both are 2x. For each horizontal band of ink it reports y / x / width so a
mismatch points straight at the cause: width off = wrong size or wrong wrap,
line count off = wrong frame width, y off = wrong position.
"""
from PIL import Image
import numpy as np, sys
Image.MAX_IMAGE_PIXELS = None

def lines(path, y0, y1, bg=None, thr=24, x0=0, x1=100000):
    a = np.asarray(Image.open(path).convert('RGB')).astype(int)[y0:y1, x0:x1]
    ref = np.array(bg) if bg else np.median(
        np.concatenate([a[:, :40], a[:, -40:]], axis=1), axis=1, keepdims=True)
    ink = np.abs(a - ref).sum(2) > thr
    rows = ink.any(1); out = []; y = 0
    while y < len(rows):
        if rows[y]:
            s = y
            while y < len(rows) and rows[y]: y += 1
            cs = np.where(ink[s:y].any(0))[0]
            out.append((s + y0, y - 1 + y0, cs.min() + x0, cs.max() + x0))
        else: y += 1
    return out

if __name__ == '__main__':
    ref, got, y0, y1 = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
    bg = eval(sys.argv[5]) if len(sys.argv) > 5 else None
    x0 = int(sys.argv[6]) if len(sys.argv) > 6 else 0
    x1 = int(sys.argv[7]) if len(sys.argv) > 7 else 100000
    A, B = lines(ref, y0, y1, bg, 24, x0, x1), lines(got, y0, y1, bg, 24, x0, x1)
    print(f'{len(A)} ink lines in export, {len(B)} in render')
    for i in range(max(len(A), len(B))):
        a = A[i] if i < len(A) else None
        b = B[i] if i < len(B) else None
        if a and b:
            dy, dx, dw = b[0]-a[0], b[2]-a[2], (b[3]-b[2])-(a[3]-a[2])
            flag = '' if max(abs(dy), abs(dx), abs(dw)) <= 2 else '  <<<'
            print(f'{i:3d}  y {a[0]:6d} dy{dy:+4d}   x {a[2]:5d} dx{dx:+4d}   w {a[3]-a[2]:5d} dw{dw:+4d}{flag}')
        else:
            print(f'{i:3d}  export={a} render={b}   <<< MISSING')
