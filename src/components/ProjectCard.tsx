import { useState } from 'react'
import { ArrowUpRight, ExternalLink, CodeXml } from 'lucide-react'
import type { Project } from '../data/projects'
import { Reveal } from './Reveal'
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imageError, setImageError] = useState(!__PROJECT_IMAGE_FILES__.includes(project.image))
  return (
    <Reveal
      className={`project-card project-${project.theme} ${project.featured ? 'project-featured' : ''}`}
      delay={(index % 2) * 0.08}
    >
      <article>
        <a
          className={`project-preview ${imageError ? 'is-placeholder' : ''}`}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} website in a new tab`}
        >
          <div className="project-preview-top">
            <span className="mono">
              {String(index + 1).padStart(2, '0')} / {project.name.toUpperCase()}
            </span>
            {project.status ? (
              <span className="project-status">{project.status}</span>
            ) : (
              <ExternalLink size={16} aria-hidden="true" />
            )}
          </div>
          <div className="browser-frame">
            <div className="browser-bar" aria-hidden="true">
              <span className="browser-dots">
                <i />
                <i />
                <i />
              </span>
              <span>{new URL(project.url).hostname}</span>
              <span className="browser-plus">+</span>
            </div>
            {imageError ? (
              <div className="project-image-fallback">
                <span className="eyebrow">{project.category}</span>
                <strong>
                  {project.name}
                  <span>.</span>
                </strong>
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.imageAlt}
                width={1440}
                height={960}
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          <span className="project-hover-arrow" aria-hidden="true">
            <ArrowUpRight size={24} />
          </span>
        </a>
        <div className="project-details">
          <p className="project-category eyebrow">{project.category}</p>
          <div className="project-title-row">
            <h3>{project.name}</h3>
            <a
              className="project-visit text-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} website`}
            >
              Visit Website <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="project-description">{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="project-role">
            <span>{project.role}</span>
            {project.repository ? (
              <a
                href={project.repository}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeXml size={14} aria-hidden="true" />
                View Code <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
