# Exporting the homepage as a PDF

`BiomeFit-Homepage.pdf` — one continuous page, 15in × 54.2in, ~0.4MB.
`BiomeFit-Homepage.png` — same image, for decks and email.

Regenerate by serving the site locally, then capturing the full page in
headless Chrome and wrapping the image in a PDF.

## Three traps, all already handled

1. **Viewport units.** The capture window has to be as tall as the entire
   page, which makes `1svh` equal the whole page — so `.hero{min-height:100svh}`
   became a 5000px hero and everything else fell off the bottom. Every
   vh/svh height is pinned to px in the export overrides.
2. **Scroll reveals.** `.rv` elements start at `opacity:0` and only fire on
   scroll. In a static capture nothing scrolls, so most of the page rendered
   blank. The export forces `.rv.in` before capturing. A `@media print` block
   in `site.css` does the same for anyone using ⌘P.
3. **The map.** Google Maps refuses to render in headless Chrome — it comes
   out a flat grey box. The export swaps in `assets/social/map-static.png`,
   built from OpenStreetMap tiles and colour-matched to the site's inverted
   dark treatment. The live site still uses the real Google embed.

Also: the hero `<video>` now has `poster="assets/video/hero-poster.jpg"`, a
frame pulled from the footage at 6s. Static captures show the poster instead
of a black rectangle, and on the live site it paints instantly before the
video loads.

## Before sending one to a client

The stat ticker rotates through three sets and a capture will grab whichever
is on screen — two of them contain literal `XX` placeholders. The export
pins it to set one. That set is still unverified (see
`TODO-before-launch.md`), it just doesn't *look* broken.

The Hours block currently renders **"TO CONFIRM — opening hours not supplied
yet."** on the page, so it appears in the PDF too.
