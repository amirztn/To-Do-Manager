<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <p>To-Do Manager &copy; {{ year }} &mdash; Built with Vue 3 &amp; TypeScript</p>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: 1rem 1.5rem;
  background: #2c3e50;
  color: #fff;
  text-align: center;
  font-size: 0.85rem;
  width: 100%;
}
p { margin: 0; opacity: 0.85; }
</style>