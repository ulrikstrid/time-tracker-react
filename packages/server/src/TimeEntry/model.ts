import * as uuid from "uuid";
import * as Joi from "joi";
import * as R from "ramda";

export type TimeEntry = {
  id: string;
  from: string;
  to: string;
  taskId: string;
  date: string;
};

export type NewTimeEntry = {
  from: string;
  to: string;
  date: string;
  taskId: string;
};

export type TimeEntryDB = {
  id: string;
  start_time: string;
  end_time: string;
  task_id: string;
  date: string;
};

const removeUndefined = R.pickBy(value => value !== undefined);

const uuidv4 = Joi.string().guid({
  version: ["uuidv4"]
});

export const timeEntrySchema = Joi.object().keys({
  id: uuidv4,
  taskId: uuidv4,
  from: Joi.string(),
  to: Joi.string(),
  date: Joi.string()
});

export function createTimeEntry(newEntry: NewTimeEntry): TimeEntry {
  return {
    id: uuid.v4(),
    taskId: newEntry.taskId,
    from: newEntry.from,
    to: newEntry.to,
    date: newEntry.date
  };
}

export function timeEntryFromDB(dbFormat: TimeEntryDB): TimeEntry {
  return {
    id: dbFormat.id,
    taskId: dbFormat.task_id,
    from: dbFormat.start_time,
    to: dbFormat.end_time,
    date: dbFormat.date.toString().substr(0, 10)
  };
}

export function timeEntryToDB(
  timeEntry: Partial<TimeEntry>
): Partial<TimeEntryDB> {
  return removeUndefined({
    id: timeEntry.id,
    task_id: timeEntry.taskId,
    start_time: timeEntry.from,
    end_time: timeEntry.to,
    date: timeEntry.date ? timeEntry.date.toString().substr(0, 10) : undefined
  });
}

export function validateTimeEntry(timeEntry: any): Promise<TimeEntry> {
  return new Promise((resolve, reject) => {
    Joi.validate(timeEntry, timeEntrySchema, (error, value) => {
      if (error) return reject(error);
      resolve(value);
    });
  });
}

export function isTimeEntry(timeEntry: any): timeEntry is TimeEntry {
  const result = Joi.validate(timeEntry, timeEntrySchema, { abortEarly: true });
  if (result.error == null) return true;
  return false;
}
