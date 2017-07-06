import { addEntry, removeEntry } from './entries'

test('entries actionCreator', () => {
  const from = new Date()
  const to = new Date()

  expect(addEntry('test-project', 'test-task', { id: 'test-id', from, to })).toEqual({
    type: 'ADD_TIME_ENTRY',
    payload: {
      entry: {
        id: 'test-id',
        from,
        to,
        taskId: 'test-task',
        projectId: 'test-project'
      },
      projectId: 'test-project',
      taskId: 'test-task'
    }
  })

  const testId = 'testId'

  expect(removeEntry(testId)).toEqual({
    type: 'REMOVE_TIME_ENTRY',
    payload: testId
  })
})
