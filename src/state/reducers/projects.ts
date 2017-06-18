import { Project } from '../../models/Project'
import { AppActions } from '../index'

export type State = {
  ids: string[],
  projects: {
    [ key: string ]: Project
  }
}

export const initialState: State = {
  ids: ['test'],
  projects: {
    test: {
      id: 'test',
      taskIds: ['default'],
      entryIds: [],
      name: 'test',
      description: 'test'
    }
  }
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

    case 'ADD_TIME_ENTRY': {
      console.log(action)
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.payload.projectId]: {
            ...state.projects[action.payload.projectId],
            entryIds: [ ...state.projects[action.payload.projectId].entryIds, action.payload.entry.id ]
          }
        }
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
