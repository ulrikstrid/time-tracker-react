import * as moment from "moment";
import { TimeEntry } from "../../models/TimeEntry";
import * as GUID from "../../models/GUID";

export type AddEntry = {
  type: "ADD_TIME_ENTRY";
  payload: {
    entry: TimeEntry;
    taskId: string;
    projectId: string;
  };
};

export type RemoveEntry = {
  type: "REMOVE_TIME_ENTRY";
  payload: string;
};

export type SetEntries = {
  type: "SET_TIME_ENTRIES";
  payload: TimeEntry[];
};

export type GetEntries = {
  type: "GET_TIME_ENTRIES";
};

export type SetStartFilter = {
  type: "SET_START_FILTER";
  payload: moment.Moment;
};

export type SetEndFilter = {
  type: "SET_END_FILTER";
  payload: moment.Moment;
};

export type Actions =
  | AddEntry
  | RemoveEntry
  | GetEntries
  | SetEntries
  | SetEndFilter
  | SetStartFilter;

export function addEntry(
  projectId: string,
  taskId: string,
  timeEntry: Partial<TimeEntry>
): AddEntry {
  return {
    type: "ADD_TIME_ENTRY",
    payload: {
      entry: {
        id: timeEntry.id || GUID.generate(),
        from: timeEntry.from || "",
        to: timeEntry.to || "",
        date: moment(timeEntry.date),
        taskId,
        projectId
      },
      taskId,
      projectId
    }
  };
}

export function removeEntry(entryId: string): RemoveEntry {
  return {
    type: "REMOVE_TIME_ENTRY",
    payload: entryId
  };
}

export function setFilterStart(date: string | moment.Moment): SetStartFilter {
  return {
    type: "SET_START_FILTER",
    payload: moment(date)
  };
}

export function setFilterEnd(date: string | moment.Moment): SetEndFilter {
  return {
    type: "SET_END_FILTER",
    payload: moment(date)
  };
}
