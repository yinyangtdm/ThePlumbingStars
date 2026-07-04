export type ServiceRegion = "losangeles" | "ventura";

export type ServiceLocation = {
  id: string;
  name: string;
  coords: [number, number]; // [lat, lng] for Leaflet
  region: ServiceRegion;
};

/** Approximate centroids for nearest-city matching of GeoJSON points. */
export const CITY_CENTROIDS: Record<string, [number, number]> = {
  "Agoura Hills": [34.1367, -118.7617],
  "Altadena": [34.1964, -118.1317],
  "Arleta": [34.2426, -118.4101],
  "Atwater Village": [34.1378, -118.2196],
  "Bel Air": [34.09, -118.4441],
  "Beverly Hills": [34.0736, -118.4004],
  "Brentwood": [34.0526, -118.4965],
  "Burbank": [34.1808, -118.3089],
  "Calabasas": [34.1364, -118.6615],
  "Canoga Park": [34.2011, -118.6057],
  "Century City": [34.0583, -118.4165],
  "Chatsworth": [34.2578, -118.6008],
  "Culver City": [34.0211, -118.3965],
  "Eagle Rock": [34.1397, -118.2007],
  "Echo Park": [34.0782, -118.2606],
  "Encino": [34.1526, -118.5019],
  "Fairfax": [34.0837, -118.358],
  "Glendale": [34.1425, -118.2551],
  "Granada Hills": [34.2819, -118.477],
  "Hancock Park": [34.0667, -118.3266],
  "Hidden Hills": [34.1636, -118.6656],
  "Highland Park": [34.1116, -118.2015],
  "Hollywood": [34.0983, -118.3267],
  "Holmby Hills": [34.0728, -118.4441],
  "Koreatown": [34.059, -118.308],
  "La Cañada Flintridge": [34.2235, -118.2151],
  "La Crescenta": [34.2353, -118.2351],
  "Lake Balboa": [34.2019, -118.4497],
  "Larchmont": [34.0722, -118.3278],
  "Los Feliz": [34.107, -118.287],
  "Malibu": [34.0259, -118.7798],
  "Mar Vista": [34.0003, -118.4355],
  "Mid-City": [34.0181, -118.343],
  "Mid-Wilshire": [34.0619, -118.3051],
  "Mission Hills": [34.2594, -118.4489],
  "Montrose": [34.2056, -118.2119],
  "Mount Washington": [34.1121, -118.2108],
  "North Hills": [34.2381, -118.4906],
  "North Hollywood": [34.1727, -118.3784],
  "Northridge": [34.2381, -118.5301],
  "Pacific Palisades": [34.0345, -118.5174],
  "Pacoima": [34.2561, -118.4138],
  "Palms": [34.0211, -118.4305],
  "Panorama City": [34.2326, -118.442],
  "Pasadena": [34.1478, -118.1445],
  "Porter Ranch": [34.2593, -118.5501],
  "Reseda": [34.2014, -118.5362],
  "San Fernando": [34.2819, -118.438],
  "Santa Monica": [34.0195, -118.4912],
  "Sherman Oaks": [34.1514, -118.4426],
  "Silver Lake": [34.0866, -118.2606],
  "South Pasadena": [34.1166, -118.1502],
  "Studio City": [34.1397, -118.387],
  "Sun Valley": [34.2301, -118.3893],
  "Sunland-Tujunga": [34.2596, -118.3088],
  "Sylmar": [34.3053, -118.448],
  "Tarzana": [34.1483, -118.556],
  "Toluca Lake": [34.152, -118.3965],
  "Topanga": [34.0883, -118.608],
  "Valley Glen": [34.1898, -118.4446],
  "Valley Village": [34.1578, -118.3896],
  "Van Nuys": [34.1899, -118.4514],
  "Venice": [33.985, -118.4695],
  "Westlake Village": [34.1464, -118.807],
  "West Hills": [34.1903, -118.605],
  "West Hollywood": [34.09, -118.3617],
  "West Los Angeles": [34.0366, -118.4431],
  "Westwood": [34.0635, -118.4455],
  "Winnetka": [34.2068, -118.5797],
  "Woodland Hills": [34.1683, -118.6058],
  Ventura: [34.2746, -119.229],
  Oxnard: [34.1975, -119.1771],
  "Thousand Oaks": [34.1706, -118.8376],
  Camarillo: [34.2164, -119.0376],
  "Simi Valley": [34.2694, -118.7815],
};

/** Canonical city → county for search routing. */
const CITY_REGION: Record<string, ServiceRegion> = {
  "Agoura Hills": "losangeles",
  Altadena: "losangeles",
  Arleta: "losangeles",
  "Atwater Village": "losangeles",
  "Bel Air": "losangeles",
  "Beverly Hills": "losangeles",
  Brentwood: "losangeles",
  Burbank: "losangeles",
  Calabasas: "losangeles",
  "Canoga Park": "losangeles",
  Camarillo: "ventura",
  "Century City": "losangeles",
  Chatsworth: "losangeles",
  "Culver City": "losangeles",
  "Eagle Rock": "losangeles",
  "Echo Park": "losangeles",
  Encino: "losangeles",
  Fairfax: "losangeles",
  Fillmore: "ventura",
  Glendale: "losangeles",
  "Granada Hills": "losangeles",
  "Hancock Park": "losangeles",
  "Hidden Hills": "losangeles",
  "Highland Park": "losangeles",
  Hollywood: "losangeles",
  "Holmby Hills": "losangeles",
  Koreatown: "losangeles",
  "La Cañada Flintridge": "losangeles",
  "La Crescenta": "losangeles",
  "Lake Balboa": "losangeles",
  Larchmont: "losangeles",
  "Los Feliz": "losangeles",
  Malibu: "losangeles",
  "Mar Vista": "losangeles",
  "Mid-City": "losangeles",
  "Mid-Wilshire": "losangeles",
  "Mission Hills": "losangeles",
  Montrose: "losangeles",
  Moorpark: "ventura",
  "Mount Washington": "losangeles",
  "Newbury Park": "ventura",
  "North Hills": "losangeles",
  "North Hollywood": "losangeles",
  Northridge: "losangeles",
  "Oak View": "ventura",
  Ojai: "ventura",
  Oxnard: "ventura",
  "Pacific Palisades": "losangeles",
  Pacoima: "losangeles",
  Palms: "losangeles",
  "Panorama City": "losangeles",
  Pasadena: "losangeles",
  "Port Hueneme": "ventura",
  "Porter Ranch": "losangeles",
  Reseda: "losangeles",
  "San Fernando": "losangeles",
  "Santa Monica": "losangeles",
  "Santa Paula": "ventura",
  "Sherman Oaks": "losangeles",
  "Silver Lake": "losangeles",
  "Simi Valley": "ventura",
  Somis: "ventura",
  "South Pasadena": "losangeles",
  "Studio City": "losangeles",
  "Sun Valley": "losangeles",
  "Sunland-Tujunga": "losangeles",
  Sylmar: "losangeles",
  Tarzana: "losangeles",
  "Thousand Oaks": "ventura",
  "Toluca Lake": "losangeles",
  Topanga: "losangeles",
  "Valley Glen": "losangeles",
  "Valley Village": "losangeles",
  "Van Nuys": "losangeles",
  Ventura: "ventura",
  Venice: "losangeles",
  "Westlake Village": "ventura",
  "West Hills": "losangeles",
  "West Hollywood": "losangeles",
  "West Los Angeles": "losangeles",
  Westwood: "losangeles",
  Winnetka: "losangeles",
  "Woodland Hills": "losangeles",
};

function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function countyPathForRegion(region: ServiceRegion): string {
  return region === "losangeles" ? "/losangeles" : "/ventura";
}

export function findCityByName(query: string): { name: string; region: ServiceRegion } | null {
  const normalized = normalizeSearchText(query);
  if (!normalized) return null;

  const entries = Object.entries(CITY_REGION);
  const exact = entries.find(([name]) => normalizeSearchText(name) === normalized);
  if (exact) return { name: exact[0], region: exact[1] };

  const partial = entries.filter(([name]) => normalizeSearchText(name).includes(normalized));
  if (partial.length === 1) return { name: partial[0][0], region: partial[0][1] };

  return null;
}

export function distSq(a: [number, number], b: [number, number]): number {
  const dLat = a[0] - b[0];
  const dLon = a[1] - b[1];
  return dLat * dLat + dLon * dLon;
}

export function matchNearestCity(coords: [number, number]): string {
  let bestCity = `City (${coords[0].toFixed(3)}, ${coords[1].toFixed(3)})`;
  let bestScore = Infinity;
  for (const [city, centroid] of Object.entries(CITY_CENTROIDS)) {
    const score = distSq(coords, centroid);
    if (score < bestScore) {
      bestScore = score;
      bestCity = city;
    }
  }
  return bestCity;
}

type GeoJsonFeature = {
  geometry?: { type?: string; coordinates?: [number, number] };
  properties?: { name?: string };
};

type GeoJsonCollection = {
  features?: GeoJsonFeature[];
};

export function buildLocationsFromGeoJson(
  geojson: GeoJsonCollection,
  region: ServiceRegion
): ServiceLocation[] {
  const points = Array.isArray(geojson.features)
    ? geojson.features.filter((f) => f.geometry?.type === "Point")
    : [];

  const seen = new Set<string>();
  const locations: ServiceLocation[] = [];

  points.forEach((f) => {
    const raw = f.geometry!.coordinates!;
    const [lng, lat] = raw;
    const coords: [number, number] = [lat, lng];
    const name = f.properties?.name ?? matchNearestCity(coords);
    const baseId = name.toLowerCase().replace(/\s+/g, "-");
    let id = baseId;
    let suffix = 1;
    while (seen.has(id)) {
      id = `${baseId}-${suffix++}`;
    }
    seen.add(id);
    locations.push({ id, name, coords, region });
  });

  return locations;
}

export function sortLocationsByDistance(
  locations: ServiceLocation[],
  anchorCoords: [number, number],
  primaryId?: string
): ServiceLocation[] {
  const sorted = [...locations].sort((a, b) => {
    if (primaryId) {
      if (a.id === primaryId) return -1;
      if (b.id === primaryId) return 1;
    }
    return distSq(a.coords, anchorCoords) - distSq(b.coords, anchorCoords);
  });
  return sorted;
}
