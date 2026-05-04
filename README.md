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

---

<!-- DUGGANUSA-FAMILY-FOOTER-V1 -->
## DugganUSA Defender Family

Same threat corpus, surfaced wherever you live. Open source, MIT licensed, receipts on every repo.

| Plugin | Surface |
|---|---|
| [dugganusa-scanner-core](https://github.com/pduggusa/dugganusa-scanner-core) | Core IOC scanning engine |
| [dugganusa-vscode](https://github.com/pduggusa/dugganusa-vscode) | VS Code extension |
| [dugganusa-splunk](https://github.com/pduggusa/dugganusa-splunk) | Splunk Technology Add-on |
| [dugganusa-slack](https://github.com/pduggusa/dugganusa-slack) | Slack bot |
| [dugganusa-raycast](https://github.com/pduggusa/dugganusa-raycast) | Raycast extension |
| [dugganusa-sentinel](https://github.com/pduggusa/dugganusa-sentinel) | Microsoft Sentinel TAXII connector |
| **dugganusa-obsidian** _(this repo)_ | Obsidian plugin |
| [dugganusa-nvim](https://github.com/pduggusa/dugganusa-nvim) | Neovim plugin |
| [dugganusa-elastic](https://github.com/pduggusa/dugganusa-elastic) | Elastic / OpenSearch integration |
| [dugganusa-edge-shield](https://github.com/pduggusa/dugganusa-edge-shield) | Cloudflare Worker |
| [dugganusa-cli](https://github.com/pduggusa/dugganusa-cli) | CLI scanner |
| [dugganusa-chrome](https://github.com/pduggusa/dugganusa-chrome) | Chrome extension |
| [dugganusa-action](https://github.com/pduggusa/dugganusa-action) | GitHub Action |
| [dredd-mcp](https://github.com/pduggusa/dredd-mcp) | Pre-flight MCP security (this repo) |

Backed by the live DugganUSA threat intel platform: [analytics.dugganusa.com](https://analytics.dugganusa.com).

_Jeevesus saves. Dredd judges._
