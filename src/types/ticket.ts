export type TicketPriority = 'low' | 'medium' | 'high'
export type TicketStatus = 'new' | 'in_progress' | 'closed'

export interface Ticket {
  id: number
  customerName: string
  subject: string
  description: string
  priority: TicketPriority
  status: TicketStatus
  createdAt: string
}
