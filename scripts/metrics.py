"""Emit lib/metrics.json: SF Pro Display vertical/horizontal metrics per weight.

top  = distance from baseline to glyph ink top, as a fraction of font-size
lsb  = distance from the pen origin to glyph ink left, as a fraction of font-size
asc/desc come from hhea and are what the browser uses to build the line box.
"""
from PIL import ImageFont
import json, os

FD = os.path.join(os.path.dirname(__file__), '..', 'public', 'fonts')
FONTS = {400: 'SFProDisplay-Regular.otf', 500: 'SFProDisplay-Medium.otf',
         600: 'SFProDisplay-Semibold.ttf', 700: 'SFProDisplay-Bold.otf'}
CHARS = ("abcdefghijklmnopqrstuvwxyz"
         "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
         "0123456789"
         " .,:;!?'\"()[]{}-/&%$#@*+=_‘’“”–—")
S = 2000
out = {}
for w, f in FONTS.items():
    fo = ImageFont.truetype(os.path.join(FD, f), S)
    asc, desc = fo.getmetrics()
    top, lsb = {}, {}
    for ch in CHARS:
        bb = fo.getbbox(ch)
        if bb[3] <= bb[1]:          # whitespace
            continue
        top[ch] = round((asc - bb[1]) / S, 5)
        lsb[ch] = round(bb[0] / S, 5)
    out[w] = {'asc': asc / S, 'desc': desc / S, 'top': top, 'lsb': lsb}
dst = os.path.join(os.path.dirname(__file__), '..', 'lib', 'metrics.json')
json.dump(out, open(dst, 'w'))
print('wrote', dst, {w: len(v['top']) for w, v in out.items()})
