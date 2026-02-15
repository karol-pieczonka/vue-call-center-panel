<script setup lang="ts">
defineProps<{
  label?: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button class="back-btn" @click="emit('click')">← {{ label ?? 'Powrót' }}</button>
</template>

<style lang="scss" scoped>
.back-btn {
  display: inline-flex;
  align-items: center;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-sm;
  color: $color-gray-700;
  background-color: $color-white;
  border: 1px solid $color-border;
  border-radius: $border-radius-md;
  transition: all $transition-fast;

  &:hover {
    background-color: $color-gray-100;
  }
}
</style>
