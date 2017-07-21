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

export type Actions = AddEntry | RemoveEntry;

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
        from: timeEntry.from || new Date(),
        to: timeEntry.to || new Date(),
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
