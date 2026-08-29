# Before this goes live

## 1. ~~The stat ticker numbers are NOT verified~~ — RESOLVED 2026-08-29

Replaced with sourced figures. Kept below for the reasoning.

- **3,000+ classes taught** — Mariana Tek `historical_class_count` for the
  Biome floor: 3,095 on 2026-08-29. Note the API lists 41 "classrooms", but
  37 are FLEX 10-minute booking slots. Summing all of them gives 5,253, which
  is *not* classes taught. Only the Biome room counts.
- **400+ classes on the schedule** — `upcoming_class_count`, 415.
- **100+ members** and **2020** — confirmed by Biomefit. 2020 is when Biomefit
  started coaching, at a **previous location**; the Water Street space dates to
  2024, matching the earliest Mariana Tek record (2024-01-26).

  The label deliberately reads **"coaching Tampa since"**, not "training here
  since" — "here" would date the Water Street studio to 2020, which is false.

  Same reason the class count is conservative: 3,095 covers only what has run
  through Mariana Tek since 2024. Four years of earlier classes are not in it,
  so "3,000+" understates the real total. That is the safe direction to be
  wrong in, but if Biomefit has records from the old location the figure could
  legitimately go up.
- **7 days**, **60 min** — published hours and schedule.

The invented 4.7★ rating and the XX rows are gone. Opening hours are now real
too. Original note follows.

### Original note

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

## 5. Social share cards + favicon

Added in `assets/social/`:

| File | Used for |
|---|---|
| `og-image.jpg` (1200×630) | the card shown when the link is shared |
| `og-square.jpg` (1200×1200) | square fallback for some feeds |
| `favicon.ico` (16/32/48/64) | browser tab |
| `favicon-32.png`, `favicon-192.png`, `favicon-512.png` | modern browsers, Android |
| `apple-touch-icon.png` (180×180) | iOS home screen — opaque, iOS ignores transparency |

Both pages carry Open Graph + Twitter Card tags, a canonical URL and a
description.

**These only work once the site is live.** `og:image` has to be an absolute
URL, so it currently points at `https://www.mybiomefit.com/assets/social/…`.
Sharing a `localhost` or GitHub Pages URL will show no image. When the real
domain is settled, if it is anything other than `www.mybiomefit.com`, update
the `og:url`, `og:image`, `twitter:image` and `canonical` values in both
`index.html` and `schedule.html`.

After launch, prime the caches — they hold old previews for a long time:
- Facebook / Instagram: developers.facebook.com/tools/debug → Scrape Again
- LinkedIn: linkedin.com/post-inspector
- Twitter/X: cards-dev.twitter.com/validator

**The share card art is a placeholder built from the logo and headline.** Once
real photography lands, a shot of the studio behind a dark scrim will convert
far better than a wordmark on black. Worth redoing then.

## 6. The Collab form needs an endpoint

`collab.html` has a working form, but **a static site cannot send email on its
own.** Near the bottom of the file:

```js
var ENDPOINT = "";
```

Leave it empty and the form falls back to opening the visitor's mail app with
everything pre-filled. That works today, but it is the weaker option: anyone
without a configured mail client is stuck, and nothing is recorded if they
never press send.

Set it to a form-service URL and submissions POST as JSON instead, with a
proper success message on the page:

```js
var ENDPOINT = "https://formspree.io/f/xxxxxxxx";
```

Formspree, Basin and Netlify Forms all have free tiers that suit this volume.
Whichever is used, point it at **Hi@mybiomefit.com** and send Biomefit a test
submission before launch so they know what an enquiry looks like.

Already handled in the form: required-field validation with inline errors, a
hidden honeypot that silently drops bot submissions, and category pre-selection
when a visitor clicks one of the six blocks.
