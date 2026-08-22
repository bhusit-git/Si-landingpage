# Design QA: Interactive Client Brand Marquee

- Source visual truth: `/Users/bhusitt./Desktop/ภาพถ่ายหน้าจอ2569-08-20เวลา 17.44.19.png`
- Source dimensions: 2880 × 1800 px; supplied desktop screenshot; 2× raster reference.
- Desktop implementation: `/Users/bhusitt./Downloads/SIWEB/implementation-client-logos-centered.png` (1280 × 720 px).
- Mobile implementation: `/Users/bhusitt./Downloads/SIWEB/implementation-client-logos-mobile-theme.png` (390 × 844 px at a 390 × 844 CSS viewport).
- Combined visual evidence: `/Users/bhusitt./Downloads/SIWEB/design-qa-comparison.png`.
- Route/state: Thai homepage, logo section revealed, automatic movement active; mouse-drag and paused states tested separately.
- Browser verification: Codex in-app browser at `http://127.0.0.1:4311/th/`.

## Findings

No actionable P0, P1, or P2 differences remain.

## Full-view comparison evidence

The implementation keeps the source's real multicolor logo marks, clear trust-led hierarchy, and generous spacing. The static source grid is intentionally adapted into the requested horizontal marquee. The earlier warm beige section has been replaced with the site's established `--color-surface`, white cards, ice-blue borders, and cyan interaction accents, which visually connects it to the Super Ice header and adjacent sections.

## Focused region comparison evidence

The desktop capture shows white logo cards with consistent sizing, ice-blue outlines, a visible horizontal scrollbar, and no beige image blocks. Eat Am Are, Sorn, Potong, Bar-B-Q Plaza, and the horizontal wordmarks are centered by their visible artwork rather than by the uneven whitespace in their original crops. The instructional pill is absent as requested.

## Required fidelity surfaces

- Fonts and typography: Existing Kanit family, weights, line heights, and eyebrow treatment match the rest of the site. Thai heading wraps cleanly at 390 px.
- Spacing and layout rhythm: Section padding and card gaps follow the current homepage rhythm. Card sizes remain consistent and the rail is clipped only within its own scroll area.
- Colors and visual tokens: Section uses `--color-surface`, `--color-white`, `--color-ice-soft`, `--color-ice-action`, and the existing line palette. The former beige source background has been normalized to white inside the logo images.
- Image quality and asset fidelity: Brand marks remain source-derived raster assets, trimmed to visible bounds and centered on identical 320 × 200 px white canvases before `object-fit: contain` rendering. No CSS/SVG redraw is used. Higher-resolution official logos remain a P3 opportunity.
- Copy and content: Heading and brand captions are intact. The user-requested drag/swipe/trackpad hint and its `aria-describedby` reference were removed.

## Interaction and accessibility verification

- Automatic scrolling advanced from `scrollLeft: 2710` to `2732` in a 700 ms sample.
- Mouse drag moved the rail exactly 400 px in the tested gesture.
- Automatic movement paused while the pointer remained over the rail, then resumed after the pointer left.
- Native horizontal overflow supports touch swipe and trackpad scrolling; the focusable region supports keyboard scrolling.
- Three visual groups provide seamless movement in either direction; only the central group is exposed to assistive technology.
- `prefers-reduced-motion: reduce` disables automatic movement and hides duplicate groups.
- Desktop and 390 px mobile checks report zero document-level horizontal overflow.
- Browser console warnings/errors: none.

## Comparison history

- Earlier P2: the warm beige section and logo backgrounds did not match the site's white/cyan visual system.
  - Fix: changed section/card/fade tokens to the existing Super Ice palette and normalized light beige pixels in source-derived logo crops to white.
  - Post-fix evidence: both implementation screenshots and the combined comparison show a consistent white/ice-blue treatment.
- Earlier P2: users could not directly control the transform-based marquee.
  - Fix: replaced CSS transform animation with a scroll-based loop, native overflow, pointer dragging, and temporary pause/resume behavior.
  - Post-fix evidence: browser tests confirm a 400 px drag, pause-on-interaction, and automatic resume.
- Latest P2: several logos appeared vertically or horizontally offset because their source crops contained uneven whitespace.
  - Fix: detected each visible logo boundary, trimmed excess whitespace, scaled proportionally, and centered the artwork on a common 320 × 200 px canvas; removed the instructional pill.
  - Post-fix evidence: `implementation-client-logos-centered.png` shows Eat Am Are and neighboring logos sharing the same optical center, and browser measurements report identical card/image center coordinates.

## Follow-up polish

- P3: Replace screenshot-derived raster crops with official transparent vector or high-resolution brand assets if provided by the brand owners.

## Implementation checklist

- [x] Mouse drag
- [x] Touch and trackpad scrolling
- [x] Keyboard-accessible scroll region
- [x] Automatic pause and resume
- [x] Seamless looping in both directions
- [x] Current-site color tokens
- [x] Reduced-motion fallback
- [x] Desktop/mobile browser verification
- [x] Optical logo centering
- [x] Instructional pill removed

final result: passed

---

# Design QA: Homepage Production Process Showcase

- Source visual truth: `/Users/bhusitt./Desktop/ภาพถ่ายหน้าจอ2569-08-21เวลา 17.40.03.png`.
- Source dimensions: 1222 × 786 px; supplied desktop screenshot at 1× density.
- Desktop implementation evidence: `/Users/bhusitt./Downloads/SIWEB/implementation-process-desktop.png` (1222 × 930 px at a 1222 × 930 CSS viewport, 1× capture; the 796.8 px process section is shown below the persistent site header).
- Mobile implementation evidence: `/Users/bhusitt./Downloads/SIWEB/implementation-process-mobile.png` (390 × 844 px at a 390 × 844 CSS viewport, 1× capture).
- Combined visual evidence: `/Users/bhusitt./Downloads/SIWEB/design-qa-process-comparison.png` (2444 × 930 px; the 1222 × 786 source is vertically centered beside the 1222 × 930 implementation capture without scaling).
- Route/state: `/th/#production-process`; production section revealed, first process card visible, desktop and mobile responsive states.
- Browser verification: Codex in-app browser at `http://127.0.0.1:4321/th/#production-process`.

## Findings

No actionable P0, P1, or P2 differences remain. The production section reproduces the reference hierarchy, five-step rail, process cards, assurance bar, high-key factory imagery, and blue/white visual language while remaining part of the existing homepage.

## Full-view comparison evidence

The side-by-side comparison shows the same major-region proportions and sequence as the source: pale factory hero, left-aligned headline and supporting copy, five numbered nodes, five equal cards, and a four-column assurance strip. The implementation section measures 796.8 CSS px versus the 786 px source, a 10.8 px difference that is visually immaterial and preserves the existing site's header and container behavior.

## Focused region comparison evidence

Separate focused crops were not needed because both source and implementation are preserved at 1222 px native width in the combined comparison and the headline, icons, card copy, connector rail, and assurance labels remain legible. Native inspection confirms the cards share equal heights, arrows sit between cards, and the factory image stays sharp without stretching.

## Required fidelity surfaces

- Fonts and typography: Existing Kanit 300–700 weights are retained. The desktop headline, eyebrow, card headings, body copy, and assurance labels follow the source hierarchy; Thai wrapping remains clean at 390 px.
- Spacing and layout rhythm: The implementation matches the source's two-tier composition and five-column rhythm. Desktop cards are equal-height; tablet/mobile use a touch-friendly horizontal scroll rail rather than shrinking text below a readable size.
- Colors and visual tokens: Navy type, action blue, ice-blue connector lines, pale-blue surface, white cards, and restrained shadows match the supplied palette and reuse the site's established tokens.
- Image quality and asset fidelity: The factory hero is a purpose-made 1872 × 841 raster asset with correct clean-room subject, right-side focal point, and left-side negative space. It contains no generated logo text or watermark. The existing Super Ice brand mark is overlaid as a real reusable brand component; process and assurance icons come from Phosphor rather than CSS/SVG approximations.
- Copy and content: The original five process names/details and detailed-process destination are preserved. Supporting hero and assurance copy follows the supplied visual reference without changing product claims.

## Interaction and accessibility verification

- The detailed-process CTA navigates successfully to `/th/production-process/`.
- The process is a semantic ordered list with an accessible group label; decorative icons and connector arrows are hidden from assistive technology.
- The factory image has descriptive Thai alternative text.
- Mobile checks report `document.body.scrollWidth === viewport width` (390 px), so there is no document-level horizontal overflow.
- The five-card rail exposes intentional horizontal scrolling (`1360 px` scroll content in a `350 px` viewport) for touch and trackpad use.
- Desktop and mobile browser console warnings/errors: none.
- Static type check, production build, route/reference validation, and package asset bundling: passed.

## Comparison history

- Initial P1: the homepage used a plain bordered text timeline with no factory hero, no process icons, no card surfaces, and no assurance strip, so it did not resemble the supplied reference.
  - Fix: replaced only the homepage production section with a high-key factory hero, five numbered icon cards, connector arrows, and a four-item assurance bar while preserving the existing process copy and destination.
  - Post-fix evidence: `design-qa-process-comparison.png` shows the source and implementation sharing the same major regions, order, palette, and visual hierarchy.
- Initial P2: the first implementation measured about 886 px high, leaving excess empty space below the assurance bar relative to the 786 px reference.
  - Fix: tightened the hero/card heights and reduced the bottom padding while preserving readable card copy.
  - Post-fix evidence: the final browser measurement is 796.8 px, and the comparison shows the assurance strip ending at nearly the same relative position as the reference.
- Later P2: the hero copy initially sat roughly 25–35 px lower than the source.
  - Fix: reduced the copy's top padding at desktop and mobile breakpoints.
  - Post-fix evidence: the final comparison aligns the eyebrow, two-line heading, body copy, and CTA with the source's top-left composition.

## Follow-up polish

- P3: If an approved transparent Super Ice bag-print logo asset becomes available, it can replace the current floating brand plaque for even closer packaging fidelity.
- P3: Custom commissioned process icons could reproduce the source's exact drop sparkle, branded bag, snowflake truck, and thermometer/snowflake combinations; the current Phosphor set is intentionally consistent and accessible.

## Implementation checklist

- [x] Source-matched factory hero and left-side copy
- [x] Five numbered process cards with real icon library
- [x] Four-item assurance bar
- [x] Responsive horizontal card rail
- [x] Working detailed-process link
- [x] Desktop/mobile browser verification
- [x] Console and document-overflow checks
- [x] Static check, build, and route validation

final result: passed

---

# Design QA: Quality and Standards Page

- Source visual truth: nine supplied screenshots at `/Users/bhusitt./Desktop/ภาพถ่ายหน้าจอ2569-08-20เวลา 17.28.44.png` through `/Users/bhusitt./Desktop/ภาพถ่ายหน้าจอ2569-08-20เวลา 17.30.13.png`.
- Desktop implementation evidence: `/Users/bhusitt./Downloads/SIWEB/quality-implementation-hero-desktop.png` and `/Users/bhusitt./Downloads/SIWEB/quality-implementation-documents-desktop.png` (1280 × 720 px at a 1280 × 720 CSS viewport, 1× capture).
- Mobile implementation evidence: `/Users/bhusitt./Downloads/SIWEB/quality-implementation-mobile.png` (390 × 844 px at a 390 × 844 CSS viewport, 1× capture).
- Combined comparison evidence: `/Users/bhusitt./Downloads/SIWEB/quality-design-qa-comparison.png` (1800 × 1000 px).
- Route/state: `/th/quality-and-standards/`; desktop hero, document section, mobile hero, document modal open/close states.
- Browser verification: Codex in-app browser at `http://127.0.0.1:4321/th/quality-and-standards/`.

## Findings

The laboratory section was corrected after review: the three supplied images are pages 1–3 of one physical/chemical report, not separate physical, chemical, and microbiological reports. The page now identifies them accordingly.

Certificate cards now name the document holder or external scope and display the document date/status. Expired Super Ice documents are explicitly marked as reference material; external documents are not presented as Super Ice certifications.

## Full-view comparison evidence

The supplied slide material is reorganized into a web-native trust sequence: quality promise, control points, certificates and partner standards, laboratory reports, production process, storage, assessments, and traceability. Source-derived documents and factory photographs remain visually faithful while the presentation adopts the existing Super Ice typography, white/cyan palette, navy contrast sections, and responsive grid system.

## Focused region comparison evidence

The combined comparison confirms the source certificates and machinery photographs are preserved rather than redrawn. The desktop hero uses the RO and automated-packaging photographs with correct subjects and clean crops. Document cards retain readable document silhouettes, identify their scope, and offer a working enlargement dialog. Mobile evidence confirms the headline, copy, CTA, imagery, and grid collapse without horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Existing Kanit weights and site eyebrow treatment are retained. Desktop hierarchy is strong; the Thai H1 wraps cleanly at 390 px without clipping.
- Spacing and layout rhythm: Sections use the existing container and section rhythm. Certificate, report, process, and photo grids collapse at 70 rem, 52 rem, and 38 rem without document-level horizontal overflow.
- Colors and visual tokens: White, surface gray, ice cyan, action blue, and navy reuse the site's established tokens. Contrast sections remain consistent with the current navigation and footer.
- Image quality and asset fidelity: All visible certificates, reports, forms, and factory images are cropped from the supplied source screenshots. No document, logo, or factory image was recreated with CSS, SVG, or placeholder art. Source screenshot resolution is the limiting factor for fine-print legibility; the enlargement dialog preserves the maximum supplied detail.
- Copy and content: Page copy identifies the holder or external scope of each certificate card and displays the document status. It does not claim microbiological testing from the supplied chemistry report.

## Interaction and accessibility verification

- Document enlargement dialog opens from certificate/report/form cards, presents the selected title, and closes from the labeled close button.
- Source images have descriptive Thai alt text; decorative numbering remains visible text.
- Desktop and 390 px mobile checks report zero document-level horizontal overflow.
- Browser console warnings/errors: none.
- Static type check, production build, and route/reference validation: passed. Validation also checks that the rendered page retains certificate-status context and does not claim microbiological evidence.

## Comparison history

- Initial P2 risk: placing each supplied screenshot as a full slide would make document details and production imagery too small on mobile.
  - Fix: cropped source documents and photographs into individual assets, placed them in responsive cards, and added a native enlargement dialog.
  - Post-fix evidence: desktop and mobile captures show clean card layouts and the dialog open/close test passed.
- Initial P2 risk: partner and packaging certificates could be misread as current certificates held directly by Super Ice.
  - Fix: grouped them under certificates and partners, added ownership/context labels, and added an effective-date disclaimer with a request-latest-document CTA.
  - Post-fix evidence: the document section copy and captions now preserve this distinction.

## Follow-up polish

- P3: Replace screenshot-derived documents with original PDF or high-resolution scans when available, improving fine-print zoom quality and enabling downloadable accessible documents.

## Implementation checklist

- [x] Source-derived certificate and report assets
- [x] Partner/supplier scope labeling
- [x] Responsive production photo gallery
- [x] Document enlargement dialog
- [x] Desktop and mobile visual verification
- [x] Interaction and console verification
- [x] Static build and content validation

final result: passed
