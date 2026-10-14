import { ArrowUpRight, CodeXml, Mail, MessageCircle } from 'lucide-react'
import { site } from '../data/site'
import { Reveal } from './Reveal'
import { CopyButton } from './CopyButton'
export function Contact() {
  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-title"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal>
          <div className="contact-top">
            <span className="eyebrow">
              <span className="section-number">06 /</span> LET’S MAKE SOMETHING GOOD
            </span>
            <span className="availability">
              <span className="status-dot" /> AVAILABLE FOR PROJECTS
            </span>
          </div>
        </Reveal>
        <div className="contact-grid">
          <Reveal>
            <h2 id="contact-title">
              Have a project
              <br />
              in mind?{' '}
              <span>
                Let’s build
                <br />
                something great.
              </span>
              <ArrowUpRight className="contact-heading-arrow" aria-hidden="true" />
            </h2>
            <p className="contact-description">
              Whether you need a business website, a landing page, or help bringing a digital idea
              to life, I’d be happy to discuss your project.
            </p>
            <a
              className="button button-violet contact-main-cta"
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={19} aria-hidden="true" />
              Message Me on WhatsApp
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal className="contact-methods" delay={0.08}>
            <div className="contact-method">
              <span className="contact-icon">
                <MessageCircle size={20} aria-hidden="true" />
              </span>
              <div>
                <span className="eyebrow">START A CONVERSATION</span>
                <a
                  className="contact-address"
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.phone}
                </a>
                <span className="contact-method-note">
                  WhatsApp is the easiest way to reach me.
                </span>
              </div>
              <CopyButton value={site.phone} label="Phone number" />
            </div>
            <div className="contact-method">
              <span className="contact-icon">
                <Mail size={20} aria-hidden="true" />
              </span>
              <div>
                <span className="eyebrow">MORE OF AN EMAIL PERSON?</span>
                <a className="contact-address email-address" href={site.emailUrl}>
                  {site.email}
                </a>
                <a className="text-link" href={site.emailUrl}>
                  Send an Email <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              <CopyButton value={site.email} label="Email address" />
            </div>
            <div className="contact-method">
              <span className="contact-icon">
                <CodeXml size={20} aria-hidden="true" />
              </span>
              <div>
                <span className="eyebrow">CODE & OTHER CURIOSITIES</span>
                <a
                  className="contact-address"
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DevShaunMoss
                </a>
                <a
                  className="text-link"
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              <ArrowUpRight size={20} className="contact-decoration" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
        <Reveal className="contact-bottom">
          <span>
            <span aria-hidden="true">✳</span> Good things start with a conversation.
          </span>
          <span className="mono">ZAMBIA → EVERYWHERE</span>
        </Reveal>
      </div>
    </section>
  )
}
