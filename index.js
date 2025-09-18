const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());


const targetUrl = "https://mynovel.co/novel/GMjNFX4Xka71W0LmwrpMLlh5"
const viewCount = 10000
const visitDuration = 3200; 
// --------------------

// ฟังก์ชันสำหรับหน่วงเวลา
const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

async function runViewBot() {
  console.log('🚀 เริ่มการทำงานของบอทเพิ่มยอดวิว...');

  const browser = await puppeteer.launch({
    headless: true, // ตั้งเป็น false เพื่อดูการทำงานของเบราว์เซอร์
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (let i = 1; i <= viewCount; i++) {
    try {
      const page = await browser.newPage();
      await page.goto(targetUrl, { waitUntil: 'networkidle2' });

      console.log(`ครั้งที่ ${i}: เข้าชม ${targetUrl} สำเร็จ`);

      // จำลองการอยู่ในหน้าเว็บตามเวลาที่กำหนด
      await delay(visitDuration);

      await page.close();
      console.log(`ปิดแท็บครั้งที่ ${i}`);

    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในครั้งที่ ${i}:`, error.message);
    }
  }

  await browser.close();
  console.log('✅ การทำงานเสร็จสิ้น');
}

runViewBot();