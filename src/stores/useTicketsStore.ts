import { defineStore } from 'pinia'
import type { Ticket, TicketStatus } from '@/types/ticket.ts'
import { ref, computed, readonly } from 'vue'
import { ticketsApi } from '@/services/ticketsApi.ts'

export const useTicketsStore = defineStore('tickets', () => {
  // State
  const tickets = ref<Ticket[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const statusFilter = ref<TicketStatus | null>(null)

  // Getters
  const filteredTickets = computed(() => {
    if (!statusFilter.value) {
      return tickets.value
    }
    return tickets.value.filter((ticket) => ticket.status === statusFilter.value)
  })

  // Actions
  async function getTickets() {
    loading.value = true
    error.value = null

    try {
      tickets.value = await ticketsApi.getTickets()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Wystąpił błąd podczas pobierania zgłoszeń'
    } finally {
      loading.value = false
    }
  }

  async function getTicketById(id: number) {
    loading.value = true
    error.value = null

    try {
      return await ticketsApi.getTicketById(id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Nie znaleziono zgłoszenia'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateTicketStatus(id: number, status: TicketStatus) {
    loading.value = true
    error.value = null

    try {
      const updatedTicket = await ticketsApi.updateTicketStatus(id, status)
      tickets.value = tickets.value.map((t) => (t.id === id ? updatedTicket : t))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Wystąpił błąd podczas aktualizacji statusu'
    } finally {
      loading.value = false
    }
  }

  function setStatusFilter(status: TicketStatus | null) {
    statusFilter.value = status
  }

  return {
    // State
    tickets: readonly(tickets),
    loading: readonly(loading),
    error: readonly(error),
    statusFilter: readonly(statusFilter),

    // Getters
    filteredTickets,

    // Actions
    getTickets,
    getTicketById,
    updateTicketStatus,
    setStatusFilter,
  }
})
