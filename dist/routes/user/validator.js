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
const user_1 = require("../../models/user");
const User = mongoose.model('User', user_1.UserSchema);
exports.userExistValidator = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (user) {
        return res.status(401).json({ error: 'User already in use' });
    }
    else {
        return next();
    }
});
//# sourceMappingURL=validator.js.map