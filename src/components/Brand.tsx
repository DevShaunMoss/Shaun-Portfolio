export function Brand({ onNavigate }: { onNavigate?: () => void } = {}) {
  return (
    <a className="brand" href="#home" aria-label="Shaun Moss — home" onClick={onNavigate}>
      <span className="brand-monogram" aria-hidden="true">
        sm<span>.</span>
      </span>
      <span className="brand-name">
        Shaun Moss<span className="brand-dot">.</span>
      </span>
    </a>
  )
}
