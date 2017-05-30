import * as entriesReducer from './reducers/entries'
import * as entriesActions from './actionCreators/entries'
import * as projectsReducer from './reducers/projects'
import * as projectsActions from './actionCreators/projects'
import * as tasksReducer from './reducers/tasks'
import * as tasksActions from './actionCreators/tasks'

export type NoOpAction = {
  type: 'NO_OP'
}

export type AppActions = entriesActions.Actions | projectsActions.Actions | tasksActions.Actions | NoOpAction

export type AppState = {
  entries: entriesReducer.State,
  projects: projectsReducer.State,
  tasks: tasksReducer.State
}

export const initialState = {
  entries: entriesReducer.initialState,
  projects: projectsReducer.initialState,
  tasks: tasksReducer.initialState
}

export function appReducer (state: AppState = initialState, action: AppActions): AppState {
  return {
    ...state,
    entries: entriesReducer.reducer(state.entries, action),
    projects: projectsReducer.reducer(state.projects, action),
    tasks: tasksReducer.reducer(state.tasks, action)
  }
}

export function getTimeEntries (state: AppState) {
  return entriesReducer.getEntries(state.entries)
}

export function getProjects (state: AppState) {
  return projectsReducer.getProjects(state.projects)
}
