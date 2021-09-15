export class TasksService {
  storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
  }
}
