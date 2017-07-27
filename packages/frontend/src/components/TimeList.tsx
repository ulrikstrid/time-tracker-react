import * as React from "react";
import * as moment from "moment";

import { Task } from "../models/Task";
import { TimeEntry, timeToNumber } from "../models/TimeEntry";
import { TimeEntryFilter } from "../state/reducers/entries";

interface Props {
  tasks: Task[];
  timeEntries: TimeEntry[];
  filter: TimeEntryFilter;
  getTimeEntries: () => void;
}

export const TimeRow = (tasks: Task[]) => (entry: TimeEntry, index: number) => {
  const entryTask = tasks.find(task => task.id === entry.taskId);
  const entryMoment = moment(entry.date);

  return (
    <tr key={entry.id}>
      <td>
        {index}
      </td>
      <td>
        {entryMoment.format("MMM Do YY")}
      </td>
      <td>
        <input defaultValue={entry.from} type="time" />
      </td>
      <td>
        <input defaultValue={entry.to} type="time" />
      </td>
      <td>
        {(timeToNumber(entry.to) - timeToNumber(entry.from)) / 60}
      </td>
      <td>
        {entryTask ? entryTask.name : ""}
      </td>
    </tr>
  );
};

export default class TimeList extends React.PureComponent<Props, void> {
  render() {
    console.log(
      this.props.filter.start,
      this.props.filter.end,
      this.props.filter.end.diff(this.props.filter.start, "day")
    );

    const sortedEntries = this.props.timeEntries
      .filter(entry => {
        return (
          entry.date.diff(this.props.filter.end, "day") < 0 &&
          entry.date.diff(this.props.filter.start, "day") > 0
        );
      })
      .sort((a, b) => a.date.diff(b.date));

    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Total</th>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map(TimeRow(this.props.tasks))}
        </tbody>
      </table>
    );
  }
}
