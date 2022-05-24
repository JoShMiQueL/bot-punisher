const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const twitchinsights = async () => {
  const [page, browser] = await setup();
  await page.goto('https://twitchinsights.net/bots');
  await page.waitForSelector('[name="tonline_length"]');
  await page.select('[name="tonline_length"]', '-1');
  await page.waitForSelector('#tonline');
  const bots = await page.evaluate(() => {
    const bots = document.querySelectorAll('#tonline tr');
    const bots_names = Array.from(bots).map(bot => bot.querySelector('td:nth-child(1) > a')).filter(n => n).map(bot => bot.textContent.trim());
    return bots_names;
  });
  await browser.close();
  return bots;
}

const streamscharts = async () => {
  const [page, browser] = await setup();
  await page.goto('https://streamscharts.com/tools/bots');
  await page.waitForSelector('[name="bots-table_length"]');
  await page.select('[name="bots-table_length"]', '-1');
  await page.waitForSelector('#bots-table');
  const bots = await page.evaluate(() => {
    const bots = document.querySelectorAll('#bots-table tr');
    const bots_names = Array.from(bots).map(bot => bot.querySelector('td:nth-child(1)')).filter(n => n).map(bot => bot.textContent.trim());
    return bots_names;
  });
  await browser.close();
  return bots;
}

const writeToJSON = async (bots) => {
  await fs.writeFile('./bots_list.json', JSON.stringify(bots, null, 2));
}

const start = async () => {
  console.log(`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Getting bots list from Internet...`);
  await writeToJSON([...new Set(await streamscharts(), await twitchinsights())]);
  console.log(`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] Bots list was saved to ./bots_list.json`);
}

const setup = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 720
    }
  });
  const page = await browser.newPage();
  return [page, browser];
}

module.exports = start;