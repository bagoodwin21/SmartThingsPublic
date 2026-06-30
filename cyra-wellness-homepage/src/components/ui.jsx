import { useReveal } from '../hooks/useReveal'

/* Max-width page container with responsive horizontal padding. */
export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

/*
 * Reveal — wraps children in a scroll-triggered fade/slide-up.
 * `delay` (ms) lightly staggers items in a grid.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const { ref, isVisible } = useReveal()
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}

/*
 * Button — primary (terracotta) and secondary (outline) variants.
 * CTAs are visual-only / anchor placeholders for this mockup; wire to
 * OptiMantra booking + the symptom quiz in production.
 */
export function Button({ children, href = '#book', variant = 'primary', className = '', ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
  const variants = {
    primary:
      'bg-terracotta text-ivory shadow-soft hover:bg-terracotta-dark hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'border border-terracotta/40 bg-ivory/70 text-cocoa hover:border-terracotta hover:bg-ivory hover:-translate-y-0.5',
    ghost: 'text-cocoa hover:text-terracotta',
  }
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}

/* Small eyebrow label used above section headings. */
export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-terracotta ${className}`}
    >
      <span className="h-px w-6 bg-terracotta/50" aria-hidden="true" />
      {children}
    </span>
  )
}

/*
 * Photo — photography-forward placeholder.
 *
 * Uses a warm Unsplash lifestyle image with a graceful gradient fallback if the
 * network image fails to load, so the layout never breaks.
 * PRODUCTION: replace each `src` with real, compliance-reviewed CYRA photography
 * (no real patient images). See data-prod-note for what each slot should show.
 */
export function Photo({ src, alt, prodNote, className = '', imgClassName = '', children }) {
  return (
    <div className={`relative overflow-hidden bg-blush ${className}`} data-prod-note={prodNote}>
      {/* Warm gradient base — always visible behind/under the photo as a fallback. */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blush via-sand to-sage-soft"
        aria-hidden="true"
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          // Hide the broken image and let the gradient + label stand in.
          e.currentTarget.style.display = 'none'
        }}
        className={`relative h-full w-full object-cover ${imgClassName}`}
      />
      {children}
    </div>
  )
}
