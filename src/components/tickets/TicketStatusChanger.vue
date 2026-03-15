<script setup lang="ts">
import type { TicketStatus } from '@/types/ticket'
import { statusLabels } from '@/utils/labels'

const props = defineProps<{
  modelValue: TicketStatus
  currentStatus: TicketStatus
  isSaving: boolean
  error: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: TicketStatus]
  save: []
}>()

const statusOptions: TicketStatus[] = ['new', 'in_progress', 'closed']
</script>

<template>
  <div class="ticket-status-changer">
    <div class="status-change">
      <label for="status-select">Zmień status:</label>
      <select
        id="status-select"
        :value="modelValue"
        class="status-select"
        @change="
          emit('update:modelValue', ($event.target as HTMLSelectElement).value as TicketStatus)
        "
      >
        <option v-for="status in statusOptions" :key="status" :value="status">
          {{ statusLabels[status] }}
        </option>
      </select>
      <button
        class="save-btn"
        :disabled="isSaving || modelValue === currentStatus"
        @click="emit('save')"
      >
        {{ isSaving ? 'Zapisywanie...' : 'Zapisz' }}
      </button>
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style lang="scss" scoped>
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
