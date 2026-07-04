/* eslint-disable */
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/explore/central-library", {
    waitUntil: "networkidle2",
  });
  await page.screenshot({
    path: "/home/roni/.gemini/antigravity-ide/brain/09316354-a68d-422f-9692-1769429c5aed/screenshot_desktop.png",
    fullPage: true,
  });

  await page.setViewport({ width: 375, height: 667 });
  await page.screenshot({
    path: "/home/roni/.gemini/antigravity-ide/brain/09316354-a68d-422f-9692-1769429c5aed/screenshot_mobile.png",
    fullPage: true,
  });

  // check for horizontal overflow
  const overflowX = await page.evaluate(() => {
    return (
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth
    );
  });
  console.log("Horizontal overflow on mobile:", overflowX);

  await browser.close();
})();
