import { useRouter } from 'vue-router'

export function useTicketNavigation() {
  const router = useRouter()

  function goToTicket(id: number) {
    router.push({ name: 'ticket-details', params: { id } })
  }

  function goToTicketsList() {
    router.push({ name: 'tickets-list' })
  }

  return { goToTicket, goToTicketsList }
}
