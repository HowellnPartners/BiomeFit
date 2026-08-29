# Squarespace DNS — record by record

Domain: **mybiomefit.com** · Squarespace → Domains → DNS Settings → Custom records

There are **9 records** in that panel. Only **2** get touched.

## ✏️ CHANGE — 1 record

| Type | Name | Current | Change to |
|---|---|---|---|
| CNAME | `www` | `mybiomefit.com` | `howellnpartners.github.io` |

No repo name, no path, no `https://`. Just the host.

## ❌ REMOVE — 1 record

| Type | Name | Data | Why |
|---|---|---|---|
| A | `@` | `151.101.2.159` | old Flywheel/WordPress |

## ➕ ADD — 4 records

| Type | Name | Data |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

All four are needed — GitHub's load balancers, not alternatives. AAAA records
are optional; add them only if Squarespace offers the type.

## ✅ LEAVE ALONE — 7 records

These look like leftovers from the old site. **They are not.** Every one is
live infrastructure with nothing to do with hosting.

| Type | Name | What it actually does |
|---|---|---|
| CNAME | `em6496` | **SendGrid** — the sending domain for transactional email |
| CNAME | `s1._domainkey` | **SendGrid DKIM** — signs outgoing mail |
| CNAME | `s2._domainkey` | **SendGrid DKIM** — second key |
| CNAME | `2wj2n2isuhzp` | Google domain verification |
| CNAME | `iivwe4rgjoo5` | Google domain verification |
| CNAME | `lbs4kv4cbble` | Google domain verification |
| MX | `@` (×5) | Google Workspace — inbound mail |

Plus the TXT records not visible in the first screen: SPF
(`v=spf1 include:_spf.google.com ~all`), DMARC (`v=DMARC1; p=none;`) and the
Google DKIM key at `google._domainkey`.

### Why the SendGrid records matter

Somebody is sending automated email as `@mybiomefit.com` through SendGrid.
On a fitness studio that is almost always the booking platform — class
confirmations, receipts, waitlist notices, password resets. It could also be a
marketing tool.

Delete `em6496` and those sends break. Delete either `_domainkey` record and
the mail still sends but loses its DKIM signature, so Gmail and Outlook start
binning it as spam — which is worse, because it fails quietly and nobody
notices for weeks.

**Worth confirming with Rob what's on that SendGrid account before launch**,
since it is sending mail in their name and neither of us set it up.

## Sanity check afterwards

```bash
dig +short A mybiomefit.com          # four 185.199.x.153
dig +short CNAME www.mybiomefit.com  # howellnpartners.github.io.
dig +short MX mybiomefit.com         # unchanged, five Google entries
dig +short CNAME em6496.mybiomefit.com s1._domainkey.mybiomefit.com
```

If the last line comes back empty, a SendGrid record was removed — put it back
from `dns-baseline.md`.
