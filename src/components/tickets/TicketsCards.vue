<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { useTicketNavigation } from '@/composables/useTicketNavigation'
import StatusBadge from '@/components/tickets/StatusBadge.vue'
import PriorityBadge from '@/components/tickets/PriorityBadge.vue'
import { formatDate } from '@/utils/formatters'

const { filteredTickets } = storeToRefs(useTicketsStore())
const { goToTicket } = useTicketNavigation()
</script>

<template>
  <div class="tickets-cards">
    <article
      v-for="ticket in filteredTickets"
      :key="ticket.id"
      class="ticket-card"
      @click="goToTicket(ticket.id)"
    >
      <div class="ticket-card__header">
        <span class="ticket-id">#{{ ticket.id }}</span>
        <StatusBadge :status="ticket.status" />
      </div>
      <h3 class="ticket-card__subject">{{ ticket.subject }}</h3>
      <p class="ticket-card__customer">{{ ticket.customerName }}</p>
      <div class="ticket-card__footer">
        <PriorityBadge :priority="ticket.priority" />
        <time class="ticket-card__date">{{ formatDate(ticket.createdAt) }}</time>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.tickets-cards {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  @include md {
    display: none;
  }
}

.ticket-card {
  background-color: $color-white;
  border-radius: $border-radius-lg;
  padding: $spacing-md;
  box-shadow: $shadow-sm;
  cursor: pointer;
  transition: box-shadow $transition-fast;

  &:hover {
    box-shadow: $shadow-md;
  }

  &__header {
    @include flex-between;
    margin-bottom: $spacing-sm;
  }

  &__subject {
    font-size: $font-size-md;
    font-weight: 600;
    margin-bottom: $spacing-xs;
    color: $color-gray-800;
  }

  &__customer {
    font-size: $font-size-sm;
    color: $color-text-muted;
    margin-bottom: $spacing-md;
  }

  &__footer {
    @include flex-between;
  }

  &__date {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }
}

.ticket-id {
  font-weight: 600;
  color: $color-primary;
}
</style>
