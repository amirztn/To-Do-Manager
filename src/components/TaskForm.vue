<script setup lang="ts">
import { ref } from 'vue'
import { MAX_TITLE_LENGTH, validateTitle } from '@/composables/useTasks'
import type { TaskFormValues } from '@/types/task'

const emit = defineEmits<{
  submit: [values: TaskFormValues]
}>()

const title = ref('')
const error = ref<string | null>(null)

function onSubmit(): void {
  // Si invalide : on affiche l'erreur et on bloque l'envoi
  error.value = validateTitle(title.value)
  if (error.value) return

  emit('submit', { title: title.value })
  title.value = ''
}
</script>

<template>
  <form class="task-form" novalidate @submit.prevent="onSubmit">
    <label for="task-title">New task</label>
    <div class="row">
      <input
        id="task-title"
        v-model="title"
        type="text"
        placeholder="What needs to be done?"
        :maxlength="MAX_TITLE_LENGTH + 20"
        :aria-invalid="error !== null"
        @input="error = null"
      />
      <button type="submit">Add</button>
    </div>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
  </form>
</template>

<style scoped>
.task-form { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.5rem; }
label { font-weight: 600; }
.row { display: flex; gap: 0.5rem; }
input { flex: 1; padding: 0.6rem; border: 1px solid #bbb; border-radius: 4px; font-size: 1rem;}
input[aria-invalid='true'] { border-color: #c0392b;content: "\01F5D1"; }
button  {
  padding: 0.6rem 1.2rem; 
  border: none;
  border-radius: 4px;
  background: #42b883;
  color: #fff;
  font-size: 1rem;
  cursor: pointer; 
}
button:hover { background: #36a374; }
.error {
   margin: 0; color: #c0392b; font-size: 0.9rem; 
}
</style>