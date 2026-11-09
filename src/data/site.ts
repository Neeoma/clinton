import {
  Anchor,
  Building2,
  Sparkles,
  BriefcaseBusiness,
  HeartHandshake,
  Lightbulb,
  Gem,
  TrendingUp,
  Award,
  ShieldCheck,
  Wrench,
  Package,
  Settings2,
  Headset,
  Compass,
  KeyRound,
  Megaphone,
  LineChart,
  Hammer,
  Scissors,
  Palette,
  Clapperboard,
  Bot,
  AudioLines,
  type LucideIcon,
} from 'lucide-react'

/**
 * PLACEHOLDER BUSINESS DETAILS
 * ------------------------------------------------------------------
 * The project brief (README.md, section 7) lists the company information
 * that still has to be supplied before launch. Everything below is kept
 * in one place so verified details can be swapped in without touching
 * any component. Replace these values with real, verified details.
 */
export const config = {
  company: 'CLINTON GLOBAL INVESTMENT',
  shortName: 'CGI',
  legalName: 'Clinton Global Investment',
  tagline: 'Connecting People, Business, Innovation and Opportunity.',
  strapline: 'CONNECTING BUSINESS WITH OPPORTUNITY',
  whatsappNumber: '2348000000000',
  whatsappDisplay: '+234 800 000 0000',
  phoneDisplay: '+234 800 000 0000',
  phoneHref: 'tel:+2348000000000',
  email: 'info@clintonglobalinvestment.com',
  address: 'Lagos, Nigeria',
  hours: 'Monday – Friday · 9:00 – 17:00 WAT',
  domain: 'clintonglobalinvestment.com',
  mapsQuery: 'Lagos,Nigeria',
  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
    tiktok: '#',
  },
} as const

export const whatsappLink = (message?: string) => {
  const text = message ?? 'Hello CLINTON GLOBAL INVESTMENT, I would like to make an inquiry.'
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export type DivisionKey = 'marine' | 'real-estate' | 'fashion-ai'

export interface ServiceItem {
  title: string
  description: string
  icon: LucideIcon
}

export interface Division {
  key: DivisionKey
  number: string
  title: string
  shortTitle: string
  path: string
  eyebrow: string
  tagline: string
  intro: string
  description: string
  image: string
  gallery: string[]
  accent: string
  accentRgb: string
  icon: LucideIcon
  services: ServiceItem[]
  audience: string[]
  featured: string[]
}

export const divisions: Division[] = [
  {
    key: 'marine',
    number: '01',
    title: 'Marine Outboard Services',
    shortTitle: 'Marine',
    path: '/services/marine',
    eyebrow: 'Division 01',
    tagline: 'Power, precision and reliability on the water.',
    intro: 'Dependable outboard engines, genuine spare parts and expert technical support for the people whose work depends on the water.',
    description:
      'From the sale of new and fairly used outboard engines to spare parts, servicing and troubleshooting, our marine division keeps fishermen, boat owners and transport operators moving with confidence.',
    image: '/images/hero-marine.jpg',
    gallery: ['/images/marine-engine.jpg', '/images/marine-parts.jpg', '/images/marine-service.jpg'],
    accent: '#7FA6B8',
    accentRgb: '127,166,184',
    icon: Anchor,
    services: [
      { title: 'Engine Sales', description: 'New and fairly used outboard engines sourced to suit your vessel, workload and budget.', icon: Anchor },
      { title: 'Trusted Engine Brands', description: 'Yamaha, Suzuki, Tohatsu and Mercury engines, with guidance on the right model for you.', icon: Compass },
      { title: 'Spare Parts', description: 'Outboard engine spare parts and components, with help identifying exactly what you need.', icon: Package },
      { title: 'Servicing & Maintenance', description: 'Routine servicing, diagnostics and preventative maintenance that extend engine life.', icon: Wrench },
      { title: 'Technical Support', description: 'Practical troubleshooting and technical advice from people who know outboard engines.', icon: Headset },
      { title: 'Marine Equipment', description: 'Marine equipment solutions and accessories that complete your onboard setup.', icon: Settings2 },
    ],
    audience: ['Fishermen', 'Boat owners', 'Marine mechanics', 'Transport operators', 'Engine retailers'],
    featured: ['New & fairly used engines', 'Genuine spare parts', 'Servicing & maintenance', 'Technical troubleshooting'],
  },
  {
    key: 'real-estate',
    number: '02',
    title: 'Real Estate Management',
    shortTitle: 'Real Estate',
    path: '/services/real-estate',
    eyebrow: 'Division 02',
    tagline: 'Property, managed with care and foresight.',
    intro: 'Professional property management, marketing and investment guidance designed around the long-term value of every asset.',
    description:
      'We support property owners, investors, landlords and tenants with clear, dependable management — from marketing and leasing through to maintenance coordination and investment guidance.',
    image: '/images/hero-realestate.jpg',
    gallery: ['/images/realestate-property.jpg', '/images/realestate-interior.jpg', '/images/about-corporate.jpg'],
    accent: '#DCC08A',
    accentRgb: '220,192,138',
    icon: Building2,
    services: [
      { title: 'Property Management', description: 'Day-to-day oversight that protects your asset and keeps occupants well served.', icon: Building2 },
      { title: 'Property Marketing', description: 'Thoughtful presentation and marketing that connect the right property with the right people.', icon: Megaphone },
      { title: 'Sales & Acquisition', description: 'Support through the process of buying and selling property, with clear communication.', icon: KeyRound },
      { title: 'Leasing & Rentals', description: 'Leasing and rental coordination for landlords, tenants and prospective homeowners.', icon: Compass },
      { title: 'Real Estate Consultancy', description: 'Straightforward advice to help you make confident property decisions.', icon: LineChart },
      { title: 'Investment Guidance', description: 'Guidance on property opportunities aligned with your goals and appetite for risk.', icon: TrendingUp },
      { title: 'Maintenance Coordination', description: 'Coordinating repairs and upkeep so properties stay in excellent condition.', icon: Hammer },
    ],
    audience: ['Property owners', 'Investors', 'Landlords', 'Tenants', 'Prospective homeowners'],
    featured: ['Property management', 'Sales & acquisition', 'Leasing & rentals', 'Investment guidance'],
  },
  {
    key: 'fashion-ai',
    number: '03',
    title: 'Fashion & AI Advertising',
    shortTitle: 'Fashion & AI',
    path: '/services/fashion-ai',
    eyebrow: 'Division 03',
    tagline: 'Where creative craft meets intelligent media.',
    intro: 'Bespoke fashion design and AI-powered advertising that give brands a distinctive, modern voice.',
    description:
      'A creative division with two complementary strengths: the craft of fashion design and tailoring, and the speed and imagination of AI-generated advertising content.',
    image: '/images/hero-fashion.jpg',
    gallery: ['/images/fashion-atelier.jpg', '/images/hero-fashion.jpg', '/images/about-corporate.jpg'],
    accent: '#C08C93',
    accentRgb: '192,140,147',
    icon: Sparkles,
    services: [
      { title: 'Fashion Designing', description: 'Original design work developed around your brand, occasion and identity.', icon: Palette },
      { title: 'Tailoring & Custom Outfits', description: 'Made-to-measure pieces with careful fit, finishing and attention to detail.', icon: Scissors },
      { title: 'Fashion Styling', description: 'Styling direction for collections, campaigns, shoots and personal wardrobes.', icon: Sparkles },
      { title: 'Beading & Embellishment', description: 'Detailed beadwork and embellishment that give garments a signature finish.', icon: Gem },
      { title: 'Fashion Brand Promotion', description: 'Creative promotion that helps fashion brands reach the audiences that matter.', icon: Megaphone },
      { title: 'AI Advertising Videos', description: 'AI-generated advertising videos and short-form campaign content.', icon: Clapperboard },
      { title: 'AI Characters & Voice-Over', description: 'AI character creation and voice-over production for brand storytelling.', icon: Bot },
      { title: 'Campaign Graphics', description: 'Product campaigns, social media adverts and promotional graphics for business.', icon: AudioLines },
    ],
    audience: ['Fashion brands', 'Entrepreneurs', 'Retailers', 'SMEs', 'Established businesses'],
    featured: ['Bespoke tailoring', 'Beading & styling', 'AI ad videos', 'Social media creatives'],
  },
]

export const divisionByKey = (key: DivisionKey) => divisions.find((d) => d.key === key)!

export interface ValueItem {
  title: string
  description: string
  icon: LucideIcon
}

export const whyChooseUs: ValueItem[] = [
  { title: 'Professionalism', description: 'Clear communication, dependable processes and a business-like approach in every engagement.', icon: BriefcaseBusiness },
  { title: 'Customer Satisfaction', description: 'We listen first, then deliver solutions shaped around what our customers actually need.', icon: HeartHandshake },
  { title: 'Innovation', description: 'Modern tools and fresh thinking, from marine diagnostics to AI-powered creative production.', icon: Lightbulb },
  { title: 'Quality Service', description: 'Careful attention to detail and standards we are comfortable putting our name behind.', icon: Gem },
  { title: 'Business Opportunities', description: 'Three connected divisions that open doors between people, products and markets.', icon: TrendingUp },
  { title: 'Commitment to Excellence', description: 'A long-term mindset: we would rather do the work properly than do it quickly.', icon: Award },
]

export const commitments = [
  { title: 'Our Vision', icon: Compass, text: 'To be a trusted, diversified business group connecting people with quality products, professional services and creative solutions across Nigeria and beyond.' },
  { title: 'Our Mission', icon: ShieldCheck, text: 'To deliver reliable marine, real estate and creative services that create genuine value for our customers, partners and communities.' },
  { title: 'Our Approach', icon: Gem, text: 'One professional standard across three divisions — so every customer experiences the same care, clarity and commitment.' },
]

export const processSteps = [
  { number: '01', title: 'Discover', text: 'We start with a conversation about your goals, your timeline and what success looks like for you.' },
  { number: '02', title: 'Advise', text: 'Our specialists recommend the right products, property approach or creative direction for your needs.' },
  { number: '03', title: 'Deliver', text: 'We do the work carefully, keep you informed and hold ourselves to the standard we promised.' },
  { number: '04', title: 'Support', text: 'Our relationship continues after delivery with maintenance, follow-up and ongoing guidance.' },
]

export interface Project {
  id: string
  title: string
  category: DivisionKey
  categoryLabel: string
  description: string
  image?: string
  aiVisual?: boolean
  tags: string[]
}

/**
 * Portfolio illustrations. The brief asks for real project photography;
 * until verified photographs are supplied these entries showcase the
 * type of work each division delivers and are labelled accordingly in UI.
 */
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Outboard Engine Supply',
    category: 'marine',
    categoryLabel: 'Marine',
    description: 'New and fairly used outboard engines, matched to the vessel and the work it has to do.',
    image: '/images/marine-engine.jpg',
    tags: ['Engines', 'Sales'],
  },
  {
    id: 'p2',
    title: 'Genuine Spare Parts',
    category: 'marine',
    categoryLabel: 'Marine',
    description: 'Propellers, filters, impellers and precision components for reliable outboard maintenance.',
    image: '/images/marine-parts.jpg',
    tags: ['Spare parts', 'Components'],
  },
  {
    id: 'p3',
    title: 'Servicing & Diagnostics',
    category: 'marine',
    categoryLabel: 'Marine',
    description: 'Workshop servicing, troubleshooting and preventative maintenance for working engines.',
    image: '/images/marine-service.jpg',
    tags: ['Maintenance', 'Support'],
  },
  {
    id: 'p4',
    title: 'Residential Portfolio',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    description: 'Contemporary residential property, presented and managed with long-term value in mind.',
    image: '/images/realestate-property.jpg',
    tags: ['Management', 'Residential'],
  },
  {
    id: 'p5',
    title: 'Interior-Led Leasing',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    description: 'Well-presented interiors and coordinated leasing for owners, tenants and investors.',
    image: '/images/realestate-interior.jpg',
    tags: ['Leasing', 'Interiors'],
  },
  {
    id: 'p6',
    title: 'Bespoke Fashion & Beading',
    category: 'fashion-ai',
    categoryLabel: 'Fashion & AI',
    description: 'Custom tailoring, beadwork and embellishment developed in the atelier for a signature finish.',
    image: '/images/fashion-atelier.jpg',
    tags: ['Tailoring', 'Couture'],
  },
  {
    id: 'p7',
    title: 'Fashion Campaign Creative',
    category: 'fashion-ai',
    categoryLabel: 'Fashion & AI',
    description: 'Editorial campaign direction and styling that give a collection a distinctive visual identity.',
    image: '/images/hero-fashion.jpg',
    tags: ['Styling', 'Campaign'],
  },
  {
    id: 'p8',
    title: 'AI Advertising Studio',
    category: 'fashion-ai',
    categoryLabel: 'Fashion & AI',
    description: 'AI-generated video, characters, voice-over and social creatives for modern brand campaigns.',
    aiVisual: true,
    tags: ['AI video', 'Advertising'],
  },
]

export const projectCategories: { key: 'all' | DivisionKey; label: string }[] = [
  { key: 'all', label: 'All Work' },
  { key: 'marine', label: 'Marine' },
  { key: 'real-estate', label: 'Real Estate' },
  { key: 'fashion-ai', label: 'Fashion & AI' },
]

export interface Faq {
  q: string
  a: string
}

export const faqs: Record<DivisionKey | 'general', Faq[]> = {
  general: [
    { q: 'How do I request a quote?', a: 'Use the Get a Quote button in the navigation, or send an inquiry through our contact page. Tell us which division you are interested in and we will get back to you with the next steps.' },
    { q: 'Can I speak to someone directly?', a: 'Yes. The WhatsApp button in the corner of every page opens a direct chat with our team during business hours.' },
    { q: 'Do you work with businesses outside Lagos?', a: 'We are based in Lagos and welcome conversations with customers and partners elsewhere. Get in touch and we will discuss what is possible for your location.' },
  ],
  marine: [
    { q: 'Which engine brands do you handle?', a: 'Our marine division works with Yamaha, Suzuki, Tohatsu and Mercury outboard engines, alongside their spare parts and accessories.' },
    { q: 'Do you sell fairly used engines?', a: 'Yes. We supply both new and fairly used outboard engines and can help you weigh up condition, suitability and budget before you decide.' },
    { q: 'Can you help identify the part I need?', a: 'Absolutely. Share your engine model and a description or photo of the issue through the inquiry form or WhatsApp, and our technicians will advise.' },
  ],
  'real-estate': [
    { q: 'Who do you work with?', a: 'Property owners, investors, landlords, tenants and prospective homeowners. Tell us your situation and we will point you to the right service.' },
    { q: 'Do you handle maintenance?', a: 'We coordinate property maintenance on behalf of owners so that repairs and upkeep are handled without you having to chase multiple parties.' },
    { q: 'Can you advise before I invest?', a: 'We offer real estate consultancy and investment guidance. Recommendations are always discussed with you directly rather than published as generic advice.' },
  ],
  'fashion-ai': [
    { q: 'What kind of fashion work do you take on?', a: 'Fashion designing, tailoring and custom outfits, styling, beading and embellishment, and fashion brand promotion.' },
    { q: 'What is included in AI advertising?', a: 'AI-generated advertising videos, AI character creation, product campaigns, AI voice-over production, social media adverts and promotional graphics.' },
    { q: 'Can fashion and AI services be combined?', a: 'Yes — the two sides of this division work together particularly well for lookbooks, collection launches and brand campaigns.' },
  ],
}

export const serviceOptions: Record<DivisionKey, string[]> = {
  marine: divisions[0].services.map((s) => s.title),
  'real-estate': divisions[1].services.map((s) => s.title),
  'fashion-ai': divisions[2].services.map((s) => s.title),
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Services', to: '/services', hasDropdown: true },
  { label: 'Our Projects', to: '/projects' },
  { label: 'Contact Us', to: '/contact' },
]
