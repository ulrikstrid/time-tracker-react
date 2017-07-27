import * as React from "react";

import { TimeEntryFilter } from "../state/reducers/entries";

interface Props {
  filter: TimeEntryFilter;
  setFilterStart: (start: string) => void;
  setFilterEnd: (end: string) => void;
}

export default class TimeList extends React.PureComponent<Props, void> {
  render() {
    console.log(this.props.filter.start.format("YYYY-MM-DD").toString());
    return (
      <div>
        <input
          defaultValue={this.props.filter.start.format("YYYY-MM-DD").toString()}
          type="date"
          onChange={e => this.props.setFilterStart(e.target.value)}
        />
        <input
          defaultValue={this.props.filter.end.format("YYYY-MM-DD").toString()}
          type="date"
          onChange={e => this.props.setFilterEnd(e.target.value)}
        />
      </div>
    );
  }
}
