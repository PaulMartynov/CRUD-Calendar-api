import { CalendarService } from "./calendar";
import { LocalStorageService } from "./storage/LocalStorageService";

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

let calendar: CalendarService;
beforeEach(() => {
  localStorage.setItem("tasks", JSON.stringify(testData));
  calendar = new CalendarService(new LocalStorageService());
});
afterEach(() => {
  localStorage.clear();
});

describe("testing Calendar", () => {
  test("it is a function", () => {
    expect(CalendarService).toBeInstanceOf(Function);
  });
});

describe("testing getTasks function", () => {
  test("it is a function", () => {
    expect(calendar.getTasks).toBeInstanceOf(Function);
  });
  test("getting tasks", () => {
    expect(calendar.getTasks()).toStrictEqual(testData);
  });
});

describe("testing getTasksByFilter function", () => {
  test("it is a function", () => {
    expect(calendar.getTasksByFilter).toBeInstanceOf(Function);
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
      expect(calendar.getTasksByFilter(filter as Filter)).toStrictEqual(tasks);
    });
  });
});
