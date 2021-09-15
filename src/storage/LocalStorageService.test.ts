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

describe("testing addNewTask", () => {
  test("it is a function", () => {
    expect(storage.addNewTask).toBeInstanceOf(Function);
  });
  test("adding task", async () => {
    const result = await storage.addNewTask({
      description: "test_3",
      date: new Date("12.12.2012"),
      status: "test_status_2",
    });

    expect(result).toBe(3);

    const tasks = await storage.getAllTasks();
    expect(tasks).toStrictEqual([
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
        description: "test_3",
        date: new Date("12.12.2012"),
        status: "test_status_2",
      },
    ]);
  });
});

describe("testing deleteTask", () => {
  test("it is a function", () => {
    expect(storage.deleteTask).toBeInstanceOf(Function);
  });
  test("deleting task", async () => {
    const result = await storage.deleteTask(2);

    expect(result).toBeTruthy();

    const tasks = await storage.getAllTasks();
    expect(tasks).toStrictEqual([
      {
        id: 1,
        description: "test_1",
        date: new Date("10.10.2010"),
        status: "test_status_1",
        tags: ["t1", "t2"],
      },
    ]);
  });
});

describe("testing getTask", () => {
  test("it is a function", () => {
    expect(storage.getTask).toBeInstanceOf(Function);
  });
  test("getting task", async () => {
    const task3 = await storage.getTask(3);
    expect(task3).toStrictEqual(null);

    const task2 = await storage.getTask(2);
    expect(task2).toStrictEqual({
      id: 2,
      description: "test_2",
      date: new Date("11.11.2011"),
      status: "test_status_1",
    });
  });
});

describe("testing updateTask", () => {
  test("it is a function", () => {
    expect(storage.updateTask).toBeInstanceOf(Function);
  });
  test("updating task", async () => {
    let result = await storage.updateTask(3, { status: "test_status_2" });
    expect(result).toBeFalsy();

    result = await storage.updateTask(2, { status: "test_status_2" });
    expect(result).toBeTruthy();

    const task2 = await storage.getTask(2);
    expect(task2).toStrictEqual({
      id: 2,
      description: "test_2",
      date: new Date("11.11.2011"),
      status: "test_status_2",
    });
  });
});
