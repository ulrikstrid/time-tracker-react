import * as GUID from './GUID'

test('generate', () => {
  expect(GUID.generate().length).toBe(36)
  expect(GUID.generate()).toMatch(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/)
})
