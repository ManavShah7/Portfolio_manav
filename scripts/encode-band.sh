#!/bin/bash
# Crop a band clip to the exact shape of the band it sits behind, then compress.
#
# The sources are 4K/8K at 12-21 Mbps - 64MB for four clips, which on a page
# that autoplays them is not a background, it is a download. They are soft ink
# textures with no fine detail, so they take a heavy CRF without showing it.
# Cropping first matters as much as the CRF: object-fit:cover on a 16:9 clip
# behind a 1.09:1 band throws away 40% of the frame and upscales the rest 1.6x.
#
#   encode-band.sh <src> <out> <design-w> <design-h>
set -e
src="$1"; out="$2"; dw="$3"; dh="$4"
# ship at ~1.2x the design size: the bands are soft enough that a 2x device
# pixel ratio does not need a 2x source
ow=$(python3 -c "print(int(round($dw*1.2/2))*2)")
oh=$(python3 -c "print(int(round($dh*1.2/2))*2)")
ar=$(python3 -c "print($dw/$dh)")
ffmpeg -v error -i "$src" \
  -vf "crop='min(iw,ih*$ar)':'min(ih,iw/$ar)',scale=$ow:$oh:flags=lanczos" \
  -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart \
  "$out" -y
printf '%-34s %s  %s\n' "$(basename "$out")" "${ow}x${oh}" "$(du -h "$out" | cut -f1)"
