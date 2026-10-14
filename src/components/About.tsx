import { ArrowUpRight, Braces, Palette, Sparkles, Layers } from 'lucide-react'
import { site } from '../data/site'
import { Reveal } from './Reveal'
const interests = [
  { icon: Braces, label: 'Development' },
  { icon: Palette, label: 'Design' },
  { icon: Sparkles, label: 'Creativity' },
  { icon: Layers, label: 'Digital products' },
]
export function About() {
  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-title"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal className="section-label">
          <span className="eyebrow">
            <span className="section-number">01 /</span> A LITTLE ABOUT ME
          </span>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <h2 id="about-title">
              A developer’s mindset.
              <br />
              <span className="muted-heading">A designer’s eye.</span>
            </h2>
            <p className="about-signoff">Curious by nature. Creative by choice.</p>
            <a className="text-link" href={site.github} target="_blank" rel="noopener noreferrer">
              Explore my GitHub <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={0.08} className="about-copy">
            <p className="about-intro">
              I’m Shaun, a Computer Science student who loves turning a good idea into something you
              can actually use.
            </p>
            <p>
              My focus is web development. I bring clean design, responsive interfaces, and modern
              technologies together to help businesses and ideas find their place online.
            </p>
            <p>
              I also work with graphic design, digital branding, Meta Ads, and Google Ads — a
              creative perspective that informs the way I build. Real projects are where I learn,
              experiment, and keep getting better.
            </p>
            <div className="interest-list">
              {interests.map(({ icon: Icon, label }) => (
                <span key={label}>
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
