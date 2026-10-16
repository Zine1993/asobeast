import { expect, test } from "./session.mts";
import { APP_1_DETAIL, APP_1_COMPETITORS } from "./fixtures.mts";

for (const store of ["APP_STORE", "GOOGLE_PLAY"] as const) {
  test(`competitor store button opens ${store} in a new tab`, async ({
    page,
  }) => {
    const storeAppId =
      store === "APP_STORE" ? "987654321" : "com.example.rival";
    await page.route("**/api/backend/apps/comp-1", (route) =>
      route.fulfill({
        json: { ...APP_1_DETAIL, ...APP_1_COMPETITORS[0], store, storeAppId },
      }),
    );
    await page.goto("/apps/app-1/competitors");
    const link = page.getByRole("link", {
      name: /Open Rival Focus in .*opens in a new tab/,
    });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    const expectedUrl =
      store === "APP_STORE"
        ? "https://apps.apple.com/us/app/id987654321"
        : "https://play.google.com/store/apps/details?id=com.example.rival&gl=US";
    await expect(link).toHaveAttribute("href", expectedUrl);
    await page
      .context()
      .route(expectedUrl, (route) =>
        route.fulfill({ body: "Mock store listing", contentType: "text/html" }),
      );
    const opened = page.waitForEvent("popup");
    await link.click();
    const popup = await opened;
    await expect(popup).toHaveURL(expectedUrl);
    await popup.close();
  });
}
