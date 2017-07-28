import * as React from "react";
import * as moment from "moment";

import { Task } from "../models/Task";
import { TimeEntry, timeToNumber } from "../models/TimeEntry";
import { TimeEntryFilter } from "../state/reducers/entries";

import { Table, Thead, Tbody, Tr, Th, Td } from "./Table";

interface Props {
  tasks: Task[];
  timeEntries: TimeEntry[];
  filter: TimeEntryFilter;
}

const rowDataToRow = (tasks: Task[]) => (entry: TimeEntry) => {
  const entryTask = tasks.find(task => task.id === entry.taskId);

  return (
    <Tr key={entry.id}>
      <Td>
        {entryTask ? entryTask.name : ""}
      </Td>
      <Td>
        {entry.date.format("MMM Do -YY")}
      </Td>
      <Td>
        <input
          defaultValue={moment(entry.from, "HH:mm").format("HH:mm").toString()}
        />
      </Td>
      <Td>
        <input
          defaultValue={moment(entry.to, "HH:mm").format("HH:mm").toString()}
        />
      </Td>
      <Td>
        {(timeToNumber(entry.to) - timeToNumber(entry.from)) / 60} h
      </Td>
    </Tr>
  );
};

export default class TimeList extends React.PureComponent<Props, any> {
  render() {
    const sortedEntries = this.props.timeEntries
      .filter(entry => {
        return (
          entry.date.diff(this.props.filter.end, "day") < 0 &&
          entry.date.diff(this.props.filter.start, "day") > 0
        );
      })
      .sort((a, b) => a.date.diff(b.date));

    return (
      <Table>
        <Thead>
          <Tr>
            <Th>Task</Th>
            <Th>Date</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedEntries.map(rowDataToRow(this.props.tasks))}
        </Tbody>
      </Table>
    );
  }
}
