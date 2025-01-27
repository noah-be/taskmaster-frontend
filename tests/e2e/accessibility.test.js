// import { test, expect } from 'vitest';
// import { chromium } from 'playwright';

// test('Accessibility', async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext({ bypassCSP: true }); // Allow axe-core
//   const page = await context.newPage();

//   try {
//     await page.goto('http://localhost:5173');
//     await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js' });
//     const results = await page.evaluate(async () => {
//       return await axe.run({
//         exclude: [['.panel-entry-btn']] // Ignore vue dev tools
//       });
//     });

//     if (results.violations.length > 0) {
//       console.error('Accessibility violations found:');
//       results.violations.forEach(violation => {
//         console.error(`Violation: ${violation.id}`);
//         console.error(`Impact: ${violation.impact}`);
//         console.error(`Description: ${violation.description}`);
//         console.error(`Help: ${violation.help}`);
//         console.error(`Help URL: ${violation.helpUrl}`);
//         console.error('Nodes:');

//         violation.nodes.forEach(node => {
//           console.error(`HTML Element: ${node.html}`);
//           console.error(`Target: ${node.target.join(', ')}`);
//           console.error(`Failure Summary: ${node.failureSummary}`);
//         });
//       });
//     }

//     expect(results.violations).toHaveLength(0, `Accessibility violations found: ${results.violations.map(v => v.description).join(', ')}`);
//   } finally {
//     await page.close();
//     await browser.close();
//   }
// });
