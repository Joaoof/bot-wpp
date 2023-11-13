import puppeteer from "puppeteer";

 (async function main() {
    try {
      const browser = await puppeteer.launch({ args: ['--disable-setuid-sandbox', '--no-sandbox'], headless: false })
      const page = await browser.newPage()

      await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36")
      
      await page.goto("https://web.whatsapp.com/")

      await page.waitForSelector("._1Fm4m")
      await delay(5000)

      const contactName = "Bhayron"
      await page.waitForSelector(`span[title='${contactName}']`,  { timeout: 60000 });
      await page.click(`span[title='${contactName}']`)
      await page.waitForSelector("._2lSWV", { timeout: 60000 })

      const editor = await page.$("div[tabindex= '-1']")
      await editor.focus()

      const amountOfMessages = 2;

      for (var i = 0; i < amountOfMessages; i++) {
        await page.evaluate(() => {
            const message = "Luis é bixaaaa"
            document.execCommand("insertText", false, message)
        })
        await page.click("span[data-icon='send']")
        await delay(500)
      }

    } catch (e) {
        console.error("error mine", e)
    }
 })();

 function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    })
 }