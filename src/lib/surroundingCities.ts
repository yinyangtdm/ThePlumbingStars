/**
 * Nearby communities associated with each starred hub for SEO copy and name→hub
 * search routing. Prefer one primary hub per community (no duplicate assignments).
 * Retired hub aliases (Tarzana, Reseda, etc.) are listed under their target hub.
 */
export const SURROUNDING_CITIES_BY_HUB: Record<string, string[]> = {
  // Los Angeles
  encino: ["Lake Balboa"],
  "woodland-hills": [
    "Tarzana",
    "Canoga Park",
    "West Hills",
    "Winnetka",
    "Chatsworth",
    "Calabasas",
    "Hidden Hills",
  ],
  "van-nuys": ["Sherman Oaks", "Valley Glen", "Panorama City"],
  "north-hollywood": ["Studio City", "Valley Village", "Toluca Lake"],
  northridge: ["Reseda", "Granada Hills", "North Hills", "Porter Ranch"],
  "san-fernando": ["Pacoima", "Sylmar", "Mission Hills", "Arleta", "Sun Valley"],
  burbank: ["Sunland-Tujunga"],
  glendale: [
    "Eagle Rock",
    "Atwater Village",
    "La Crescenta",
    "Montrose",
    "La Cañada Flintridge",
    "Highland Park",
    "Mount Washington",
  ],
  "santa-monica": ["Pacific Palisades", "Venice", "Mar Vista", "Brentwood"],
  malibu: ["Topanga", "Agoura Hills"],
  "beverly-hills": [
    "Bel Air",
    "West Hollywood",
    "Holmby Hills",
    "Century City",
    "Westwood",
    "Hancock Park",
    "Fairfax",
  ],
  "los-angeles": [
    "Koreatown",
    "Mid-Wilshire",
    "Mid-City",
    "Hollywood",
    "Silver Lake",
    "Echo Park",
    "Los Feliz",
    "Larchmont",
  ],
  "culver-city": ["Palms", "West Los Angeles"],
  pasadena: ["Altadena", "South Pasadena"],

  // Ventura
  ventura: ["Oak View", "Ojai", "Santa Paula"],
  "thousand-oaks": ["Westlake Village"],
  "simi-valley": [],
  camarillo: ["Somis"],
  oxnard: ["Port Hueneme"],
  moorpark: ["Fillmore"],
  "newbury-park": [],
};

/** Formats ["A","B","C"] → "A, B, and C" (Oxford comma). */
export function formatCityList(cities: string[]): string {
  if (cities.length === 0) return "";
  if (cities.length === 1) return cities[0];
  if (cities.length === 2) return `${cities[0]} and ${cities[1]}`;
  return `${cities.slice(0, -1).join(", ")}, and ${cities[cities.length - 1]}`;
}
