import { createRouter, createWebHistory } from 'vue-router'
import TicketsList from '@/views/TicketsList.vue'
import TicketDetails from '@/views/TicketDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'tickets-list', component: TicketsList },
    { path: '/ticket/:id', name: 'ticket-details', component: TicketDetails },
  ],
})

export default router
