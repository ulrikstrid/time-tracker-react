import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { TimeEntryFilter } from "../state/reducers/entries";
import { setFilterStart, setFilterEnd } from "../state/actionCreators/entries";

import { AppState, AppActions, getTimeFilter } from "../state";

import TimeFilter from "../components/TimeFilter";

interface StateToProps {
  filter: TimeEntryFilter;
}

interface DispatchToProps {
  setFilterStart: (start: Date | string | null | undefined) => void;
  setFilterEnd: (end: Date | string | null | undefined) => void;
  // removeProject: (id: string) => RemoveProject;
}

function mapStateToProps(appState: AppState): StateToProps {
  return {
    filter: getTimeFilter(appState)
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    setFilterStart: start => {
      if (start) dispatch(setFilterStart(start));
    },
    setFilterEnd: end => {
      if (end) dispatch(setFilterEnd(end));
    }
  };
}

const TimeListConnector: React.ComponentClass<{}> = connect<
  StateToProps,
  DispatchToProps,
  {}
>(mapStateToProps, mapDispatchToProps)(TimeFilter);

export default TimeListConnector;
