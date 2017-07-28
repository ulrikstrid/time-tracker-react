import * as React from "react";
import * as moment from "moment";

import { Task } from "../models/Task";
import { TimeEntry, timeToNumber } from "../models/TimeEntry";
import { TimeEntryFilter } from "../state/reducers/entries";

import { Table, Thead, Tbody, Tr, Th, Td } from "../primitives/Table";
import TimeInput from "../primitives/TimeInput";

interface UpdateEntry {
  (id: string, patch: Partial<TimeEntry>): void;
}

interface Props {
  tasks: Task[];
  timeEntries: TimeEntry[];
  filter: TimeEntryFilter;
  updateEntry: UpdateEntry;
}

const rowDataToRow = (tasks: Task[], updateEntry: UpdateEntry) => (
  entry: TimeEntry
) => {
  const entryTask = tasks.find(task => task.id === entry.taskId);

  return (
    <Tr key={entry.id}>
      <Td>
        {entryTask ? entryTask.name : ""}
      </Td>
      <Td>
        <input
          type="date"
          defaultValue={entry.date.format("YYYY-MM-DD")}
          onChange={e => {
            updateEntry(entry.id, {
              date: moment(e.target.value, "YYYY-MM-DD", true)
            });
          }}
        />
      </Td>
      <Td>
        <TimeInput
          defaultValue={moment(entry.from, "HH:mm").format("HH:mm").toString()}
        />
      </Td>
      <Td>
        <TimeInput
          defaultValue={moment(entry.to, "HH:mm").format("HH:mm").toString()}
        />
      </Td>
      <Td>
        {(timeToNumber(entry.to) - timeToNumber(entry.from)) / 60} h
      </Td>
    </Tr>
  );
};

const NewEntryRow = ({ tasks }: { tasks: Task[] }) =>
  <Tr key="new-row">
    <Td>
      <input />
    </Td>
    <Td>
      <input type="date" />
    </Td>
    <Td>
      <TimeInput
        defaultValue="08:00"
        onChange={(value, mom) => console.log(value, mom)}
      />
    </Td>
    <Td>
      <TimeInput defaultValue="08:00" />
    </Td>
    <Td>0 h</Td>
  </Tr>;

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
          <NewEntryRow tasks={this.props.tasks} />
          {sortedEntries.map(
            rowDataToRow(this.props.tasks, this.props.updateEntry)
          )}
        </Tbody>
      </Table>
    );
  }
}
