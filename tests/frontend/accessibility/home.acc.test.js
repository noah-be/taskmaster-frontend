import puppeteer from "puppeteer";
import { AxePuppeteer } from "axe-puppeteer";
import app, { startServer, stopServer } from "../../../app";

describe("Accessibility tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    await startServer();
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
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
