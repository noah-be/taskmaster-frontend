import { AxePuppeteer } from "axe-puppeteer";

export function runAccessibilityTests() {
  return (page) => {
    describe("Accessibility tests", () => {
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
  };
}
