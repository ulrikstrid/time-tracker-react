import { combineEpics } from "redux-observable";

import { AppActions, AppState } from "../";

import { entriesEpic } from "./entries";
import { tasksEpic } from "./tasks";

export const rootEpic = combineEpics<AppActions, AppState>(
  entriesEpic,
  tasksEpic
);
