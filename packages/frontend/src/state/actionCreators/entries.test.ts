import moment from "moment";

import { addEntry, removeEntry } from "./entries";

test("entries actionCreator", () => {
  const from = "8:00";
  const to = "12:00";

  expect(
    addEntry({
      id: "test-id",
      from,
      to,
      taskId: "test-task",
      date: moment(),
      projectId: "test-project"
    })
  ).toMatchObject({
    type: "ADD_TIME_ENTRY",
    payload: {
      id: "test-id",
      from,
      to,
      taskId: "test-task",
      projectId: "test-project"
    }
  });

  const testId = "testId";

  expect(removeEntry(testId)).toEqual({
    type: "REMOVE_TIME_ENTRY",
    payload: testId
  });
});
