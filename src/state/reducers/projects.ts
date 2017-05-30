import { Project } from '../../models/Project'
import { AppActions } from '../index'

export type State = {
  ids: string[],
  projects: {
    [ key: string ]: Project
  }
}

export const initialState: State = {
  ids: [],
  projects: {}
}

export function reducer (state: State = initialState, action: AppActions) {
  switch (action.type) {
    case 'ADD_PROJECT': {
      return {
        ids: [
          ...state.ids,
          action.payload.id
        ],
        projects: {
          ...state.projects,
          [action.payload.id]: action.payload
        }
      }
    }

    case 'REMOVE_PROJECT': {
      const filteredIds = state.ids
        .filter((id) => id !== action.payload)

      return {
        ids: filteredIds,
        projects: filteredIds.reduce((projects: Project, id: string) => {
          projects[id] = state.projects[id]

          return projects
        }, {})
      }
    }

    default:
      return state
  }
}

export function getProjects (state: State): Project[] {
  return state.ids.map((id) => state.projects[id])
}

export function getProject (state: State, id: string): Project {
  return state.projects[id]
}
