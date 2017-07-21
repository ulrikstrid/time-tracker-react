import {
  TimeEntry,
  TimeEntryDB,
  NewTimeEntry,
  createTimeEntry,
  validateTimeEntry,
  timeEntryFromDB
} from "./model";
import * as pga from "pg-promise";

export function getTimeEntries(
  db: pga.IDatabase<any>,
  taskId: string
): Promise<TimeEntry[]> {
  return db
    .any(
      `
      SELECT *
      FROM time_entry
      WHERE task_id = $1
    `,
      [taskId]
    )
    .then((entries: TimeEntryDB[]) => entries.map(timeEntryFromDB));
}

export function getTimeEntry(
  db: pga.IDatabase<any>,
  id: string
): Promise<TimeEntry> {
  return db
    .one(
      `
      SELECT *
      FROM time_entry
      WHERE id = $1
    `,
      [id]
    )
    .then(timeEntryFromDB);
}

export function saveTimeEntry(
  db: pga.IDatabase<any>,
  taskId: string,
  newTimeEntry: NewTimeEntry
): Promise<TimeEntry> {
  return validateTimeEntry(createTimeEntry(newTimeEntry))
    .then(validTimeEntry => {
      return db.one(
        `
          INSERT INTO time_entry(id, task_id, start_time, end_time)
          VALUES($1, $2, $3, $4)
          RETURNING id, task_id, start_time, end_time
        `,
        [
          validTimeEntry.id,
          validTimeEntry.taskId,
          validTimeEntry.from,
          validTimeEntry.to
        ]
      );
    })
    .then(timeEntryFromDB)
    .then(timeEntry => {
      console.log(timeEntry);
      return timeEntry;
    });
}
