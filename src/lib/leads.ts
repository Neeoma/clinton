export type LeadStatus = 'new' | 'contacted' | 'closed'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  division: string
  service: string
  message: string
  source: string
  status: LeadStatus
  createdAt: string
}

const STORAGE_KEY = 'cgi_inquiries_v1'

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Lead[]) : []
  } catch {
    return []
  }
}

function persist(leads: Lead[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  window.dispatchEvent(new CustomEvent('cgi:leads-updated'))
}

export type NewLead = Omit<Lead, 'id' | 'status' | 'createdAt'>

export function addLead(input: NewLead): Lead {
  const lead: Lead = {
    ...input,
    id: `CGI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  persist([lead, ...getLeads()])
  return lead
}

export function setLeadStatus(id: string, status: LeadStatus) {
  persist(getLeads().map((l) => (l.id === id ? { ...l, status } : l)))
}

export function deleteLead(id: string) {
  persist(getLeads().filter((l) => l.id !== id))
}

export function clearLeads() {
  persist([])
}
