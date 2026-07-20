"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ServiceLocation } from "@/lib/serviceLocations";
import { detectDefaultLocation } from "@/lib/detectDefaultLocation";
import { resolveRetiredCityHubSlug } from "@/lib/cityHubs";
import {
  readStoredDefaultLocationId,
  writeStoredDefaultLocationId,
} from "@/lib/defaultLocationStorage";

type LocationStatus = "detecting" | "resolved" | "unset";

type LocationContextValue = {
  allLocations: ServiceLocation[];
  defaultLocation: ServiceLocation | null;
  status: LocationStatus;
  setDefaultLocation: (id: string) => void;
};

const LocationContext = createContext<LocationContextValue | null>(null);

function locationFromStoredId(
  allLocations: ServiceLocation[],
  storedId: string | null
): ServiceLocation | null {
  if (!storedId) return null;
  const direct = allLocations.find((loc) => loc.id === storedId);
  if (direct) return direct;
  const remappedSlug = resolveRetiredCityHubSlug(storedId);
  if (!remappedSlug) return null;
  return allLocations.find((loc) => loc.id === remappedSlug) ?? null;
}

/** Checks localStorage first; only runs the detection cascade if nothing valid is stored. */
async function resolveInitialDefaultLocation(
  allLocations: ServiceLocation[]
): Promise<{ location: ServiceLocation | null; persist: boolean }> {
  const storedId = readStoredDefaultLocationId();
  const stored = locationFromStoredId(allLocations, storedId);
  if (stored) {
    // Rewrite retired hub ids (e.g. tarzana → woodland-hills) so storage stays current.
    const needsRewrite = storedId !== stored.id;
    return { location: stored, persist: needsRewrite };
  }

  const detected = await detectDefaultLocation(allLocations);
  return { location: detected, persist: true };
}

export function LocationProvider({
  allLocations,
  children,
}: {
  allLocations: ServiceLocation[];
  children: ReactNode;
}) {
  // Status starts as "detecting" on both server and client renders (never read from
  // localStorage synchronously during render) to avoid hydration mismatches; the real
  // resolution below only happens post-mount, inside the effect's async callback.
  const [defaultLocationId, setDefaultLocationId] = useState<string | null>(null);
  const [status, setStatus] = useState<LocationStatus>("detecting");

  useEffect(() => {
    let cancelled = false;

    resolveInitialDefaultLocation(allLocations).then(({ location, persist }) => {
      if (cancelled) return;
      if (location) {
        setDefaultLocationId(location.id);
        if (persist) writeStoredDefaultLocationId(location.id);
        setStatus("resolved");
      } else {
        setStatus("unset");
      }
    });

    return () => {
      cancelled = true;
    };
    // Detection should run once per mount (i.e. once per browser, unless localStorage is cleared).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDefaultLocation = useCallback((id: string) => {
    setDefaultLocationId(id);
    writeStoredDefaultLocationId(id);
    setStatus("resolved");
  }, []);

  const defaultLocation = useMemo(
    () => allLocations.find((loc) => loc.id === defaultLocationId) ?? null,
    [allLocations, defaultLocationId]
  );

  const value = useMemo<LocationContextValue>(
    () => ({ allLocations, defaultLocation, status, setDefaultLocation }),
    [allLocations, defaultLocation, status, setDefaultLocation]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocationContext(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return ctx;
}
