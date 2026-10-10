# Homepage film verification — 2026-10-10

Story: homepage loads the first 00:00–00:20 of the supplied factory film as a muted loop; the lower-right card mounts the full film with sound and native playback controls. Closing restores the background loop and trigger focus.

## Assets

Original MP4 is untouched: 3840×2160, 25 fps, approximately 100.67 seconds, stereo audio and burned-in subtitles.

| File | Bytes | Encoding |
| --- | ---: | --- |
| vive-factory-full-4k.webm | 97,608,222 | VP9 CRF 35, 3840×2160, 25 fps; Opus stereo 160 kb/s |
| vive-factory-banner-20s.webm | 13,383,200 | VP9 CRF 30, 2560×1094, 500 frames, no audio |
| vive-factory-banner-mobile-20s.webm | 6,154,072 | VP9 CRF 30, 1280×546 encoded, 500 frames, no audio |
| vive-factory-poster.webp | 82,764 | Source at 00:03, WebP quality 90 |

Only banner/poster remove the original 260-pixel letterbox bars. Browser display dimensions may differ slightly from encoded dimensions due to preserved sample aspect ratio. Full film preserves the original frame. WebM is lossy; resolution retention is not a lossless-quality claim.

## Evidence

- Full-film decode completed successfully: 2,515 frames and audio, no decode errors.
- Final CRF 35 sample at 00:50–00:52: VMAF 98.63 after scaling both source and encode to 1920×1080. This is a two-second sample, not a whole-film quality guarantee.
- Browser desktop: 20-second desktop source, muted=true, loop=true, paused=false.
- Browser 390×844: mobile source selected, 20-second duration, autoplay/loop; document width=390, scrollWidth=390; title and card visible.
- Card click: full video duration=100.636 seconds, 3840×2160, controls=true, muted=false, paused=false; banner paused.
- Escape: modal removed, banner resumed, focus restored to card.
- Nuxt generate: 122 routes. Static, inner, responsive, and product-detail checks pass. Typecheck exits 0 with the existing vue-router/volar plugin resolution warning.

Deployment target: existing `codex/inner-pages-static` Preview branch only. No production or sharing-policy changes.

## Startup follow-up

- Added a separate 10% black overlay above the existing color shade; copy and controls remain above it.
- Removed the 1.5-second media entrance fade. Poster preloads at high priority from the SSR head.
- `-fast.webm` variants are stream copies (no re-encoding or quality reduction), with front-loaded cues and 250ms / 256KiB cluster limits.
- About video has no source until its section is within 600px of the viewport. Product images below the hero use native lazy loading.
- Actual first-frame timing still depends on connection and browser autoplay policy; no guaranteed instant playback claim.
