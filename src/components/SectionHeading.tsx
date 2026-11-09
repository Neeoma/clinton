import Reveal from './Reveal'

interface Props {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
  eyebrowAfter?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
  eyebrowAfter = false,
}: Props) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <Reveal>
        <p className={`eyebrow ${centered ? 'inline-flex items-center gap-3' : 'eyebrow-line'}`}>
          {centered && <span className="h-px w-8 bg-gold/70" />}
          {eyebrow}
          {centered && <span className="h-px w-8 bg-gold/70" />}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`display mt-5 text-[clamp(2rem,4.2vw,3.5rem)] ${light ? 'text-ink' : 'text-cream'}`}>
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p className={`mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base ${centered ? 'mx-auto' : ''} ${light ? 'text-ink/65' : 'text-mist'}`}>
            {description}
          </p>
        </Reveal>
      )}
      {!eyebrowAfter && (
        <Reveal delay={0.2}>
          <div className={`mt-8 h-px w-20 bg-gradient-to-r from-gold to-transparent ${centered ? 'mx-auto' : ''}`} />
        </Reveal>
      )}
    </div>
  )
}
