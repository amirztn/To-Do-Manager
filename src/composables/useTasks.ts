import { computed, ref, watch } from 'vue'
import { Status, type Task, type ValidationError } from '@/types/task'

const STORAGE_KEY = 'to-do-manager.tasks'
export const MAX_TITLE_LENGTH = 100

// Vérifie que les données lues dans localStorage sont bien des Task
function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    Object.values(Status).includes(candidate.status as Status)
  )
}

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isTask) : []
  } catch {
    return []
  }
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function validateTitle(title: string): ValidationError {
  const trimmed = title.trim()
  if (trimmed.length === 0) return 'The title is required.'
  if (trimmed.length > MAX_TITLE_LENGTH) {
    return `The title must be at most ${MAX_TITLE_LENGTH} characters long.`
  }
  return null
}

// État au niveau du module : partagé par tous les composants
const tasks = ref<Task[]>(loadTasks())

// Sauvegarde automatique à chaque changement
watch(tasks, (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)), { deep: true })

export function useTasks() {
  const totalCount = computed(() => tasks.value.length)
  const doneCount = computed(() => tasks.value.filter((t) => t.status === Status.Done).length)

  function addTask(title: string): ValidationError {
    const error = validateTitle(title)
    if (error) return error
    tasks.value.push({ id: generateId(), title: title.trim(), status: Status.ToDo })
    return null
  }

  function deleteTask(id: string): void {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function updateStatus(id: string, status: Status): void {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.status = status
  }

  return { tasks, totalCount, doneCount, addTask, deleteTask, updateStatus }
}