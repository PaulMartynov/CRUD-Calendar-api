export class CalendarService {
  private tasks: Task[] = [];

  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
    this.getAllTasks().then((tasks) => {
      this.tasks = tasks;
    });
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.storage.getAllTasks();
  }

  async getTask(id: number): Promise<Task | null> {
    return this.storage.getTask(id);
  }

  async updateTask(id: number, payload: Partial<Task>): Promise<boolean> {
    return this.storage.updateTask(id, payload);
  }

  async addNewTask(taskData: TaskData): Promise<number | null> {
    return this.storage.addNewTask(taskData);
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.storage.deleteTask(id);
  }

  getTasksByFilter(filter: Filter): Task[] {
    const { toDate, fromDate, description, status, tags } = filter;
    const filteredTasks: Task[] = [];
    this.tasks.forEach((task): void => {
      if (toDate && new Date(task.date).getTime() >= toDate.getTime()) {
        return;
      }
      if (fromDate && new Date(task.date).getTime() <= fromDate.getTime()) {
        return;
      }
      if (
        description &&
        !task.description.toLowerCase().includes(description.toLowerCase())
      ) {
        return;
      }
      if (status && task.status.toLowerCase() !== status) {
        return;
      }
      if (tags && !task.tags?.some((tag) => tags.includes(tag))) {
        return;
      }

      filteredTasks.push(task);
    });
    return filteredTasks;
  }
}
