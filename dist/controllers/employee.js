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
const employee_1 = require("../models/employee");
const csvParser_1 = require("../utils/csvParser");
const Employees = mongoose.model('Employee', employee_1.EmployeeSchema);
class EmployeeController {
    getEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield Employees.find({});
            res.json(employees);
        });
    }
    uploadEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.file);
            const filePath = `${req.file.destination}/${req.file.fieldname}`;
            const fileData = csvParser_1.readCSV(filePath);
        });
    }
    getTodo(req, res) {
        Employees.findById(req.params.todoId, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        });
    }
    updateTodo(req, res) {
        Employees.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        });
    }
    deleteTodo(req, res) {
        Employees.remove({ _id: req.params.todoId }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            res.json({ message: 'Succesfully deleted todo!' });
        });
    }
}
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.js.map