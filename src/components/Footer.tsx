import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { site, currentYear } from '../data/site'
import { Brand } from './Brand'
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>Turning good ideas into digital experiences.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-socials">
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={site.emailUrl}>
              Email <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {currentYear} Shaun Moss. Built with care.</p>
          <span className="footer-built">Designed with intention. Developed with React.</span>
          <a href="#home" className="back-top">
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
