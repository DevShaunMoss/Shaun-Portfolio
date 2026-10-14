import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../data/services'
import { site } from '../data/site'
import { Reveal } from './Reveal'
export function Services() {
  return (
    <section
      id="services"
      className="section services-section"
      aria-labelledby="services-title"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-number">02 /</span> WHAT I CAN DO FOR YOU
            </div>
            <h2 id="services-title">
              Your next idea.
              <br />
              My next build.
            </h2>
          </div>
          <p>
            A strong website is the starting point.
            <br />
            Thoughtful design and digital support
            <br className="desktop-break" /> help bring the whole picture together.
          </p>
        </Reveal>
        <div className="services-grid">
          {services.map(
            ({ number, title, icon: Icon, description, items, primary, note }, index) => (
              <Reveal delay={index * 0.08} key={title}>
                <article className={`service-card ${primary ? 'service-primary' : ''}`}>
                  <div className="service-top">
                    <span className="service-icon">
                      <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="mono">{number}</span>
                  </div>
                  <div className="service-note eyebrow">{note}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>
                        <Check size={14} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="service-link"
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Discuss ${title.toLowerCase()} on WhatsApp`}
                  >
                    Let’s make it happen <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            ),
          )}
        </div>
        <Reveal className="services-cta">
          <p>
            Have something specific in mind? <span>Let’s find the right approach.</span>
          </p>
          <a className="text-link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            Discuss Your Project <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
