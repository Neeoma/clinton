import { useMemo, useState, type FormEvent } from 'react'
import { Check, ArrowRight, MessageCircle, Loader2, LockKeyhole } from 'lucide-react'
import { addLead } from '../lib/leads'
import { divisions, serviceOptions, whatsappLink, type DivisionKey } from '../data/site'

interface Props {
  source: string
  lockedDivision?: DivisionKey
  defaultService?: string
  compact?: boolean
  className?: string
}

interface Errors {
  name?: string
  email?: string
  message?: string
  consent?: string
}

export default function InquiryForm({ source, lockedDivision, defaultService, compact = false, className = '' }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [division, setDivision] = useState<string>(lockedDivision ?? '')
  const [service, setService] = useState(defaultService ?? '')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  const divisionLabel = (key: string) => divisions.find((d) => d.key === key)?.title ?? 'General Inquiry'

  const serviceList = useMemo(() => {
    if (division && serviceOptions[division as DivisionKey]) return serviceOptions[division as DivisionKey]
    return []
  }, [division])

  const reset = () => {
    setName(''); setEmail(''); setPhone(''); setDivision(lockedDivision ?? ''); setService(defaultService ?? '')
    setMessage(''); setConsent(false); setErrors({}); setReference(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email address.'
    if (message.trim().length < 10) next.message = 'Please add a short description (at least 10 characters).'
    if (!consent) next.consent = 'Please confirm before submitting.'
    setErrors(next)
    if (Object.keys(next).length) return

    setSubmitting(true)
    window.setTimeout(() => {
      const lead = addLead({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        division: division ? divisionLabel(division) : 'General Inquiry',
        service: service || 'Not specified',
        message: message.trim(),
        source,
      })
      setSubmitting(false)
      setReference(lead.id)
    }, 550)
  }

  if (reference) {
    return (
      <div className={`rounded-sm border border-gold/30 bg-ink-800/80 p-8 text-center ${className}`}>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-gold/10 text-gold">
          <Check size={26} />
        </div>
        <h3 className="mt-6 font-display text-2xl text-cream">Thank you, {name.split(' ')[0]}.</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mist">
          Your inquiry has been recorded. Reference <span className="font-heading font-semibold text-gold">{reference}</span>.
          Our team will review the details and follow up with you.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink(`Hello, my inquiry reference is ${reference}.`)} target="_blank" rel="noreferrer" className="btn-outline !px-5 !py-3">
            <MessageCircle size={14} /> Chat on WhatsApp
          </a>
          <button onClick={reset} className="btn-ghost !px-5 !py-3">Send another inquiry</button>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-mist/55">
          Demo mode: submissions are saved in this browser&apos;s Inquiry Dashboard. Connect a database and email service to receive them in production.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
        <div>
          <label className="field-label" htmlFor={`${source}-name`}>Full Name <span className="text-gold">*</span></label>
          <input id={`${source}-name`} className={`field ${errors.name ? '!border-rose-400/70' : ''}`} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          {errors.name && <p className="mt-1.5 text-xs text-rose-300">{errors.name}</p>}
        </div>
        <div>
          <label className="field-label" htmlFor={`${source}-email`}>Email Address <span className="text-gold">*</span></label>
          <input id={`${source}-email`} type="email" className={`field ${errors.email ? '!border-rose-400/70' : ''}`} placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          {errors.email && <p className="mt-1.5 text-xs text-rose-300">{errors.email}</p>}
        </div>
        <div>
          <label className="field-label" htmlFor={`${source}-phone`}>Phone / WhatsApp</label>
          <input id={`${source}-phone`} type="tel" className="field" placeholder="+234 ..." value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
        <div>
          <label className="field-label" htmlFor={`${source}-division`}>Division</label>
          {lockedDivision ? (
            <input id={`${source}-division`} className="field !text-gold" value={divisionLabel(lockedDivision)} readOnly />
          ) : (
            <select
              id={`${source}-division`}
              className="field"
              value={division}
              onChange={(e) => { setDivision(e.target.value); setService('') }}
            >
              <option value="">Select a division (optional)</option>
              {divisions.map((d) => <option key={d.key} value={d.key}>{d.title}</option>)}
            </select>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor={`${source}-service`}>Service of Interest</label>
          <select id={`${source}-service`} className="field" value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">{serviceList.length ? 'Select a service (optional)' : 'Choose a division first, or tell us below'}</option>
            {serviceList.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor={`${source}-message`}>How can we help? <span className="text-gold">*</span></label>
          <textarea
            id={`${source}-message`}
            rows={compact ? 3 : 4}
            className={`field resize-y ${errors.message ? '!border-rose-400/70' : ''}`}
            placeholder="Tell us a little about what you need..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && <p className="mt-1.5 text-xs text-rose-300">{errors.message}</p>}
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-mist/80">
        <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#C9A961]" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I agree that my details may be used to respond to this inquiry, as described in the Privacy Policy.</span>
      </label>
      {errors.consent && <p className="mt-1.5 text-xs text-rose-300">{errors.consent}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={submitting} className="btn-gold min-w-[190px] disabled:cursor-wait disabled:opacity-70">
          {submitting ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : <>Send Inquiry <ArrowRight size={15} /></>}
        </button>
        <span className="flex items-center gap-1.5 text-[11px] text-mist/55"><LockKeyhole size={12} /> Your details stay private</span>
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-mist/45">
        Demo mode: inquiries are stored locally in this browser. Connect a backend such as Supabase to receive and manage leads in production.
      </p>
    </form>
  )
}
