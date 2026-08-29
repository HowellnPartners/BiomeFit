# Going live — mybiomefit.com

Everything below was read from public DNS and WHOIS on 2026-08-29. No changes
have been made; every DNS edit is Biomefit's to make in their own account.

## Two things that need attention first

### 1. The domain expires in 24 days — 22 September 2026

```
Registry Expiry Date: 2026-09-22
Registrar: Squarespace Domains II LLC
```

If it lapses the site goes dark and, more importantly, **their email stops**.
Confirm auto-renew is on and that the card on file is current, before anything
else. A domain that expires mid-migration is a much worse day than a late
launch.

### 2. There is live Google Workspace email on this domain

```
MX   1  aspmx.l.google.com
MX   5  alt1.aspmx.l.google.com
MX   5  alt2.aspmx.l.google.com
MX  10  alt3.aspmx.l.google.com
MX  10  alt4.aspmx.l.google.com
TXT     v=spf1 include:_spf.google.com ~all
```

`Hi@mybiomefit.com` — the address on every page of the new site — is a real
mailbox. **Do not "start clean" on DNS.** Changing nameservers or clearing the
zone kills their email instantly, and mail sent during the outage bounces
rather than queuing. Only ever edit the A/AAAA/CNAME records for the website.
Leave every MX and TXT record exactly as it is.

## What they are actually on today

- Nameservers: `ns-cloud-a{1..4}.googledomains.com` (legacy Google Domains,
  now administered through Squarespace)
- Apex `A` → `151.101.2.159`, which is **Fastly** — Squarespace's CDN
- `www` → CNAME to the apex

So the current site is a **Squarespace site**, not self-hosted.

**This matters for the "hack."** A Squarespace site being defaced is almost
always a compromised Squarespace login, not a server exploit — there is no
server to exploit. Before or alongside launch, Biomefit should:

- reset the Squarespace account password and turn on 2FA
- review Contributors / Permissions and remove anyone unrecognised
- do the same for the Google Workspace admin account, and check for rogue
  mail-forwarding rules or filters, which is a common way access is kept
- check DNS for records nobody recognises

Rebuilding the site does not evict someone who still holds the login.

## Deploying — GitHub Pages

The repo `HowellnPartners/BiomeFit` is already public, which is what the free
Pages tier needs.

1. Repo → **Settings → Pages** → Source: *Deploy from a branch* →
   `main` / `/ (root)` → Save.
2. Confirm it serves at `https://howellnpartners.github.io/BiomeFit/`.
3. Add a `CNAME` file at the repo root containing one line — the final
   domain, e.g. `www.mybiomefit.com`. (Settings → Pages → Custom domain does
   this for you.)
4. DNS, in the Squarespace/Google domain panel — **add and edit only these,
   touch nothing else**:

   | Type | Host | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | howellnpartners.github.io |

   Remove the old `A 151.101.2.159` and the old `www` record. **Keep every MX
   and TXT.**
5. Wait for propagation, then Settings → Pages → tick **Enforce HTTPS**. The
   certificate can take up to an hour; the tickbox stays greyed out until it
   is issued.
6. Cancel the Squarespace *site* subscription only once the new site is
   confirmed live — and keep the domain registration and Workspace running.

## Decide before step 4: www or apex

The site currently hard-codes `https://www.mybiomefit.com` in `og:url`,
`canonical` and `twitter:image` across all three pages. If the launch domain
is the bare `mybiomefit.com` instead, those need updating first or link
previews and search results will point at the wrong host.

## After it is live

- Re-test the schedule page — the Mariana Tek embed needs cookies and will
  behave differently on a real domain than on localhost.
- Prime the social caches (Facebook debugger, LinkedIn Post Inspector) so the
  new share card replaces whatever they have cached from the old site.
- Send a real submission through the Collab form.
- Google Search Console: request re-indexing. A previously hacked site may be
  flagged, and there is a "Request a review" flow under Security Issues if so.
