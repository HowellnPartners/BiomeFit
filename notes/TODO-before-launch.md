# Before this goes live

## 1. The stat ticker numbers are NOT verified

`index.html` → search `STAT_SETS`. Every figure in there came from the brief as
a placeholder. Three of them still literally read **XX** and will render as
"XX%" on the page.

```
Set 1  < 2 hrs · 6 blocks · 4.7★ member rating
Set 2  1,000+ workouts · 500+ members trained · XX% retention
Set 3  XX classes/week · XX,000+ reps · XX average class size
```

Publishing invented numbers — especially a **4.7★ member rating** and
"500+ members trained" — is a false-advertising problem, not just a polish
issue. Every number needs to come from Biomefit or Mariana Tek before launch.
Delete any row they can't substantiate rather than rounding a guess.

Mariana Tek can genuinely supply several of these (classes per week, average
class size, members, reservations). The "lbs lifted this year" idea would be
fun but Mariana Tek doesn't track load, so it can't be calculated from booking
data — it would need to come from the coaches.

## 2. Map

Uses Google's keyless embed:
`https://maps.google.com/maps?q=27.9439444,-82.4465278&z=16&output=embed`

Coordinates confirmed against the Mariana Tek API. It works, but `output=embed`
is an undocumented endpoint with no uptime guarantee. For production, switch to
the official **Maps Embed API** with a key restricted to the site's domain.

Google only serves light tiles on the keyless embed, so the iframe is inverted
in CSS (`.map iframe { filter: invert(92%) hue-rotate(180deg) … }`) to sit on
black. With a proper API key you can instead pass a real dark style and drop
the filter — that will look better and read more sharply.

## 3. Still outstanding

- **Opening hours** — the contact block currently says "TO CONFIRM" on the page.
- **Photography.** Every image slot is currently the header video seeked to a
  different timestamp. Real stills needed.
- **Hero video is 7.4MB** (12s, 720p, from the 41MB 4K original). Target 2–3MB.
  Media Encoder: H.264, 1920×1080, VBR 2-pass, target ~2.5 Mbps, max 4 Mbps,
  **no audio track**, 8–12s. Autoplay requires muted, so the audio is dead weight.
- **Fonts** — Inter Tight is a placeholder. Whatever face is chosen must be
  self-hosted with a webfont licence. Note the old logo files use
  `TrimTRIAL-ExtraBold`, which is an unlicensed trial and cannot ship.
- **About / Contact pages** — only the homepage is built.
- **Mariana Tek schedule** — deferred. Everything needed is in `mariana-tek.md`.

## 4. Logo

Now using the real PNGs from `assets/logos/PNG/White/`. Only the nav still shows
a logo; the small marks were pulled from the badges, hero, footer and map pin.
Vector (SVG) would still be better than PNG for the nav — one export from
Illustrator when convenient.
