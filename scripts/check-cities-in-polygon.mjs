import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function pointInRing(lat, lng, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersect =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi + 0.0) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function loadRing(file) {
  const geo = JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  return geo.features.find((f) => f.geometry?.type === "Polygon").geometry.coordinates[0];
}

const laRing = loadRing("public/la-service-area.geojson");
const venturaRing = loadRing("public/ventura-service-area.geojson");

const venturaHubs = new Set([
  "ventura",
  "thousand-oaks",
  "simi-valley",
  "camarillo",
  "oxnard",
  "moorpark",
  "newbury-park",
]);

const coords = {
  "Lake Balboa": [34.1867, -118.4481],
  Tarzana: [34.1498, -118.5506],
  "Canoga Park": [34.2011, -118.5981],
  "West Hills": [34.1973, -118.644],
  Winnetka: [34.2133, -118.5712],
  Chatsworth: [34.2572, -118.6012],
  Calabasas: [34.138, -118.6604],
  "Hidden Hills": [34.1603, -118.6609],
  "Sherman Oaks": [34.1511, -118.4492],
  "Valley Glen": [34.194, -118.421],
  "Panorama City": [34.2247, -118.443],
  "Studio City": [34.1434, -118.3953],
  "Valley Village": [34.1669, -118.389],
  "Toluca Lake": [34.152, -118.3789],
  Reseda: [34.2011, -118.5365],
  "Granada Hills": [34.2644, -118.523],
  "North Hills": [34.2431, -118.4842],
  "Porter Ranch": [34.2811, -118.5706],
  Pacoima: [34.2595, -118.4103],
  "Mission Hills": [34.272, -118.467],
  Arleta: [34.2405, -118.439],
  "Sun Valley": [34.22, -118.369],
  "Sunland-Tujunga": [34.2529, -118.2974],
  "Eagle Rock": [34.1392, -118.2143],
  "Atwater Village": [34.1164, -118.2266],
  Montrose: [34.2064, -118.2282],
  "La Cañada Flintridge": [34.1998, -118.1878],
  "Highland Park": [34.1155, -118.182],
  "Mount Washington": [34.0992, -118.2134],
  "Pacific Palisades": [34.0455, -118.5265],
  Venice: [33.985, -118.4695],
  "Mar Vista": [34.0053, -118.4314],
  Brentwood: [34.052, -118.4762],
  Topanga: [34.0914, -118.6015],
  "Agoura Hills": [34.1364, -118.7745],
  "Bel Air": [34.091, -118.444],
  "West Hollywood": [34.09, -118.3617],
  "Holmby Hills": [34.09, -118.427],
  "Century City": [34.057, -118.417],
  Westwood: [34.059, -118.445],
  "Hancock Park": [34.063, -118.328],
  Fairfax: [34.073, -118.361],
  Koreatown: [34.0578, -118.3009],
  "Mid-Wilshire": [34.062, -118.345],
  "Mid-City": [34.048, -118.352],
  Hollywood: [34.0928, -118.3287],
  "Silver Lake": [34.087, -118.2702],
  "Echo Park": [34.078, -118.2606],
  "Los Feliz": [34.113, -118.293],
  Larchmont: [34.076, -118.327],
  Palms: [34.024, -118.407],
  "West Los Angeles": [34.041, -118.442],
  Altadena: [34.1897, -118.1312],
  "South Pasadena": [34.1161, -118.1503],
  Somis: [34.2761, -119.003],
  "Port Hueneme": [34.1478, -119.1951],
  "Westlake Village": [34.1456, -118.8055],
};

const surroundingSource = fs.readFileSync(
  path.join(root, "src/lib/surroundingCities.ts"),
  "utf8"
);
const surrounding = Function(
  `return ${surroundingSource.match(/SURROUNDING_CITIES_BY_HUB: Record<string, string\[\]> = (\{[\s\S]*?\});/)?.[1] ?? "{}"}`
)();

function inServiceArea(lat, lng, hubSlug) {
  const ring = venturaHubs.has(hubSlug) ? venturaRing : laRing;
  return pointInRing(lat, lng, ring);
}

let failures = 0;

console.log("Checking surrounding cities...");
for (const [hub, list] of Object.entries(surrounding)) {
  for (const city of list) {
    const c = coords[city];
    if (!c) {
      console.error(`  MISSING COORDS: ${hub} -> ${city}`);
      failures++;
      continue;
    }
    if (!inServiceArea(c[0], c[1], hub)) {
      console.error(`  OUTSIDE: ${hub} -> ${city}`);
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} surrounding-city check(s) failed.`);
  process.exit(1);
}

console.log("All surrounding cities are inside their county service-area polygons.");
