import { ArrowUpRight, Braces, Sparkles } from 'lucide-react'
import { developmentSkills, additionalSkills } from '../data/skills'
import { site } from '../data/site'
import { Reveal } from './Reveal'
export function Skills() {
  return (
    <section
      id="skills"
      className="section skills-section"
      aria-labelledby="skills-title"
      tabIndex={-1}
    >
      <div className="container skills-layout">
        <Reveal>
          <div className="eyebrow">
            <span className="section-number">04 /</span> THE TOOLKIT
          </div>
          <h2 id="skills-title">
            Built on a<br />
            solid foundation.
          </h2>
          <p className="skills-intro">
            The tools I work with and the creative skills I bring to the table. Always learning,
            always building.
          </p>
          <a className="text-link" href={site.github} target="_blank" rel="noopener noreferrer">
            Follow what I’m building <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal delay={0.08} className="skill-groups">
          <div className="skill-group">
            <h3>
              <Braces size={20} aria-hidden="true" />
              Core development<span className="mono">01</span>
            </h3>
            <ul className="skill-tags">
              {developmentSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-group additional">
            <h3>
              <Sparkles size={20} aria-hidden="true" />
              The creative side<span className="mono">02</span>
            </h3>
            <ul className="skill-tags">
              {additionalSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
