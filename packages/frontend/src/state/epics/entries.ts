import { Epic, combineEpics } from "redux-observable";
import { AppState } from "../index";
import { TimeEntry, fromApi, TimeEntryAPI } from "../../models/TimeEntry";
import {
  Actions,
  SetEntries,
  GetEntries,
  UpdateEntry,
  SaveEntry,
  AddEntry,
  DeleteEntry,
  RemoveEntry
} from "../actionCreators/entries";
import * as R from "ramda";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/bufferTime";
import "rxjs/add/operator/concat";

export const getTimeEntriesEpic: Epic<Actions, AppState> = action$ =>
  action$
    .ofType("GET_TIME_ENTRIES")
    .mergeMap((action: GetEntries) =>
      fetch(`/api/timeentries`, {
        credentials: "same-origin"
      })
        .then(x => x.json())
        .then(entries => entries.map(fromApi))
    )
    .map((timeEntries: TimeEntry[]): SetEntries => {
      return {
        type: "SET_TIME_ENTRIES",
        payload: timeEntries
      };
    });

export const saveTimeEntriesEpic: Epic<Actions, AppState> = actions$ =>
  actions$
    .ofType("SAVE_TIME_ENTRY")
    .mergeMap((action: SaveEntry) =>
      fetch("/api/timeentries", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.payload)
      })
        .then(x => x.json())
        .then(fromApi)
    )
    .map((entry: TimeEntry): AddEntry => {
      return {
        type: "ADD_TIME_ENTRY",
        payload: entry
      };
    });

export const deleteTimeEntriesEpic: Epic<Actions, AppState> = actions$ =>
  actions$
    .ofType("DELETE_TIME_ENTRY")
    .mergeMap((action: DeleteEntry) =>
      fetch(`/api/timeentries/${action.payload}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(x => x.json())
    )
    .map(({ id }: { id: string }): RemoveEntry => {
      return {
        type: "REMOVE_TIME_ENTRY",
        payload: id
      };
    });

export const updateTimeEntriesEpic: Epic<Actions, AppState> = action$ =>
  action$
    .ofType("UPDATE_ENTRY")
    .bufferTime(500)
    .filter(actions => actions.length !== 0)
    .mergeMap((actions: UpdateEntry[]) => {
      const updates = actions.reduce(
        (obj: { [id: string]: Partial<TimeEntryAPI> }, action: UpdateEntry) => {
          const datePatch: Partial<TimeEntryAPI> = action.payload.patch.date
            ? {
                date: action.payload.patch.date.format("YYYY-MM-DD").toString()
              }
            : {};

          const patch: Partial<TimeEntryAPI> = {
            ...R.omit(["date"], action.payload.patch) as Partial<TimeEntryAPI>,
            ...datePatch
          };

          return {
            ...obj,
            [action.payload.id]: {
              ...obj[action.payload.id],
              ...patch
            }
          };
        },
        {}
      );

      return Promise.all(
        Object.keys(updates).map(id =>
          fetch(`/api/timeentries/${id}`, {
            method: "PATCH",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updates[id])
          })
            .then(x => x.json())
            .then(fromApi)
        )
      );
    })
    .map((timeEntries: TimeEntry[]): SetEntries => {
      return {
        type: "SET_TIME_ENTRIES",
        payload: timeEntries
      };
    });

export const entriesEpic = combineEpics(
  getTimeEntriesEpic,
  updateTimeEntriesEpic,
  saveTimeEntriesEpic,
  deleteTimeEntriesEpic
);
