export type TimeEntry = {
  id: string,
  from: Date,
  to: Date,
  taskId: string,
  projectId: string
}

export function isTimeEntry (timeEntry: any): timeEntry is TimeEntry {
  if (timeEntry.id && isDate(timeEntry.from) && isDate(timeEntry.to) && timeEntry.taskId && timeEntry.projectId) {
    return true
  }
  return false
}

function isDate(str: any): str is Date {
  return (Object.prototype.toString.call(new Date(str)) === "[object Date]");
}
