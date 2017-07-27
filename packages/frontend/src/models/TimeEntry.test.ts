import { timeToNumber } from "./TimeEntry";

test("can parse a number", () => {
  expect(timeToNumber("08:00:00")).toBe(8 * 60);
});
