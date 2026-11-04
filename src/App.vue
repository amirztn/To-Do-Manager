<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
import { useTasks } from '@/composables/useTasks'
import type { TaskFormValues } from '@/types/task'

const { tasks, totalCount, doneCount, addTask, deleteTask, updateStatus } = useTasks()

function onSubmit(values: TaskFormValues): void {
  addTask(values.title)
}
</script>

<template>
  <div class="layout">
    <AppHeader :total="totalCount" :done="doneCount" />
    <main>
      <TaskForm @submit="onSubmit" />
      <TaskList :tasks="tasks" @update-status="updateStatus" @delete="deleteTask" />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
}
</style>