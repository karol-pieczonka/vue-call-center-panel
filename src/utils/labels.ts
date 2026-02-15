import type { TicketStatus, TicketPriority } from '@/types/ticket'

export const statusLabels: Record<TicketStatus, string> = {
  new: 'Nowe',
  in_progress: 'W trakcie',
  closed: 'Zamknięte',
}

export const priorityLabels: Record<TicketPriority, string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
}
