const puppeteer = require('puppeteer');

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to a website
  await page.goto('https://nodejs.org/en');

  // Take a screenshot
  await page.screenshot({ path: 'example.png' });

  // Close Puppeteer
  await browser.close();

  console.log('Puppeteer executed successfully inside Docker container!');
})();