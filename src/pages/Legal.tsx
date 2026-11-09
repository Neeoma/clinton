import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { usePageMeta } from '../lib/usePageMeta'
import { config } from '../data/site'

interface Section { title: string; body: string[] }

const privacy: Section[] = [
  { title: '1. Information we collect', body: ['When you submit an inquiry, request a quote or contact us, we collect the details you choose to provide: your name, email address, phone number, the division and service you are interested in, and the message you write.', 'We may also collect basic, non-identifying usage information such as the pages visited to help us understand how the website is used.'] },
  { title: '2. How we use your information', body: ['We use your details to respond to your inquiry, provide the service you asked about, and keep a record of our conversation so we can follow up properly.', 'We do not sell your personal information. Marketing messages are only sent where you have asked for them or otherwise agreed.'] },
  { title: '3. Data storage and security', body: ['In this demonstration build, inquiry forms store submissions locally in your own browser. In production, inquiries would be held in a secured database with restricted access, over an encrypted HTTPS connection.', 'We take reasonable steps to protect information against unauthorised access, loss or misuse.'] },
  { title: '4. Your choices', body: ['You may ask us to correct, update or delete the personal information you have provided, and you may opt out of any follow-up communication at any time.', 'To make such a request, contact us using the details on the Contact page.'] },
  { title: '5. Third-party services', body: ['This website links to WhatsApp, Google Maps and social platforms. Those services have their own privacy policies and handle any data you give them independently of us.'] },
  { title: '6. Updates to this policy', body: ['This policy may be updated as the website and our services develop. The latest version will always be published on this page.'] },
]

const terms: Section[] = [
  { title: '1. About this website', body: [`This website is operated by ${config.company} to present our three business divisions and to help visitors make inquiries about our services.`, 'Content on this site is provided for general information. It is not an offer, a contract, or professional advice.'] },
  { title: '2. Service information', body: ['Descriptions of marine, real estate, fashion and AI advertising services are indicative. Exact scope, availability, pricing and timelines are confirmed with you directly before any work begins.', 'Product and property imagery on this website is illustrative. Verified photographs and authorised listings will be published as they become available.'] },
  { title: '3. Inquiries and quotes', body: ['Submitting an inquiry or requesting a quote does not create a contract. Any engagement begins only after the terms have been discussed and agreed in writing.', 'We aim to respond to every inquiry, but response times may vary.'] },
  { title: '4. Intellectual property', body: ['The text, design, logos and original imagery on this website belong to us or our licensors. You may not reproduce or reuse them without permission.', 'Third-party brand names mentioned in relation to marine engines remain the property of their respective owners and are used for identification only.'] },
  { title: '5. Limitation of liability', body: ['We take care to keep this website accurate and available, but we cannot guarantee that it will always be error-free or uninterrupted.', 'To the extent permitted by law, we are not liable for losses arising from reliance on general website content rather than a written agreement with us.'] },
  { title: '6. Contact', body: ['Questions about these terms can be sent through the Contact page or by email using the address published there.'] },
]

export default function Legal({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy'
  const sections = isPrivacy ? privacy : terms
  usePageMeta(isPrivacy ? 'Privacy Policy' : 'Terms of Service', `${isPrivacy ? 'Privacy Policy' : 'Terms of Service'} for the ${config.company} website.`)

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={isPrivacy ? <>Privacy <span className="gold-text italic">Policy.</span></> : <>Terms of <span className="gold-text italic">Service.</span></>}
        description={isPrivacy ? 'How we handle the information you share with us.' : 'The terms that apply when you use this website.'}
        breadcrumb={[{ label: isPrivacy ? 'Privacy Policy' : 'Terms of Service' }]}
      />
      <section className="bg-ink py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow eyebrow-line">Legal Information</p>
              <h2 className="display mt-5 text-3xl">Plain language, no surprises.</h2>
              <p className="mt-5 text-sm leading-relaxed text-mist">Last reviewed {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
              <div className="mt-8 flex flex-col gap-3">
                <Link to="/privacy" className={`text-sm transition-colors hover:text-gold ${isPrivacy ? 'text-gold' : 'text-mist'}`}>Privacy Policy <ArrowUpRight size={13} className="inline" /></Link>
                <Link to="/terms" className={`text-sm transition-colors hover:text-gold ${!isPrivacy ? 'text-gold' : 'text-mist'}`}>Terms of Service <ArrowUpRight size={13} className="inline" /></Link>
                <Link to="/contact" className="text-sm text-mist transition-colors hover:text-gold">Contact Us <ArrowUpRight size={13} className="inline" /></Link>
              </div>
            </Reveal>
          </div>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.05, 0.2)}>
                <div className="border-t border-white/[0.09] pt-7">
                  <h3 className="font-display text-2xl text-cream">{s.title}</h3>
                  {s.body.map((p) => <p key={p} className="mt-4 text-[14px] leading-[1.85] text-mist">{p}</p>)}
                </div>
              </Reveal>
            ))}
            <Reveal>
              <div className="border-l-2 border-gold/50 bg-ink-800/60 p-6">
                <p className="text-[13px] leading-relaxed text-mist">
                  <span className="font-heading font-semibold uppercase tracking-[0.14em] text-gold">Note:</span> This is a template for a demonstration website. Have it reviewed and adapted by qualified legal counsel, and replace all placeholder business details, before publishing.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
