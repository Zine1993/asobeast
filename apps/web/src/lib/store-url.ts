import type { Store } from "@asobeast/shared";

export function storeUrl(
  store: Store,
  storeAppId: string,
  country: string,
): string {
  return store === "APP_STORE"
    ? `https://apps.apple.com/${encodeURIComponent(country.toLowerCase())}/app/id${encodeURIComponent(storeAppId)}`
    : `https://play.google.com/store/apps/details?id=${encodeURIComponent(storeAppId)}&gl=${encodeURIComponent(country.toUpperCase())}`;
}
