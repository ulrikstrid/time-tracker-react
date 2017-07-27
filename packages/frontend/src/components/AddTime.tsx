import * as React from "react";
import { Task } from "../models/Task";
import { TimeEntry } from "../models/TimeEntry";

export interface Props {
  newEntry: Partial<TimeEntry>;
  selectedDate: Date;
  tasks: Task[];
  updateSelectedDate: React.ChangeEventHandler<HTMLInputElement>;
  updateFromDate: React.ChangeEventHandler<HTMLInputElement>;
  updateToDate: React.ChangeEventHandler<HTMLInputElement>;
  updateTask: React.ChangeEventHandler<HTMLSelectElement>;
  submitEntry: React.FormEventHandler<HTMLFormElement>;
}

export function AddTime(props: Props) {
  return (
    <div>
      <form onSubmit={props.submitEntry}>
        <input
          type="date"
          onChange={props.updateSelectedDate}
          defaultValue={props.selectedDate.toLocaleDateString()}
        />
        <input
          type="time"
          onChange={props.updateFromDate}
          defaultValue={props.newEntry.from && props.newEntry.from}
        />
        <input
          type="time"
          onChange={props.updateToDate}
          defaultValue={props.newEntry.to && props.newEntry.to}
        />
        <select value={props.newEntry.taskId} onChange={props.updateTask}>
          {props.tasks.map(task =>
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          )}
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}
