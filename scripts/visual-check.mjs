import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'win32' ? 'chrome' : 'chromium'),
  headless: true,
})
const results = []
try {
  for (const width of [1440, 390, 360, 768]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
    })
    const consoleErrors = []
    page.on('pageerror', (error) => consoleErrors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `artifacts/hero-${width}.png` })
    for (const id of ['about', 'services', 'projects', 'skills', 'process', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await page.waitForTimeout(100)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: `artifacts/portfolio-${width}.png`, fullPage: true })
    if (width === 1440 || width === 390) {
      for (const id of ['services', 'projects', 'contact']) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded()
        await page.waitForTimeout(150)
        await page.screenshot({ path: `artifacts/${id}-${width}.png` })
      }
    }
    results.push({
      width,
      consoleErrors,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    })
    await page.close()
  }
  await writeFile('artifacts/visual-check.json', JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results))
} finally {
  await browser.close()
}
