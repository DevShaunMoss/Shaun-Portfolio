import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
await mkdir('public/images', { recursive: true })
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#faf9f6"/><path d="M64 122h1072M64 540h1072" stroke="#deddd7"/>
<rect x="65" y="56" width="43" height="43" rx="7" fill="#242428"/><text x="70" y="84" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="#ffffff">sm</text>
<text x="126" y="86" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="#242428">Shaun Moss<tspan fill="#6750cb">.</tspan></text>
<text x="67" y="186" font-family="Arial,sans-serif" font-size="12" letter-spacing="3" fill="#6c6b70">WEB DEVELOPER · DIGITAL CREATOR</text>
<text x="63" y="285" font-family="Arial,sans-serif" font-size="69" font-weight="bold" letter-spacing="-3" fill="#242428">Building digital</text>
<text x="63" y="365" font-family="Arial,sans-serif" font-size="69" font-weight="bold" letter-spacing="-3" fill="#242428">experiences that</text>
<text x="63" y="445" font-family="Arial,sans-serif" font-size="69" font-weight="bold" letter-spacing="-3" fill="#242428">make an <tspan fill="#6750cb">impact.</tspan></text>
<path d="M356 469q125-16 267-2" stroke="#6750cb" stroke-width="3" fill="none"/>
<rect x="850" y="175" width="285" height="302" rx="12" fill="#e9e5f0"/><circle cx="992" cy="326" r="113" stroke="#ffffff" fill="none"/>
<text x="884" y="355" font-family="Arial,sans-serif" font-size="107" font-weight="bold" letter-spacing="-8" fill="#514d5d">SM<tspan fill="#6750cb">.</tspan></text>
<g stroke="#6750cb" stroke-width="10" transform="translate(1094 177)"><path d="M0-39V39M-39 0H39M-28-28L28 28M-28 28L28-28"/></g>
<text x="66" y="585" font-family="Arial,sans-serif" font-size="14" fill="#6c6b70">Based in Zambia · Available for remote projects</text>
<text x="885" y="585" font-family="Arial,sans-serif" font-size="14" fill="#6c6b70">THOUGHTFULLY BUILT.</text>
</svg>`
await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile('public/images/og-cover.jpg')
console.log('Created public/images/og-cover.jpg (1200 × 630)')
