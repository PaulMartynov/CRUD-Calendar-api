interface TaskData {
  description: string;
  date: Date;
  status: string;
  tags?: string[];
}

interface Task extends TaskData {
  id: number;
}

interface Filter {
  description?: string;
  fromDate?: Date;
  toDate?: Date;
  status?;
  tags?: string[];
}

interface Storage {
  getAllTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | null>;
  updateTask(id: number, payload: Partial<Task>): Promise<boolean>;
  addNewTask(taskData: TaskData): Promise<boolean>;
  deleteTask(id: number): Promise<boolean>;
  findTask(filter: Filter): Promise<Task[]>;
}
