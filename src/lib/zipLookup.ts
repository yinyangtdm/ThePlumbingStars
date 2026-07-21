const laZips = new Set([
  // San Fernando Valley
  "91301", "91302", "91303", "91304", "91305", "91306", "91307", "91308", "91309", "91311", "91316",
  "91324", "91325", "91326", "91330", "91331", "91335", "91337",
  "91340", "91341", "91343", "91344", "91345", "91346",
  "91350", "91351", "91352", "91356", "91357", "91364", "91367",
  "91401", "91402", "91403", "91405", "91406", "91411", "91423", "91436",
  // Burbank / Glendale
  "91201", "91202", "91203", "91204", "91205", "91206", "91207", "91208", "91214",
  "91501", "91502", "91503", "91504", "91505", "91506", "91510",
  // North Hollywood / Studio City / Valley Village / Toluca Lake
  "91601", "91602", "91604", "91605", "91606", "91607", "91608",
  // Pasadena / Altadena / La Cañada / South Pasadena
  "91001", "91011", "91101", "91103", "91104", "91105", "91106", "91107", "91108",
  // Eagle Rock / Highland Park / Glassell Park / Atwater / Cypress Park
  "90031", "90039", "90041", "90042", "90065",
  // Westside
  "90024", "90025", "90034", "90049", "90064", "90066", "90230", "90232",
  "90272", "90291", "90292", "90401", "90402", "90403", "90404", "90405",
  // Malibu / Topanga / Westlake Village (LA County side)
  "90265", "90290", "91362",
  // Beverly Hills / West Hollywood
  "90210", "90211", "90212", "90046", "90048", "90069",
  // Central LA
  "90004", "90005", "90006", "90007", "90010", "90012", "90013", "90014",
  "90015", "90016", "90017", "90018", "90019", "90020", "90021",
  "90026", "90027", "90028", "90029", "90032", "90033",
  "90035", "90036", "90037", "90038", "90057", "90068",
  // Koreatown / Mid-City / Fairfax / Hancock Park
  "90004", "90019", "90036",
]);

const venturaZips = new Set([
  // Ventura
  "93001", "93003", "93004",
  // Camarillo
  "93010", "93012",
  // Moorpark
  "93020", "93021",
  // Oxnard
  "93030", "93033", "93035", "93036",
  // Port Hueneme
  "93041", "93043", "93044",
  // Simi Valley
  "93063", "93065",
  // Thousand Oaks / Newbury Park
  "91320", "91360", "91361",
  // Somis / El Rio
  "93066",
]);

export function getRegionByZip(zip: string): "losangeles" | "ventura" | null {
  if (laZips.has(zip)) return "losangeles";
  if (venturaZips.has(zip)) return "ventura";
  return null;
}

/** Approximate [lat, lng] for distance sorting — not precise geocoding. */
const LA_PREFIX_COORDS: Record<string, [number, number]> = {
  "900": [34.06, -118.3],
  "902": [34.04, -118.42],
  "904": [34.02, -118.49],
  "910": [34.2, -118.15],
  "911": [34.15, -118.14],
  "912": [34.18, -118.31],
  "913": [34.18, -118.55],
  "914": [34.19, -118.45],
  "915": [34.14, -118.26],
  "916": [34.17, -118.39],
};

/**
 * Exact ZIP centroids for areas whose former hub stars were removed, so searches
 * resolve to the nearest remaining starred city (Woodland Hills / Northridge / etc.).
 */
const LA_ZIP_COORDS: Record<string, [number, number]> = {
  // Canoga Park → nearest remaining hub: Woodland Hills
  "91303": [34.2011, -118.6057],
  "91304": [34.2011, -118.6057],
  "91305": [34.2011, -118.6057],
  "91308": [34.2011, -118.6057],
  "91309": [34.2011, -118.6057],
  // Reseda → nearest remaining hub: Northridge
  "91335": [34.2014, -118.5362],
  "91337": [34.2014, -118.5362],
  // Tarzana → nearest remaining hub: Woodland Hills
  "91356": [34.1483, -118.556],
  "91357": [34.1483, -118.556],
  // Sherman Oaks → nearest remaining hub: Van Nuys
  "91403": [34.1514, -118.4426],
  "91413": [34.1514, -118.4426],
  "91423": [34.1514, -118.4426],
};

/** Exact ZIP centroids for retired Ventura hubs so searches resolve to the nearest star. */
const VENTURA_ZIP_COORDS: Record<string, [number, number]> = {
  // Port Hueneme → nearest remaining hub: Oxnard
  "93041": [34.1478, -119.1951],
  "93043": [34.1478, -119.1951],
  "93044": [34.1478, -119.1951],
};

const VENTURA_PREFIX_COORDS: Record<string, [number, number]> = {
  "913": [34.17, -118.84],
  "930": [34.22, -119.05],
};

export function getZipCoordinates(zip: string): [number, number] | null {
  const region = getRegionByZip(zip);
  if (!region) return null;
  if (region === "losangeles") {
    return LA_ZIP_COORDS[zip] ?? LA_PREFIX_COORDS[zip.slice(0, 3)] ?? [34.11, -118.35];
  }
  return VENTURA_ZIP_COORDS[zip] ?? VENTURA_PREFIX_COORDS[zip.slice(0, 3)] ?? [34.2, -119.1];
}
