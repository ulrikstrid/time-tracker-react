import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Task } from "../models/Task";
import { TimeEntry } from "../models/TimeEntry";

import { TimeEntryFilter } from "../state/reducers/entries";
import { updateEntry, saveEntry } from "../state/actionCreators/entries";

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
  updateEntry: (id: string, patch: Partial<TimeEntry>) => void;
  saveEntry: (entry: TimeEntry) => void;
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
    updateEntry: (id, patch) => dispatch(updateEntry(id, patch)),
    saveEntry: entry => dispatch(saveEntry(entry))
  };
}

const TimeListConnector: React.ComponentClass<{}> = connect<
  StateToProps,
  DispatchToProps,
  {}
>(mapStateToProps, mapDispatchToProps)(TimeList);

export default TimeListConnector;
