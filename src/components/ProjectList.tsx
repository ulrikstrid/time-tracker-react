import * as React from 'react'

import { Project } from '../models/Project'

interface Props {
  projects: Project[]
}

function ProjectList (props: Props) {
  return (
    <div>
      {props.projects.map(project => <p key={project.id}>{project.name}</p>)}
    </div>
  )
}

export default ProjectList
