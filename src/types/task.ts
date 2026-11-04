export enum Status {
  ToDo = 'to do',
  InProgress = 'in progress',
  Done = 'done',
}

export interface Task {
  id: string
  title: string
  status: Status
}

export interface TaskFormValues {
  title: string
}

export type ValidationError = string | null