import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Project } from "../models/Project";

import { AppState, AppActions, getProjects } from "../state";
import { removeProject, RemoveProject } from "../state/actionCreators/projects";
import ProjectList from "../components/ProjectList";

interface StateToProps {
  projects: Project[];
}

interface DispatchToProps {
  removeProject: (id: string) => RemoveProject;
}

function mapStateToProps(appState: AppState): StateToProps {
  return {
    projects: getProjects(appState)
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    removeProject: (id: string) => dispatch(removeProject(id))
  };
}

const ProjectListConnector: React.ComponentClass<{}> = connect<
  StateToProps,
  DispatchToProps,
  {}
>(mapStateToProps, mapDispatchToProps)(ProjectList);

export default ProjectListConnector;
