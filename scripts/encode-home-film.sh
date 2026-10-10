#!/bin/sh
# Preserve the original. Run from the repository root with SOURCE and FFMPEG set.
set -eu
: "${SOURCE:?Set SOURCE to the original 4K MP4}"
: "${FFMPEG:?Set FFMPEG to the encoder executable}"

# Full film: original 3840x2160 / 25fps, baked-in subtitles and stereo audio.
"$FFMPEG" -hide_banner -nostdin -i "$SOURCE" -map 0:v:0 -map 0:a:0 \
  -map_metadata -1 -c:v libvpx-vp9 -crf 35 -b:v 0 -row-mt 1 \
  -tile-columns 2 -cpu-used 3 -threads 6 -pix_fmt yuv420p -g 100 \
  -c:a libopus -b:a 160k public/assets/vive-factory-full-4k.webm

# Exactly 00:00–00:20. Remove only the source's 260px letterbox bars for cover.
for width in 2560 1280; do
  output=public/assets/vive-factory-banner-20s.webm
  if [ "$width" = 1280 ]; then output=public/assets/vive-factory-banner-mobile-20s.webm; fi
  "$FFMPEG" -hide_banner -nostdin -i "$SOURCE" -t 20 -map 0:v:0 -an \
    -map_metadata -1 -vf "crop=3840:1640:0:260,scale=$width:-2:flags=lanczos" \
    -c:v libvpx-vp9 -crf 30 -b:v 0 -row-mt 1 -tile-columns 2 \
    -cpu-used 3 -threads 4 -pix_fmt yuv420p -g 50 "$output"
done
# Stream-copy only: keep image quality and move indexes to the front, with
# smaller clusters so browsers can begin consuming the first frames sooner.
for variant in banner banner-mobile; do
  "$FFMPEG" -hide_banner -nostdin -i "public/assets/vive-factory-$variant-20s.webm" \
    -c copy -cluster_time_limit 250 -cluster_size_limit 262144 -cues_to_front 1 \
    "public/assets/vive-factory-$variant-20s-fast.webm"
done
"$FFMPEG" -hide_banner -nostdin -ss 3 -i "$SOURCE" -frames:v 1 \
  -vf 'crop=3840:1640:0:260,scale=1920:-2:flags=lanczos' \
  -c:v libwebp -quality 90 public/assets/vive-factory-poster.webp
