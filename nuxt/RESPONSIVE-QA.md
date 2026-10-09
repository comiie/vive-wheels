# Responsive verification — 2026-10-09

## Changes

- Load shared page CSS in a deterministic order, with responsive overrides last.
- Scope homepage rules separately from inner-page rules.
- Replace fixed desktop widths/heights in homepage cards, engineering content,
  statistics, upgrade panel and footer with fluid grids and natural text flow.
- Use a viewport-height mobile hero, contained navigation and proportional video
  card; retain a dark document background below the hero.
- Set readable minimum type sizes, wrapping controls and mobile form sizes.
- Preserve full news titles instead of clamping them to two lines.

## Browser coverage

Tested the generated static build in Chrome using browser viewport overrides.
This is not physical-device or Safari verification.

Ten routes: `/`, `/products`, `/product/street/vi-1`,
`/product/accessories/zinc-lug-nuts`, `/technology`, `/about`, `/contact`,
`/faqs`, `/journal`, `/journal/brand-1`.

Width matrix: 320, 375, 390, 430, 600, 768, 1024, 1100, 1280, 1440, 1536,
1920 and 2100 CSS pixels (844px height up to 1100px; 900px above).
130 page/viewport combinations inspected for document width and text bounds.
No document-level horizontal overflow remained. Manually reviewed the intended
offscreen accessory carousel/workflow slides and the centered About heading's
offset box; these are not cut-off reading content.

Additional 40 page/viewport combinations: 320×568, 844×390, 1920×1080 and
2100×1080. Headings with visible font ink outside line boxes were distinguished
from actual hidden/clamped text. News title clamping found by this check was
removed. The About intro was measured at exactly 1080px in a 1920×1080 viewport,
with its heading and paragraph fully inside the section.

Interactive checks:

- 390px homepage menu opens and all six links remain available; Contact link
  navigates successfully.
- 390px Custom Finish drawer slides into view with two sample columns, without
  internal horizontal overflow; choosing Dark Smoke closes the drawer.
- 390px engineering next control switches from Precision Manufacturing to
  Engineering R&D and the card expands naturally around the body copy.
- 390px contact country menu opens inside the viewport and selects China.
  No contact form was submitted.
- 768×1024 material tabs switch the image/body copy; active paragraph is 15px
  and fits its panel. The panel is one viewport tall.

## Automated checks

Static generation completed (122 prerendered routes). All existing static,
inner-page, product-detail, technology, About-scroll, responsive-motion,
editorial and carousel checks passed. Type checking exited successfully but
reported an existing `vue-router/volar/sfc-route-blocks` resolution warning.

`test:responsive` additionally guards the CSS load order, homepage scope,
viewport hero, natural-height mobile cards, complete titles and dark background.
These source-level assertions are not substitutes for the browser checks above.

## Remaining verification limits

- Actual iOS Safari/Android hardware and browser chrome/keyboard behavior have
  not been tested in this environment.
- Existing country-label hydration differences between Node/Chrome Intl data
  were observed in development; selecting countries still worked. No country
  dataset changes are included in this layout patch.
- Only the review/Preview environment is in scope; production is unchanged.
