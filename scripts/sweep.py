"""Whole-page residual sweep: mean absolute pixel error per 500-row slab."""
from PIL import Image
import numpy as np, sys
Image.MAX_IMAGE_PIXELS = None
a = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
b = np.asarray(Image.open(sys.argv[2]).convert('RGB')).astype(int)
n = min(a.shape[0], b.shape[0])
step = int(sys.argv[3]) if len(sys.argv) > 3 else 500
print('slab (design y)      mean abs err   worst row')
for y in range(0, n, step):
    d = np.abs(a[y:y+step] - b[y:y+step]).mean(2)
    rows = d.mean(1)
    flag = '' if d.mean() < 1.2 else '   <<<'
    print(f'{y/2:8.0f}-{min(y+step,n)/2:<8.0f} {d.mean():8.3f}      y={((rows.argmax()+y)/2):.0f} ({rows.max():.1f}){flag}')
