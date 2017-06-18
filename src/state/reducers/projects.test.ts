import { getProject, getProjects, initialState, reducer } from './projects'
import { addProject, removeProject } from '../actionCreators/projects'

const emptyState = {
  ids: [],
  projects: {}
}

const partialProject = {
  id: 'test-id',
  name: 'test-project',
  description: '',
  taskIds: [],
  entryIds: []
}

test('no-op task', () => {
  expect(reducer(undefined, { type: 'NO_OP' })).toEqual(initialState)
})

test('can add project', () => {
  const newState = reducer(emptyState, addProject(partialProject))

  expect(newState.ids).toContain('test-id')
  expect(newState.projects).toEqual({
    'test-id': partialProject
  })
})

test('can remove project', () => {
  const newState = reducer({
    ids: ['test-id'],
    projects: {
      'test-id': partialProject
    }
  }, removeProject('test-id'))

  expect(newState).toEqual(emptyState)
})

test('get helpers', () => {
  const testState = {
    ids: ['test-id'],
    projects: {
      'test-id': partialProject
    }
  }

  expect(getProject(testState, 'test-id')).toEqual(partialProject)
  expect(getProjects(testState)).toContainEqual(partialProject)
})
