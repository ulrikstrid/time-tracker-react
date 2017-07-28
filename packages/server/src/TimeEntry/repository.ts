import {
  TimeEntry,
  TimeEntryDB,
  NewTimeEntry,
  createTimeEntry,
  validateTimeEntry,
  timeEntryFromDB,
  timeEntryToDB
} from "./model";
import * as pgp from "pg-promise";

export function getTimeEntries(
  db: pgp.IDatabase<any>,
  taskId?: string
): Promise<TimeEntry[]> {
  if (taskId) {
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

  return db
    .any(
      `
        SELECT *
        FROM time_entry
      `
    )
    .then((entries: TimeEntryDB[]) => entries.map(timeEntryFromDB));
}

export function getTimeEntry(
  db: pgp.IDatabase<any>,
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
  db: pgp.IDatabase<any>,
  taskId: string,
  newTimeEntry: NewTimeEntry
): Promise<TimeEntry> {
  return validateTimeEntry(createTimeEntry(newTimeEntry))
    .then(validTimeEntry => {
      return db.one(
        `
          INSERT INTO time_entry(id, task_id, start_time, end_time, date)
          VALUES($1, $2, $3, $4, $5)
          RETURNING id, task_id, start_time, end_time, date
        `,
        [
          validTimeEntry.id,
          validTimeEntry.taskId,
          validTimeEntry.from,
          validTimeEntry.to,
          pgp.as.text(validTimeEntry.date)
        ]
      );
    })
    .then(timeEntryFromDB)
    .then(timeEntry => {
      console.log("timeEntry: ", timeEntry);
      return timeEntry;
    });
}

export function updateTimeEntry(
  db: pgp.IDatabase<any>,
  entryId: string,
  partialTimeEntry: Partial<TimeEntry>
): Promise<TimeEntry> {
  const setStatement = Object.keys(timeEntryToDB(partialTimeEntry))
    .map((key, index) => `${key} = $${index + 2}`)
    .join(", ");

  const values: any[] = Object.keys(partialTimeEntry).map(
    (key): any => (<any>partialTimeEntry)[key]
  );

  console.log(
    `
        UPDATE time_entry
        SET ${setStatement}
        WHERE id = $1
      `,
    [entryId].concat(values)
  );

  return db
    .one(
      `
        UPDATE time_entry
        SET ${setStatement}
        WHERE id = $1
        RETURNING id, task_id, start_time, end_time, date
      `,
      [entryId].concat(values)
    )
    .then(timeEntryFromDB);
}
