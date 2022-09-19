import uploads from '../utils/fileUpload';
import { EmployeeController } from '../controllers/employee';

export class EmployeeRoutes {
    public employeeController: EmployeeController = new EmployeeController();

    public routes(app): void {
        
        app.route('/employees')
        .get(this.employeeController.getEmployees)

        .post([uploads.single('employees')],this.employeeController.uploadEmployee.bind(this.employeeController));

        
        app.route('/employees/:id')
        .delete(this.employeeController.deleteEmployee)
        .put(this.employeeController.updateEmployee)
        // get specific todo
    }
}