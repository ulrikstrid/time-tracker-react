import * as React from 'react'

const preventDef = (e: React.FormEvent<any>) => e.preventDefault()

interface Props {
  projectName: string | null
  projectDescription: string | null
  setProjectName: (name: string) => any
  setProjectDescription: (description: string) => any
}

function NewProject (props: Props) {
  const setProjectName = (e: React.ChangeEvent<{ value: string }>) => {
    props.setProjectName(e.target.value)
  }

  const setProjectDescription = (e: React.ChangeEvent<{ value: string }>) => {
    props.setProjectDescription(e.target.value)
  }

  return (
    <form onSubmit={preventDef}>
      <input type='text' value={props.projectName || ''} onChange={setProjectName} />
      <input type='text' value={props.projectDescription || ''} onChange={setProjectDescription} />
    </form>
  )
}

export default NewProject
