# Changelog

## [1.2.3] - 2026-09-29

### Changed
- Refreshed corpus figures from the live `/api/v1/search/stats` (1.9M+ IOCs, ~68M documents across 70 indexes).
- Removed the retired "275+ consumers in 46 countries" line. It counted blocked, User-Agent-less scrapers as consumers, so we stopped quoting it on 2026-05-30.

## [1.2.2] - 2026-06-30

### Fixed
- Aligned in-tool/runtime IOC-count strings to 1.5M+ (the v1.2.1 docs refresh updated the README but missed the strings the tool prints at runtime).

## 1.2.1 (2026-06-30)

### Added

- Documented the fourth live validation axis — Liveness ([/api/v1/feed-efficacy](https://analytics.dugganusa.com/api/v1/feed-efficacy)) — alongside novelty, timeliness, and accuracy.

### Changed

- Refreshed IOC corpus copy to 1.5M+ IOCs (~1.57M live) and ~38M documents across 65 indexes.
- Reworded the Timeliness validation bullet to point at the live kev-lead ledger instead of a fixed "~31 days ahead" average.

## 1.2.0 (2026-06-27)

### Documentation & Feed-Awareness

- **Feed-quality validation, now provable live.** README adds the three live, no-auth, durable validation endpoints behind the corpus this plugin queries: novelty ([feed-uniqueness](https://analytics.dugganusa.com/api/v1/feed-uniqueness), ~75%+ not in ThreatFox), timeliness ([kev-lead](https://analytics.dugganusa.com/api/v1/kev-lead), ~31 days ahead of CISA KEV), and accuracy ([spamhaus-validation](https://analytics.dugganusa.com/api/v1/spamhaus-validation), independently corroborated).
- **API-key section added.** The STIX feed is API-key-enforced (anonymous → 401, unregistered Bearer → 429). The free tier is a free *registered* key — register and paste it into plugin settings.
- **IOC count aligned to 1.10M+** in the README and the clean-result notice.

## 1.1.0

- Right-click / command-palette lookup of selected IPs, domains, hashes, CVEs; AIPM audit command; callout-block enrichment output.
