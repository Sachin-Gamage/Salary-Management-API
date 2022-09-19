"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    username: {
        type: String,
        required: 'Enter a username'
    },
    email: {
        type: String,
        required: 'Enter a email',
    },
    password: {
        type: String,
        required: 'Enter a password',
    }
});
/**
 * Password hash middleware.
 */
exports.UserSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
const comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
exports.UserSchema.methods.comparePassword = comparePassword;
//# sourceMappingURL=user.js.map