<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import type { Status, Task } from '@/types/task'

defineProps<{
  tasks: Task[]
}>()

defineEmits<{
  'update-status': [id: string, status: Status]
  delete: [id: string]
}>()
</script>

<template>
  <section class="task-list">
    <h2>Tasks</h2>
    <p v-if="tasks.length === 0" class="empty">No tasks yet !</p>
    <ul v-else>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @update-status="(id, status) => $emit('update-status', id, status)"
        @delete="(id) => $emit('delete', id)"
      />
    </ul>
  </section>
</template>

<style scoped>
h2 { margin: 0 0 0.75rem; font-size: 1.15rem; }
ul { display: flex; flex-direction: column; gap: 0.5rem; margin: 0; padding: 0; list-style: none; }
.empty { color: #777; font-style: italic; }
</style>