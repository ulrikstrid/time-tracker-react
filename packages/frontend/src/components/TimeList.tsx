import * as React from "react";
import * as moment from "moment";

import { Task } from "../models/Task";
import { TimeEntry, timeToNumber } from "../models/TimeEntry";
import { TimeEntryFilter } from "../state/reducers/entries";

import { Table, Thead, Tbody, Tr, Th, Td } from "../primitives/Table";

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
        <input
          defaultValue={moment(entry.from, "HH:mm").format("HH:mm").toString()}
          onChange={e => updateEntry(entry.id, { from: e.target.value })}
        />
      </Td>
      <Td>
        <input
          defaultValue={moment(entry.to, "HH:mm").format("HH:mm").toString()}
          onChange={e => updateEntry(entry.id, { to: e.target.value })}
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
      <select>
        {tasks.map(task =>
          <option key={task.id} value={task.id}>
            {task.name}
          </option>
        )}
      </select>
    </Td>
    <Td>
      <input type="date" />
    </Td>
    <Td>
      <input defaultValue="08:00" onChange={e => console.log(e)} />
    </Td>
    <Td>
      <input defaultValue="16:00" onChange={e => console.log(e)} />
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
