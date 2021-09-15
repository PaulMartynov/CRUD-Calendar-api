import { TasksService } from "./TasksService";

describe("testing Calendar", () => {
  test("it is a function", () => {
    expect(TasksService).toBeInstanceOf(Function);
  });
});
