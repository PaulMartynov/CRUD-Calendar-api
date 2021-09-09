export function getTasksByFilter(tasks: Task[], filter: Filter): Task[] {
  const { toDate, fromDate, description, status, tags } = filter;
  const filteredTasks: Task[] = [];
  tasks.forEach((task): void => {
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
