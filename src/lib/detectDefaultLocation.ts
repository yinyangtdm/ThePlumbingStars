import { getBrowserCoords } from "./browserGeolocation";
import { detectUserArea, resolveRegionForCoords } from "./areaDetection";
import { sortLocationsByDistance, type ServiceLocation } from "./serviceLocations";

function nearestInRegion(
  allLocations: ServiceLocation[],
  region: ServiceLocation["region"],
  coords: [number, number]
): ServiceLocation | null {
  const candidates = allLocations.filter((loc) => loc.region === region);
  return sortLocationsByDistance(candidates, coords)[0] ?? null;
}

/**
 * Detection cascade: browser Geolocation API (triggers the permission prompt) first,
 * falling back to IP-based lookup if permission is denied, the API errors/times out,
 * or the resolved coordinate falls outside both service-area polygons. Returns the
 * nearest starred location, or null if the user's location can't be determined to be
 * within either service area.
 */
export async function detectDefaultLocation(
  allLocations: ServiceLocation[]
): Promise<ServiceLocation | null> {
  const browserCoords = await getBrowserCoords();
  if (browserCoords) {
    const region = await resolveRegionForCoords(browserCoords[0], browserCoords[1]);
    if (region) {
      const nearest = nearestInRegion(allLocations, region, browserCoords);
      if (nearest) return nearest;
    }
  }

  const ipResult = await detectUserArea();
  if (ipResult) {
    const nearest = nearestInRegion(allLocations, ipResult.region, ipResult.coords);
    if (nearest) return nearest;
  }

  return null;
}
