import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import { config, divisions, whatsappLink } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink pt-20">
      <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[120px]" />
      <div className="shell relative z-10">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-mist">
              {config.tagline}
            </p>
            <p className="mt-5 font-heading text-[10px] uppercase tracking-[0.22em] text-gold/80">
              {config.strapline}
            </p>
            <div className="mt-7 flex gap-2.5">
              {[
                { icon: Instagram, href: config.social.instagram, label: 'Instagram' },
                { icon: Facebook, href: config.social.facebook, label: 'Facebook' },
                { icon: Linkedin, href: config.social.linkedin, label: 'LinkedIn' },
                { icon: ArrowUpRight, href: config.social.tiktok, label: 'TikTok' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-sm border border-white/10 text-mist transition-all hover:border-gold/60 hover:text-gold"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-cream">Explore</h3>
            <ul className="mt-6 space-y-3.5 text-sm text-mist">
              <li><Link className="transition-colors hover:text-gold" to="/">Home</Link></li>
              <li><Link className="transition-colors hover:text-gold" to="/about">About Us</Link></li>
              <li><Link className="transition-colors hover:text-gold" to="/services">Our Services</Link></li>
              <li><Link className="transition-colors hover:text-gold" to="/projects">Our Projects</Link></li>
              <li><Link className="transition-colors hover:text-gold" to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-cream">Divisions</h3>
            <ul className="mt-6 space-y-3.5 text-sm text-mist">
              {divisions.map((d) => (
                <li key={d.key}>
                  <Link className="transition-colors hover:text-gold" to={d.path}>{d.title}</Link>
                </li>
              ))}
              <li><a className="transition-colors hover:text-gold" href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp Enquiries</a></li>
              <li><Link className="transition-colors hover:text-gold" to="/admin">Inquiry Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-cream">Get in Touch</h3>
            <ul className="mt-6 space-y-4 text-sm text-mist">
              <li className="flex gap-3"><MapPin size={15} className="mt-0.5 shrink-0 text-gold" /><span>{config.address}</span></li>
              <li className="flex gap-3"><Phone size={15} className="mt-0.5 shrink-0 text-gold" /><a href={config.phoneHref} className="transition-colors hover:text-gold">{config.phoneDisplay}</a></li>
              <li className="flex gap-3"><Mail size={15} className="mt-0.5 shrink-0 text-gold" /><a href={`mailto:${config.email}`} className="break-all transition-colors hover:text-gold">{config.email}</a></li>
              <li className="flex gap-3"><Clock size={15} className="mt-0.5 shrink-0 text-gold" /><span>{config.hours}</span></li>
            </ul>
          </div>
        </div>

        <div className="hairline" />
        <div className="flex flex-col gap-4 py-7 text-[11px] text-mist/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {config.company}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link className="transition-colors hover:text-gold" to="/privacy">Privacy Policy</Link>
            <Link className="transition-colors hover:text-gold" to="/terms">Terms of Service</Link>
            <span className="text-mist/40">Illustrative imagery · verified project photography to follow</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
