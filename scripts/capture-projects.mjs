import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'

const projects = [
  ['klassmate', 'https://klassmate-legacy.pages.dev'],
  ['pmotors', 'https://pmotors-mu.vercel.app'],
  ['elevatelabs', 'https://elevatelabsweb.pages.dev'],
  ['agron-ai', 'https://agronai.netlify.app'],
]
await mkdir('public/images/projects', { recursive: true })
await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch({
  headless: true,
  channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === 'win32' ? 'chrome' : 'chromium'),
})
try {
  const results = await Promise.all(
    projects.map(async ([name, url]) => {
      const page = await browser.newPage({
        viewport: { width: 1440, height: 960 },
        deviceScaleFactor: 1,
      })
      try {
        const response = await page
          .goto(url, { waitUntil: 'networkidle', timeout: 45000 })
          .catch(async () => {
            return page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
          })
        await page.waitForTimeout(2200)
        await page.evaluate(() => document.fonts.ready)
        const title = await page.title()
        const text = (await page.locator('body').innerText()).slice(0, 10000)
        if (!text.trim())
          throw new Error(
            'The published website renders a blank page; use the project placeholder.',
          )
        if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`)
        if (/404|site not found|deployment.*not found|access denied/i.test(title))
          throw new Error(`Unavailable: ${title}`)
        const screenshot = await page.screenshot({ fullPage: false, animations: 'disabled' })
        await sharp(screenshot).webp({ quality: 86 }).toFile(`public/images/projects/${name}.webp`)
        const result = {
          name,
          url,
          status: response.status(),
          title,
          screenshot: `public/images/projects/${name}.webp`,
          text,
        }
        console.log(
          JSON.stringify({ name, status: result.status, title, screenshot: result.screenshot }),
        )
        return result
      } catch (error) {
        const result = { name, url, error: String(error) }
        console.log(JSON.stringify(result))
        return result
      } finally {
        await page.close()
      }
    }),
  )
  await writeFile(
    'artifacts/project-verification.json',
    JSON.stringify({ capturedAt: new Date().toISOString(), projects: results }, null, 2),
  )
} finally {
  await browser.close()
}
