import * as React from "react";
import moment from "moment";
import { Combobox, DateTimePicker } from "react-widgets";

import { Task } from "../models/Task";
import { TimeEntry, timeToNumber } from "../models/TimeEntry";
import { TimeEntryFilter } from "../state/reducers/entries";

import { Table, Thead, Tbody, Tr, Th, Td } from "../primitives/Table";
import { IconButton } from "../primitives/Button";

import NewTimeEntryListRow from "./NewTimeEntryListRow";

const trashCanSVG = require("../svg/bin.svg");

interface UpdateEntry {
  (id: string, patch: Partial<TimeEntry>): void;
}

interface SaveEntry {
  (entry: TimeEntry): void;
}

interface Props {
  tasks: Task[];
  timeEntries: TimeEntry[];
  filter: TimeEntryFilter;
  updateEntry: UpdateEntry;
  saveEntry: SaveEntry;
}

const rowDataToRow = (tasks: Task[], updateEntry: UpdateEntry) => (
  entry: TimeEntry
) => {
  return (
    <Tr key={entry.id}>
      <Td>
        <Combobox
          suggest={true}
          valueField="id"
          textField="name"
          data={[{ id: null, name: "No task" }, ...tasks]}
          defaultValue={entry.taskId}
          onChange={task => {
            updateEntry(entry.id, { taskId: task.id });
          }}
        />
      </Td>
      <Td>
        <DateTimePicker
          calendar={true}
          time={false}
          defaultValue={entry.date.toDate()}
          onChange={date => {
            updateEntry(entry.id, {
              date: moment(date)
            });
          }}
        />
      </Td>
      <Td>
        <DateTimePicker
          calendar={false}
          time={true}
          defaultValue={moment(entry.from, "HH:mm").toDate()}
          onChange={(date, str) => updateEntry(entry.id, { from: str })}
        />
      </Td>
      <Td>
        <DateTimePicker
          calendar={false}
          time={true}
          defaultValue={moment(entry.to, "HH:mm").toDate()}
          onChange={(date, str) => updateEntry(entry.id, { to: str })}
        />
      </Td>
      <Td>
        {(timeToNumber(entry.to) - timeToNumber(entry.from)) / 60} h
      </Td>
      <Td>
        <IconButton src={trashCanSVG} />
      </Td>
    </Tr>
  );
};

export default class TimeList extends React.PureComponent<Props, any> {
  render() {
    const sortedEntries = this.props.timeEntries
      .filter(entry => {
        return (
          entry.date.diff(this.props.filter.end, "day") <= 0 &&
          entry.date.diff(this.props.filter.start, "day") >= 0
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
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <NewTimeEntryListRow
            tasks={this.props.tasks}
            saveEntry={this.props.saveEntry}
          />
          {sortedEntries.map(
            rowDataToRow(this.props.tasks, this.props.updateEntry)
          )}
        </Tbody>
      </Table>
    );
  }
}
