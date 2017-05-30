import { Task } from '../../models/Task'
import * as GUID from '../../models/GUID'

export type AddTask = {
  type: 'ADD_TASK',
  payload: {
    task: Task,
    projectId: string
  }
}

export type RemoveTask = {
  type: 'REMOVE_TASK',
  payload: string
}

export type Actions = AddTask | RemoveTask

export function addTask (projectId: string, task: Partial<Task>): AddTask {
  return {
    type: 'ADD_TASK',
    payload: {
      task: {
        id: task.id || GUID.generate(),
        name: task.name || GUID.generate(),
        description: task.description || '',
        entryIds: task.entryIds || []
      },
      projectId
    }
  }
}

export function removeTask (id: string): RemoveTask {
  return {
    type: 'REMOVE_TASK',
    payload: id
  }
}
