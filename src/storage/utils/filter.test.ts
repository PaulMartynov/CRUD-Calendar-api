import { getTasksByFilter } from "./filter";

const testData: Task[] = [
  {
    id: 1,
    description: "test_1",
    date: new Date("10.10.2010"),
    status: "test_status_1",
    tags: ["t1", "t2"],
  },
  {
    id: 2,
    description: "test_2",
    date: new Date("11.11.2011"),
    status: "test_status_1",
  },
];

describe("testing getTasksByFilter function", () => {
  test("it is a function", () => {
    expect(getTasksByFilter).toBeInstanceOf(Function);
  });
  [
    [{ tags: ["t1"] }, [testData[0]]],
    [{ description: "test_2" }, [testData[1]]],
    [{ status: "test_status_1" }, [testData[0], testData[1]]],
    [{ status: "test_status_2" }, []],
    [
      { fromDate: new Date("9.10.2010"), toDate: new Date("11.10.2010") },
      [testData[0]],
    ],
    [{ fromDate: new Date("9.10.2011"), toDate: new Date("11.10.2011") }, []],
  ].forEach(([filter, tasks]) => {
    test(`filter='${filter}'`, () => {
      expect(getTasksByFilter(testData, filter as Filter)).toStrictEqual(tasks);
    });
  });
});
