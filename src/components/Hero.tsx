import { useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Braces, CodeXml, Globe2 } from 'lucide-react'
import { site, currentYear } from '../data/site'
import { Reveal } from './Reveal'
function Asterisk() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M50 3v94M3 50h94M17 17l66 66M17 83l66-66" stroke="currentColor" strokeWidth="13" />
    </svg>
  )
}
export function Hero() {
  const [photoError, setPhotoError] = useState(false)
  const reducedMotion = useReducedMotion()
  const showPhoto = __PROFILE_IMAGE_EXISTS__ && !photoError
  return (
    <section id="home" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <Reveal>
              <div className="eyebrow hero-eyebrow">
                <span className="tiny-cross" aria-hidden="true">
                  +
                </span>{' '}
                WEB DEVELOPER · DIGITAL CREATOR
              </div>
            </Reveal>
            <h1 id="hero-title">
              {['Building digital', 'experiences that', 'make an'].map((line, index) => (
                <m.span
                  className="headline-line"
                  key={line}
                  initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.65,
                    delay: reducedMotion ? 0 : index * 0.08,
                  }}
                >
                  {line}
                  {index === 2 ? (
                    <>
                      {' '}
                      <span className="impact">
                        impact
                        <svg viewBox="0 0 270 18" fill="none" aria-hidden="true">
                          <path
                            d="M3 12C69 2 169 2 265 10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <span className="period">.</span>
                    </>
                  ) : (
                    ' '
                  )}
                </m.span>
              ))}
            </h1>
            <Reveal delay={0.22}>
              <p className="hero-description">
                I’m Shaun Moss, a web developer turning ideas into clean, responsive websites and
                practical digital products.
              </p>
            </Reveal>
            <Reveal delay={0.28} className="hero-actions">
              <a className="button button-dark" href="#projects">
                View My Work <ArrowDownRight size={19} aria-hidden="true" />
              </a>
              <a
                className="text-link hero-secondary"
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Let’s Work Together <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Reveal>
            <Reveal delay={0.33}>
              <p className="hero-location">
                <Globe2 size={15} aria-hidden="true" /> Based in Zambia{' '}
                <span aria-hidden="true">·</span> Available for remote projects
              </p>
            </Reveal>
          </div>
          <Reveal className="portrait-composition" delay={0.18}>
            <div className="portrait-topline mono">
              <span>THE PERSON BEHIND THE PIXELS</span>
              <span>01 / SM</span>
            </div>
            <div className={`portrait-card ${showPhoto ? 'has-photo' : ''}`}>
              {showPhoto ? (
                <img
                  className="portrait-image"
                  src={site.profileImage}
                  alt="Shaun Moss, web developer based in Zambia"
                  width={960}
                  height={1280}
                  fetchPriority="high"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div
                  className="portrait-placeholder"
                  role="img"
                  aria-label="SM initials — Shaun Moss’s portrait placeholder"
                >
                  <span className="portrait-code mono">&lt;hello world /&gt;</span>
                  <div className="portrait-initials">
                    SM<span>.</span>
                  </div>
                  <span className="portrait-coordinate mono">
                    BASED IN ZAMBIA / WORKING EVERYWHERE
                  </span>
                </div>
              )}
              <div className="portrait-caption">
                <div>
                  <strong>Shaun Moss</strong>
                  <span>Web Developer & Digital Creator</span>
                </div>
                <ArrowUpRight size={26} aria-hidden="true" />
              </div>
            </div>
            <div className="hero-asterisk">
              <Asterisk />
            </div>
            <div className="portrait-note">
              <span className="status-dot" />
              <span>
                Open to good ideas.
                <br />
                <strong>Available for projects.</strong>
              </span>
            </div>
            <div className="portrait-bottomline mono">
              <Braces size={15} aria-hidden="true" /> THOUGHTFULLY DESIGNED. CAREFULLY BUILT.
            </div>
          </Reveal>
        </div>
        <div className="hero-bottom">
          <a href="#about" className="scroll-cue">
            <span className="scroll-circle">
              <ArrowDown size={16} aria-hidden="true" />
            </span>
            <span>SCROLL TO EXPLORE</span>
          </a>
          <span className="hero-bottom-note">Good design meets thoughtful development.</span>
          <span className="hero-index mono">PORTFOLIO — {currentYear}</span>
        </div>
      </div>
      <div className="craft-strip">
        <div className="container craft-strip-inner">
          <span className="eyebrow">MY EVERYDAY TOOLKIT</span>
          <div className="toolkit">
            <span>
              <CodeXml size={20} aria-hidden="true" /> HTML & CSS
            </span>
            <span>
              <span className="tech-square" aria-hidden="true">
                JS
              </span>{' '}
              JavaScript
            </span>
            <span>
              <span className="react-symbol" aria-hidden="true">
                ⚛
              </span>{' '}
              React
            </span>
            <span>
              <span className="tech-square ts" aria-hidden="true">
                TS
              </span>{' '}
              TypeScript
            </span>
            <span>
              <span className="tailwind-symbol" aria-hidden="true">
                ≈
              </span>{' '}
              Tailwind CSS
            </span>
          </div>
          <span className="craft-dot" aria-hidden="true">
            ✳
          </span>
        </div>
      </div>
    </section>
  )
}
