import moment from "moment";
import * as R from "ramda";

import { TimeEntry } from "../../models/TimeEntry";
import { AppActions } from "../index";

export type TimeEntryFilter = {
  start: moment.Moment;
  end: moment.Moment;
};

export type State = {
  ids: string[];
  updatingIds: string[];
  entries: {
    [key: string]: TimeEntry;
  };
  filter: TimeEntryFilter;
};

export const initialState: State = {
  ids: [],
  updatingIds: [],
  entries: {},
  filter: {
    start: moment().weekday(0),
    end: moment().weekday(6)
  }
};

export function reducer(state: State = initialState, action: AppActions) {
  switch (action.type) {
    case "ADD_TIME_ENTRY": {
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        entries: {
          ...state.entries,
          [action.payload.id]: {
            ...action.payload
          }
        }
      };
    }

    case "REMOVE_TIME_ENTRY": {
      const newIdList = state.ids.filter(id => id !== action.payload);

      return {
        ...state,
        ids: newIdList,
        entries: newIdList
          .map(id => state.entries[id])
          .reduce((entries, entry) => {
            entries[entry.id] = entry;
            return entries;
          }, {})
      };
    }

    case "SET_TIME_ENTRIES": {
      return {
        ...state,
        ids: R.uniq([...action.payload.map(entry => entry.id), ...state.ids]),
        updatingIds: state.updatingIds.filter(id =>
          R.contains(id, state.updatingIds)
        ),
        entries: action.payload.reduce(
          (entries, entry) => ({
            ...entries,
            [entry.id]: entry
          }),
          { ...state.entries }
        )
      };
    }

    case "SET_START_FILTER": {
      return {
        ...state,
        filter: {
          ...state.filter,
          start: action.payload
        }
      };
    }

    case "SET_END_FILTER": {
      return {
        ...state,
        filter: {
          ...state.filter,
          end: action.payload
        }
      };
    }

    case "UPDATE_ENTRY": {
      return {
        ...state,
        updatingIds: R.uniq([...state.updatingIds, action.payload.id])
      };
    }

    case "SET_ENTRY": {
      return {
        ...state,
        updatingIds: state.updatingIds.filter(id => id !== action.payload.id),
        ids: R.uniq([...state.ids, action.payload.id]),
        entries: {
          ...state.entries,
          [action.payload.id]: action.payload
        }
      };
    }

    default:
      return state;
  }
}

export function getEntry(state: State, id: string): TimeEntry {
  return state.entries[id];
}

export function getEntries(state: State): TimeEntry[] {
  return state.ids.map(id => getEntry(state, id));
}

export function getFilter(state: State): TimeEntryFilter {
  return state.filter;
}
