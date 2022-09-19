"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("./employee");
class Routes {
    constructor() {
        this.employeeRoutes = new employee_1.EmployeeRoutes();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: "Welcome to the Salary Management API :)!!"
            });
        });
        this.employeeRoutes.routes(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map