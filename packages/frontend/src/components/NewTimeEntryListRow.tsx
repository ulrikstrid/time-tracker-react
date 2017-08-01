import * as React from "react";
import moment from "moment";
import { Combobox, DateTimePicker } from "react-widgets";

import { Task } from "../models/Task";
import { TimeEntry, timeToNumber } from "../models/TimeEntry";

import { Tr, Td } from "../primitives/Table";
import { IconButton } from "../primitives/Button";

const saveSVG = require("../svg/floppy-disk.svg");

type Props = {
  tasks: Task[];
  saveEntry: (entry: TimeEntry) => void;
};

type State = TimeEntry;

class NewTimeEntryListRow extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      id: "",
      from: "08:00",
      to: "16:00",
      date: moment(),
      taskId: null,
      projectId: null
    };
  }

  setTask = (task: Task) => {
    this.setState({ taskId: task.id });
  };

  setDate = (date: Date) => {
    this.setState({ date: moment(date) });
  };

  setFrom = (date: Date, str: string) => {
    this.setState({ from: str });
  };

  setTo = (date: Date, str: string) => {
    this.setState({ to: str });
  };

  render() {
    return (
      <Tr key="new-row" style={{ background: "rgba(255, 255, 135, 0.5)" }}>
        <Td>
          <Combobox
            suggest={true}
            valueField="id"
            textField="name"
            data={[{ id: null, name: "No task" }, ...this.props.tasks]}
            value={this.state.taskId}
            onChange={this.setTask}
            onSelect={this.setTask}
          />
        </Td>
        <Td>
          <DateTimePicker
            calendar={true}
            time={false}
            value={this.state.date.toDate()}
            onChange={this.setDate}
          />
        </Td>
        <Td>
          <DateTimePicker
            calendar={false}
            time={true}
            defaultValue={moment(this.state.from, "HH:mm").toDate()}
            onChange={this.setFrom}
          />
        </Td>
        <Td>
          <DateTimePicker
            calendar={false}
            time={true}
            defaultValue={moment(this.state.to, "HH:mm").toDate()}
            onChange={this.setTo}
          />
        </Td>
        <Td>
          {(timeToNumber(this.state.to) - timeToNumber(this.state.from)) / 60} h
        </Td>
        <Td>
          <IconButton
            src={saveSVG}
            onClick={() => this.props.saveEntry(this.state)}
          />
        </Td>
      </Tr>
    );
  }
}

export default NewTimeEntryListRow;
