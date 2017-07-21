import * as uuid from "uuid";
import * as Joi from "joi";

export type TimeEntry = {
  id: string;
  from: Date;
  to: Date;
  taskId: string;
};

export type NewTimeEntry = {
  from: Date;
  to: Date;
  taskId: string;
};

export type TimeEntryDB = {
  id: string;
  start_time: string;
  end_time: string;
  task_id: string;
};

const uuidv4 = Joi.string().guid({
  version: ["uuidv4"]
});

export const timeEntrySchema = Joi.object().keys({
  id: uuidv4,
  taskId: uuidv4,
  from: Joi.string(),
  to: Joi.string()
});

export function createTimeEntry(newEntry: NewTimeEntry): TimeEntry {
  return {
    id: uuid.v4(),
    taskId: newEntry.taskId,
    from: newEntry.from,
    to: newEntry.to
  };
}

export function timeEntryFromDB(dbFormat: TimeEntryDB): TimeEntry {
  return {
    id: dbFormat.id,
    taskId: dbFormat.task_id,
    from: new Date(dbFormat.start_time),
    to: new Date(dbFormat.end_time)
  };
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
