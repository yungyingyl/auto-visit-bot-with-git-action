const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

// const targetUrl = process.env.TARGET_URL;
// const targetUrl = process.env.TARGET_URL;
const targetUrl = "https://mynovel.co/novel/ElPm1meawiEnzIAPTDmUkcwj";
const viewCount = 3700;
const visitDuration = 3200;

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

async function runViewBot() {
  if (!targetUrl) {
    console.error('Error: TARGET_URL environment variable is not set.');
    process.exit(1); 
  }

  console.log('🚀 Starting the view bot...');

  const browser = await puppeteer.launch({
    headless: true, 
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (let i = 1; i <= viewCount; i++) {
    let page; 
    try {
      page = await browser.newPage();
      await page.goto(targetUrl, { waitUntil: 'networkidle2' });

      console.log(`Visit #${i}: Successfully navigated to the target URL.`);

      await delay(visitDuration);

    } catch (error) {
      console.error(`Error on visit #${i}:`, error.message);
    } finally {
        if (page) {
           await page.close();
           console.log(`Closed tab for visit #${i}`);
        }
    }
  }

  await browser.close();
  console.log('✅ Bot has finished its run.');
}

runViewBot();
