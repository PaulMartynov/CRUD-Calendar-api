import { Calendar } from "./calendar";

describe("testing Calendar", () => {
  test("it is a function", () => {
    expect(Calendar).toBeInstanceOf(Function);
    expect(new Calendar()).toBeInstanceOf(Calendar);
  });
});
