<script setup lang="ts">
import { priorityLabels } from '@/utils/labels'
import type { TicketPriority } from '@/types/ticket'

defineProps<{
  priority: TicketPriority
}>()
</script>

<template>
  <span :class="['priority-badge', `priority-badge--${priority}`]">
    {{ priorityLabels[priority] }}
  </span>
</template>

<style lang="scss" scoped>
.priority-badge {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  font-size: $font-size-sm;
  font-weight: 500;
  border-radius: $border-radius-sm;

  &--low {
    background-color: $color-priority-low-bg;
    color: $color-priority-low;
  }

  &--medium {
    background-color: $color-priority-medium-bg;
    color: $color-priority-medium;
  }

  &--high {
    background-color: $color-priority-high-bg;
    color: $color-priority-high;
  }
}
</style>
