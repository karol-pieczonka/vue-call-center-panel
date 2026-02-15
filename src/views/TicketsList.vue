<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTicketsStore } from '@/stores/useTicketsStore'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import TicketFilters from '@/components/tickets/TicketFilters.vue'
import TicketsTable from '@/components/tickets/TicketsTable.vue'
import TicketsCards from '@/components/tickets/TicketsCards.vue'

const ticketsStore = useTicketsStore()
const { loading, error, filteredTickets } = storeToRefs(ticketsStore)

onMounted(() => {
  ticketsStore.getTickets()
})
</script>

<template>
  <div class="tickets-list">
    <header class="header">
      <h1>Panel zgłoszeń</h1>
    </header>

    <TicketFilters class="filters" />

    <LoadingSpinner v-if="loading" message="Ładowanie zgłoszeń..." />

    <ErrorMessage v-else-if="error" :message="error" />

    <template v-else>
      <TicketsTable />
      <TicketsCards />

      <p v-if="filteredTickets.length === 0" class="empty-state">Brak zgłoszeń do wyświetlenia</p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tickets-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: $spacing-md;

  @include md {
    padding: $spacing-xl;
  }
}

.header {
  margin-bottom: $spacing-lg;

  h1 {
    font-size: $font-size-xl;
    color: $color-gray-800;
  }
}

.filters {
  margin-bottom: $spacing-lg;
}

.empty-state {
  text-align: center;
  padding: $spacing-xl;
  color: $color-text-muted;
}
</style>
