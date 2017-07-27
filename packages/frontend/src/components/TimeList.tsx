import * as React from "react";
import * as moment from "moment";

import { TimePicker, Table } from "antd";
import { ColumnProps } from "antd/lib/table/Column";

import { Task } from "../models/Task";
import { TimeEntry, timeToNumber } from "../models/TimeEntry";
import { TimeEntryFilter } from "../state/reducers/entries";

interface Props {
  tasks: Task[];
  timeEntries: TimeEntry[];
  filter: TimeEntryFilter;
  getTimeEntries: () => void;
}

const tableColumns = (tasks: Task[]): ColumnProps<TimeEntry>[] => [
  {
    title: "Task",
    dataIndex: "taskId",
    key: "task",
    render: (taskId, entry) => {
      const entryTask = tasks.find(task => task.id === entry.taskId);
      return (
        <span>
          {entryTask ? entryTask.name : ""}
        </span>
      );
    }
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (_, entry) => {
      return (
        <span>
          {entry.date.format("MMM Do -YY")}
        </span>
      );
    }
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: from => {
      return <TimePicker defaultValue={moment(from, "HH:mm")} />;
    }
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: to => {
      return <TimePicker defaultValue={moment(to, "HH:mm")} />;
    }
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (_, entry) => {
      return (
        <span>
          {(timeToNumber(entry.to) - timeToNumber(entry.from)) / 60} h
        </span>
      );
    }
  }
];

export default class TimeList extends React.PureComponent<Props, void> {
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
      <Table
        dataSource={sortedEntries}
        columns={tableColumns(this.props.tasks)}
      />
    );
  }
}
