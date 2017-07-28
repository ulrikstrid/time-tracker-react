import { Epic, combineEpics } from "redux-observable";
import { AppState } from "../index";
import { TimeEntry, fromApi } from "../../models/TimeEntry";
import {
  Actions,
  SetEntries,
  GetEntries,
  UpdateEntry,
  ChangeEntry
} from "../actionCreators/entries";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";

export const getTimeEntriesEpic: Epic<Actions, AppState> = action$ =>
  action$
    .filter(action => action.type === "GET_TIME_ENTRIES")
    .mergeMap((action: GetEntries) =>
      fetch(`/api/timeentries`)
        .then(x => x.json())
        .then(entries => entries.map(fromApi))
    )
    .map((timeEntries: TimeEntry[]): SetEntries => {
      return {
        type: "SET_TIME_ENTRIES",
        payload: timeEntries
      };
    });

export const updateTimeEntriesEpic: Epic<Actions, AppState> = action$ =>
  action$
    .filter(action => action.type === "UPDATE_ENTRY")
    .mergeMap((action: UpdateEntry) =>
      fetch(`/api/timeentries/${action.payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(action.payload.patch)
      })
        .then(x => x.json())
        .then(fromApi)
    )
    .map((timeEntry: TimeEntry): ChangeEntry => {
      return {
        type: "CHANGE_ENTRY",
        payload: timeEntry
      };
    });

export const entriesEpic = combineEpics(
  getTimeEntriesEpic,
  updateTimeEntriesEpic
);
