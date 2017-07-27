import { Project } from "../models/Project";
import { Task } from "../models/Task";
import { TimeEntry } from "../models/TimeEntry";

import * as entriesReducer from "./reducers/entries";
import * as entriesActions from "./actionCreators/entries";
import * as projectsReducer from "./reducers/projects";
import * as projectsActions from "./actionCreators/projects";
import * as tasksReducer from "./reducers/tasks";
import * as tasksActions from "./actionCreators/tasks";

import { rootEpic } from "./epics";

export type NoOpAction = {
  type: "NO_OP";
};

export type AppActions =
  | entriesActions.Actions
  | projectsActions.Actions
  | tasksActions.Actions
  | NoOpAction;

export type AppState = {
  entries: entriesReducer.State;
  projects: projectsReducer.State;
  tasks: tasksReducer.State;
};

export const initialState = {
  entries: entriesReducer.initialState,
  projects: projectsReducer.initialState,
  tasks: tasksReducer.initialState
};

export const appEpic = rootEpic;

export function appReducer(
  state: AppState = initialState,
  action: AppActions
): AppState {
  return {
    ...state,
    entries: entriesReducer.reducer(state.entries, action),
    projects: projectsReducer.reducer(state.projects, action),
    tasks: tasksReducer.reducer(state.tasks, action)
  };
}

export function getTimeEntries(state: AppState): TimeEntry[] {
  return entriesReducer.getEntries(state.entries);
}

export function getProjectTasks(state: AppState, projectId: string): Task[] {
  return projectsReducer
    .getProject(state.projects, projectId)
    .taskIds.map(taskId => tasksReducer.getTask(state.tasks, taskId));
}

export function getProjectTimeEntries(
  state: AppState,
  projectId: string
): TimeEntry[] {
  return projectsReducer
    .getProject(state.projects, projectId)
    .entryIds.map(entryId => entriesReducer.getEntry(state.entries, entryId));
}

export function getProjects(state: AppState): Project[] {
  return projectsReducer.getProjects(state.projects);
}

export function getProject(state: AppState, projectId: string): Project {
  return projectsReducer.getProject(state.projects, projectId);
}

export function getTasks(state: AppState): Task[] {
  return tasksReducer.getTasks(state.tasks);
}

export function getTimeFilter(state: AppState): entriesReducer.TimeEntryFilter {
  return entriesReducer.getFilter(state.entries);
}
