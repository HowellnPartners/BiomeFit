# Mariana Tek integration — BiomeFit

Verified 2026-08-29 against the live Mariana Tek API. All IDs below are confirmed real.

## Tenant

TENANT_NAME = `biomefit`

Confirmed: `https://biomefit.marianaiframes.com/js` returns 200 and its config block
reports `"__API_TENANT__":"https://biomefit.marianatek.com"`.

## IDs

| Thing    | Name     | ID    |
|----------|----------|-------|
| Region   | Florida  | 48541 |
| Location | Tampa    | 48717 |

Single location, single region — so the schedule can go straight to the Tampa
schedule with no location picker.

## Studio details (from the API, authoritative — not scraped from the hacked site)

- 615 Channelside Dr. 100-B (next to the aquarium), Tampa, FL 33602
- +1 813-538-0443
- Hi@mybiomefit.com
- Timezone America/New_York, currency USD

## Loader script

Goes before `</body>` on every page that hosts an embed.

```html
<script>
(function () {
  var TENANT_NAME = 'biomefit';
  var d = document;
  var sA = ['polyfills', 'js'];
  for (var i = 0; i < sA.length; i++) {
    var s = d.createElement('script');
    s.src = 'https://' + TENANT_NAME + '.marianaiframes.com/' + sA[i];
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }
})();
</script>
```

## Container paths

Drop a div wherever the embed should render:

```html
<div data-mariana-integrations="/schedule/daily/48541?locations=48717"></div>
```

Public views:
- `/schedule/daily` — schedule with a location selector
- `/schedule/daily/48541?locations=48717` — Tampa schedule direct  ← use this
- `/schedule/daily/48541?instructors={id}` — filtered by instructor
- `/schedule/daily/48541?classType={id}` — filtered by class type
- `/buy` — memberships/credits with location picker
- `/buy/48717` — Tampa products direct
- `/account/create` — signup + login
- `/404`

Authenticated views (after login, routed to inside the iframe):
- `/classes/{class_id}/reserve`
- `/checkout/48717`
- `/account`, `/account/personal-information`, `/account/purchases`,
  `/account/memberships-credits`, `/account/reservations`

## Constraints to design around

1. **It is an iframe.** Mariana Tek renders it and controls its styling. We do not
   get to restyle the inside of it with our CSS. Whatever branding it carries is
   set in the Mariana Tek admin (Developer Mode / Mariana Tools), not here.
   → Design the schedule page so our black frame wraps it cleanly rather than
     pretending the widget is ours.
2. **Height.** The iframe self-sizes; don't put it in a fixed-height container
   and don't nest it in something with `overflow: hidden`.
3. **Cookies.** Booking needs cookies. A blocking cookie banner or aggressive
   tracking-prevention will break the login/booking flow.
4. **One page per snippet.** Mariana Tek recommends separate dedicated pages for
   schedule vs buy vs account rather than stacking them on one page.

## Open question for the client

Whether they want booking to live on our site (embed) or bounce to the Mariana Tek
hosted booking + the branded BiomeFit iOS app. The embed is nicer; ask whether
they have Developer Mode enabled so the widget's colors can be darkened to match.

---

## Verified live, 2026-08-29

Rendered the snippet above in a local test page. It works: the Tampa schedule
loaded with real classes (Booty Babez 8:15/9:30 AM, Upper Body & Abs 10:45 AM),
day-of-week tabs, Instructor / Class Type / Rooms filters, and live RESERVE
buttons. No auth or API key needed for the public schedule view.

**The catch: the widget renders WHITE.** Light grey chrome, white cards, dark text,
plus a "mariana tek" wordmark and a "Cookie Settings" link in its footer. On a
black site it lands as a bright slab. Three ways to handle it, in order of
preference:

1. Get Developer Mode / Mariana Tools enabled on their account and darken the
   widget's theme from the Mariana Tek admin. Cleanest — needs client access.
2. Design the schedule page to *intend* the contrast: black page, generous black
   margin, the widget sitting in it as a deliberate white panel. Honest and it
   looks fine if it's clearly framed rather than accidentally bright.
3. Don't embed. Black-and-custom "Book a class" cards on our schedule page that
   deep-link out to Mariana Tek hosted booking. Full design control, but the user
   leaves the site.

Do NOT try to CSS-invert or filter the iframe — it's cross-origin, and a
`filter: invert()` hack wrecks the class photos and instructor headshots.
