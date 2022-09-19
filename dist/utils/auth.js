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
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user_1 = require("../models/user");
const User = mongoose.model("User", user_1.UserSchema);
exports.generateToken = user => !user
    ? null
    : `${jwt.sign({
        id: user.id ? user.id : null,
        email: user.email,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
    }, "secret_key")}`;
const getToken = (req) => {
    if (!req.headers.authorization ||
        req.headers.authorization.trim().length === 0) {
        return null;
    }
    // expects authorization header to contain value such as `Bearer {token}`
    return req.headers.authorization.split(" ")[1];
};
const deriveError = (err) => {
    const message = err instanceof jwt.TokenExpiredError
        ? 'Your token has expired!'
        : 'Invalid token';
    return {
        status: 404,
        message,
    };
};
const checkAuth = (req) => __awaiter(this, void 0, void 0, function* () {
    const token = getToken(req);
    let error = null;
    try {
        if (token) {
            const userData = jwt.verify(token, 'secret_key');
            req.user = yield User.findOne({ email: userData.email });
        }
        else {
            error = {
                status: 404,
                message: "Please provide a token"
            };
        }
    }
    catch (err) {
        error = deriveError(err);
    }
    return error;
});
/**
 * Authenticates a request by checking the authorization header. If successful,
 * it adds the user object to the request object and allows the request to
 * proceed. Else, it returns a 401 error with the appropriate message.
 *
 * @param req Request
 * @param res Response
 * @param next
 * @returns {Promise<*>}
 */
const authenticate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const error = yield checkAuth(req);
    if (!error) {
        return next();
    }
    return res.status(401).json(error);
});
exports.default = authenticate;
//# sourceMappingURL=auth.js.map