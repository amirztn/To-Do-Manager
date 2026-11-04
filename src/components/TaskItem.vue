<script setup lang="ts">
import { Status, type Task } from '@/types/task'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  'update-status': [id: string, status: Status]
  delete: [id: string]
}>()

// Options du <select>, déduites de l'enum
const statuses: Status[] = Object.values(Status)

function onStatusChange(id: string, event: Event): void {
  const value = (event.target as HTMLSelectElement).value as Status
  emit('update-status', id, value)
}
</script>

<template>
  <li class="task-item" :class="{ done: task.status === Status.Done }">
    <span class="title">{{ task.title }}</span>
    <span class="badge" :data-status="task.status">{{ task.status }}</span>
    <select
      :value="task.status"
      :aria-label="`Change the status of ${task.title}`"
      @change="onStatusChange(task.id, $event)"
    >
      <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
    </select>
    <button type="button" :aria-label="`Delete ${task.title}`" @click="emit('delete', task.id)">
      Delete
    </button>
  </li>
</template>

<style scoped>
.task-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 0.9rem; border: 1px solid #ddd; border-radius: 4px; background: #000000; }
.title { flex: 1; word-break: break-word; }
.done .title { text-decoration: line-through; color: #dddbdb; }
.badge { padding: 0.15rem 0.6rem; border-radius: 999px; font-size: 0.75rem; color: #fff; white-space: nowrap; }
.badge[data-status='to do'] { background: #7f8c8d; }
.badge[data-status='in progress'] { background: #e67e22; }
.badge[data-status='done'] { background: #27ae60; }
select { padding: 0.35rem; border: 1px solid #bbb; border-radius: 4px; }
button { padding: 0.35rem 0.8rem; border: none; border-radius: 4px; background: #c0392b; color: #fff; cursor: pointer; }
button:hover { background: #a93226; }
@media (max-width: 600px) { .task-item { flex-wrap: wrap; } }
</style>