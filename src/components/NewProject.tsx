import * as React from 'react'
import { Project } from '../models/Project'

const preventDef = (e: React.FormEvent<any>) => e.preventDefault()

interface Props {
  projectName: string | null
  projectDescription: string | null
  setProjectName: (name: string) => any
  setProjectDescription: (description: string) => any
  addProject: (project: Partial<Project>) => any
}

function NewProject (props: Props) {
  const setProjectName = (e: React.ChangeEvent<{ value: string }>) => {
    props.setProjectName(e.target.value)
  }

  const setProjectDescription = (e: React.ChangeEvent<{ value: string }>) => {
    props.setProjectDescription(e.target.value)
  }

  const submitProject = () => {
    if (props.projectName) {
      props.addProject({ name: props.projectName, description: props.projectDescription || undefined })
    }
  }

  return (
    <form onSubmit={preventDef}>
      <input type='text' value={props.projectName || ''} onChange={setProjectName} />
      <input type='text' value={props.projectDescription || ''} onChange={setProjectDescription} />
      <input type='submit' onClick={submitProject} />
    </form>
  )
}

export default NewProject
