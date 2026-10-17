export interface Project {
  id: string
  name: string
  category: string
  description: string
  url: string
  image: string
  imageAlt: string
  role: string
  tags: string[]
  theme: string
  featured?: boolean
  repository?: string
  status?: string
}
// Descriptive tags are project disciplines. Only add technology tags after verifying them.
export const projects: Project[] = [
  {
    id: 'klassmate',
    name: 'KlassMate',
    category: 'EDUCATION TECHNOLOGY · WEB APPLICATION',
    description:
      'An education-focused platform bringing learning resources and interactive examination practice into one accessible digital experience.',
    url: 'https://klassmate-legacy.pages.dev',
    image: '/images/projects/klassmate.webp',
    imageAlt: 'Desktop view of the published KlassMate legacy examination platform',
    role: 'Personal software project',
    tags: ['Web application', 'Education', 'UI development'],
    theme: 'klassmate',
    featured: true,
    status: 'Flagship project',
  },
  {
    id: 'pmotors',
    name: 'P Motors',
    category: 'AUTOMOTIVE · BUSINESS WEBSITE',
    description:
      'A modern automotive website with a considered presentation of vehicles, detailed listings, and a straightforward path to customer inquiries.',
    url: 'https://pmotors-mu.vercel.app',
    image: '/images/projects/pmotors.webp',
    imageAlt: 'Desktop view of the published P Motors automotive website',
    role: 'Website design & development',
    tags: ['Business website', 'Responsive design', 'User experience'],
    theme: 'pmotors',
  },
  {
    id: 'elevatelabs',
    name: 'Elevate Labs',
    category: 'DIGITAL AGENCY · BRAND WEBSITE',
    description:
      'A digital brand and agency website presenting technology, web development, design, and digital marketing services with a clear visual identity.',
    url: 'https://elevatelabsweb.pages.dev',
    image: '/images/projects/elevatelabs.webp',
    imageAlt: 'Desktop view of the published Elevate Labs agency website',
    role: 'Digital brand & website project',
    tags: ['Brand website', 'Web design', 'Digital identity'],
    theme: 'elevatelabs',
  },
  {
    id: 'agron-ai',
    name: 'Agron AI',
    category: 'AGRICULTURE TECHNOLOGY · AI CONCEPT',
    description:
      'An agriculture technology concept exploring how artificial intelligence and digital tools could support smarter farming. A prototype for ideas still taking shape.',
    url: 'https://agronai.netlify.app',
    image: '/images/projects/agron-ai.webp',
    imageAlt: 'Desktop view of the published Agron AI agriculture concept website',
    role: 'Personal concept project',
    tags: ['Concept prototype', 'Agriculture', 'HTML / CSS / JavaScript'],
    theme: 'agron',
    repository: 'https://github.com/DevShaunMoss/AgronAI',
    status: 'Concept / prototype',
  },
]
