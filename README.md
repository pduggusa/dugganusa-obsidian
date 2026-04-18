# DugganUSA Threat Intel — Obsidian Plugin

**Paste an IP in your notes. Get threat enrichment inline. 1,080,000+ IOCs for OSINT researchers.**

## Features

- **Select + right-click** any IP, domain, hash, or CVE → instant enrichment inserted as a callout block
- **Command palette**: "DugganUSA: Look up selected text"
- **AIPM Audit**: "DugganUSA: AIPM Audit" → opens audit in browser
- Enrichment includes malware family, threat type, source, hit count, and link to full correlation

## Install

Community plugins submission pending. Install manually:

1. Download `main.js`, `manifest.json`, `styles.css` from this repo
2. Create folder: `.obsidian/plugins/dugganusa-threat-intel/`
3. Copy the three files into that folder
4. Obsidian → Settings → Community Plugins → Enable "DugganUSA Threat Intel"

## What It Looks Like

Select `185.39.19.176` in your notes, right-click → "DugganUSA: Look up":

> [!warning] DugganUSA: 185.39.19.176
> Cobalt Strike C2 (via SSLBL) · Blocked 47x · 3 pulse(s) (12 cross-index hits)
> [View full enrichment](https://analytics.dugganusa.com/api/v1/search/correlate?q=185.39.19.176)

## Part of the DugganUSA Ecosystem

- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=DugganUSALLC.dugganusa-threat-intel)
- [CLI Tool](https://github.com/pduggusa/dugganusa-cli)
- [Chrome Extension](https://github.com/pduggusa/dugganusa-chrome)
- [Splunk TA](https://github.com/pduggusa/dugganusa-splunk)
- [Sentinel](https://github.com/pduggusa/dugganusa-sentinel)
- [Elastic](https://github.com/pduggusa/dugganusa-elastic)
- [dugganusa.com](https://www.dugganusa.com)

## License

MIT — [DugganUSA LLC](https://www.dugganusa.com)
