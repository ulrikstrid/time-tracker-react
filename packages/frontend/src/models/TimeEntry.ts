import * as moment from "moment";

export type TimeEntry = {
  id: string;
  from: string;
  to: string;
  date: moment.Moment;
  taskId: string | null;
  projectId: string;
};

export type TimeEntryAPI = {
  id: string;
  from: string;
  to: string;
  date: string;
  taskId: string | null;
  projectId: string;
};

export function isTimeEntry(timeEntry: any): timeEntry is TimeEntry {
  if (
    timeEntry.id &&
    isDate(timeEntry.from) &&
    isDate(timeEntry.to) &&
    timeEntry.taskId &&
    timeEntry.projectId
  ) {
    return true;
  }
  return false;
}

function isDate(str: any): str is Date {
  return Object.prototype.toString.call(new Date(str)) === "[object Date]";
}

export function fromApi(timeEntry: TimeEntryAPI): TimeEntry {
  return {
    ...timeEntry,
    date: moment(timeEntry.date)
  };
}

export function timeToNumber(time: string): number {
  const regexMatch = /^([0-9]{2}):([0-9]{2})/.exec(time);

  if (regexMatch) {
    const [, hour, minute] = regexMatch;
    return parseInt(minute, 10) + parseInt(hour, 10) * 60;
  }

  return 0;
}
