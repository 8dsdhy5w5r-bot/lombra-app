#!/usr/bin/env node
// Lance depuis: C:\Users\Propriétaire\projects\lombra-pwa
// Usage: node build-chapters.js

const fs = require("fs");
const path = require("path");

const BIBLE = path.join(__dirname, "..", "bible-shinobi", "src", "books");
console.log("🔍 Scan:", BIBLE);

if (!fs.existsSync(BIBLE)) {
  console.error("❌ bible-shinobi introuvable ! Vérifie qu'il est dans projects/ à côté de lombra-pwa/");
  process.exit(1);
}

const chapters = [];
for (const dir of fs.readdirSync(BIBLE).sort()) {
  const full = path.join(BIBLE, dir);
  if (!fs.statSync(full).isDirectory() || !dir.startsWith("livre-")) continue;
  for (const file of fs.readdirSync(full).sort()) {
    if (!file.startsWith("ch-") || !file.endsWith(".js")) continue;
    try {
      const d = require(path.join(full, file));
      const lines = [];
      if (d.epigraph) {
        lines.push("\u00ab " + d.epigraph.text + " \u00bb");
        if (d.epigraph.source) lines.push("\u2014 " + d.epigraph.source);
        lines.push("");
      }
      for (const s of (d.sections || [])) {
        if (s.type === "heading") lines.push("\u25a0 " + (s.text || ""));
        else if (s.content) lines.push(s.content);
        lines.push("");
      }
      chapters.push({ n: d.number, b: d.book, t: d.title, x: lines.join("\n").trim() });
    } catch (e) { console.error("  ⚠️", file, e.message); }
  }
}

chapters.sort((a, b) => a.n - b.n);
const out = "var CH=" + JSON.stringify(chapters, null, 0) + ";\n";
fs.writeFileSync(path.join(__dirname, "chapters.js"), out, "utf8");
console.log("✅ chapters.js généré : " + chapters.length + " chapitres, " + (out.length / 1024).toFixed(0) + " Ko");
console.log("📌 Maintenant: git add -A && git commit -m 'ajout chapitres' && git push");
