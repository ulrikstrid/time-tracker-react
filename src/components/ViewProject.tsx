import * as React from 'react'

import { Task } from '../models/Task'
import { TimeEntry } from '../models/TimeEntry'
import { Project } from '../models/Project'

interface Props {
  project: Project
  tasks: Task[]
  timeEntries: TimeEntry[]
}

function ProjectList (props: Props) {
  return <div>{props.project.name}</div>
}

export default ProjectList
