<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTicketsStore } from '@/stores/useTicketsStore'

const ticketsStore = useTicketsStore()
const { statusFilter } = storeToRefs(ticketsStore)
const { setStatusFilter } = ticketsStore
</script>

<template>
  <div class="filters">
    <button
      :class="['filter-btn', { active: statusFilter === null }]"
      @click="setStatusFilter(null)"
    >
      Wszystkie
    </button>
    <button
      :class="['filter-btn', 'filter-btn--new', { active: statusFilter === 'new' }]"
      @click="setStatusFilter('new')"
    >
      Nowe
    </button>
    <button
      :class="['filter-btn', 'filter-btn--in-progress', { active: statusFilter === 'in_progress' }]"
      @click="setStatusFilter('in_progress')"
    >
      W trakcie
    </button>
    <button
      :class="['filter-btn', 'filter-btn--closed', { active: statusFilter === 'closed' }]"
      @click="setStatusFilter('closed')"
    >
      Zamknięte
    </button>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.filter-btn {
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-sm;
  background-color: $color-white;
  border: 1px solid $color-border;
  border-radius: $border-radius-md;
  transition: all $transition-fast;

  &:hover {
    background-color: $color-gray-100;
  }

  &.active {
    background-color: $color-primary;
    color: $color-white;
    border-color: $color-primary;
  }

  &--new.active {
    background-color: $color-status-new;
    border-color: $color-status-new;
  }

  &--in-progress.active {
    background-color: $color-status-in-progress;
    border-color: $color-status-in-progress;
  }

  &--closed.active {
    background-color: $color-status-closed;
    border-color: $color-status-closed;
  }
}
</style>
