import { Task } from "../../models/Task";
import { AppActions } from "../index";

export type State = {
  ids: string[];
  tasks: {
    [key: string]: Task;
  };
};

export const initialState: State = {
  ids: ["default"],
  tasks: {
    default: {
      id: "default",
      name: "default",
      description: "default task",
      entryIds: []
    }
  }
};

export function reducer(
  state: State = initialState,
  action: AppActions
): State {
  switch (action.type) {
    case "ADD_TASK": {
      return {
        ids: [...state.ids, action.payload.task.id],
        tasks: {
          ...state.tasks,
          [action.payload.task.id]: action.payload.task
        }
      };
    }

    case "REMOVE_TASK": {
      const filteredIds = state.ids.filter(id => id !== action.payload);

      return {
        ids: filteredIds,
        tasks: filteredIds.reduce((tasks: Task, id: string) => {
          tasks[id] = state.tasks[id];

          return tasks;
        }, {})
      };
    }

    case "SET_TASKS": {
      return {
        ids: action.payload.map(task => task.id),
        tasks: action.payload.reduce((tasks, task) => {
          tasks[task.id] = task;
          return tasks;
        }, {})
      };
    }

    default:
      return state;
  }
}

export function getTasks(state: State): Task[] {
  return state.ids.map(id => state.tasks[id]);
}

export function getTask(state: State, id: string): Task {
  return state.tasks[id];
}
