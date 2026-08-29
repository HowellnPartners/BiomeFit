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

- Registrar / DNS: **Squarespace Domains**, nameservers
  `ns-cloud-a{1..4}.googledomains.com` (legacy Google Domains)
- Apex `A` → `151.101.2.159` (Fastly)
- Website hosting: **Flywheel** (WordPress). Flywheel fronts sites with Fastly,
  which is why the apex resolves there.
- Email: **Google Workspace**, unaffected by anything on the Flywheel side.

So hosting and the domain are in two different places. That is good news:
deleting the Flywheel site cannot touch DNS or email. The domain and its MX
records stay exactly where they are.

### What this means for the compromise

It is a **WordPress** site, so there is a real install to exploit — an
out-of-date plugin, theme or core, or a stolen admin login. WordPress
compromises usually leave persistence behind: injected files, database
entries, extra admin users, scheduled tasks.

Which makes deleting it the right call. Do not migrate, export or restore
anything from that install into the new site — a clean rebuild is exactly the
correct response, and that is what we have.

Two things still worth doing:

- Rotate any credentials that lived on or were reused with that WordPress
  install, and the Flywheel login itself.
- Google may have indexed spam pages injected during the hack. After launch,
  check Search Console → Security Issues, and request a review if the site is
  flagged. Otherwise those URLs can outlive the site.

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

## Order of operations

Do not delete the Flywheel site first — that leaves the domain pointing at
nothing while everything else is set up.

1. Enable GitHub Pages, confirm the site loads at
   `https://howellnpartners.github.io/BiomeFit/`.
2. Decide www vs apex (below) and fix the metadata if needed.
3. Repoint DNS at Squarespace — A/AAAA/CNAME only, **MX and TXT untouched**.
4. Wait for it to resolve, confirm the real domain serves the new site, then
   turn on Enforce HTTPS.
5. **Only then** delete the Flywheel site and cancel that hosting.

## After it is live

- Re-test the schedule page — the Mariana Tek embed needs cookies and will
  behave differently on a real domain than on localhost.
- Prime the social caches (Facebook debugger, LinkedIn Post Inspector) so the
  new share card replaces whatever they have cached from the old site.
- Send a real submission through the Collab form.
- Google Search Console: request re-indexing. A previously hacked site may be
  flagged, and there is a "Request a review" flow under Security Issues if so.
