import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { existsSync } from 'node:fs'

const expectedProjects = [
  ['KlassMate', 'https://klassmate-legacy.pages.dev'],
  ['P Motors', 'https://pmotors-mu.vercel.app'],
  ['Elevate Labs', 'https://elevatelabs.pages.dev'],
  ['Agron AI', 'https://agronai.netlify.app'],
]

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`layout, images, and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const portrait = page.getByRole('img', { name: 'Shaun Moss, web developer based in Zambia' })
    await expect(portrait).toBeVisible()
    await expect(portrait).toHaveAttribute('src', '/images/shaun-profile.jpg')
    await expect
      .poll(() =>
        portrait.evaluate(
          (image: HTMLImageElement) =>
            image.complete && image.naturalWidth === 960 && image.naturalHeight === 1280,
        ),
      )
      .toBe(true)
    await expect(page.getByRole('img', { name: /SM initials/ })).toHaveCount(0)
    for (const id of ['about', 'services', 'projects', 'skills', 'process', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await expect(page.locator(`#${id} h2`)).toBeVisible()
      const size = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: innerWidth,
      }))
      expect(size.content, `overflow in ${id}`).toBeLessThanOrEqual(size.viewport)
    }
    await expect(page.locator('.browser-frame img')).toHaveCount(
      existsSync('public/images/projects/elevatelabs.webp') ? 4 : 3,
    )
    if (!existsSync('public/images/projects/elevatelabs.webp')) {
      await expect(page.locator('.project-elevatelabs .project-image-fallback')).toBeVisible()
      const titleBox = await page
        .locator('.project-elevatelabs .project-image-fallback strong')
        .boundingBox()
      const previewBox = await page.locator('.project-elevatelabs .project-preview').boundingBox()
      expect(titleBox!.y + titleBox!.height).toBeLessThanOrEqual(previewBox!.y + previewBox!.height)
    }
    for (const image of await page.locator('.browser-frame img').all()) {
      await expect
        .poll(() =>
          image.evaluate(
            (element: HTMLImageElement) => element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true)
    }
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(accessibility.violations).toEqual([])
    expect(errors).toEqual([])
  })
}

test('all anchor, project, and contact links are accurate and secure', async ({ page }) => {
  await page.goto('/')
  for (const anchor of await page.locator('a[href^="#"]').all()) {
    const href = await anchor.getAttribute('href')
    await expect(page.locator(href!)).toHaveCount(1)
  }
  await page.getByRole('link', { name: 'View My Work', exact: true }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.getByRole('heading', { name: /A few ideas/ })).toBeInViewport()
  for (const [name, url] of expectedProjects) {
    const link = page.getByRole('link', { name: `Visit ${name} website`, exact: true })
    await expect(link).toHaveAttribute('href', url)
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
  for (const link of await page.locator('a[href^="https://wa.me"]').all()) {
    const url = new URL((await link.getAttribute('href'))!)
    expect(url.pathname).toBe('/260972205054')
    expect(url.searchParams.get('text')).toBe(
      'Hello Shaun, I found your portfolio and would like to discuss a website project.',
    )
  }
  for (const link of await page.locator('a[href^="mailto:"]').all()) {
    await expect(link).toHaveAttribute('href', 'mailto:shaunmosssiankope@gmail.com')
  }
  await expect(page.getByRole('link', { name: 'View GitHub', exact: true })).toHaveAttribute(
    'href',
    'https://github.com/DevShaunMoss',
  )
  await expect(page.getByRole('link', { name: 'View Code', exact: true })).toHaveAttribute(
    'href',
    'https://github.com/DevShaunMoss/AgronAI',
  )
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
})

test('mobile menu supports keyboard, focus wrapping, Escape, and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const button = page.getByRole('button', { name: 'Open navigation menu' })
  await button.focus()
  await page.keyboard.press('Enter')
  const close = page.getByRole('button', { name: 'Close navigation menu' })
  await expect(close).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Shift+Tab')
  await expect(
    page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Let’s Talk' }),
  ).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(button).toBeFocused()
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await button.click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: /Projects/ })
    .click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  await expect(page.locator('#projects')).toBeFocused()
  await button.click()
  await page.locator('header').getByRole('link', { name: 'Shaun Moss — home' }).click()
  await expect(page).toHaveURL(/#home$/)
  await expect(button).toHaveAttribute('aria-expanded', 'false')
})

test('mobile menu itself passes accessibility checks', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  const results = await new AxeBuilder({ page })
    .include('header')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(results.violations).toEqual([])
})

test('email and phone clipboard buttons copy their real values', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#contact')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByRole('button', { name: 'Email address copied' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'shaunmosssiankope@gmail.com',
  )
  await page.getByRole('button', { name: 'Copy phone number' }).click()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('+260972205054')
})

test('clipboard denial gives honest, accessible feedback', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Permission denied')) },
    }),
  )
  await page.goto('/#contact')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(
    page.getByRole('status').filter({ hasText: 'Select and copy the text manually.' }),
  ).toBeVisible()
})

test('missing project images fall back to truthful project previews', async ({ page }) => {
  await page.route('**/images/shaun-profile.jpg', (route) =>
    route.fulfill({ status: 404, body: '' }),
  )
  await page.route('**/images/projects/*.webp', (route) => route.fulfill({ status: 404, body: '' }))
  await page.goto('/#projects')
  await page.locator('#projects').scrollIntoViewIfNeeded()
  await expect(page.locator('.project-image-fallback')).toHaveCount(4)
  for (const [name] of expectedProjects)
    await expect(
      page.locator('.project-image-fallback').getByText(name, { exact: false }),
    ).toBeVisible()
  await expect(page.getByRole('img', { name: /SM initials/ })).toHaveCount(1)
})

test('metadata, reduced motion, and keyboard skip link are configured', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Shaun Moss | Web Developer & Digital Creator')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /web developer based in Zambia/,
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    '/images/og-cover.jpg',
  )
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  )
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('opacity', '1')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const robots = await page.request.get('/robots.txt')
  expect(robots.ok()).toBe(true)
  expect(await robots.text()).toContain('Allow: /')
})

test('motion entrances settle and navigation remains functional', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('.headline-line').first()).toHaveCSS('opacity', '1')
  await expect(page.locator('.portrait-composition')).toHaveCSS('opacity', '1')
  await page.getByRole('link', { name: 'View My Work', exact: true }).click()
  await expect(page.locator('.project-card').first()).toHaveCSS('opacity', '1')
})
