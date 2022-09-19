"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("./../models/user");
const auth_1 = require("../utils/auth");
const User = mongoose.model('User', user_1.UserSchema);
class UserController {
    addNewUser(req, res) {
        let newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.send(err);
            }
            res.status(201).json({ token: auth_1.generateToken(user) });
        });
    }
    getUsers(req, res) {
        User.find({}, { password: 0 }, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }
    getUserWithId(req, res) {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    login(req, res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err || !user)
                return res.status(404).json({ message: 'User not found!' });
            user.comparePassword(req.body.password.toString(), (error, isMatch) => {
                if (error)
                    return res.status(404).json({ message: 'Email or password do not match!' });
                if (isMatch)
                    return res.status(201).json({ token: auth_1.generateToken(user) });
                return res.status(404).json({ message: 'Email or password do not match!' });
            });
        });
    }
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    deleteUser(req, res) {
        User.remove({ _id: req.params.userId }, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Succesfully deleted user!' });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map