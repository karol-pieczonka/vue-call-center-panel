<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="error">
    {{ message }}
  </div>
</template>

<style lang="scss" scoped>
.error {
  padding: $spacing-md;
  background-color: $color-error-bg;
  color: $color-error;
  border-radius: $border-radius-md;
}
</style>
