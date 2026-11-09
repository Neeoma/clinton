import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Inbox, CheckCircle2, CircleDot, Trash2, Download, ArrowUpRight, Database,
  RefreshCw, Mail, Phone, CalendarDays, ShieldAlert,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { usePageMeta } from '../lib/usePageMeta'
import { clearLeads, deleteLead, getLeads, setLeadStatus, type Lead, type LeadStatus } from '../lib/leads'
import { config } from '../data/site'

const statusStyles: Record<LeadStatus, string> = {
  new: 'border-gold/50 text-gold bg-gold/10',
  contacted: 'border-sky-400/40 text-sky-300 bg-sky-400/10',
  closed: 'border-white/15 text-mist bg-white/5',
}

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<'all' | LeadStatus>('all')
  usePageMeta('Inquiry Dashboard', 'Review and manage customer inquiries submitted through the CLINTON GLOBAL INVESTMENT website.')

  const refresh = () => setLeads(getLeads())

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    window.addEventListener('cgi:leads-updated', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('cgi:leads-updated', handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  const counts = useMemo(() => ({
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    closed: leads.filter((l) => l.status === 'closed').length,
  }), [leads])

  const visible = filter === 'all' ? leads : leads.filter((l) => l.status === filter)

  const exportCsv = () => {
    const head = ['Reference', 'Name', 'Email', 'Phone', 'Division', 'Service', 'Message', 'Source', 'Status', 'Submitted']
    const rows = leads.map((l) => [l.id, l.name, l.email, l.phone, l.division, l.service, l.message, l.source, l.status, l.createdAt])
    const csv = [head, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'clinton-global-inquiries.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <PageHero
        eyebrow="Client Portal"
        title={<>Inquiry <span className="gold-text italic">Dashboard.</span></>}
        description="A single place to review, follow up on and export customer inquiries submitted through the website."
        breadcrumb={[{ label: 'Inquiry Dashboard' }]}
      />

      <section className="bg-ink py-16 sm:py-20">
        <div className="shell">
          {/* Demo notice */}
          <Reveal>
            <div className="flex flex-col gap-4 border border-gold/30 bg-ink-800/70 p-6 sm:flex-row sm:items-center">
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold/40 text-gold"><Database size={18} /></span>
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Demo mode · client-side lead management</p>
                <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-mist">
                  Inquiries submitted through the forms are stored in this browser&apos;s local storage so you can see the full flow. For production, connect a database such as Supabase and secure this page behind authentication, as recommended in the project brief.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Inquiries', value: counts.total, icon: Inbox, color: 'text-gold' },
              { label: 'New', value: counts.new, icon: CircleDot, color: 'text-gold-light' },
              { label: 'Contacted', value: counts.contacted, icon: CheckCircle2, color: 'text-sky-300' },
              { label: 'Closed', value: counts.closed, icon: ShieldAlert, color: 'text-mist' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="border border-white/[0.08] bg-ink-800/60 p-6">
                  <div className="flex items-center justify-between"><span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-mist/70">{s.label}</span><s.icon size={17} className={s.color} /></div>
                  <p className="mt-5 font-display text-4xl text-cream">{String(s.value).padStart(2, '0')}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Toolbar */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-5">
              {(['all', 'new', 'contacted', 'closed'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`rounded-sm border px-4 py-2 font-heading text-[10px] font-bold uppercase tracking-[0.14em] transition-all ${filter === f ? 'border-gold bg-gold-gradient text-ink' : 'border-white/[0.12] text-mist hover:border-gold/50 hover:text-gold'}`}>
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
              <div className="ml-auto flex gap-2">
                <button onClick={refresh} className="btn-ghost !px-4 !py-2.5"><RefreshCw size={13} /> Refresh</button>
                <button onClick={exportCsv} disabled={!leads.length} className="btn-outline !px-4 !py-2.5 disabled:opacity-40"><Download size={13} /> Export CSV</button>
              </div>
            </div>
          </Reveal>

          {/* Leads */}
          <div className="mt-6 space-y-3">
            {visible.length === 0 ? (
              <Reveal>
                <div className="border border-dashed border-white/15 bg-ink-800/40 px-6 py-16 text-center">
                  <Inbox size={34} className="mx-auto text-gold/60" strokeWidth={1.2} />
                  <h3 className="mt-6 font-display text-2xl text-cream">No inquiries yet</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
                    {leads.length === 0
                      ? 'Submit a form anywhere on the website and it will appear here instantly. Try the Get a Quote button or the contact page.'
                      : 'No inquiries match this filter. Choose another status above.'}
                  </p>
                  {leads.length === 0 && <Link to="/contact" className="btn-outline mt-8">Go to Contact Page <ArrowUpRight size={14} /></Link>}
                </div>
              </Reveal>
            ) : (
              visible.map((lead, i) => (
                <Reveal key={lead.id} delay={Math.min(i * 0.04, 0.2)}>
                  <div className="grid gap-5 border border-white/[0.08] bg-ink-800/60 p-6 lg:grid-cols-[1.1fr_1.4fr_auto] lg:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-gold">{lead.id}</span>
                        <span className={`rounded-sm border px-2.5 py-1 font-heading text-[9px] font-bold uppercase tracking-[0.14em] ${statusStyles[lead.status]}`}>{lead.status}</span>
                      </div>
                      <h3 className="mt-3 font-display text-xl text-cream">{lead.name}</h3>
                      <div className="mt-3 space-y-1.5 text-[12px] text-mist">
                        <p className="flex items-center gap-2"><Mail size={12} className="text-gold/70" /> {lead.email}</p>
                        {lead.phone && <p className="flex items-center gap-2"><Phone size={12} className="text-gold/70" /> {lead.phone}</p>}
                        <p className="flex items-center gap-2"><CalendarDays size={12} className="text-gold/70" /> {new Date(lead.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-cream/70">{lead.division} · {lead.service}</p>
                      <p className="mt-3 text-[13px] leading-relaxed text-cream/75">{lead.message}</p>
                      <p className="mt-4 font-heading text-[9px] uppercase tracking-[0.16em] text-mist/50">Source: {lead.source}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:flex-col">
                      <select
                        value={lead.status}
                        onChange={(e) => { setLeadStatus(lead.id, e.target.value as LeadStatus); refresh() }}
                        className="field !w-auto !py-2 !text-xs lg:!w-full"
                        aria-label={`Status for ${lead.name}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <a href={`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ${lead.id} — ${config.company}`)}`} className="btn-outline !px-4 !py-2.5"><Mail size={13} /> Reply</a>
                      <button onClick={() => { if (window.confirm(`Delete inquiry ${lead.id}?`)) { deleteLead(lead.id); refresh() } }} className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/[0.12] px-4 py-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-mist transition-colors hover:border-rose-400/60 hover:text-rose-300"><Trash2 size={13} /> Delete</button>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>

          {leads.length > 0 && (
            <div className="mt-8 flex justify-end">
              <button onClick={() => { if (window.confirm('Delete all inquiries stored in this browser?')) { clearLeads(); refresh() } }} className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-mist/60 underline underline-offset-4 transition-colors hover:text-rose-300">Clear all inquiries</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
