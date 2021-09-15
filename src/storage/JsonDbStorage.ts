import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { getTasksByFilter } from "./utils/filter";

export class JsonDbStorage implements StorageService {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config("tasksDataBase", true, false, "/"));
    this.db.push("/tasks", {}, false);
  }

  addNewTask = async (taskData: TaskData): Promise<number | null> => {
    const tasks: Task[] = await this.getAllTasks();
    this.db.push(`/tasks/${tasks.length + 1}`, taskData);
    return tasks.length + 1;
  };

  deleteTask = async (id: number): Promise<boolean> => {
    this.db.delete(`/tasks/${id}`);
    return true;
  };

  findTasks = async (filter: Filter): Promise<Task[]> => {
    const tasks: Task[] = await this.getAllTasks();
    return getTasksByFilter(tasks, filter);
  };

  getAllTasks = async (): Promise<Task[]> => {
    const result = this.db.getData("/tasks");
    const tasks: Task[] = [];
    Object.keys(result).forEach((key) => {
      result[key].date = new Date(result[key].date);
      tasks.push({ id: Number(key), ...result[key] });
    });
    tasks.sort((a: Task, b: Task) => {
      return a.id - b.id;
    });
    return tasks;
  };

  getTask = async (id: number): Promise<Task | null> => {
    if (!this.db.exists(`/tasks/${id}`)) {
      return null;
    }
    const result = this.db.getData(`/tasks/${id}`);
    result.date = new Date(result.date);
    return { id, ...result };
  };

  updateTask = async (id: number, payload: Partial<Task>): Promise<boolean> => {
    if (!this.db.exists(`/tasks/${id}`)) {
      return false;
    }
    const task = await this.getTask(id);
    this.db.push(`/tasks/${id}`, { ...task, ...payload }, true);
    return true;
  };
}
