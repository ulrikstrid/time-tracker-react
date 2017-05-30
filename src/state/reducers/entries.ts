import { TimeEntry } from '../../models/TimeEntry'
import { AppActions } from '../index'

export type State = {
  ids: string[],
  entries: {
    [key: string]: TimeEntry
  }
}

export const initialState: State = {
  ids: [],
  entries: {}
}

export function reducer (state: State = initialState, action: AppActions) {
  switch (action.type) {
    case 'ADD_TIME_ENTRY': {
      return {
        ids: [...state.ids, action.payload.entry.id],
        entries: {
          ...state.entries,
          [action.payload.entry.id]: {
            ...action.payload.entry
          }
        }
      }
    }
    case 'REMOVE_TIME_ENTRY': {
      const newIdList = state.ids
        .filter((id) => id !== action.payload)

      return {
        ids: newIdList,
        entries: newIdList
          .map((id) => state.entries[id])
          .reduce((entries, entry) => {
            entries[entry.id] = entry
            return entries
          }, {})
      }
    }
    default:
      return state
  }
}

export function getEntry (state: State, id: string): TimeEntry {
  return state.entries[id]
}

export function getEntries (state: State): TimeEntry[] {
  return state.ids
    .map((id) => getEntry(state, id))
}
