# Getting mybiomefit.com unblocked

Found 2026-08-29. Spectrum's **Security Shield** intercepts both
`www.mybiomefit.com` and `mybiomefit.com` and serves:

> **Suspicious Site Blocked** — This site was blocked because it may contain
> unsafe content that can harm your device or compromise your personal info.

The block is at the ISP, not on the site. `howellnpartners.github.io` serves
fine, so it is the **domain name** that is flagged — carried over from the
WordPress compromise. The filter is CUJO AI, which Spectrum resells as
Security Shield.

**Why this is urgent:** Spectrum is the dominant residential ISP in Tampa.
Local customers searching for a gym near Channelside can hit a red security
warning instead of the site — which reads worse than a broken site, because it
implies the business itself is dangerous.

## Do these in parallel, not in order

### 1. Spectrum's own unblock request

<https://www.spectrum.net/support/internet/how-unblock-website-security-shield>

Stated turnaround is around 5 business days. This is the documented route and
costs nothing, but on the Spectrum community forums it frequently does not
resolve CUJO-sourced blocks on its own.

### 2. CUJO AI directly — this is the one that actually works

CUJO AI publish no abuse or false-positive address; the only route in is their
contact form at <https://cujo.com>. On the Spectrum forum thread about this
exact problem, the resolved poster wrote: *"In the end we got to CUJO AI
directly and they allowlisted us."* Spectrum's own moderator did not have an
escalation path.

Send from a **@mybiomefit.com address** — it materially helps to be writing
from the domain in question.

### 3. Google Search Console → Security & Manual Actions

Separate system, same root cause. If Google has it flagged, Chrome shows
warnings to *everyone*, not just Spectrum customers. Request a review there
too. This is the step already on the launch checklist — it is more urgent than
it looked.

### 4. Re-test afterwards

```bash
curl -sI http://www.mybiomefit.com/ | grep -i location
```

Empty means clean. A `Location:` pointing at `block.charter-prod.hosted.cujo.io`
means still blocked. Worth re-checking weekly until it clears.

---

## Draft to send

> **Subject:** False positive — mybiomefit.com blocked by Security Shield after remediated compromise
>
> Hello,
>
> I'm writing about **mybiomefit.com**, the website for Biomefit, a fitness
> studio at 615 Channelside Dr, Suite 100-B, Tampa, FL 33602.
>
> The domain is currently blocked by Spectrum's Security Shield, which
> redirects visitors to block.charter-prod.hosted.cujo.io with a "Suspicious
> Site Blocked" warning. Both the apex and www are affected.
>
> The block is legitimate in origin but no longer accurate. The site was
> previously WordPress, hosted on Flywheel, and was compromised — it served
> injected Japanese-language spam pages. That is almost certainly what put the
> domain on the list.
>
> Since then the compromise has been fully remediated:
>
> - The entire WordPress installation and its Flywheel hosting were **deleted**,
>   not cleaned. Nothing was migrated from it.
> - The site was rebuilt from scratch as **static HTML** and is now served by
>   GitHub Pages. There is no CMS, no database, no plugins and no server-side
>   code, so the class of vulnerability that was exploited no longer exists.
> - All associated credentials have been rotated.
> - The only interactive element is a contact form, which posts to Formspree.
>
> The current site can be verified independently at
> howellnpartners.github.io, which is the same content on unflagged hosting.
>
> Please could you re-scan mybiomefit.com and remove it from the blocklist.
> Happy to provide any further detail needed.
>
> Many thanks,
> [name] — on behalf of Biomefit

Adjust the credential-rotation line if that has not actually been done yet —
it should not be claimed until it is true.
