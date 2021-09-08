export class LocalStorageService implements StorageService {
  addNewTask = async (taskData: TaskData): Promise<number | null> => {
    const tasks: Task[] = await this.getAllTasks();
    const lastId = tasks[tasks.length - 1] ? tasks[tasks.length - 1].id : 0;
    const id = lastId + 1;
    tasks.push({ id, ...taskData });
    return id;
  };

  deleteTask = async (id: number): Promise<boolean> => {
    const tasks: Task[] = await this.getAllTasks();
    const newTasks = tasks.filter((task) => task.id !== id);
    await localStorage.setItem("tasks", JSON.stringify(newTasks));
    return true;
  };

  getAllTasks = async (): Promise<Task[]> => {
    return JSON.parse(localStorage.getItem("tasks") ?? "");
  };

  getTask = async (id: number): Promise<Task | null> => {
    const tasks: Task[] = await this.getAllTasks();
    if (!tasks[id]) {
      return null;
    }
    return tasks[id];
  };

  updateTask = async (id: number, payload: Partial<Task>): Promise<boolean> => {
    const tasks: Task[] = await this.getAllTasks();
    if (!tasks[id]) {
      return false;
    }
    tasks[id] = { ...tasks[id], ...payload };
    await localStorage.setItem("tasks", JSON.stringify(tasks));
    return true;
  };
}
