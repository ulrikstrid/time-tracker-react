import moment from "moment";
import { reducer, initialState, getEntries, getEntry, State } from "./entries";
import { addEntry, removeEntry } from "../actionCreators/entries";

test("no-op task", () => {
  expect(reducer(undefined, { type: "NO_OP" })).toEqual(initialState);
});

const firstEntry = {
  id: "test-id",
  from: "13:00",
  to: "17:00",
  date: moment("2017-01-01"),
  taskId: "default",
  projectId: "test-project"
};

const secondEntry = {
  id: "testId",
  from: "8:00",
  to: "12:00",
  date: moment("2017-01-01"),
  taskId: "default",
  projectId: "test-project"
};

const testState: State = {
  ...initialState,
  ids: ["test-id", "testId"],
  entries: {
    "test-id": firstEntry,
    testId: secondEntry
  }
};

test("can add entry", () => {
  const newState = reducer(
    initialState,
    addEntry("test-project", "default", firstEntry)
  );

  expect(newState.ids).toContain("test-id");
  expect(newState.entries).toEqual({
    "test-id": firstEntry
  });
});

test("can remove entry", () => {
  const newState = reducer(testState, removeEntry("test-id"));

  expect(newState).toMatchObject({
    ids: ["testId"],
    entries: {
      testId: secondEntry
    }
  });
});

test("get helpers", () => {
  expect(getEntry(testState, "test-id")).toEqual(firstEntry);
  expect(getEntries(testState)).toContainEqual(firstEntry);
});
