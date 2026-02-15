import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { ticketsApi } from '@/services/ticketsApi'
import type { Ticket } from '@/types/ticket'

vi.mock('@/services/ticketsApi')

const mockTickets: Ticket[] = [
  {
    id: 1,
    customerName: 'Jan Kowalski',
    subject: 'Problem z logowaniem',
    description: 'Nie mogę się zalogować',
    priority: 'high',
    status: 'new',
    createdAt: '2024-02-06T10:30:00',
  },
  {
    id: 2,
    customerName: 'Anna Nowak',
    subject: 'Błąd w zamówieniu',
    description: 'Zamówienie nie działa',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2024-02-07T11:00:00',
  },
  {
    id: 3,
    customerName: 'Piotr Wiśniewski',
    subject: 'Pytanie o fakturę',
    description: 'Potrzebuję faktury',
    priority: 'low',
    status: 'closed',
    createdAt: '2024-02-08T09:00:00',
  },
]

describe('useTicketsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('getTickets', () => {
    it('should fetch and store tickets', async () => {
      vi.mocked(ticketsApi.getTickets).mockResolvedValue(mockTickets)

      const store = useTicketsStore()
      await store.getTickets()

      expect(store.tickets).toEqual(mockTickets)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should set loading state while fetching', async () => {
      vi.mocked(ticketsApi.getTickets).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockTickets), 100)),
      )

      const store = useTicketsStore()
      const promise = store.getTickets()

      expect(store.loading).toBe(true)
      await promise
      expect(store.loading).toBe(false)
    })

    it('should handle error when fetching fails', async () => {
      vi.mocked(ticketsApi.getTickets).mockRejectedValue(new Error('Network error'))

      const store = useTicketsStore()
      await store.getTickets()

      expect(store.error).toBe('Network error')
      expect(store.tickets).toEqual([])
    })
  })

  describe('filteredTickets', () => {
    beforeEach(async () => {
      vi.mocked(ticketsApi.getTickets).mockResolvedValue(mockTickets)
    })

    it('should return all tickets when no filter is set', async () => {
      const store = useTicketsStore()
      await store.getTickets()

      expect(store.filteredTickets).toHaveLength(3)
    })

    it('should filter tickets by status', async () => {
      const store = useTicketsStore()
      await store.getTickets()

      store.setStatusFilter('new')
      expect(store.filteredTickets).toHaveLength(1)
      expect(store.filteredTickets[0]?.status).toBe('new')

      store.setStatusFilter('in_progress')
      expect(store.filteredTickets).toHaveLength(1)
      expect(store.filteredTickets[0]?.status).toBe('in_progress')

      store.setStatusFilter('closed')
      expect(store.filteredTickets).toHaveLength(1)
      expect(store.filteredTickets[0]?.status).toBe('closed')
    })

    it('should return all tickets when filter is cleared', async () => {
      const store = useTicketsStore()
      await store.getTickets()

      store.setStatusFilter('new')
      expect(store.filteredTickets).toHaveLength(1)

      store.setStatusFilter(null)
      expect(store.filteredTickets).toHaveLength(3)
    })
  })

  describe('getTicketById', () => {
    it('should return ticket by id', async () => {
      vi.mocked(ticketsApi.getTicketById).mockResolvedValue(mockTickets[0]!)

      const store = useTicketsStore()
      const ticket = await store.getTicketById(1)

      expect(ticket).toEqual(mockTickets[0])
    })

    it('should return null and set error when ticket not found', async () => {
      vi.mocked(ticketsApi.getTicketById).mockRejectedValue(new Error('Not found'))

      const store = useTicketsStore()
      const ticket = await store.getTicketById(999)

      expect(ticket).toBeNull()
      expect(store.error).toBe('Not found')
    })
  })

  describe('updateTicketStatus', () => {
    it('should update ticket status in store', async () => {
      const updatedTicket: Ticket = { ...mockTickets[0]!, status: 'closed' }
      vi.mocked(ticketsApi.getTickets).mockResolvedValue(mockTickets)
      vi.mocked(ticketsApi.updateTicketStatus).mockResolvedValue(updatedTicket)

      const store = useTicketsStore()
      await store.getTickets()
      await store.updateTicketStatus(1, 'closed')

      const ticket = store.tickets.find((t) => t.id === 1)
      expect(ticket?.status).toBe('closed')
    })

    it('should handle error when update fails', async () => {
      vi.mocked(ticketsApi.getTickets).mockResolvedValue(mockTickets)
      vi.mocked(ticketsApi.updateTicketStatus).mockRejectedValue(new Error('Update failed'))

      const store = useTicketsStore()
      await store.getTickets()
      await store.updateTicketStatus(1, 'closed')

      expect(store.error).toBe('Update failed')
      const ticket = store.tickets.find((t) => t.id === 1)
      expect(ticket?.status).toBe('new')
    })
  })
})
