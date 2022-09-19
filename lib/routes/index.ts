import { Request, Response } from 'express';
import { EmployeeRoutes } from './employee';
export class Routes {

    private employeeRoutes:EmployeeRoutes = new EmployeeRoutes();

    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Welcome to the Salary Management API :)!!"
            });
        });
        this.employeeRoutes.routes(app);
    }
}