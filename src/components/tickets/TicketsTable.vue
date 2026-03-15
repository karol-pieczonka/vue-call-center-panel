<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { useTicketNavigation } from '@/composables/useTicketNavigation'
import StatusBadge from '@/components/tickets/StatusBadge.vue'
import PriorityBadge from '@/components/tickets/PriorityBadge.vue'

const { filteredTickets } = storeToRefs(useTicketsStore())
const { goToTicket } = useTicketNavigation()
</script>

<template>
  <table class="tickets-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Klient</th>
        <th>Temat</th>
        <th>Status</th>
        <th>Priorytet</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        class="ticket-row"
        @click="goToTicket(ticket.id)"
      >
        <td class="ticket-id">#{{ ticket.id }}</td>
        <td>{{ ticket.customerName }}</td>
        <td class="ticket-subject">{{ ticket.subject }}</td>
        <td><StatusBadge :status="ticket.status" /></td>
        <td><PriorityBadge :priority="ticket.priority" /></td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.tickets-table {
  display: none;
  width: 100%;
  background-color: $color-white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-md;
  overflow: hidden;

  @include md {
    display: table;
  }

  th,
  td {
    padding: $spacing-md;
    text-align: left;
  }

  th {
    background-color: $color-gray-200;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-gray-700;
  }

  td {
    border-top: 1px solid $color-border;
  }
}

.ticket-row {
  cursor: pointer;
  transition: background-color $transition-fast;

  &:hover {
    background-color: $color-gray-100;
  }
}

.ticket-id {
  font-weight: 600;
  color: $color-primary;
}

.ticket-subject {
  @include text-truncate;
  max-width: 300px;
}
</style>
