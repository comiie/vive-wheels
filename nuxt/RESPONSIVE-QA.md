# Responsive verification — 2026-10-10

## Shared navigation and FAQ category hierarchy

- Home and inner headers now opt into one shared geometry stylesheet: equal
  desktop side columns, identical link gaps, logo crop, language/contact cells,
  and 64px mobile headers with 20px side padding. Scroll behavior is unchanged.
- Mobile/tablet FAQ category headings use 18px / 1.4 line height, overriding
  the generic mobile h2 rule; the page title retains its existing hierarchy.
- Chrome viewport checks at 320, 390, 440, 760, 800, 1000, 1100, 1101, 1440,
  1920 and 2100px found no document horizontal overflow. Home/FAQ logo and
  header boxes match; desktop links use the same geometry. At 390px, expanded
  menus match exactly (six 49px rows, 399px panel), including bottom language.
- Static generation and static, inner-page and responsive regression checks
  passed. Tests are browser emulation, not physical-device Safari validation.

## Mobile refinement: footer, catalog and materials

- At <=760px, the footer uses the original 1920×376 wordmark rather than the
  vertically stretched inner-page source. It is in normal flow with automatic
  height; the copyright-to-image gap is 32px, without the old 300px reserve.
- Mobile wheel groups now use two columns: introduction in the first cell,
  first wheel alongside it, subsequent products in paired rows. Cards have
  natural-height copy and a separate proportional media area. Accessories use
  the same two-column rhythm. Homepage product rails remain unchanged.
- At 320, 390, 440 and 760px, the active material paragraph's center exactly
  matches its image center after the transition. Desktop bottom alignment is
  retained (checked at 800 and 1440px).
- Chrome emulation checked at 320, 375, 390, 440, 600, 760, 800, 1000, 1440,
  1920 and 2100px: no document horizontal overflow. At 440px, product columns
  measure 188px each with a 16px gap, paired cards share their layout top.
  Finish selection and accessory-category switching were exercised successfully.
- Static generation completed (122 routes); static, inner, details,
  technology and responsive checks passed. This is local browser emulation,
  not physical-device Safari validation; the online share has not been replaced.


## Follow-up: button contrast, tablet lines and FAQ icons

- Wrapped Sort + Filter text in the shared button's foreground layer. Verified
  keyboard-focus white background with black text and label z-index 1 above the
  wipe layer at z-index 0; the filter still expands normally.
- Owner service buttons now use top-aligned flex columns. The original 900px
  layout had a 9px vertical difference between single- and double-line labels.
  At 800, 820, 850, 900, 950, 1000, 1024, 1100, 1280 and 1920px, all five lines
  now have identical top coordinates. The 760px stacked layout remains stacked.
- Product FAQ icons use fixed 24×24px boxes / 24px text with flex-shrink 0.
  Verified at 320, 390, 600, 800, 900, 1000, 1100 and 1920px in the generated
  static build, and clicked a FAQ to confirm the answer expands.
- Added regression assertions for all three fixes. Checks use Chrome viewport
  emulation; they do not constitute physical-device testing.

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
