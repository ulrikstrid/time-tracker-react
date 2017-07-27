import { addEntry, removeEntry } from "./entries";

test("entries actionCreator", () => {
  const from = "8:00";
  const to = "12:00";

  expect(
    addEntry("test-project", "test-task", { id: "test-id", from, to })
  ).toMatchObject({
    type: "ADD_TIME_ENTRY",
    payload: {
      entry: {
        id: "test-id",
        from,
        to,
        taskId: "test-task",
        projectId: "test-project"
      },
      projectId: "test-project",
      taskId: "test-task"
    }
  });

  const testId = "testId";

  expect(removeEntry(testId)).toEqual({
    type: "REMOVE_TIME_ENTRY",
    payload: testId
  });
});
