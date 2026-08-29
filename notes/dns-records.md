# Squarespace DNS — exactly what to change

Domain: **mybiomefit.com** · Panel: Squarespace → Domains → mybiomefit.com →
DNS Settings.

## Rule

Only touch **A**, **AAAA** and the **www CNAME**.
**Do not touch MX or TXT.** Those route Google Workspace mail. Removing them
stops `Hi@mybiomefit.com` receiving immediately, and mail sent during the gap
bounces rather than queuing.

Before editing anything, screenshot the whole panel. If something breaks that
screenshot is the fastest way back.

## Remove

| Type | Host | Value |
|---|---|---|
| A | @ | 151.101.2.159 | ← old Flywheel/WordPress |
| CNAME or A | www | (whatever points at Flywheel) |

## Add

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

All four A records are needed — they are GitHub's load balancers, not
alternatives. The CNAME value has **no** repo name and **no** trailing path,
just the account host.

## Leave exactly as they are

```
MX   1  aspmx.l.google.com
MX   5  alt1.aspmx.l.google.com
MX   5  alt2.aspmx.l.google.com
MX  10  alt3.aspmx.l.google.com
MX  10  alt4.aspmx.l.google.com
TXT     v=spf1 include:_spf.google.com ~all
```

Plus any other TXT records — domain verification, DKIM. Deleting a DKIM record
will not stop mail arriving but will hurt deliverability of mail they send.

## Then

1. GitHub → repo → Settings → Pages → Custom domain: `www.mybiomefit.com`.
   The repo already contains a `CNAME` file with that value.
2. Wait for the DNS check to go green. Usually minutes, up to a few hours.
3. Tick **Enforce HTTPS**. It stays greyed out until the certificate issues —
   that can take up to an hour. Do not delete the Flywheel site before this.
4. Check both `mybiomefit.com` and `www.mybiomefit.com` load, and that
   http:// redirects to https://.

## Verifying from the terminal

```bash
dig +short A mybiomefit.com
dig +short CNAME www.mybiomefit.com
dig +short MX mybiomefit.com
```

The A records should be the four 185.199.x.153 addresses, www should be
`howellnpartners.github.io.`, and the MX list must be unchanged from above.
