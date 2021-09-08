import { LocalStorageService } from "./LocalStorageService";

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
let storage: LocalStorageService;
beforeEach(() => {
  localStorage.setItem("tasks", JSON.stringify(testData));
  storage = new LocalStorageService();
});
afterEach(() => {
  localStorage.clear();
});
describe("testing LocalStorageService", () => {
  test("it is a function", () => {
    expect(LocalStorageService).toBeInstanceOf(Function);
  });
});

describe("testing getAllTasks", () => {
  test("it is a function", () => {
    expect(storage.getAllTasks).toBeInstanceOf(Function);
  });
  test("getting all tasks", async () => {
    const result = await storage.getAllTasks();
    expect(result).toStrictEqual(testData);
  });
});
