import { RemoveProject } from '../state/actionCreators/projects'
import * as React from 'react'

import { Project } from '../models/Project'

interface Props {
  projects: Project[]
  removeProject: (id: string) => RemoveProject
}

function ProjectRow (removeProject: (id: string) => any) {
  return (project: Project) => {
    const clickHandler = () => removeProject(project.id)
    return (
      <tr key={project.id}>
        <td>{project.name}</td>
        <td>{project.description}</td>
        <td>{project.taskIds.length}</td>
        <td><button onClick={clickHandler}>Remove</button></td>
      </tr>
    )
  }
}

function ProjectList (props: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Project name</th>
          <th>Description</th>
          <th>Number of tasks</th>
          <th>Remove project</th>
        </tr>
      </thead>
      <tbody>
        {props.projects.map(ProjectRow(props.removeProject))}
      </tbody>
    </table>
  )
}

export default ProjectList
