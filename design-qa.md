# Design QA — NextGiant logo mark

- Source visual truth: `C:\Users\ishak\AppData\Local\Temp\codex-clipboard-2e95b0bb-768f-437c-a359-2d4634dcb20c.png`
- Implementation screenshot: `C:\Users\ishak\.codex\visualizations\2026\09\04\01a06d45-a1e3-7021-8247-66d54efbb38d\qa-nextgiant-logo-implementation.png`
- Focused comparison: `C:\Users\ishak\.codex\visualizations\2026\09\04\01a06d45-a1e3-7021-8247-66d54efbb38d\qa-nextgiant-logo-comparison.png`
- Browser state: `http://localhost:3001/#top`, header at the top of the page
- Viewport: 1440 × 1000 CSS px, device pixel ratio 1
- Source pixels: full reference 274 × 75 px; source NG bounds 62 × 36 px
- Implementation pixels/CSS size: header capture 300 × 80 px; rendered NG 56 × 32.47 CSS px
- Density normalization: source NG was proportionally resized to 56 × 33 px and compared with a 56 × 33 px implementation crop

## Full-view comparison evidence

The Browser/IAB desktop capture shows the logo in the existing header without changing navigation, hero composition, typography, or spacing outside the logo lockup. The logo remains fully visible and aligned at the original header position.

## Focused comparison evidence

The normalized side-by-side comparison shows the source NG on the left and the rendered implementation on the right. The black N geometry, orange G geometry, overlap, color distribution, edges, and proportions match because the implementation uses the unmodified supplied raster as its source. The project asset and attachment have the same SHA-256 hash: `BA4837214A5EA1BF28D73F0B15CA0C1196A90B99D7EFA93B96B69A963042D99B`.

## Required fidelity surfaces

- Fonts and typography: `NextGiant` intentionally remains the existing HTML wordmark, as requested.
- Spacing and layout rhythm: source-relative mark crop and proportional scale are preserved; the mark remains vertically centered beside the wordmark.
- Colors and visual tokens: black and orange come directly from the supplied source image.
- Image quality and asset fidelity: the supplied source file is copied unchanged and downscaled slightly in the header, avoiding upscaling artifacts.
- Copy and content: the wordmark remains exactly `NextGiant`; no other page copy changed.

## Findings

No actionable P0, P1, or P2 differences remain for the requested NG mark.

## Comparison history

- Earlier finding (P1): the handcrafted SVG only approximated the supplied NG geometry.
- Fix: replaced the SVG with an exact visual crop from the unmodified supplied raster asset while retaining the HTML wordmark.
- Post-fix evidence: normalized source and implementation crops match in the focused comparison; desktop and mobile Browser/IAB captures show correct alignment and no clipping.

## Interaction and runtime checks

- Page identity and meaningful content rendered correctly.
- No Next.js error overlay.
- No browser console errors or warnings.
- Desktop and mobile header layouts remain intact.
- The logo link still targets `#top`.

final result: passed
