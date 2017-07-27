import { Task } from "../../models/Task";
import * as GUID from "../../models/GUID";

export type GetTask = {
  type: "GET_TASK";
  payload: {
    taskId: string;
  };
};

export type GetTasks = {
  type: "GET_TASKS";
};

export type CreateTask = {
  type: "CREATE_TASK";
  payload: {
    task: Task;
    projectId: string;
  };
};

export type AddTask = {
  type: "ADD_TASK";
  payload: {
    task: Task;
    projectId: string;
  };
};

export type SetTasks = {
  type: "SET_TASKS";
  payload: Task[];
};

export type RemoveTask = {
  type: "REMOVE_TASK";
  payload: string;
};

export type Actions =
  | AddTask
  | RemoveTask
  | GetTask
  | GetTasks
  | CreateTask
  | SetTasks;

export function addTask(projectId: string, task: Partial<Task>): AddTask {
  return {
    type: "ADD_TASK",
    payload: {
      task: {
        id: task.id || GUID.generate(),
        name: task.name || GUID.generate(),
        description: task.description || "",
        entryIds: task.entryIds || []
      },
      projectId
    }
  };
}

export function removeTask(id: string): RemoveTask {
  return {
    type: "REMOVE_TASK",
    payload: id
  };
}
