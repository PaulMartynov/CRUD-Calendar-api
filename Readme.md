| Statements                                                                      | Branches                                                               | Functions                                                             | Lines                                                                 |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-98.68%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/branches-89.38%25-yellow.svg) | ![Functions](https://img.shields.io/badge/functions-88%25-yellow.svg) | ![Lines](https://img.shields.io/badge/lines-98.68%25-brightgreen.svg) |

# CRUD-Tasks-Api

## Описание:

- интерфейс поддерживает CRUD.
- фильтрация (по тегам/ статусу/тексту/дате).
- имеет реализацию с localStorage.
- имеет реализацию с json db.

### Пример использования:

```js
import TasksService from "./TasksService";
import LocalStorageService from "./storage/LocalStorageService";
import JsonDbStorage from "./storage/JsonDbStorage";

// Для работы c LocalStorage
const tasksLocal = new TasksService(new LocalStorageService());

// Для работы c JsonDb
const tasksJsBd = new TasksService(new JsonDbStorage());

// Доступ к методам через calendarJsBd.storage или calendarLocal.storage

// Методы:
tasksJsBd.getAllTasks(); // Получение всех задач
tasksJsBd.getTask(id); // Получение задачи по номеру id
tasksJsBd.updateTask(id, payload); // обновление задачи по id
tasksJsBd.addNewTask(taskData); // добавлние новой задачи
tasksJsBd.deleteTask(id); // удаление задачи по id
tasksJsBd.findTasks(filter); // получение списка задач по заданным полям.
```
