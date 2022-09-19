"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileUpload_1 = require("../utils/fileUpload");
const employee_1 = require("../controllers/employee");
class EmployeeRoutes {
    constructor() {
        this.employeeController = new employee_1.EmployeeController();
    }
    routes(app) {
        app.route('/employees')
            .get(this.employeeController.getEmployees)
            .post([fileUpload_1.default.single('employees')], this.employeeController.uploadEmployee);
        // todo detail
        app.route('/todo/:todoId');
        // get specific todo
    }
}
exports.EmployeeRoutes = EmployeeRoutes;
//# sourceMappingURL=employee.js.map