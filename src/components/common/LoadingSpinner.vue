<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="loading">
    <div class="spinner"></div>
    <span v-if="message">{{ message }}</span>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-xl;
  color: $color-text-muted;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid $color-gray-200;
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
