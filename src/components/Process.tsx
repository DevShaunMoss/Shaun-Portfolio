import { ArrowUpRight } from 'lucide-react'
import { processSteps } from '../data/skills'
import { Reveal } from './Reveal'
export function Process() {
  return (
    <section
      id="process"
      className="section process-section"
      aria-labelledby="process-title"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-number">05 /</span> HOW I APPROACH A PROJECT
            </div>
            <h2 id="process-title">
              From idea to
              <br />
              online presence.
            </h2>
          </div>
          <p>
            A collaborative approach.
            <br />A clear direction at every step.
          </p>
        </Reveal>
        <div className="process-timeline" role="list">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.07}>
              <div role="listitem">
                <div className="process-number">
                  <span>{step.number}</span>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
