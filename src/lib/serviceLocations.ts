export type ServiceRegion = "losangeles" | "ventura";

export type ServiceLocation = {
  id: string;
  name: string;
  coords: [number, number]; // [lat, lng] for Leaflet
  region: ServiceRegion;
};

/** Canonical city → county for search routing (broader than curated hub pages). */
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
