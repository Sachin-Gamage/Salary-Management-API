"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.EmployeeSchema = new Schema({
    userName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    salary: {
        type: Number
    }
});
//# sourceMappingURL=employee.js.map