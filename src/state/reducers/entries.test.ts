import { reducer, initialState, getEntries, getEntry } from './entries'
import { addEntry, removeEntry } from '../actionCreators/entries'

test('no-op task', () => {
  expect(reducer(undefined, { type: 'NO_OP' })).toEqual(initialState)
})

const firstEntry = {
  id: 'test-id',
  from: new Date(),
  to: new Date()
}

const secondEntry = {
  id: 'testId',
  from: new Date(),
  to: new Date()
}

const testState = {
  ids: ['test-id', 'testId'],
  entries: {
    'test-id': firstEntry,
    'testId': secondEntry
  }
}

test('can add entry', () => {
  const newState = reducer(initialState, addEntry('test-task', firstEntry))

  expect(newState.ids).toContain('test-id')
  expect(newState.entries).toEqual({
    'test-id': firstEntry
  })
})

test('can remove entry', () =>  {
  const newState = reducer(testState, removeEntry('test-id'))

  expect(newState).toEqual({
    ids: ['testId'],
    entries: {
      'testId': secondEntry
    }
  })
})

test('get helpers', () => {
  expect(getEntry(testState, 'test-id')).toEqual(firstEntry)
  expect(getEntries(testState)).toContainEqual(firstEntry)
})
