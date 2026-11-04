<script setup lang="ts">
defineProps<{
  total: number
  done: number
}>()
</script>

<template>
  <header class="app-header">
    <h1>TO-DO-MANAGER</h1>
    <p class="counter">{{ done }} / {{ total }} done</p>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #2c3e50;
  color: #fff;
  width: 100%;
}
h1 { margin: 0; font-size: 1.4rem; }
.counter { margin: 0; font-size: 0.9rem; opacity: 0.85; }
</style>