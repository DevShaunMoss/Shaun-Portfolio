import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation, site } from '../data/site'
import { Brand } from './Brand'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-15% 0px -60% 0px' },
    )
    navigation.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
      if (event.key === 'Tab') {
        const links = menu.current?.querySelectorAll<HTMLAnchorElement>('a')
        const last = links?.[links.length - 1]
        if (event.shiftKey && document.activeElement === menuButton.current) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          menuButton.current?.focus()
        }
      }
    }
    const media = window.matchMedia('(min-width: 1024px)')
    const onResize = () => {
      if (media.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onResize)
    }
  }, [open])
  const selectSection = (id: string) => {
    setActive(id)
    setOpen(false)
    if (open) document.getElementById(id)?.focus({ preventScroll: true })
  }
  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-is-open' : ''}`}
    >
      <div className="container navbar">
        <Brand onNavigate={() => selectSection('home')} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => selectSection(id)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="button button-dark nav-cta"
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Let’s Talk <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <m.div
            ref={menu}
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0, height: reducedMotion ? 'auto' : 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: reducedMotion ? 'auto' : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
          >
            <nav aria-label="Mobile navigation" className="container mobile-nav">
              {navigation.map(({ id, label }, index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={active === id ? 'is-active' : ''}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={() => selectSection(id)}
                >
                  <span className="mono">0{index + 1}</span>
                  {label}
                  <ArrowUpRight size={22} aria-hidden="true" />
                </a>
              ))}
              <a
                className="button button-violet"
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Let’s Talk <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <p className="mobile-menu-note">Based in Zambia. Building for everywhere.</p>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
