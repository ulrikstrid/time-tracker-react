import { getProject, getProjects, initialState, reducer } from './projects'
import { addProject, removeProject } from '../actionCreators/projects'

const partialProject = {
  id: 'test-id',
  name: 'test-project',
  description: '',
  taskIds: []
}

test('no-op task', () => {
  expect(reducer(undefined, { type: 'NO_OP' })).toEqual(initialState)
})

test('can add project', () => {
  const newState = reducer(initialState, addProject(partialProject))

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

  expect(newState).toEqual(initialState)
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
