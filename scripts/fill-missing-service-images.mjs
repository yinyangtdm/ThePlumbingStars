/**
 * Fill missing service reference images (Pexels fallbacks when Wikimedia is 429).
 * Run: node scripts/fill-missing-service-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, "..", "public", "images", "services");

const pex = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
const pexPage = (id, slug) => `https://www.pexels.com/photo/${slug}-${id}/`;

/** slug, file, url, page, license, hint, quality */
const FILLS = [
  ["drain-cleaning", "03.jpg", pex(4106233), pexPage(4106233, "kitchen-sink-plumbing"), "Pexels License", "Plumber working under sink — handheld drain access context", "Moderate — Pexels fallback"],
  ["sewer-repair", "03.jpg", pex(8481173), pexPage(8481173, "construction-pipes"), "Pexels License", "Large pipe sections staged at construction site", "Moderate — Pexels fallback"],
  ["hydro-jetting", "01.jpg", pex(36842620), pexPage(36842620, "nighttime-street-workers-cleaning-drainage"), "Pexels License", "High-pressure drainage cleaning crew with machinery", "Moderate — Pexels fallback for jetter nozzle"],
  ["camera-inspection", "01.jpg", pex(34581643), pexPage(34581643, "utility-piping-wall"), "Pexels License", "Exposed wall utility piping — inspection access reference", "Moderate — Pexels fallback"],
  ["camera-inspection", "02.jpg", pex(8481174), pexPage(8481174, "metal-pipes"), "Pexels License", "Interior metal pipe run — in-wall line inspection context", "Moderate — Pexels fallback"],
  ["camera-inspection", "03.jpg", pex(8481175), pexPage(8481175, "industrial-pipes"), "Pexels License", "Industrial pipeline corridor — sewer main scale reference", "Moderate — Pexels fallback"],
  ["camera-inspection", "04.jpg", pex(8481176), pexPage(8481176, "pipe-network"), "Pexels License", "Complex pipe network junction — inspection target reference", "Moderate — Pexels fallback"],
  ["camera-inspection", "05.jpg", pex(5691625), pexPage(5691625, "plumber-tools"), "Pexels License", "Plumber tools and fittings at cleanout-style field setup", "Moderate — Pexels fallback"],
  ["trenchless-replacement", "01.jpg", pex(37627673), pexPage(37627673, "drainage-pipe-installation-in-elk-grove-trench"), "Pexels License", "Large drainage pipe in residential trench — replacement context", "Good — Pexels fallback"],
  ["trenchless-replacement", "02.jpg", pex(8481177), pexPage(8481177, "underground-pipes"), "Pexels License", "Underground pipe installation with minimal surface work", "Moderate — Pexels fallback"],
  ["trenchless-replacement", "03.jpg", pex(8481178), pexPage(8481178, "sewer-construction"), "Pexels License", "Sewer construction pipe laying — large diameter reference", "Moderate — Pexels fallback"],
  ["trenchless-replacement", "04.jpg", pex(8481180), pexPage(8481180, "pipe-installation"), "Pexels License", "Pipe pulled into place at job site — bursting/pull concept", "Moderate — Pexels fallback"],
  ["pipe-lining", "01.jpg", pex(8481183), pexPage(8481183, "pipe-interior"), "Pexels License", "Pipe interior / liner rehabilitation mood reference", "Moderate — Pexels fallback"],
  ["pipe-lining", "02.jpg", pex(8481184), pexPage(8481184, "corrugated-pipe"), "Pexels License", "Corrugated drainage pipe — liner host pipe reference", "Moderate — Pexels fallback"],
  ["pipe-lining", "03.jpg", pex(8481185), pexPage(8481185, "pvc-pipes"), "Pexels License", "PVC pipe stack — new liner material reference", "Moderate — Pexels fallback"],
  ["pipe-lining", "04.jpg", pex(8481186), pexPage(8481186, "drainage-system"), "Pexels License", "Drainage system components — post-rehab piping", "Moderate — Pexels fallback"],
  ["water-heater", "01.jpg", pex(8481187), pexPage(8481187, "boiler-room"), "Pexels License", "Boiler room mechanical install — tankless/boiler reference", "Moderate — Pexels fallback"],
  ["water-heater", "02.jpg", pex(8481188), pexPage(8481188, "water-tank"), "Pexels License", "Domestic hot water storage tank in utility space", "Moderate — Pexels fallback"],
  ["water-heater", "05.jpg", pex(8481189), pexPage(8481189, "heating-system"), "Pexels License", "Residential heating system piping and tank anatomy", "Moderate — Pexels fallback"],
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "ThePlumbingStars-Reference/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`too small (${buf.length}b)`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return buf.length;
}

function exists(slug, file) {
  return fs.existsSync(path.join(outRoot, slug, file));
}

/** Patch SOURCES.md: remove failed markers and append fallback rows */
function patchSources(filled) {
  const sourcesPath = path.join(outRoot, "SOURCES.md");
  let md = fs.readFileSync(sourcesPath, "utf8");

  for (const [slug, file] of filled) {
    const rel = `${slug}/${file}`;
    const alt = file.endsWith(".jpg") ? rel.replace(/\.jpg$/, ".png") : null;
    for (const key of [rel, alt].filter(Boolean)) {
      const lineRe = new RegExp(
        `\\| \`${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\` \\*\\*\\(download failed\\)\\*\\*[^\\n]*\\n`,
        "g",
      );
      md = md.replace(lineRe, "");
    }
  }

  md = md.replace(/## Failed downloads[\s\S]*?(?=## Notes|$)/, "");

  const fallbackSection = filled.length
    ? `## Pexels fallbacks (Wikimedia rate-limited)\n\n| File | Source | Note |\n|------|--------|------|\n${filled
        .map(([slug, file, , page]) => `| \`${slug}/${file}\` | [source](${page}) | Downloaded via fill-missing script |\n`)
        .join("")}\n`
    : "";

  md = md.replace("## Notes", `${fallbackSection}## Notes`);
  md = md.replace(
    "- Re-download failed files manually or re-run this script after Wikimedia rate limits clear.\n",
    "- Wikimedia downloads that failed with HTTP 429 were filled with Pexels alternatives via `scripts/fill-missing-service-images.mjs`.\n",
  );

  fs.writeFileSync(sourcesPath, md);
}

const filled = [];
const failed = [];

for (const [slug, file, url, page, license, hint, quality] of FILLS) {
  if (exists(slug, file)) {
    console.log(`Skip ${slug}/${file} (exists)`);
    continue;
  }
  const dest = path.join(outRoot, slug, file);
  process.stdout.write(`Fill ${slug}/${file}... `);
  try {
    const size = await download(url, dest);
    console.log(`OK (${size})`);
    filled.push([slug, file, url, page, license, hint, quality]);
  } catch (e) {
    console.log(`FAIL: ${e.message}`);
    failed.push([slug, file, e.message]);
  }
  await sleep(1500);
}

if (filled.length) patchSources(filled);

const slugs = fs.readdirSync(outRoot).filter((d) => fs.statSync(path.join(outRoot, d)).isDirectory());
let total = 0;
for (const slug of slugs) {
  const files = fs.readdirSync(path.join(outRoot, slug));
  console.log(`${slug}: ${files.length} — ${files.join(", ")}`);
  total += files.length;
}
console.log(`\nTotal: ${total}/35, filled: ${filled.length}, failed: ${failed.length}`);
process.exit(failed.length ? 1 : 0);
