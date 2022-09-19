"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const todos_1 = require("./../models/todos");
const Todo = mongoose.model('Todo', todos_1.TodoSchema);
class TodoController {
    addNewTodo(req, res) {
        let newTodo = new Todo(Object.assign({}, req.body, { user: req.user._id }));
        newTodo.save((err, todo) => {
            if (err) {
                return res.send(err);
            }
            res.status(201).json(todo);
        });
    }
    getTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield Todo.find({}).select('-__v').populate('user', '-password -__v');
            res.json(todos);
        });
    }
    getTodo(req, res) {
        Todo.findById(req.params.todoId, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        });
    }
    updateTodo(req, res) {
        Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        });
    }
    deleteTodo(req, res) {
        Todo.remove({ _id: req.params.todoId }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            res.json({ message: 'Succesfully deleted todo!' });
        });
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todo.js.map