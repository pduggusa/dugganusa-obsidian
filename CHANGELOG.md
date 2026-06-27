# Changelog

## 1.2.0 (2026-06-27)

### Documentation & Feed-Awareness

- **Feed-quality validation, now provable live.** README adds the three live, no-auth, durable validation endpoints behind the corpus this plugin queries: novelty ([feed-uniqueness](https://analytics.dugganusa.com/api/v1/feed-uniqueness), ~75%+ not in ThreatFox), timeliness ([kev-lead](https://analytics.dugganusa.com/api/v1/kev-lead), ~31 days ahead of CISA KEV), and accuracy ([spamhaus-validation](https://analytics.dugganusa.com/api/v1/spamhaus-validation), independently corroborated).
- **API-key section added.** The STIX feed is API-key-enforced (anonymous → 401, unregistered Bearer → 429). The free tier is a free *registered* key — register and paste it into plugin settings.
- **IOC count aligned to 1.10M+** in the README and the clean-result notice.

## 1.1.0

- Right-click / command-palette lookup of selected IPs, domains, hashes, CVEs; AIPM audit command; callout-block enrichment output.
