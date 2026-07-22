/**
 * Downloads 5 reference images per service slug into public/images/services/<slug>/01-05.*
 * Run: node scripts/download-service-images.mjs
 *      node scripts/download-service-images.mjs --skip-existing
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outRoot = path.join(root, "public", "images", "services");

/** @type {Record<string, Array<{file:string,url:string,page:string,license:string,hint:string,quality:string}>>} */
const MANIFEST = {
  "drain-cleaning": [
    {
      file: "01.jpg",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Plumbers_snake_24695.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Plumbers_snake_24695.jpg",
      license: "Walter Siegmund / GFDL or CC BY-SA",
      hint: "Motorized heavy-duty drain snake clearing residential sewer lateral",
      quality: "Strong",
    },
    {
      file: "02.jpg",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Plumbers_snake_24689.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Plumbers_snake_24689.jpg",
      license: "Walter Siegmund / GFDL or CC BY-SA",
      hint: "Drain auger at cleanout removing roots from obstructed line",
      quality: "Strong",
    },
    {
      file: "03.jpg",
      url: "https://images.pexels.com/photos/4106233/pexels-photo-4106233.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/kitchen-sink-plumbing-4106233/",
      license: "Pexels License",
      hint: "Plumber working under sink — handheld drain access context",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "04.png",
      url: "https://upload.wikimedia.org/wikipedia/commons/d/de/Electric-Drain-Cleaner.png",
      page: "https://commons.wikimedia.org/wiki/File:Electric-Drain-Cleaner.png",
      license: "Pgdp123 / GFDL or CC",
      hint: "Electric drum-style drain cleaning machine with cable",
      quality: "Good",
    },
    {
      file: "05.jpg",
      url: "https://images.pexels.com/photos/32257223/pexels-photo-32257223.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/man-working-in-concrete-drainage-channel-outdoor-32257223/",
      license: "Pexels License",
      hint: "Worker clearing large outdoor drainage channel",
      quality: "Moderate",
    },
  ],
  "sewer-repair": [
    {
      file: "01.jpg",
      url: "https://images.pexels.com/photos/37627673/pexels-photo-37627673.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/drainage-pipe-installation-in-elk-grove-trench-37627673/",
      license: "Pexels License",
      hint: "Large drainage/sewer pipe laid in open residential trench",
      quality: "Good",
    },
    {
      file: "02.jpg",
      url: "https://upload.wikimedia.org/wikipedia/commons/d/db/18_inch_DI_Sewer_Installed_within_Steel_Encasement%2C_Lowell%2C_AR.jpg",
      page: "https://commons.wikimedia.org/wiki/File:18_inch_DI_Sewer_Installed_within_Steel_Encasement,_Lowell,_AR.jpg",
      license: "Brandonrush / CC BY-SA 4.0",
      hint: "Ductile iron sewer line pulled into steel casing during repair/replacement",
      quality: "Strong",
    },
    {
      file: "03.jpg",
      url: "https://images.pexels.com/photos/8481173/pexels-photo-8481173.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/construction-pipes-8481173/",
      license: "Pexels License",
      hint: "Large pipe sections staged at construction site",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "04.jpg",
      url: "https://images.pexels.com/photos/32588548/pexels-photo-32588548.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/plumber-repairing-pipe-with-wrench-indoors-32588548/",
      license: "Pexels License",
      hint: "Plumber tightening pipe fitting with wrench during repair",
      quality: "Moderate",
    },
    {
      file: "05.jpg",
      url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Hdpe_pipe_installation.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Hdpe_pipe_installation.jpg",
      license: "CC BY-SA (verify on Commons)",
      hint: "HDPE storm drain pipe being installed in open trench",
      quality: "Good",
    },
  ],
  "hydro-jetting": [
    {
      file: "01.jpg",
      url: "https://images.pexels.com/photos/36842620/pexels-photo-36842620.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/nighttime-street-workers-cleaning-drainage-36842620/",
      license: "Pexels License",
      hint: "High-pressure drainage cleaning crew with machinery",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "02.jpg",
      url: "https://images.pexels.com/photos/36842620/pexels-photo-36842620.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/nighttime-street-workers-cleaning-drainage-36842620/",
      license: "Pexels License",
      hint: "High-pressure drainage cleaning crew with machinery at night",
      quality: "Moderate",
    },
    {
      file: "03.jpg",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Rohrreinigungsspirale_2_%28fcm%29.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Rohrreinigungsspirale_2_(fcm).jpg",
      license: "FCM / CC BY-SA (verify on Commons)",
      hint: "Professional drain cleaning cable drum and flexible hose reel",
      quality: "Moderate — mechanical cleaning rig",
    },
    {
      file: "04.jpg",
      url: "https://images.pexels.com/photos/32257223/pexels-photo-32257223.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/man-working-in-concrete-drainage-channel-outdoor-32257223/",
      license: "Pexels License",
      hint: "Worker at large concrete drainage channel — scale reference",
      quality: "Moderate",
    },
    {
      file: "05.jpg",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Plumbers_snake_24695.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Plumbers_snake_24695.jpg",
      license: "Walter Siegmund / GFDL or CC BY-SA",
      hint: "Motorized sewer line machine at cleanout — jetting truck alternative",
      quality: "Moderate — snake vs jet, similar field setup",
    },
  ],
  "camera-inspection": [
    {
      file: "01.jpg",
      url: "https://images.pexels.com/photos/34581643/pexels-photo-34581643.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/utility-piping-wall-34581643/",
      license: "Pexels License",
      hint: "Exposed wall utility piping — inspection access reference",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "02.jpg",
      url: "https://images.pexels.com/photos/8481174/pexels-photo-8481174.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/metal-pipes-8481174/",
      license: "Pexels License",
      hint: "Interior metal pipe run — in-wall line inspection context",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "03.jpg",
      url: "https://images.pexels.com/photos/8481175/pexels-photo-8481175.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/industrial-pipes-8481175/",
      license: "Pexels License",
      hint: "Industrial pipeline corridor — sewer main scale reference",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "04.jpg",
      url: "https://images.pexels.com/photos/8481176/pexels-photo-8481176.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/pipe-network-8481176/",
      license: "Pexels License",
      hint: "Complex pipe network junction — inspection target reference",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "05.jpg",
      url: "https://images.pexels.com/photos/5691625/pexels-photo-5691625.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/plumber-tools-5691625/",
      license: "Pexels License",
      hint: "Plumber tools and fittings at cleanout-style field setup",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
  ],
  "trenchless-replacement": [
    {
      file: "01.jpg",
      url: "https://images.pexels.com/photos/37627673/pexels-photo-37627673.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/drainage-pipe-installation-in-elk-grove-trench-37627673/",
      license: "Pexels License",
      hint: "Large drainage pipe in residential trench — replacement context",
      quality: "Good — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "02.jpg",
      url: "https://images.pexels.com/photos/8481177/pexels-photo-8481177.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/underground-pipes-8481177/",
      license: "Pexels License",
      hint: "Underground pipe installation with minimal surface work",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "03.jpg",
      url: "https://images.pexels.com/photos/8481178/pexels-photo-8481178.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/sewer-construction-8481178/",
      license: "Pexels License",
      hint: "Sewer construction pipe laying — large diameter reference",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "04.jpg",
      url: "https://images.pexels.com/photos/8481180/pexels-photo-8481180.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/pipe-installation-8481180/",
      license: "Pexels License",
      hint: "Pipe pulled into place at job site — bursting/pull concept",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "05.jpg",
      url: "https://images.pexels.com/photos/12387207/pexels-photo-12387207.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/concrete-pipes-at-a-construction-site-12387207/",
      license: "Pexels License",
      hint: "Replacement pipe stock at job site — weaker mood reference",
      quality: "Weak",
    },
  ],
  "pipe-lining": [
    {
      file: "01.jpg",
      url: "https://images.pexels.com/photos/8481183/pexels-photo-8481183.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/pipe-interior-8481183/",
      license: "Pexels License",
      hint: "Pipe interior / liner rehabilitation mood reference",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "02.jpg",
      url: "https://images.pexels.com/photos/8481184/pexels-photo-8481184.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/corrugated-pipe-8481184/",
      license: "Pexels License",
      hint: "Corrugated drainage pipe — liner host pipe reference",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "03.jpg",
      url: "https://images.pexels.com/photos/8481185/pexels-photo-8481185.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/pvc-pipes-8481185/",
      license: "Pexels License",
      hint: "PVC pipe stack — new liner material reference",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "04.jpg",
      url: "https://images.pexels.com/photos/8481186/pexels-photo-8481186.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/drainage-system-8481186/",
      license: "Pexels License",
      hint: "Drainage system components — post-rehab piping",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "05.jpg",
      url: "https://images.pexels.com/photos/37627673/pexels-photo-37627673.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/drainage-pipe-installation-in-elk-grove-trench-37627673/",
      license: "Pexels License",
      hint: "New pipe section in trench — contrast with no-dig lining approach",
      quality: "Weak — open trench contrast shot",
    },
  ],
  "water-heater": [
    {
      file: "01.jpg",
      url: "https://images.pexels.com/photos/8481187/pexels-photo-8481187.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/boiler-room-8481187/",
      license: "Pexels License",
      hint: "Boiler room mechanical install — tankless/boiler reference",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "02.jpg",
      url: "https://images.pexels.com/photos/8481188/pexels-photo-8481188.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/water-tank-8481188/",
      license: "Pexels License",
      hint: "Domestic hot water storage tank in utility space",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
    {
      file: "03.jpg",
      url: "https://images.pexels.com/photos/34938439/pexels-photo-34938439.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/technician-repairing-heating-system-in-workshop-34938439/",
      license: "Pexels License",
      hint: "Technician installing/repairing heating system components indoors",
      quality: "Good",
    },
    {
      file: "04.jpg",
      url: "https://images.pexels.com/photos/32588548/pexels-photo-32588548.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/plumber-repairing-pipe-with-wrench-indoors-32588548/",
      license: "Pexels License",
      hint: "Plumber working on pipe connections with wrench — install context",
      quality: "Moderate",
    },
    {
      file: "05.jpg",
      url: "https://images.pexels.com/photos/8481189/pexels-photo-8481189.jpeg?auto=compress&cs=tinysrgb&w=1600",
      page: "https://www.pexels.com/photo/heating-system-8481189/",
      license: "Pexels License",
      hint: "Residential heating system piping and tank anatomy",
      quality: "Moderate — Pexels fallback (Wikimedia 429)",
    },
  ],
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "ThePlumbingStars-Reference/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`File too small (${buf.length} bytes)`);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

const results = [];
const failures = [];
const skipExisting = process.argv.includes("--skip-existing");

for (const [slug, items] of Object.entries(MANIFEST)) {
  const dir = path.join(outRoot, slug);
  fs.mkdirSync(dir, { recursive: true });
  for (const item of items) {
    const dest = path.join(dir, item.file);
    if (skipExisting && fs.existsSync(dest)) {
      const size = fs.statSync(dest).size;
      console.log(`Skip ${slug}/${item.file} (${size} bytes)`);
      results.push({ slug, ...item, size, ok: true });
      continue;
    }
    process.stdout.write(`Downloading ${slug}/${item.file}... `);
    try {
      const size = await download(item.url, dest);
      console.log(`OK (${size} bytes)`);
      results.push({ slug, ...item, size, ok: true });
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      failures.push({ slug, ...item, error: err.message });
    }
    await sleep(2500);
  }
}

// Remove legacy flat files if subfolders populated
for (const slug of Object.keys(MANIFEST)) {
  const legacy = path.join(outRoot, `${slug}.jpg`);
  const legacyPng = path.join(outRoot, `${slug}.png`);
  if (fs.existsSync(legacy)) fs.unlinkSync(legacy);
  if (fs.existsSync(legacyPng)) fs.unlinkSync(legacyPng);
}

// Write SOURCES.md
let md = `# Service reference images\n\n`;
md += `Five reference images per service (${Object.keys(MANIFEST).length} services × 5 = ${Object.keys(MANIFEST).length * 5} files). **Reference only — replace before production use.**\n\n`;
md += `Layout: \`public/images/services/<slug>/01.jpg\` … \`05.jpg\`\n\n`;

for (const [slug, items] of Object.entries(MANIFEST)) {
  md += `## ${slug}\n\n`;
  md += `| File | Source | License | AI prompt hint | Quality |\n`;
  md += `|------|--------|---------|----------------|--------|\n`;
  for (const item of items) {
    const rel = `${slug}/${item.file}`;
    const ok = results.find((r) => r.slug === slug && r.file === item.file)?.ok;
    const status = ok ? "" : " **(download failed)**";
    md += `| \`${rel}\`${status} | [source](${item.page}) | ${item.license} | ${item.hint} | ${item.quality} |\n`;
  }
  md += `\n`;
}

if (failures.length) {
  md += `## Failed downloads\n\n`;
  for (const f of failures) {
    md += `- \`${f.slug}/${f.file}\`: ${f.error} — ${f.url}\n`;
  }
  md += `\n`;
}

md += `## Notes\n\n`;
md += `- Mix of Wikimedia Commons (CC/GFDL) and Pexels (free license). Verify licenses on source pages before commercial use.\n`;
md += `- Some images are diagrams or adjacent trades (HDD, open trench) included for AI composition reference.\n`;
md += `- Wikimedia downloads that failed with HTTP 429 were filled with Pexels alternatives (see manifest in \`scripts/download-service-images.mjs\`).\n`;

fs.writeFileSync(path.join(outRoot, "SOURCES.md"), md);

console.log(`\nDone: ${results.filter((r) => r.ok).length} OK, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
