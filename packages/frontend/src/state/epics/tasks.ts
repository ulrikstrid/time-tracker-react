import { Epic, combineEpics } from "redux-observable";
import { AppState } from "../index";
import { Task } from "../../models/Task";
import { Actions, AddTask, SetTasks, GetTask } from "../actionCreators/tasks";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";

export const getTaskEpic: Epic<Actions, AppState> = action$ =>
  action$
    .filter(action => action.type === "GET_TASK")
    .mergeMap((action: GetTask) =>
      fetch(`/api/tasks/${action.payload.taskId}`).then(x => x.json())
    )
    .map((task: Task): AddTask => {
      return {
        type: "ADD_TASK",
        payload: {
          task: {
            ...task,
            entryIds: []
          },
          projectId: "test"
        }
      };
    });

export const getTasksEpic: Epic<Actions, AppState> = action$ =>
  action$
    .filter(action => action.type === "GET_TASKS")
    .mergeMap((action: GetTask) => fetch(`/api/tasks`).then(x => x.json()))
    .map((tasks: Task[]): SetTasks => {
      return {
        type: "SET_TASKS",
        payload: tasks
      };
    });

export const tasksEpic = combineEpics(getTaskEpic, getTasksEpic);
