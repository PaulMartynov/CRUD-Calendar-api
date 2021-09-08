export abstract class CalendarService {
  private tasks: Task[] = [];

  constructor() {
    this.getAllTasks().then((tasks) => {
      this.tasks = tasks;
    });
  }

  abstract getAllTasks(): Promise<Task[]>;

  abstract getTask(id: number): Promise<Task | null>;

  abstract updateTask(id: number, payload: Partial<Task>): Promise<boolean>;

  abstract addNewTask(taskData: TaskData): Promise<boolean>;

  abstract deleteTask(id: number): Promise<boolean>;

  abstract findTask(): Promise<Task[]>;

  protected filterTasks(filter: Filter): Task[] {
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
