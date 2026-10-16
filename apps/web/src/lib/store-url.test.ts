import { describe, expect, it } from "vitest";
import { storeUrl } from "./store-url";

describe("storeUrl", () => {
  it("opens the Apple listing in its storefront", () => {
    expect(storeUrl("APP_STORE", "123456789", "DE")).toBe(
      "https://apps.apple.com/de/app/id123456789",
    );
  });
  it("opens the Google Play listing with the storefront", () => {
    expect(storeUrl("GOOGLE_PLAY", "com.narraia.ai", "us")).toBe(
      "https://play.google.com/store/apps/details?id=com.narraia.ai&gl=US",
    );
  });
  it("keeps query characters inside the app id", () => {
    const url = new URL(storeUrl("GOOGLE_PLAY", "com.example&gl=CN", "us"));
    expect(url.searchParams.get("id")).toBe("com.example&gl=CN");
    expect(url.searchParams.get("gl")).toBe("US");
  });
});
