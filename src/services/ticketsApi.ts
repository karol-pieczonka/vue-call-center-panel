import type { Ticket } from '@/types/ticket.ts'
import { initialMockTickets } from '@/mocks/tickets.ts'

// Helper function to simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let mockTickets = [...initialMockTickets]
export const ticketsApi = {
  async getTickets(): Promise<Ticket[]> {
    await sleep(500)
    return [...mockTickets]
  },

  async updateTicketStatus(id: number, status: Ticket['status']): Promise<Ticket> {
    await sleep(500)

    let updatedTicket: Ticket | null = null

    mockTickets = mockTickets.map((ticket) => {
      if (ticket.id === id) {
        updatedTicket = { ...ticket, status }
        return updatedTicket
      }
      return ticket
    })

    if (!updatedTicket) {
      return Promise.reject(new Error(`Ticket with id ${id} not found`))
    }

    return updatedTicket
  },

  async getTicketById(id: number): Promise<Ticket> {
    await sleep(500)

    const ticket = mockTickets.find((t) => t.id === id)
    if (!ticket) {
      return Promise.reject(new Error(`Ticket with id ${id} not found`))
    }

    return { ...ticket }
  },
}
