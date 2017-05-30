import { Project } from '../../models/Project'
import * as GUID from '../../models/GUID'

export type AddProject = {
  type: 'ADD_PROJECT',
  payload: Project
}

export type RemoveProject = {
  type: 'REMOVE_PROJECT',
  payload: string
}

export type Actions = AddProject | RemoveProject

export function addProject (project: Partial<Project>): AddProject {
  return {
    type: 'ADD_PROJECT',
    payload: {
      id: project.id || GUID.generate(),
      name: project.name || GUID.generate(),
      description: project.description || '',
      taskIds: project.taskIds || []
    }
  }
}

export function removeProject (id: string): RemoveProject {
  return {
    type: 'REMOVE_PROJECT',
    payload: id
  }
}
