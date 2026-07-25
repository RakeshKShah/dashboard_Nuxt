import { test, expect } from "@playwright/test";
import { ExecutionRecorder } from "../helpers/execution-recorder.js";

// Seed test: verifies the Nuxt Dashboard app starts, is reachable,
// and a visible page element/title can be asserted.
//
// Note: The Nuxt Dashboard template uses a fully-positioned layout where
// `html`, `body`, and `#__nuxt` all have 0px computed height (content is
// inside fixed/absolute panels). Playwright considers zero-height elements
// hidden. We therefore assert specific content elements that have non-zero
// dimensions, not the root containers.

test("seed: app loads and shows dashboard page", async ({ page }, testInfo) => {
  const recorder = new ExecutionRecorder({
    testId: "seed-001",
    testTitle: "App loads and shows dashboard page",
  });

  await recorder.step("Navigate to app root", async () => {
    await page.goto("/");
  });

  await recorder.step("Wait for page to reach networkidle", async () => {
    await page.waitForLoadState("networkidle");
  });

  await recorder.step("Assert page title is non-empty", async () => {
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  await recorder.step("Assert dashboard sidebar nav is visible", async () => {
    // The sidebar (id=dashboard-sidebar-default) is always present and has
    // non-zero height (fixed layout panel). Use text visible in the nav.
    const sidebar = page.locator("#dashboard-sidebar-default");
    await expect(sidebar).toBeVisible({ timeout: 15000 });
  });

  await recorder.step("Assert navigation link 'Home' is visible", async () => {
    // The 'Home' nav link is always rendered in the sidebar navigation.
    const homeLink = page.getByRole("link", { name: "Home" });
    await expect(homeLink).toBeVisible({ timeout: 10000 });
  });

  await recorder.step("Assert page URL is app root", async () => {
    expect(page.url()).toMatch(/^http:\/\/localhost:\d+\//);
  });

  await recorder.save(testInfo);
});
