import { Epic, combineEpics } from "redux-observable";
import { AppState } from "../index";
import { TimeEntry, fromApi, TimeEntryAPI } from "../../models/TimeEntry";
import {
  Actions,
  SetEntries,
  GetEntries,
  UpdateEntry,
  SetEntry
} from "../actionCreators/entries";
import * as R from "ramda";

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
    .mergeMap((action: UpdateEntry) => {
      const datePatch: Partial<TimeEntryAPI> = action.payload.patch.date
        ? { date: action.payload.patch.date.format("YYYY-MM-DD").toString() }
        : {};

      const patch: Partial<TimeEntryAPI> = {
        ...<Partial<TimeEntryAPI>>R.omit(["date"], action.payload.patch),
        ...datePatch
      };

      return fetch(`/api/timeentries/${action.payload.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patch)
      })
        .then(x => x.json())
        .then(fromApi);
    })
    .map((timeEntry: TimeEntry): SetEntry => {
      return {
        type: "SET_ENTRY",
        payload: timeEntry
      };
    });

export const entriesEpic = combineEpics(
  getTimeEntriesEpic,
  updateTimeEntriesEpic
);
