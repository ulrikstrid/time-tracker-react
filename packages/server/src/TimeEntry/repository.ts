import {
	TimeEntry,
	NewTimeEntry,
	createTimeEntry,
	validateTimeEntry
} from "./model";
import * as pga from "pg-promise";

export function getTimeEntries(
	db: pga.IDatabase<any>,
	taskId: string
): Promise<TimeEntry[]> {
	return db.any(
		`
      SELECT *
      FROM time_entry
      WHERE task_id = $1
    `,
		[taskId]
	);
}

export function getTimeEntry(
	db: pga.IDatabase<any>,
	taskId: string,
	id: string
): Promise<TimeEntry> {
	return db.one(
		`
      SELECT *
      FROM time_entry
      WHERE id = $1 && task_id = $2
    `,
		[id, taskId]
	);
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
          INSERT INTO time_entry(id, task_id, from, to)
          VALUES($1, $2, $3, $4)
          RETURNING id, task_id, from, to
        `,
				[
					validTimeEntry.id,
					validTimeEntry.taskId,
					validTimeEntry.from,
					validTimeEntry.to
				]
			);
		})
		.then(timeEntry => {
			console.log(timeEntry);
			return timeEntry;
		});
}
