import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timeout.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setStatus('idle'), 3500)
  }
  return (
    <div className="copy-wrapper">
      <button
        className="copy-button"
        onClick={copy}
        aria-label={status === 'copied' ? `${label} copied` : `Copy ${label.toLowerCase()}`}
        title={`Copy ${label.toLowerCase()}`}
      >
        {status === 'copied' ? (
          <Check size={17} aria-hidden="true" />
        ) : (
          <Copy size={17} aria-hidden="true" />
        )}
      </button>
      <span className="copy-feedback" role="status">
        {status === 'copied'
          ? 'Copied!'
          : status === 'failed'
            ? 'Select and copy the text manually.'
            : ''}
      </span>
    </div>
  )
}
