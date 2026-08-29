# BiomeFit Website

Rebuild of mybiomefit.com. The existing site is compromised — we are rebuilding
from scratch, not recovering it.

**Client:** Biomefit LLC · **Studio:** Howelln & Partners

## Pages

- Home
- About Us
- Contact
- Schedule (Mariana Tek embed — see `notes/mariana-tek.md`)

## Direction

Black background. Video and photography supplied by the client.

## Studio facts

Pulled from the Mariana Tek API, so these are authoritative — do not copy details
off the live site, it's compromised.

- 615 Channelside Dr. 100-B (next to the aquarium), Tampa, FL 33602
- +1 813-538-0443
- Hi@mybiomefit.com

## Structure

```
assets/
  video/    hero + section video (mp4 + webm, poster frame each)
  images/   photography
  logos/    SVG preferred; white/light variants required for the black bg
  fonts/    self-hosted woff2
inspo/      reference screenshots and links
notes/      research + decisions
```

## Security note

The current mybiomefit.com is hacked. Don't fetch, browse, or copy assets from
it. Everything comes from the client directly or from the Mariana Tek API.
