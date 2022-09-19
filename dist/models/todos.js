"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.TodoSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    note: {
        type: String,
        required: 'Enter a note',
    },
    status: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.TodoSchema.virtual('name').get(function () {
    return this._id + ' ' + this.title;
});
//# sourceMappingURL=todos.js.map