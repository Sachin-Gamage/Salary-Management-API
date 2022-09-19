"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../controllers/todo");
const auth_1 = require("../utils/auth");
class TodoRoutes {
    constructor() {
        this.todoController = new todo_1.TodoController();
    }
    routes(app) {
        // Todos
        app.route('/todo')
            // GET endpoint
            .get(this.todoController.getTodos)
            // POST endpoint
            .post([auth_1.default], this.todoController.addNewTodo);
        // todo detail
        app.route('/todo/:todoId')
            // get specific todo
            .get(this.todoController.getTodo)
            .put(this.todoController.updateTodo)
            .delete(this.todoController.deleteTodo);
    }
}
exports.TodoRoutes = TodoRoutes;
//# sourceMappingURL=todo.js.map