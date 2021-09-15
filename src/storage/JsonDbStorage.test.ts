import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { JsonDbStorage } from "./JsonDbStorage";

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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addTestData() {
  const db = new JsonDB(new Config("tasksDataBase", true, false, "/"));
  db.push(
    "/tasks",
    {
      1: {
        description: "test_1",
        date: new Date("10.10.2010"),
        status: "test_status_1",
        tags: ["t1", "t2"],
      },
      2: {
        description: "test_2",
        date: new Date("11.11.2011"),
        status: "test_status_1",
      },
    },
    true
  );
}

let storage: JsonDbStorage;
afterEach(() => {
  const db = new JsonDB(new Config("tasksDataBase", true, false, "/"));
  db.delete("/tasks");
});

describe("testing JsonDbStorage class", () => {
  test("it is a function", () => {
    expect(JsonDbStorage).toBeInstanceOf(Function);
  });
});

describe("testing getAllTasks", () => {
  test("it is a function", () => {
    expect(new JsonDbStorage().getAllTasks).toBeInstanceOf(Function);
  });
  test("getting all tasks", async () => {
    addTestData();
    await sleep(20);
    storage = new JsonDbStorage();
    const tasks = await storage.getAllTasks();
    expect(tasks).toStrictEqual(testData);
  });
});

describe("testing addNewTask", () => {
  test("it is a function", () => {
    expect(storage.addNewTask).toBeInstanceOf(Function);
  });
  test("adding new task", async () => {
    await sleep(20);
    storage = new JsonDbStorage();
    let tasks = await storage.getAllTasks();
    expect(tasks).toHaveLength(0);

    let result = await storage.addNewTask({
      description: "test_1",
      date: new Date("10.10.2010"),
      status: "test_status_1",
      tags: ["t1", "t2"],
    });

    expect(result).toBe(1);

    tasks = await storage.getAllTasks();
    expect(tasks).toHaveLength(1);

    result = await storage.addNewTask({
      description: "test_2",
      date: new Date("11.11.2011"),
      status: "test_status_1",
    });

    expect(result).toBe(2);

    tasks = await storage.getAllTasks();
    expect(tasks).toHaveLength(2);
    expect(tasks).toStrictEqual(testData);
  });
});

describe("testing deleteTask", () => {
  test("it is a function", () => {
    expect(new JsonDbStorage().deleteTask).toBeInstanceOf(Function);
  });
  test("deleting task", async () => {
    addTestData();
    await sleep(20);
    storage = new JsonDbStorage();

    let tasks = await storage.getAllTasks();
    expect(tasks).toHaveLength(testData.length);

    let result = await storage.deleteTask(testData.length + 1);
    expect(result).toBeTruthy();

    tasks = await storage.getAllTasks();
    expect(tasks).toHaveLength(testData.length);

    result = await storage.deleteTask(testData.length);
    expect(result).toBeTruthy();

    tasks = await storage.getAllTasks();
    expect(tasks).toHaveLength(testData.length - 1);

    expect(tasks[tasks.length - 1]).toStrictEqual(
      testData[testData.length - 2]
    );
  });
});

describe("testing getTask", () => {
  test("it is a function", () => {
    expect(new JsonDbStorage().getTask).toBeInstanceOf(Function);
  });
  test("getting task", async () => {
    addTestData();
    await sleep(20);
    storage = new JsonDbStorage();
    let task = await storage.getTask(testData.length + 1);
    expect(task).toStrictEqual(null);

    task = await storage.getTask(1);
    expect(task).toStrictEqual(testData[0]);
  });
});

describe("testing updateTask", () => {
  test("it is a function", () => {
    expect(new JsonDbStorage().updateTask).toBeInstanceOf(Function);
  });
  test("updating task", async () => {
    addTestData();
    await sleep(20);
    storage = new JsonDbStorage();

    let result = await storage.updateTask(testData.length + 1, {
      status: "test_status_2",
    });
    expect(result).toBeFalsy();

    result = await storage.updateTask(1, { status: "test_status_2" });
    expect(result).toBeTruthy();

    const task = await storage.getTask(1);
    expect(task?.status).toStrictEqual("test_status_2");
  });
});
