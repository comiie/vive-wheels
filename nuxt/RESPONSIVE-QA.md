# Responsive verification — 2026-10-09

## Follow-up: mobile interactions and homepage dividers

- Homepage product and journal rails now show part of the next card. Catalog
  wheel/accessory rails use the same smaller-card pattern only below 761px.
- Mobile language selection is the final row of the expanded navigation.
- Mobile catalog starts with a closed Sort + Filter disclosure; sorting is
  inside it. Desktop sidebar and three-column catalog remain intact.
- Mobile street specifications initially show one configuration with More/Less.
- Related-accessory next arrow is inset 48px. Validation stages form a horizontal
  rail with a 1px connecting line. About manufacturing cards are larger with no
  mobile ruler. FAQ categories are horizontal and sticky below the 64px header.
- Homepage logo/nav/actions use independent bounded grid columns; logo divider
  no longer stretches into PRODUCTS and language no longer has duplicate borders.
- Removed double subtraction of scroll-margin in the shared Lenis anchor handler.

Generated-static Chrome checks: six affected routes at widths 320, 390, 600,
760, 768, 1100, 1280, 1920 and 2100 (54 page/viewport combinations), no document
horizontal overflow. At 390px, homepage/catalog cards measure 306px, manufacturing
cards 318px, and collapsed specifications about 532px high. At 1920px the logo
divider is at x=302, well before the first navigation item at x=678.

Interaction checks: product/journal keyboard scrolling, filter disclosure and
NAME A–Z selection, menu language selection, 1→8→1 specification rows, manufacturing
next arrow (338px scroll), validation stage reveal/connecting line, FAQ sticky
top=64px and anchor title top≈156px with matching active category.

All static, inner, details, technology, About-scroll, editorial, carousel and
responsive test commands pass. Source guards cover these mobile layout contracts
and prevent double anchor offsets. Physical iOS/Android testing remains outstanding.

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
