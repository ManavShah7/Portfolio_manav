import { chromium } from 'playwright'

const url = process.argv[2]
const out = process.argv[3]
const height = Number(process.argv[4] || 2701)

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1900, height: 1000 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
})
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.setViewportSize({ width: 1900, height: Math.min(height, 30000) })
await page.waitForTimeout(600)
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log('shot', out)
