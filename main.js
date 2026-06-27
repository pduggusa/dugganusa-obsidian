const { Plugin, Notice, MarkdownView, requestUrl } = require("obsidian");

const API_URL = "https://analytics.dugganusa.com/api/v1";

function summarize(data) {
  if (!data) return "Match found";
  const parts = [];
  for (const [idx, hits] of Object.entries(data)) {
    if (!Array.isArray(hits) || !hits.length) continue;
    const f = hits[0];
    if (idx === "iocs") parts.push((f.malware_family || f.threat_type || "?") + " (" + (f.source || "?") + ")");
    else if (idx === "block_events") parts.push("Blocked " + hits.length + "x");
    else if (idx === "pulses") parts.push(hits.length + " pulse(s)");
    else if (idx === "cisa_kev") parts.push("CISA KEV");
    else if (idx === "adversaries") parts.push("APT: " + (f.name || "?"));
  }
  return parts.join(" · ") || "Match found";
}

module.exports = class DugganUSAPlugin extends Plugin {
  async onload() {
    // Command: look up selected text
    this.addCommand({
      id: "lookup-selection",
      name: "Look up selected text",
      editorCallback: async (editor) => {
        const selection = editor.getSelection().trim();
        if (!selection) { new Notice("Select an IP, domain, hash, or CVE first."); return; }
        await this.lookupAndInsert(editor, selection);
      },
    });

    // Command: AIPM audit
    this.addCommand({
      id: "aipm-audit",
      name: "AIPM Audit — How does AI see this domain?",
      callback: async () => {
        const domain = await this.promptForInput("Enter domain to audit:", "yourcompany.com");
        if (!domain) return;
        const clean = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");
        window.open("https://aipmsec.com/audit.html?domain=" + encodeURIComponent(clean));
      },
    });

    // Command: check Tor relay
    this.addCommand({
      id: "check-tor-relay",
      name: "Check if IP is a Tor relay",
      editorCallback: async (editor) => {
        const selection = editor.getSelection().trim();
        if (!selection) { new Notice("Select an IP address first."); return; }
        await this.checkTorRelay(editor, selection);
      },
    });

    // Context menu on right-click
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        const selection = editor.getSelection().trim();
        if (selection) {
          menu.addItem((item) => {
            item.setTitle("DugganUSA: Look up \"" + selection.slice(0, 30) + "\"")
              .setIcon("shield")
              .onClick(async () => { await this.lookupAndInsert(editor, selection); });
          });
        }
      })
    );
  }

  async lookupAndInsert(editor, value) {
    new Notice("DugganUSA: Checking " + value + "...");
    const apiKey = this.settings?.apiKey || "";

    try {
      const headers = { Accept: "application/json" };
      if (apiKey) headers["Authorization"] = "Bearer " + apiKey;

      const res = await requestUrl({
        url: API_URL + "/search/correlate?q=" + encodeURIComponent(value),
        headers,
      });

      const json = res.json;
      const correlations = json.data?.correlations || {};
      const totalHits = Object.values(correlations)
        .reduce((sum, hits) => sum + (Array.isArray(hits) ? hits.length : 0), 0);

      if (totalHits > 0) {
        const summary = summarize(correlations);
        const enrichment = "\n> [!warning] DugganUSA: " + value + "\n> " + summary + " (" + totalHits + " cross-index hits)\n> [View full enrichment](" + API_URL + "/search/correlate?q=" + encodeURIComponent(value) + ")\n";
        const cursor = editor.getCursor();
        editor.replaceRange(enrichment, { line: cursor.line + 1, ch: 0 });
        new Notice("⚠️ " + totalHits + " threat hits for " + value);
      } else {
        new Notice("✅ " + value + " — clean (not in 1.10M+ IOC index)");
      }
    } catch (e) {
      new Notice("DugganUSA: API error — " + (e.message || e));
    }
  }

  async promptForInput(title, placeholder) {
    return new Promise((resolve) => {
      const modal = new (require("obsidian").Modal)(this.app);
      modal.titleEl.setText(title);
      const input = modal.contentEl.createEl("input", { type: "text", placeholder, cls: "dugganusa-input" });
      input.style.width = "100%";
      input.style.padding = "8px";
      const btn = modal.contentEl.createEl("button", { text: "Go" });
      btn.style.marginTop = "8px";
      btn.onclick = () => { modal.close(); resolve(input.value); };
      input.onkeydown = (e) => { if (e.key === "Enter") { modal.close(); resolve(input.value); } };
      modal.open();
      input.focus();
    });
  }

  async checkTorRelay(editor, ip) {
    new Notice("DugganUSA: checking Tor relay " + ip + "...");
    const apiKey = this.settings?.apiKey || "";

    try {
      const headers = { Accept: "application/json" };
      if (apiKey) headers["Authorization"] = "Bearer " + apiKey;

      const res = await requestUrl({
        url: API_URL + "/tor/relays?q=" + encodeURIComponent(ip) + "&limit=1",
        headers,
      });

      const json = res.json;
      const relays = json.data?.relays || json.data?.hits || [];

      if (relays.length > 0 && relays[0].address === ip) {
        const r = relays[0];
        const flags = Array.isArray(r.flags) ? r.flags.join(", ") : (r.flags || "");
        const enrichment = "\n> [!warning] Tor Relay: " + ip +
          "\n> **Nickname:** " + (r.nickname || "?") +
          "\n> **Flags:** " + flags +
          "\n> **Country:** " + (r.country || "?") +
          "\n> **ASN:** " + (r.asnOrg || r.asn || "?") +
          "\n> **Bandwidth:** " + (r.bandwidth || "?") +
          "\n> [View relay details](" + API_URL + "/tor/relay/" + encodeURIComponent(r.fingerprint || ip) + ")\n";
        const cursor = editor.getCursor();
        editor.replaceRange(enrichment, { line: cursor.line + 1, ch: 0 });
        new Notice("🧅 Tor relay found: " + (r.nickname || ip));
      } else {
        new Notice("✅ " + ip + " is NOT a known Tor relay");
      }
    } catch (e) {
      new Notice("DugganUSA: Tor check error — " + (e.message || e));
    }
  }

  onunload() {}
};
