import * as state from './index'

test('state index', () => {
  const newState = state.appReducer(state.initialState, { type: 'NO_OP' })

  expect(newState).toEqual(state.initialState)
})
