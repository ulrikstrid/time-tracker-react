import { getTask, getTasks, initialState, reducer } from './tasks'
import { addTask, removeTask } from '../actionCreators/tasks'

const partialTask = {
  id: 'test-id',
  name: 'test-task',
  description: '',
  entryIds: []
}

test('no-op task', () => {
  expect(reducer(undefined, { type: 'NO_OP' })).toEqual(initialState)
})

test('can add task', () => {
  const newState = reducer(initialState, addTask('test-project', partialTask))

  expect(newState.ids).toContain('test-id')
  expect(newState.tasks).toEqual({
    'test-id': partialTask
  })
})

test('can remove project', () =>  {
  const newState = reducer({
    ids: ['test-id'],
    tasks: {
      'test-id': partialTask
    }
  }, removeTask('test-id'))

  expect(newState).toEqual(initialState)
})

test('get helpers', () => {
  const testState = {
    ids: ['test-id'],
    tasks: {
      'test-id': partialTask
    }
  }

  expect(getTask(testState, 'test-id')).toEqual(partialTask)
  expect(getTasks(testState)).toContainEqual(partialTask)
})
