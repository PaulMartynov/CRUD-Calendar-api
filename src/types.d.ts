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
