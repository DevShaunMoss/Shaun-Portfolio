export const currentYear = new Date().getFullYear()
const email = 'shaunmosssiankope@gmail.com'
const phone = '+260972205054'
const inquiryMessage =
  'Hello Shaun, I found your portfolio and would like to discuss a website project.'
export const site = {
  name: 'Shaun Moss',
  title: 'Web Developer',
  location: 'Zambia',
  email,
  phone,
  github: 'https://github.com/DevShaunMoss',
  whatsapp: `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(inquiryMessage)}`,
  emailUrl: `mailto:${email}`,
  profileImage: '/images/shaun-profile.jpg',
} as const
export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const
