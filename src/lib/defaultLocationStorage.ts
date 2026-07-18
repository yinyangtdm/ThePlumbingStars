const STORAGE_KEY = "tps-default-location-id";

/** Reads the persisted default-location id. Returns null when unset or unavailable (SSR/private browsing). */
export function readStoredDefaultLocationId(): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Persists (or clears, when id is null) the default-location id. */
export function writeStoredDefaultLocationId(id: string | null): void {
  try {
    if (typeof window === "undefined") return;
    if (id) {
      window.localStorage.setItem(STORAGE_KEY, id);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore (e.g. private browsing quota errors)
  }
}
