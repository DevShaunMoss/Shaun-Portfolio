import { ArrowDownRight } from 'lucide-react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
export function Projects() {
  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-number">03 /</span> SELECTED WORK
            </div>
            <h2 id="projects-title">
              A few ideas,
              <br />
              <span className="muted-heading">brought to life.</span>
            </h2>
          </div>
          <div className="project-heading-aside">
            <p>
              Real projects. Thoughtful interfaces.
              <br />A little glimpse of what I build.
            </p>
            <span className="mono">
              EXPLORE THE WORK <ArrowDownRight size={26} aria-hidden="true" />
            </span>
          </div>
        </Reveal>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
