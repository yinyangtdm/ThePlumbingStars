"use client";

import { MapContainer, TileLayer, Polygon, Tooltip, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import type { ServiceLocation } from "@/lib/serviceLocations";

function makeStarIcon(active: boolean, isDefault: boolean) {
  const starSize = active ? 28 : 22;
  const size = isDefault ? starSize + 12 : starSize;
  const anchor = size / 2;
  const starOffset = (size - starSize) / 2;
  const halo = isDefault
    ? `<circle cx="${anchor}" cy="${anchor}" r="${size / 2 - 1.5}" fill="none" stroke="#b81f2a" stroke-width="2.5" />`
    : "";
  return L.divIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4))">${halo}<g transform="translate(${starOffset}, ${starOffset})"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${starSize}" height="${starSize}"><path fill="#b81f2a" stroke="#7c1018" stroke-width="0.6" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></g></svg>`,
    iconSize: [size, size],
    iconAnchor: [anchor, anchor],
  });
}

const STAR_ICON = makeStarIcon(false, false);
const STAR_ICON_ACTIVE = makeStarIcon(true, false);
const STAR_ICON_DEFAULT = makeStarIcon(false, true);
const STAR_ICON_DEFAULT_ACTIVE = makeStarIcon(true, true);

// GeoJSON uses [lng, lat]; Leaflet expects [lat, lng] — always swap when rendering.
const LA_POLYGON: [number, number][] = [
  [34.2986225, -118.6111317],
  [34.30770399092898, -118.50805710631136],
  [34.30770399092898, -118.42845710631136],
  [34.287303990928976, -118.35845710631136],
  [34.25210399092897, -118.28835710631135],
  [34.23170399092898, -118.23755710631136],
  [34.227103990928974, -118.19765710631135],
  [34.2064873177822, -118.13500109912201],
  [34.191178117782194, -118.105224499122],
  [34.13730399092898, -118.10295710631137],
  [34.11230399092898, -118.15785710631135],
  [34.080101917782194, -118.20023319912201],
  [34.045018417782195, -118.23944189912201],
  [34.031503990928975, -118.27875710631136],
  [34.0116095177822, -118.32530719912201],
  [33.9987613177822, -118.352813099122],
  [33.98699671921743, -118.37570798245666],
  [33.96629211921743, -118.41902238245666],
  [33.9479523, -118.4503871],
  [33.984803990928974, -118.47785710631136],
  [34.00676612484803, -118.49842451239552],
  [34.02545152484803, -118.52006811239552],
  [34.03731972484803, -118.54415151239552],
  [34.0376897, -118.5721282],
  [34.0362516, -118.6088373],
  [34.0353987, -118.6357378],
  [34.03859952484803, -118.66673591239552],
  [34.02863758894867, -118.68189680335131],
  [34.0280213, -118.6956629],
  [34.02714606597786, -118.7059961038823],
  [34.0296023, -118.723934],
  [34.02959126597786, -118.7417051038823],
  [34.02385276597786, -118.7556274038823],
  [34.017385565977854, -118.7866975038823],
  [34.00569116597786, -118.7950766038823],
  [33.99730399092898, -118.80885710631136],
  [34.0085049, -118.8170897],
  [34.0186233, -118.8302265],
  [34.0305806, -118.8480238],
  [34.0341033, -118.8581814],
  [34.0344234, -118.8597563],
  [34.0332794, -118.8607271],
  [34.0365549, -118.8717969],
  [34.0371891, -118.8934157],
  [34.0401744, -118.9040222],
  [34.0408097, -118.914502],
  [34.0444515, -118.9262818],
  [34.04290399092898, -118.93655710631135],
  [34.046476024848026, -118.95219531239552],
  [34.071303990928975, -118.94885710631135],
  [34.165703990928975, -118.79645710631137],
  [34.1678732, -118.6681649],
  [34.2402748, -118.6689227],
  [34.2404786, -118.6329919],
  [34.2717926, -118.6334226],
  [34.2906677, -118.6363712],
  [34.2986225, -118.6111317],
];

const VENTURA_POLYGON: [number, number][] = [
  [34.2856129, -119.3291876],
  [34.2704945, -119.3096551],
  [34.2738139, -119.2914994],
  [34.2548215, -119.2719985],
  [34.2284417, -119.2686645],
  [34.2036293, -119.2558049],
  [34.170268, -119.237356],
  [34.1418908, -119.2173522],
  [34.1375545, -119.191633],
  [34.1020678, -119.1430523],
  [34.0918133, -119.1097126],
  [34.0914188, -119.0773254],
  [34.0803741, -119.0625607],
  [34.0803741, -119.0387466],
  [34.0630151, -119.0068358],
  [34.0578857, -118.9777826],
  [34.0466176, -118.9520286],
  [34.0709992, -118.9491988],
  [34.1658941, -118.7965012],
  [34.1678654, -118.6682633],
  [34.2402268, -118.6689897],
  [34.2404731, -118.6330518],
  [34.2718189, -118.6334832],
  [34.2905362, -118.6365361],
  [34.3018176, -118.6986356],
  [34.2903971, -118.7678304],
  [34.311382, -118.9305518],
  [34.317858, -119.1437533],
  [34.2954879, -119.1800133],
  [34.289968, -119.2570714],
  [34.2856129, -119.3291876],
];

const CONFIGS = {
  both: { center: [34.15, -118.71] as [number, number], zoom: 10 },
  la: { center: [34.11, -118.35] as [number, number], zoom: 10 },
  ventura: { center: [34.15, -118.87] as [number, number], zoom: 10 },
};

function SetInitialView({
  polygons,
  zoom,
}: {
  polygons: ([number, number][] | null)[];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([]);
    polygons.forEach((poly) => {
      if (!poly || poly.length === 0) return;
      poly.forEach((coord) => bounds.extend(coord));
    });
    if (bounds.isValid()) {
      map.setView(bounds.getCenter(), zoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
}

interface Props {
  county?: "la" | "ventura" | "both";
  locations?: ServiceLocation[];
  selectedId?: string;
  onSelectLocation?: (id: string) => void;
  height?: number;
  defaultLocationId?: string;
}

export default function ServiceMapClient({
  county = "both",
  locations,
  selectedId,
  onSelectLocation,
  height = 412,
  defaultLocationId,
}: Props) {
  const mapLocations = useMemo(() => locations ?? [], [locations]);

  const { center, zoom } = CONFIGS[county];
  const laForFit = LA_POLYGON;
  const venturaForFit = VENTURA_POLYGON;
  const showMarkers =
    mapLocations.length > 0 &&
    (county === "la" || county === "ventura" || county === "both");

  const fitPolygons = useMemo(
    () => [
      county === "la" || county === "both" ? laForFit : null,
      county === "ventura" || county === "both" ? venturaForFit : null,
    ],
    [county, laForFit, venturaForFit]
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      attributionControl={false}
      scrollWheelZoom={false}
      style={{ height: `${height}px`, width: "100%", zIndex: 0 }}
      className="rounded-lg relative z-0"
    >
      <TileLayer
        attribution="© CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {(county === "la" || county === "both") && (
        <Polygon
          positions={laForFit}
          pathOptions={{ color: "#1D4B91", fillColor: "#1D4B91", fillOpacity: 0.25, weight: 2 }}
        />
      )}
      {(county === "ventura" || county === "both") && (
        <Polygon
          positions={venturaForFit}
          pathOptions={{ color: "#e0656f", fillColor: "#e0656f", fillOpacity: 0.25, weight: 2 }}
        />
      )}

      {showMarkers &&
        mapLocations.map((loc) => {
          const active = loc.id === selectedId;
          const isDefault = loc.id === defaultLocationId;
          const icon = isDefault
            ? active
              ? STAR_ICON_DEFAULT_ACTIVE
              : STAR_ICON_DEFAULT
            : active
              ? STAR_ICON_ACTIVE
              : STAR_ICON;
          return (
            <Marker
              key={loc.id}
              position={loc.coords}
              icon={icon}
              eventHandlers={{
                click: () => onSelectLocation?.(loc.id),
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -14]}
                opacity={1}
                sticky
                className="city-name-tooltip"
              >
                {loc.name}
              </Tooltip>
            </Marker>
          );
        })}

      <SetInitialView polygons={fitPolygons} zoom={zoom} />
    </MapContainer>
  );
}
