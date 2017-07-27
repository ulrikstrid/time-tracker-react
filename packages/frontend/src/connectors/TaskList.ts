import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Task } from "../models/Task";

import { AppState, AppActions, getTasks } from "../state/index";
import { removeTask, RemoveTask } from "../state/actionCreators/tasks";
import TaskList from "../components/TaskList";

interface StateToProps {
  tasks: Task[];
}

interface DispatchToProps {
  removeTask: (id: string) => RemoveTask;
}

function mapStateToProps(appState: AppState): StateToProps {
  return {
    tasks: getTasks(appState)
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    removeTask: (id: string) => dispatch(removeTask(id))
  };
}

const TaskListConnector: React.ComponentClass<{}> = connect<
  StateToProps,
  DispatchToProps,
  {}
>(mapStateToProps, mapDispatchToProps)(TaskList);

export default TaskListConnector;
