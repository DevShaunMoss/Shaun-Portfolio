import { CodeXml, Megaphone, PenTool } from 'lucide-react'
export const services = [
  {
    number: '01',
    title: 'Web development',
    icon: CodeXml,
    description:
      'Modern, responsive websites that give businesses, startups, and brands a professional digital presence.',
    items: [
      'Business & startup websites',
      'Landing pages',
      'Portfolio websites',
      'Responsive website development',
      'Web interfaces',
    ],
    primary: true,
    note: 'MY PRIMARY FOCUS',
  },
  {
    number: '02',
    title: 'Design & branding',
    icon: PenTool,
    description:
      'Thoughtful digital design that helps you communicate clearly and build a consistent visual identity.',
    items: [
      'Graphic design',
      'Social media graphics',
      'Marketing creatives',
      'Promotional materials',
      'Digital branding support',
    ],
    primary: false,
    note: 'THE CREATIVE TOUCH',
  },
  {
    number: '03',
    title: 'Digital advertising',
    icon: Megaphone,
    description:
      'Advertising support across Meta and Google to help your business connect with relevant audiences.',
    items: [
      'Meta Ads management',
      'Facebook advertising',
      'Instagram advertising',
      'Google Ads management',
      'Campaign creative support',
    ],
    primary: false,
    note: 'REACH THE RIGHT PEOPLE',
  },
]
