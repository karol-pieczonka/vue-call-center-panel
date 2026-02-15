<script setup lang="ts">
import { statusLabels } from '@/utils/labels'
import type { TicketStatus } from '@/types/ticket'

defineProps<{
  status: TicketStatus
}>()
</script>

<template>
  <span :class="['status-badge', `status-badge--${status}`]">
    {{ statusLabels[status] }}
  </span>
</template>

<style lang="scss" scoped>
.status-badge {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  font-size: $font-size-sm;
  font-weight: 500;
  border-radius: $border-radius-sm;

  &--new {
    background-color: $color-status-new-bg;
    color: $color-status-new;
  }

  &--in_progress {
    background-color: $color-status-in-progress-bg;
    color: $color-status-in-progress;
  }

  &--closed {
    background-color: $color-status-closed-bg;
    color: $color-status-closed;
  }
}
</style>
