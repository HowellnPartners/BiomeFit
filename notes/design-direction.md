# Design direction — decided 2026-08-29

## References Brooke gave

1. **Old Figma** (`inspo/old-figma-landing.png`) — the 2024 concept. Black, gold
   string-art triangle, moody B&W gym photography, `LIFT | RECOVER | REPEAT!`.
   Photography and the black+gold palette are keepers. The layout is not: every
   headline and body block is centered, which is what makes it read as a
   template. Body copy runs long and centered. Type is wide tracked caps.
2. **sarpel** — lowercase tight heavy grotesque wordmark with a period, tiny
   tracked all-caps sub-label beneath, set straight over full-bleed photography.
   Brooke: *"I like the feeling of type like this."*
3. **Rise Wellness Concept (RWC)** — generous airy spacing, pill buttons,
   marquee strip with ○ separators. Brooke: *"I LIKE this spacing of all of
   this"* and *"i like the buttons too."*
4. **Flexera / Full Cup Design** (`inspo/flexera-*.png`) — the one she
   *"realllly loves."* Lowercase light-weight grotesque logo centered on
   full-bleed photography. The signature device is a **frosted-glass pill badge
   with a small icon** (Freedom / Balance / Wellness) sitting above a
   light-weight sentence-case headline, laid straight onto the image with no
   container.

## What we're building

The through-line across all three refs is: **lowercase, light-to-medium weight
grotesque, laid directly over full-bleed imagery, with a lot of air.** Not the
heavy tracked caps of the old Figma.

Decisions locked in:

- **Black + gold retained** from the existing brand. Gold `#C9A15A`,
  lift `#E8C57A`, deep `#8C6A2F`.
- **All type lowercase**, display weight 600 (not 800 — 800 read too shouty
  against the Flexera ref), tracking `-.028em`.
- **Every button is a pill** (`--r: 999px`). One radius token, no exceptions.
- **Frosted pill badges** carrying the gold mark as their icon — this is the
  Flexera device and it doubles as a way to use the logo throughout.
- **Hamburger nav** at all breakpoints, not just mobile. Full-screen overlay
  that wipes up, staggered lowercase links.
- **Full-bleed video hero**, headline sitting low over the footage.
- Marquee of class names with ○ separators, RWC-style.

## Typography — still open

Placeholder is **Inter Tight** (display) + **Inter** (body), both self-hostable.
It's the closest free face to the sarpel reference. Brooke is choosing the real
face — swap the `<link>` and the two `--font-*` vars at the top of `index.html`
and nothing else moves.

**The old files are set in a trial font.** The EPS logos use
`TrimTRIAL-ExtraBold` and `Eina04-Bold`. "TRIAL" means unlicensed — it cannot
ship on a website, and strictly it shouldn't have shipped on the logo either.
Worth confirming whether Biomefit ever bought a Trim licence. If not, the
wordmark is running on an unlicensed face and the rebuild is a good moment to
fix that.

## Blocked on

- **A real SVG of the logo.** macOS dropped EPS rendering and there's no
  Ghostscript on this machine, so the 13 EPS files can't be opened or converted
  here. The mark currently on the page is a *reconstruction* — string-art
  triangle generated in JS — traced by eye from a Figma render. It's close but
  it is not their actual artwork. Illustrator 2026 is installed:
  open `BIOMEFIT.eps` → File → Export As → SVG → drop in `assets/logos/`.
  Needs a white/light version too, since the site is black.
- **Photography.** Only the header video has landed so far.
