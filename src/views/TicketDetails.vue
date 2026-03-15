<script setup lang="ts">
import { useTicketsStore } from '@/stores/useTicketsStore'
import { useTicketDetails } from '@/composables/useTicketDetails'
import { formatDate } from '@/utils/formatters'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import BackButton from '@/components/common/BackButton.vue'
import StatusBadge from '@/components/tickets/StatusBadge.vue'
import PriorityBadge from '@/components/tickets/PriorityBadge.vue'
import TicketStatusChanger from '@/components/tickets/TicketStatusChanger.vue'

const ticketsStore = useTicketsStore()
const { ticket, selectedStatus, isSaving, saveStatus, goBack } = useTicketDetails()
</script>

<template>
  <div class="ticket-details">
    <BackButton label="Powrót do listy" class="back-btn" @click="goBack" />

    <LoadingSpinner v-if="ticketsStore.loading && !ticket" message="Ładowanie zgłoszenia..." />

    <ErrorMessage v-else-if="ticketsStore.error && !ticket" :message="ticketsStore.error" />

    <div v-else-if="ticket" class="ticket-card">
      <div class="ticket-card__header">
        <h1>Zgłoszenie #{{ ticket.id }}</h1>
        <StatusBadge :status="ticket.status" />
      </div>

      <div class="ticket-card__content">
        <div class="info-grid">
          <div class="info-item">
            <label>Klient</label>
            <p>{{ ticket.customerName }}</p>
          </div>

          <div class="info-item">
            <label>Temat</label>
            <p>{{ ticket.subject }}</p>
          </div>

          <div class="info-item">
            <label>Priorytet</label>
            <p>
              <PriorityBadge :priority="ticket.priority" />
            </p>
          </div>

          <div class="info-item">
            <label>Data utworzenia</label>
            <p>{{ formatDate(ticket.createdAt) }}</p>
          </div>
        </div>

        <div class="info-item info-item--full">
          <label>Opis</label>
          <p class="description">{{ ticket.description }}</p>
        </div>
      </div>

      <div class="ticket-card__actions">
        <TicketStatusChanger
          v-model="selectedStatus"
          :current-status="ticket.status"
          :is-saving="isSaving"
          :error="ticketsStore.error"
          @save="saveStatus"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ticket-details {
  max-width: 800px;
  margin: 0 auto;
  padding: $spacing-md;

  @include md {
    padding: $spacing-xl;
  }
}

.back-btn {
  margin-bottom: $spacing-lg;
}

.ticket-card {
  background-color: $color-white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-sm;
  overflow: hidden;

  &__header {
    @include flex-between;
    flex-wrap: wrap;
    gap: $spacing-md;
    padding: $spacing-lg;
    border-bottom: 1px solid $color-border;
    background-color: $color-gray-200;

    h1 {
      font-size: $font-size-lg;
      color: $color-gray-800;

      @include md {
        font-size: $font-size-xl;
      }
    }
  }

  &__content {
    padding: $spacing-lg;
  }

  &__actions {
    padding: $spacing-lg;
    border-top: 1px solid $color-border;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;
  margin-bottom: $spacing-lg;

  @include md {
    grid-template-columns: 1fr 1fr;
  }
}

.info-item {
  label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text-muted;
    margin-bottom: $spacing-xs;
  }

  p {
    font-size: $font-size-md;
    color: $color-gray-800;
  }

  &--full {
    grid-column: 1 / -1;
  }
}

.description {
  padding: $spacing-md;
  background-color: $color-gray-100;
  border-radius: $border-radius-md;
  line-height: 1.6;
}
</style>
