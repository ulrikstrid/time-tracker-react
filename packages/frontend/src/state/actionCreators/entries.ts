import moment from "moment";
import { TimeEntry } from "../../models/TimeEntry";

export type AddEntry = {
  type: "ADD_TIME_ENTRY";
  payload: TimeEntry;
};

export type RemoveEntry = {
  type: "REMOVE_TIME_ENTRY";
  payload: string;
};

export type SetEntries = {
  type: "SET_TIME_ENTRIES";
  payload: TimeEntry[];
};

export type SetEntry = {
  type: "SET_ENTRY";
  payload: TimeEntry;
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

export type UpdateEntry = {
  type: "UPDATE_ENTRY";
  payload: {
    id: string;
    patch: Partial<TimeEntry>;
  };
};

export type SaveEntry = {
  type: "SAVE_TIME_ENTRY";
  payload: TimeEntry;
};

export type Actions =
  | AddEntry
  | RemoveEntry
  | GetEntries
  | SetEntries
  | SetEntry
  | SetEndFilter
  | SetStartFilter
  | UpdateEntry
  | SaveEntry;

export function addEntry(timeEntry: TimeEntry): AddEntry {
  return {
    type: "ADD_TIME_ENTRY",
    payload: timeEntry
  };
}

export function saveEntry(entry: TimeEntry): SaveEntry {
  return {
    type: "SAVE_TIME_ENTRY",
    payload: entry
  };
}

export function removeEntry(entryId: string): RemoveEntry {
  return {
    type: "REMOVE_TIME_ENTRY",
    payload: entryId
  };
}

export function setFilterStart(
  date: string | Date | moment.Moment
): SetStartFilter {
  return {
    type: "SET_START_FILTER",
    payload: moment(date)
  };
}

export function setFilterEnd(
  date: string | Date | moment.Moment
): SetEndFilter {
  return {
    type: "SET_END_FILTER",
    payload: moment(date)
  };
}

export function updateEntry(
  id: string,
  patch: Partial<TimeEntry>
): UpdateEntry {
  return {
    type: "UPDATE_ENTRY",
    payload: {
      id,
      patch
    }
  };
}
