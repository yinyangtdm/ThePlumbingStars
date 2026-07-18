/**
 * Wraps navigator.geolocation.getCurrentPosition in a promise. Calling this is what
 * triggers the browser's native location-permission prompt. Resolves null (never
 * rejects) when the API is unavailable, the user denies permission, or it errors/times out.
 */
export function getBrowserCoords(timeoutMs = 8000): Promise<[number, number] | null> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve(null);
      return;
    }

    let settled = false;
    const finish = (value: [number, number] | null) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    // Defensive backstop in case a browser never invokes either callback.
    const backstop = setTimeout(() => finish(null), timeoutMs + 1000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(backstop);
        finish([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        clearTimeout(backstop);
        finish(null);
      },
      { timeout: timeoutMs, maximumAge: 5 * 60 * 1000 }
    );
  });
}
