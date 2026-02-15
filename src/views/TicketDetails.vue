<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { statusLabels } from '@/utils/labels'
import { formatDate } from '@/utils/formatters'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import BackButton from '@/components/common/BackButton.vue'
import StatusBadge from '@/components/tickets/StatusBadge.vue'
import PriorityBadge from '@/components/tickets/PriorityBadge.vue'
import type { Ticket, TicketStatus } from '@/types/ticket'

const route = useRoute()
const router = useRouter()
const ticketsStore = useTicketsStore()

const ticket = ref<Ticket | null>(null)
const selectedStatus = ref<TicketStatus>('new')
const isSaving = ref(false)

const statusOptions: TicketStatus[] = ['new', 'in_progress', 'closed']

async function saveStatus() {
  if (!ticket.value || selectedStatus.value === ticket.value.status) return

  isSaving.value = true
  await ticketsStore.updateTicketStatus(ticket.value.id, selectedStatus.value)

  if (!ticketsStore.error) {
    ticket.value = { ...ticket.value, status: selectedStatus.value }
  }
  isSaving.value = false
}

function goBack() {
  router.push({ name: 'tickets-list' })
}

onMounted(async () => {
  const id = Number(route.params.id)
  ticket.value = await ticketsStore.getTicketById(id)

  if (ticket.value) {
    selectedStatus.value = ticket.value.status
  }
})
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
        <div class="status-change">
          <label for="status-select">Zmień status:</label>
          <select id="status-select" v-model="selectedStatus" class="status-select">
            <option v-for="status in statusOptions" :key="status" :value="status">
              {{ statusLabels[status] }}
            </option>
          </select>
          <button
            class="save-btn"
            :disabled="isSaving || selectedStatus === ticket.status"
            @click="saveStatus"
          >
            {{ isSaving ? 'Zapisywanie...' : 'Zapisz' }}
          </button>
        </div>

        <p v-if="ticketsStore.error" class="error-message">
          {{ ticketsStore.error }}
        </p>
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

.status-change {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $spacing-md;

  label {
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-gray-700;
  }
}

.status-select {
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-sm;
  border: 1px solid $color-border;
  border-radius: $border-radius-md;
  background-color: $color-white;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: $color-primary;
  }
}

.save-btn {
  padding: $spacing-sm $spacing-lg;
  font-size: $font-size-sm;
  font-weight: 500;
  color: $color-white;
  background-color: $color-primary;
  border: none;
  border-radius: $border-radius-md;
  transition: background-color $transition-fast;

  &:hover:not(:disabled) {
    background-color: $color-primary-dark;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.error-message {
  margin-top: $spacing-md;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-sm;
  color: $color-error;
  background-color: $color-error-bg;
  border-radius: $border-radius-sm;
}
</style>
