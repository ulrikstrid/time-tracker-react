import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Task } from "../models/Task";
import { TimeEntry } from "../models/TimeEntry";

import { TimeEntryFilter } from "../state/reducers/entries";

import {
  AppState,
  AppActions,
  getTasks,
  getTimeEntries,
  getTimeFilter
} from "../state";

import TimeList from "../components/TimeList";

interface StateToProps {
  tasks: Task[];
  timeEntries: TimeEntry[];
  filter: TimeEntryFilter;
}

interface DispatchToProps {
  // removeProject: (id: string) => RemoveProject;
}

function mapStateToProps(appState: AppState): StateToProps {
  return {
    tasks: getTasks(appState),
    timeEntries: getTimeEntries(appState),
    filter: getTimeFilter(appState)
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    // removeProject: (id: string) => dispatch(removeProject(id))
  };
}

const TimeListConnector: React.ComponentClass<{}> = connect<
  StateToProps,
  DispatchToProps,
  {}
>(mapStateToProps, mapDispatchToProps)(TimeList);

export default TimeListConnector;
