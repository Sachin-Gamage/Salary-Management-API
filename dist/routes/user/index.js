"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../controllers/user");
const validator_1 = require("./validator");
class UserRoutes {
    constructor() {
        this.userController = new user_1.UserController();
    }
    routes(app) {
        // Todos
        app.route('/user')
            // GET endpoint
            .get(this.userController.getUsers)
            // POST endpoint
            .post([validator_1.userExistValidator], this.userController.addNewUser);
        // todo detail
        app.route('/user/:userId')
            // get specific todo
            .get(this.userController.getUserWithId)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
        app.route('/login').post(this.userController.login);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=index.js.map