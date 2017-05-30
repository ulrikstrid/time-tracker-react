import * as projectsActions from './projects'

test('we can create a ADD_PROJECT action', () => {
  const partialProject = {
    name: 'test',
    description: 'some description'
  }

  expect(projectsActions.addProject(partialProject)).toMatchObject({
    type: 'ADD_PROJECT',
    payload: partialProject
  })
})

test('we can create a REMOVE_PROJECT action', () => {
  expect(projectsActions.removeProject('test_id')).toEqual({
    type: 'REMOVE_PROJECT',
    payload: 'test_id'
  })
})
