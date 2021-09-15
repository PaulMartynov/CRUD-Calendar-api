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
  {
    id: 3,
    description: "test_2",
    date: new Date("12.12.2012"),
    status: "test_status_3",
    tags: ["t2"],
  },
];

describe("testing getTasksByFilter function", () => {
  test("it is a function", () => {
    expect(getTasksByFilter).toBeInstanceOf(Function);
  });
  [
    [{ tags: ["t1"] }, [testData[0]]],
    [{ tags: ["t2"] }, [testData[0], testData[2]]],
    [{ description: "test_2" }, [testData[1], testData[2]]],
    [{ status: "test_status_1" }, [testData[0], testData[1]]],
    [{ status: "test_status_2" }, []],
    [
      { fromDate: new Date("9.10.2010"), toDate: new Date("11.10.2010") },
      [testData[0]],
    ],
    [{ fromDate: new Date("9.10.2011"), toDate: new Date("11.10.2011") }, []],
    [{ fromDate: new Date("11.12.2012"), tags: ["t2"] }, [testData[2]]],
    [{ toDate: new Date("11.10.2010"), tags: ["t2"] }, [testData[0]]],
    [
      { fromDate: new Date("9.10.2010"), status: "test_status_1" },
      [testData[0], testData[1]],
    ],
    [
      {
        fromDate: new Date("9.10.2010"),
        status: "test_status_1",
        description: "test_2",
      },
      [testData[1]],
    ],
  ].forEach(([filter, tasks]) => {
    test(`filter='${JSON.stringify(filter)}'`, () => {
      expect(getTasksByFilter(testData, filter as Filter)).toStrictEqual(tasks);
    });
  });
});
