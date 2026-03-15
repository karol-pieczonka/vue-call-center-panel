import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { useTicketNavigation } from '@/composables/useTicketNavigation'
import type { Ticket, TicketStatus } from '@/types/ticket'

export function useTicketDetails() {
  const route = useRoute()
  const ticketsStore = useTicketsStore()
  const { goToTicketsList } = useTicketNavigation()

  const ticket = ref<Ticket | null>(null)
  const selectedStatus = ref<TicketStatus>('new')
  const isSaving = ref(false)

  async function saveStatus() {
    if (!ticket.value || selectedStatus.value === ticket.value.status) return

    isSaving.value = true
    await ticketsStore.updateTicketStatus(ticket.value.id, selectedStatus.value)

    if (!ticketsStore.error) {
      ticket.value = { ...ticket.value, status: selectedStatus.value }
    }
    isSaving.value = false
  }

  onMounted(async () => {
    const id = Number(route.params.id)
    ticket.value = await ticketsStore.getTicketById(id)

    if (ticket.value) {
      selectedStatus.value = ticket.value.status
    }
  })

  return {
    ticket,
    selectedStatus,
    isSaving,
    saveStatus,
    goBack: goToTicketsList,
  }
}
