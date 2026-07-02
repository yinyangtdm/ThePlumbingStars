import serviceAreas from "@/data/service-areas.json";

type GeoJsonRing = [number, number][];

function ringToLatLng(ring: GeoJsonRing): [number, number][] {
  return ring.map(([lng, lat]) => [lat, lng] as [number, number]);
}

function polygonFromFeature(index: number): [number, number][] {
  const ring = (serviceAreas.features[index].geometry.coordinates[0] as unknown) as GeoJsonRing;
  return ringToLatLng(ring);
}

/** Los Angeles County service boundary — [lat, lng] for Leaflet. */
export const LA_POLYGON = polygonFromFeature(0);

/** Ventura County service boundary — [lat, lng] for Leaflet. */
export const VENTURA_POLYGON = polygonFromFeature(1);
