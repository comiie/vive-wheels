# Inner page review — 2026-10-08

Branch: `codex/inner-pages-static`. No production deployment.

- `/about`: Figma VIVE node `727:2340`, 1920 × 7256.
- `/products`: Figma VIVE node `727:3185`, 1920 × 5447.
- `/`: approved homepage preserved in `app/pages/index.vue`.

Start with `pnpm dev`, then open http://127.0.0.1:3100/about or
http://127.0.0.1:3100/products. Desktop geometry scales proportionally from
the supplied 1920px artboards; no separate mobile design was supplied.

## Scope

Static fidelity approved, then shared homepage interactions added:

- Lenis scrolling, word-by-word headings, content entrance, reduced-motion support.
- Header hides on downward scroll and reappears on upward scroll; active navigation,
  corner-extension hover, white left-to-right button fill and contact links.
- About manufacturing gallery: pointer dragging, damped draggable progress,
  arrow controls, keyboard positioning; owner-experience tabs and copy transitions.
- Products: construction filtering, name sorting, clear/remove selections,
  collapsible controls, finish preference selection and hover zoom.
- Inbound homepage anchors work; a full reload still returns to the first screen.

Data limits: the supplied catalog has no series/size/price/fitment mapping or
matching finish variants. These controls retain inquiry preferences and display
an explicit notice; only construction actually filters results. Per the latest
request, finish selections now swap existing preview images without a placeholder
caption. These are not yet matched finish SKUs. No production deployment was made.

The full About page includes the off-road introduction, core principles,
manufacturing strip, owner experience, warranty/support, wheel hub banner,
contact panel and footer. The catalog retains both groups in the design:
two introduction tiles and sixteen product cards.

## Assets and isolation

Figma-exported images and SVGs are local in `public/assets/inner-pages`.
Raster exports are losslessly encoded as WebP, preserving source dimensions
and transparency. SVG contents are unmodified. The existing corrected X icon,
Space Mono font, asset resolver, ArrowButton and SiteFooter are reused.

Inner-page CSS is separate from the approved homepage CSS. SiteFooter accepts
an optional `designPreview` prop; its default homepage appearance is unchanged.
Original downloaded PNGs were moved outside the web root to
`/tmp/vive-figma-originals-eHExXp` to avoid shipping duplicate formats.

## Verification

- WebKit full-page screenshots compared against the Figma exports at 1920px.
- Both document widths are 1920px with no horizontal overflow.
- Static baseline heights: About 7256px, Products 5447px. Filter expansions and
  filtered results now change the catalog height intentionally.
- All raster images decode; no browser page errors.
- Native Safari preview checked.
- Interactive Safari checks: CAST reduces the catalog to 6 cards, A–Z sorts
  correctly, clear removes preferences, finish selection and fitment disclosure
  respond. About next/previous and progress keyboard controls update position;
  owner tabs change copy. Journal links reach the homepage section; reloading
  clears the hash and returns to the first screen.
- `pnpm typecheck`, `pnpm generate`, `pnpm test:static`,
  `pnpm test:inner`, `pnpm test:carousel`.

The existing dependency installation emits a Volar plugin resolution warning
for `vue-router/volar/sfc-route-blocks`; type checking exits successfully.
No dependency upgrades were made.

## Product detail and control update

- `/product/street/vi-1`: Figma `727:2775`, desktop artboard 1920 × 12764.
- `/product/accessories/zinc-lug-nuts`: Figma `727:3590`, 1920 × 4847.
- Reused shared navigation, footer, Lenis scrolling, word reveals and button styles.
- Default catalog filters are empty; selected chips wrap consecutively.
- Native sorting is replaced by DarkSelect: keyboard navigation, outside-click
  dismissal, Escape, focus restoration and explicit open-state stacking.
- EN/FR/DE/ES menu follows the narrow stacked reference. This is language-menu
  interaction only; translated page copy and locale routing are not connected.
- Detail interactions: thumbnails, preview finishes, specification preferences,
  accessory model selection, quantity, feature arrows, related accessory arrows,
  FAQ search/accordion and a native inquiry dialog with a mailto handoff.
- No checkout, payment, stock service or confirmed fitment compatibility is implied.
  Street lower price stays a starting price as in the design; accessory price
  follows quantity. Both page titles/copy retain the Figma content (the accessory
  artboard also has the VI-1 / Street heading and wheel-description placeholder).
- 66 local Figma exports in `public/assets/product-details`; raster assets encoded
  as WebP quality 88 with original dimensions/alpha, SVGs unchanged.
- Safari checked: both heroes, engineering card alignment, dark dropdown layers,
  language menu, accessory quantity 2 → 3 ($128 → $192), inquiry open/Escape,
  FAQ expansion. Fixed a scaled negative-calc position issue found in inspection.
- `pnpm test:details` validates prerendered pages, local assets, sections and
  unselected catalog defaults. Typecheck, generate, static and carousel tests pass.
# Viewport and catalog interaction follow-up

- Both detail configurators now use the viewport height minus the header on desktop; image, typography, controls and vertical spacing adapt together. Narrow mobile layouts retain natural flow rather than hiding controls.
- Catalog filters retain the original vertical grouping and natural page height. The temporary compact two-column/one-screen layout has been removed.
- Filter panel, introduction and first-row cards share `catalog-entry` reveal timing. Later rows still reveal as they enter view.
- Series now drives the catalog. Wheel series grouping is preview data pending the real product feed. ACCESSORIES replaces wheel cards with three accessory previews; cards open the existing zinc-hardware detail template. Other individual accessory detail pages have not been supplied yet.
- Related-accessory arrows, dropdowns, FAQ MORE and CTAs now share ArrowIcon, masked from the original CTA SVG with a fixed square aspect ratio. Scrolling uses a cancellable 780 ms ease-out animation; repeated clicks update the destination, and direct wheel/touch interaction cancels it.
- Catalog hover scales the complete cropped wheel viewport, preventing the image from being clipped inside its own zoom container. FORGED/CAST labels use the shared directional wipe. Accessory catalog silhouettes reuse the wheel-card SVG mask.
- Accessory feature cards remain mounted in a looping horizontal track, moving one card per click with a 720 ms ease-out. Controls stay centered on the images. Feature headings and detail option labels use 20 design pixels.
- Model selectors, filled actions and editorial CTAs share the same directional wipe timing; filled actions invert the colors for contrast.
- Dropdown menus (language, sort, specifications) use a 240 ms whole-panel fade/translate so borders and text appear together. Filter groups, description MORE and FAQ disclosures retain interruptible SmoothCollapse height easing; closed content is inert, with reduced-motion support.
- Specification menus contain real options only; unset triggers display “Please select”. FAQ MORE/LESS has no filled hover surface, and question titles are 20 design px. Dropdown icons reuse the CTA SVG with fixed square geometry and eased rotation.
- White-filled buttons keep their white background and dark text on hover/focus, moving only their arrow 4 design px. Editorial CTA arrows use block layout to avoid inline baseline drift. The catalog divider spans the same width as CLEAR ALL with 35% opacity.
- About manufacturing images reuse the homepage Journal mask. Inner-page large headings use 48 design pixels; the previous 64-pixel overrides were removed.

## FAQ and Technology pages

- `/faqs`: Figma `727:3776`; three categorized question groups, sticky category links, active scroll tracking and shared smooth answer disclosures. Original repeated questions are retained; answers are preview copy pending editorial approval.
- `/technology`: Figma `727:3463`; original section composition and imagery, draggable/inertial quality-control process, six material tabs, DEV/PEV panels and series links that initialize the product filter.
- PRODUCTS links directly to the catalog; TECHNOLOGY is now a standalone top/footer navigation item (the former product dropdown is no longer rendered). Header/footer FAQ links open the dedicated page.
- The footer navigation/contact/social-legal columns share a 256-design-pixel height; footer navigation uses the header's corner-bracket hover treatment.
- Journal detail pages omit the upgrade CTA and use outline previous/next buttons. FAQ group labels are 16px; question text is white only on hover, keyboard focus or expansion.
- Contact uses an interactive Google Maps iframe, with a marker at the Irvine city-centre coordinates returned by Google Maps. This is not an exact office location; replace the query when the street address is supplied. The missing X icon is vector-rendered, text-field focus uses the underline instead of a browser rectangle, and SUBMIT uses the shared arrow.
- Figma raster sources are preserved in `source-media/technology`; 11 WebP images and 3 SVGs are served from `public/assets/technology`. `scripts/prepare-technology-assets.py` recreates the optimized images.
- The embedded video's low-resolution poster is preserved as a source reference. The current hero uses a high-resolution replacement (see update below). Additional material-tab descriptions are preview summaries; the PEV description uses the design's validation introduction.
- Safari verified FAQ disclosure, navigation dropdown, horizontal process drag, material switching, DEV/PEV switching and STREET-series filter navigation. Static coverage: `pnpm test:editorial`; existing homepage, inner-page and detail tests remain enabled.
- This implementation is local only; no production deployment or OSS/CDN changes were performed.

## Journal, contact and viewport follow-up

- `/journal`: Figma `727:2658`; original layered photo crops and angular masks, category selection, title search, eight-card pagination, empty state and detail links.
- `/journal/brand-1` (and other preview slugs): Figma `727:2580`; article image/body, previous/next navigation and related articles. The four supplied headlines repeat to populate the design's category counts (12/23/16). These are preview records, not 51 real articles. Pagination reflects those records rather than copying a nonfunctional ten-page decoration.
- The supplied article body is retained verbatim, including its unrelated 3D-scanner topic and incomplete sentences. Replace this placeholder copy and inventory with approved editorial content before publication.
- `/contact`: Figma `727:1933`; contact fields, required/email validation, local privacy notice, map and email/telephone links. SUBMIT only prepares a reviewable mailto draft; no backend, storage or automatic email transmission. The final company privacy policy is still required before enabling a live online form.
- Header/footer JOURNAL and CONTACT US now open the dedicated routes; homepage news cards open their detail pages. Shared motion, buttons and arrows are reused.
- Figma source exports are in `source-media/editorial`; WebP/SVG output is in `public/assets/editorial`. Rebuild with `scripts/prepare-editorial-assets.py` (Pillow required).
- Technology hero replacement: existing local `sports-car-studio-setup-dark-background-3d-rendering.jpg` (8000 × 2664), preserved as `source-media/technology/hero-hd.jpg`, encoded to a 3840-wide WebP. This is a different studio-car image, not fabricated detail recovered from the blurry Porsche poster.
- The desktop hero/materials/validation 1080-high artboards now use viewport height. Material controls and validation text/spacing adapt vertically; narrow mobile layouts retain readable natural flow.
- FAQ heading and category buttons share one reveal group. Category tracking uses one animation-frame update, with a 140 ms whole-button color transition and 600 ms anchor movement. The PRODUCTS arrow has matching fixed width/height/min-width, and desktop navigation spacing is increased.
- Safari verified journal search/empty state, category switching, pagination, detail links, contact field validation, FAQ category navigation and the new technology hero. Existing static suites additionally check prerenders, assets and navigation.

## Product finishes and technology interaction follow-up

- Related accessory cards retain their white default photos and temporarily share black close-up `7de27` on hover.
- Rainbow Custom Finish opens a native modal right-half drawer (full width on mobile), with independent scrolling, Escape/backdrop closing, focus restoration and selected finish carried into the inquiry. The 44 samples and 88 front/angle images are Vossen reference assets, not an approved VIVE finish catalogue. Source URLs are recorded in `scripts/finish-reference-assets.json`; replace with approved VIVE samples before production.
- Quality control uses a sticky viewport and scroll-distance-driven horizontal track; reduced-motion and mobile use native horizontal scrolling. Arrow keys/Home/End remain supported.
- Materials use six mutually exclusive panels with image/copy crossfades and keyboard-accessible tabs.
- Validation uses a 210svh desktop scroll scene, 5.4-second DEV/PEV autoplay with progress rails and roughly 1.3-second sequential workflow reveal. Pause, background/offscreen suspension and reduced-motion handling are included. PEV's background, eight labels and four actions come from Figma `891:2485`; animation timing follows the requested interaction, not Figma motion metadata.
- `pnpm test:technology` covers scroll bounds, carousel timing/pause, reduced-motion behavior, material keyboard selection, PEV content and all reference assets. Safari verified drawer hover/selection, horizontal movement, material switching and PEV autoplay/pause. No deployment was performed.

## Same-screen scroll and viewport refinements

- About's WHO WE ARE hero is exactly `100svh`, including the overlaid navigation. Its original 451/1080 copy position now follows viewport height rather than width; typography is height-capped for wide, short windows.
- Workflow titles and supporting copy reveal together on entry. The horizontal progress rail fades out at completion and returns on reverse scrolling.
- Materials retain click/keyboard switching, with a 175svh desktop scene for a short pinned pause. Added plus/cross icons are removed; thin full-width separators and the selected right-edge line match the supplied design.
- About Core Principles pins through three scroll-driven disclosures; only the selected description is expanded. Performance and Driving Experience reuse existing About copy pending dedicated approved descriptions.
- Owner Experience pins through five scroll-driven progress segments with crossfading descriptions and manual/keyboard seeking. Its parent grows with the scroll scene so the following support section cannot overlap it. Bottom labels reveal as a group to remain visible in a pinned viewport.
- Mobile/reduced-motion modes retain manual controls without pinning. `pnpm test:about-scroll` exercises forward/reverse sequencing, progress, seeking, fallback behavior and hero sizing contracts. Browser checks cover hero fit, principle expansion, owner switching and material dividers/pinning. No deployment was performed.

## Responsive and scroll-buffer follow-up

- Owner Experience now crossfades five distinct existing site photographs alongside its five descriptions. Replaced image-based shading with continuous CSS gradients so every background remains readable without rectangular overlay seams.
- Shared pinned scenes and homepage story sections round their sticky entry/exit over a short scroll distance (up to 72px); there is no wheel lock or forced timeout. Page wheel smoothing is more responsive. Viewports below 600px high use the unpinned fallback.
- Contact form outer dividers are 20% white; input borders are unchanged.
- Added a keyboard-accessible mobile/tablet navigation menu, readable narrow-screen typography, adaptive catalog/filter layouts, stacked configurators and contact forms, responsive related accessories/FAQ/footer, and a reflowed narrow-screen version of the existing Street editorial/specification content. Desktop artboards remain intact. Manufacturing arrows now measure the actual responsive card width.
- Browser layout checks: home, About, catalog, wheel detail, accessory detail, Technology, Contact, Journal index, Journal article and FAQs at 320, 390, 700, 760, 768, 1024, 1100, 1280, 1440, 1920 and 2100px (110 combinations). No page-level horizontal overflow or rendered text below 10px in the checked combinations. This is representative breakpoint coverage, not an every-device certification.
- Interactive browser checks: owner background selection, menu open/Escape close, sort dropdown, narrow product form bounds, contact border opacity, 1920×1080 About hero and 844×390 unpinned Materials fallback. Static generation, typecheck and all existing verification suites pass; typecheck retains the pre-existing vue-router Volar plugin warning. `pnpm test:responsive` additionally checks pin-boundary continuity, reduced-motion fallback and all five background assets. No deployment performed.
