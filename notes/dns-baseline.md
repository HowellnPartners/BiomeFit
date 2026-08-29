# DNS baseline for mybiomefit.com
Captured 2026-08-29 15:59 UTC, before any changes.
If a change breaks something, this is what it looked like beforehand.

```
--- NS mybiomefit.com ---
  ns-cloud-a1.googledomains.com.
  ns-cloud-a4.googledomains.com.
  ns-cloud-a3.googledomains.com.
  ns-cloud-a2.googledomains.com.
--- A mybiomefit.com ---
  151.101.2.159
--- AAAA mybiomefit.com ---
--- MX mybiomefit.com ---
  10 alt3.aspmx.l.google.com.
  5 alt2.aspmx.l.google.com.
  10 alt4.aspmx.l.google.com.
  5 alt1.aspmx.l.google.com.
  1 aspmx.l.google.com.
--- TXT mybiomefit.com ---
  "v=spf1 include:_spf.google.com ~all"
--- CNAME mybiomefit.com ---
--- SOA mybiomefit.com ---
  ns-cloud-a1.googledomains.com. cloud-dns-hostmaster.google.com. 6 21600 3600 259200 300
--- A www.mybiomefit.com ---
  mybiomefit.com.
  151.101.2.159
--- CNAME www.mybiomefit.com ---
  mybiomefit.com.
--- TXT _dmarc.mybiomefit.com ---
  "v=DMARC1; p=none;"
--- TXT google._domainkey.mybiomefit.com ---
  "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK+9/B/w5xeeldT2msirYJGUKVcf4nCOMpKDTc8HUpNEHY+kM33eDGbBF0B5XZynQs8LisgSX4q4S5Vs2B5DZLH6LQf2Hhs9Nr3rdR3lGqez0TRUls1BmZNhX3nzsl2Dv9FfVN5Io23" "jZJ9sSkv2QXLWJFAcCY6JgxEH7D8zApApJpkLNnUymk4J3VbIuyItmD0mibzWSsg4mYpLbb8ai/TRjOQaVoasUAGrh/dHa/K5DzVT8j2PBot9EuF5SF/55gggWch3esaFaJRtmHKAZiEtE5/UypTEWIsQ1/yvXjzyI0XI2MIZEGukiGp2vBQ7vSt734FBpuj3ZxCrMCRr" "rQIDAQAB"
```
