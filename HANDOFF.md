# Biomefit — project handoff

Written 2026-10-26. Everything below was verified live on that date, not
recalled. Re-check anything time-sensitive before relying on it.

---

## What this is

A rebuild of **mybiomefit.com** for **Biomefit**, a strength studio in Water
Street, Downtown Tampa. Freelance work under **Howelln & Partners**. The
client contact is **Rob**.

The previous site was WordPress on Flywheel and was compromised — it served
injected Japanese-language spam. It was deleted entirely, not cleaned, and
this is a from-scratch replacement.

| | |
|---|---|
| Live site | https://www.mybiomefit.com |
| Repo | `HowellnPartners/BiomeFit` (public) |
| Local | `~/Documents/Claude/Projects/Howelln&Partners/BiomeFit Website` |
| Studio | 615 Channelside Dr Ste 100-B, Tampa FL 33602 · 813 538 0443 · Hi@mybiomefit.com |

---

## Status as of 2026-10-26

All verified by live request today.

- All four pages return **200**: `/`, `/schedule`, `/collab`, `/babez`
- **HTTPS enforced** — `http://` 301s to `https://`
- **The Spectrum block has cleared.** It used to intercept the domain with a
  "Suspicious Site Blocked" page. No longer happening on either host.
- **Domain renewed** — WHOIS now reads `2027-09-22`. Was flagged as expiring
  2026-09-22; it auto-renewed.
- `sitemap.xml` and `robots.txt` serve 200; structured data present on the
  homepage
- Repo clean, in sync with origin, **46 commits**, last push 2026-09-09

Nothing is on fire. The build is done and deployed.

---

## How it is built and deployed

Plain static HTML. No framework, no build step, no dependencies. Four pages,
one shared stylesheet, one shared script.

```
index.html  schedule.html  collab.html  babez.html  404.html
assets/site.css        all shared styling, including @media print
assets/site.js         nav, menu, video keepalive, reveals, stat ticker
assets/logo/           Biomefit lockups (white)
assets/babez/          Booty Babez logos + web-sized photography
assets/social/         share cards, favicons, static map
assets/video/          hero-web-720.mp4 + poster
notes/                 research and decisions, see below
```

**Deploy is `git push`.** The repo is the GitHub Pages source, so pushing to
`main` publishes. There is no staging.

### The git gotcha

Brooke has two GitHub accounts. This repo is on **HowellnPartners**, and the
remote must route through an SSH alias:

```
git@github-howelln:HowellnPartners/BiomeFit.git
```

Pushing via a plain `github.com` remote will authenticate as the wrong
account and fail.

### Previewing locally

Preview servers **cannot read `~/Documents`** — they fail with EPERM. Copy the
site into the scratchpad directory and serve from there.

Local serving also does **not** resolve the clean URLs. `/babez` 404s locally;
use `/babez.html`. That is GitHub Pages doing the extension-less handling, not
a bug.

---

## The pages

**`/` — homepage.** Full-bleed muted looping video hero ("Your Strongest Era
Starts Here."), statement section ("Meet Your New Routine."), three pillars
(workout / community / brand), class list, a rotating stat ticker, closing
band, and a contact section with a dark-styled map.

**`/schedule`** — hosts the live Mariana Tek booking widget. Deliberately its
own page.

**`/collab`** — six partnership categories as blocks, two across. Clicking one
pre-selects its category on the form below and scrolls to it. Form posts to
Formspree.

**`/babez`** — the Booty Babez sub-brand. Women-only floor. Pink `#F03CDE`,
its own wordmark, its own Instagram in the footer. Deliberately its own visual
world while keeping the Biomefit nav and footer.

Nav is a hamburger at all widths with a full-screen wipe-up menu.

---

## Mariana Tek booking

Verified working. Full detail in `notes/mariana-tek.md`.

| | |
|---|---|
| Tenant | `biomefit` |
| Region | `48541` (Florida) |
| Location | `48717` (Tampa) — single location |

The embed is a loader script plus `<div data-mariana-integrations="/schedule/daily/48541?locations=48717">`.
No API key needed for the public schedule.

**Two constraints that will not change:**

1. **The widget renders white** and cannot be restyled — it is a cross-origin
   iframe, so site CSS cannot reach inside it. It is framed as a deliberate
   white panel on black. The only real fix is Developer Mode on Biomefit's
   Mariana Tek account, which would let the widget theme be darkened from
   their admin. That requires their access.
2. **It shows its own cookie banner** inside the iframe, and booking needs
   cookies. Not stylable, not pre-answerable.

The public API also answers unauthenticated for `classrooms`, `locations` and
`regions` with `Accept: application/vnd.api+json`. Class sessions need auth.

---

## The hack and what remains

The old WordPress site was hit with a **Japanese keyword hack** — injected
spam pages selling counterfeit goods, which Google indexed under the domain.

**Done:** Flywheel hosting and the WordPress install deleted entirely. Site
rebuilt as static HTML, so the exploited vulnerability class no longer exists.
A branded `404.html` means the thousands of injected URLs now return a proper
404, which is what makes Google drop them. `sitemap.xml` and `robots.txt`
added.

**Resolved since:** the Spectrum / CUJO AI block that was intercepting the
domain has cleared.

**Possibly still open — worth checking:**

- Whether Japanese spam results still appear when searching the domain
- Google Search Console: whether verification was completed, whether there is
  a manual action, and critically **whether any unrecognised owners are listed
  under Users and permissions**. In this kind of hack the attacker often
  verifies themselves so they can keep submitting spam after cleanup.
- Whether the Flywheel password was rotated

`notes/delisting-request.md` has the background and a draft request if any
blocklist issue returns.

---

## Design decisions worth not relitigating

These were arrived at through a lot of back-and-forth. Changing them needs a
reason, not a preference.

- **Black background, gold accent** (`#C9A15A`) for Biomefit. **Pink**
  (`#F03CDE`, taken from the supplied logo) for Babez only. The Babez menu
  item hovers pink on every page; everything else hovers gold.
- **No glow effects.** A neon treatment on the Babez wordmark was built and
  explicitly rejected.
- **Lowercase-feel, light-weight display type**, not heavy tracked caps.
  Typography is **Inter Tight as a placeholder** — swap the `<link>` and the
  two `--font-*` vars at the top of `site.css`; nothing else moves.
- **Space over density.** An earlier version paired everything into two-column
  blocks and was rejected. One thing at a time, full-bleed photography with
  nothing on top of it.
- **Every button is a pill.** One radius token.
- **Recovery has been removed from the whole site** — the service is paused.
  It is gone from copy, the pillar, the page title, the marquee and the
  structured data. Easy to restore.

---

## Facts and their sources

Everything on the site is sourced. Keep it that way — an earlier draft carried
invented statistics and literal `XX` placeholders.

| Claim | Source |
|---|---|
| 3,000+ classes taught | Mariana Tek `historical_class_count` for the Biome floor — 3,095 |
| 400+ on the schedule | `upcoming_class_count` — 415 |
| 4.7★ · 33 reviews | Biomefit's live Google Business Profile |
| 100+ members, since 2020 | Confirmed by Brooke |
| Opening hours | Their Google listing |

**Two traps in that data:**

- The API lists **41 "classrooms" but 37 are FLEX 10-minute booking slots**.
  Summing all of them gives 5,253, which is *not* classes taught. Only the
  Biome room counts.
- **3,000+ is an undercount.** It only covers classes since the Water Street
  move in 2024. Biomefit has been coaching since 2020 at a previous location.
  If Rob has older records the real figure is higher. This is also why the
  stat is labelled "coaching Tampa since", not "training here since" — "here"
  would date this studio to 2020, which is false.

Structured data deliberately contains **no `aggregateRating`**. Marking up
your own star rating violates Google's guidelines and can trigger a manual
action; the 4.7 shows in search from Google's own data regardless.

---

## Still open

**Rob owes:**

- Copy edits across the site. Flag that some section copy is Claude-written,
  not his — "Nobody is watching you learn", "Meet Your New Routine", "Come
  find your people". He should have final say.
- **More Babez copy.** That page runs on two class descriptions and one line.
  It is thin.
- **What the merch actually is.** The "The brand" pillar copy was written
  blind — it is a placeholder that reads well rather than something true.
- Confirmation of the stat numbers.
- What the **SendGrid** account on their DNS is. It sends mail as
  `@mybiomefit.com` and neither Brooke nor Claude set it up.

**Unverified:**

- **The Collab form has never had a real test submission.** The endpoint
  (`https://formspree.io/f/xjyvrkbb`) is in the deployed code with `_subject`
  and `_replyto` wired, but nobody has confirmed an enquiry actually arrives.
  Formspree's free tier also holds the first submission until it is confirmed
  from the dashboard.
- Nobody has booked a class end-to-end on the live domain on a phone.

**Not built:** About and Contact as standalone pages. Contact currently lives
as a section on the homepage.

**Note:** the "Designed by Howell'n Media" footer credit was removed from all
four pages at Rob's request.

---

## Traps that will cost a fresh session time

1. **Caching.** This caused repeated false alarms. A change would be live and
   correct while the browser served something older. Before concluding
   anything is broken, check what is actually served:
   `curl -s https://www.mybiomefit.com/ | grep -c "<thing>"`. Hard-refresh is
   ⌘⇧R.
2. **Video masters are gitignored.** `assets/video/*` is excluded except the
   web derivatives. A 126MB master got committed once and GitHub rejected the
   push at its 100MB limit.
3. **`avconvert` cannot strip audio.** It is the only transcoder on this
   machine and the audio track survives every preset. The hero video is muted
   so nothing plays, but roughly 750KB of audio still downloads. Media Encoder
   can remove it — uncheck "Export Audio".
4. **Viewport units break in print and full-page capture.** `100svh` resolves
   against the *page box* when printing, so a hero becomes metres tall. Pin
   every vh/svh height to px when exporting. See `notes/exporting-a-pdf.md`.
5. **Google Maps will not render headless**, so PDF exports substitute a
   static OpenStreetMap image. The live site uses the real embed.
6. **Scroll reveals start at `opacity: 0`.** Any static capture needs
   `.rv.in` forced first or most of the page renders blank.
7. **EPS files cannot be opened here.** macOS dropped EPS rendering and there
   is no Ghostscript. The logos came from PNG exports instead.

---

## The notes directory

| File | What is in it |
|---|---|
| `mariana-tek.md` | Tenant, IDs, every embed path, the white-widget and cookie constraints |
| `going-live.md` | DNS, hosting split, the order of operations used |
| `dns-records.md` | Record-by-record: what changed, what was left alone and why |
| `dns-baseline.md` | Full pre-change DNS snapshot, including DKIM keys |
| `delisting-request.md` | The Spectrum/CUJO block and a ready-to-send request |
| `design-direction.md` | The references Brooke chose and what was taken from each |
| `exporting-a-pdf.md` | How to regenerate the review PDF and the three traps |
| `TODO-before-launch.md` | Running list, with resolved items struck through |
