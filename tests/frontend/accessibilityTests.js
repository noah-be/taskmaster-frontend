import { AxePuppeteer } from "axe-puppeteer";
import puppeteer from "puppeteer";

import { startServer, stopServer } from "../../app.js";

export function runAccessibilityTests() {
  describe("Accessibility tests", () => {
    let browser;
    let page;

    beforeAll(async () => {
      await startServer();

      browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--disable-gpu",
          "--disable-images",
          "--disable-stylesheets",
        ],
      });
      page = await browser.newPage();
    });

    afterAll(async () => {
      await page.close();
      await browser.close();
      await stopServer();
    });

    const routes = ["/", "/about", "/contact"];

    routes.forEach((route) => {
      it(`should ensure the page "${route}" is accessible`, async () => {
        await page.goto(`http://localhost:3002${route}`);
        const results = await new AxePuppeteer(page).analyze();
        expect(results.violations).toHaveLength(
          0,
          `Accessibility issues found on ${route}: ${JSON.stringify(results.violations)}`,
        );
      });
    });
  });
}
