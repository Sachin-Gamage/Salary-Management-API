import * as mongoose from 'mongoose';
import { EmployeeSchema, IEmployee } from '../models/employee';
import { Request, Response } from 'express';
import { readCSV } from '../utils/csvParser';
import { startsWith } from 'lodash';
import e = require('express');
import { deleteFile } from '../utils/fileUpload';

const Employees = mongoose.model('Employee', EmployeeSchema);

export class EmployeeController {


    public async getEmployees(req: Request, res: Response) {
        try {
            const employees = await Employees.find({});
            return res.json(employees)
        } catch (error) {
            return res.send(error);

        }

    }


    public async uploadEmployee(req: Request, res: Response) {
        const filePath = `${req.file.destination}/${req.file.filename}`;
        try {
            const csvData = await readCSV(filePath);
            const employeeData = this.mapEmployees(csvData)
            const employees = await Employees.find({});
            const result = await this.handleEmployeeUpload(employeeData, employees);
            deleteFile(filePath);
            return res.json(result);
        } catch (error) {
            return res.send(error);
        }

    }

    public deleteEmployee(req: Request, res: Response) {
        Employees.remove({ id: req.params.id }, (err, emp) => {
            if (err) {
                return res.send(err);
            }
            res.json({ message: 'Succesfully deleted employee!' });
        });
    }

    public updateEmployee(req: Request, res: Response) {
        Employees.update({ id: req.params.id }, (err, emp) => {
            if (err) {
                return res.send(err);
            }
            res.json({ message: 'Succesfully updated employee!' });
        });
    }

    private mapEmployees = (data) => {
        const employees: IEmployee[] = [];
        data.map(d => {
            const id = d[0];
            if (!startsWith(id, '#')) {
                const employee: IEmployee = {
                    id: id,
                    userName: d[1],
                    fullName: d[2],
                    salary: d[3]
                }
                employees.push(employee);
            }
        })
        return employees
    }

    private handleEmployeeUpload = async (fileData, employeeList) => {
        try {
            console.log('employeeList ', employeeList)
            let newEmployees = [];
            let updatingEmployees = [];

            if (employeeList.length === 0) {
                fileData.map((d: IEmployee) => {
                    newEmployees.push(d);
                })
            } else {
                fileData.map((d: IEmployee) => {
                    const duplicateEmployeeIndex = employeeList.findIndex(e => e.id === d.id);

                    if (duplicateEmployeeIndex >= 0) {
                        const duplicateLoginIndex = employeeList.findIndex(e => e.userName === d.userName);

                        if (duplicateLoginIndex >= 0 && duplicateLoginIndex !== duplicateEmployeeIndex) {
                            throw new Error('Cannot duplicate username');
                        } else {
                            updatingEmployees.push(d)
                        }
                    } else {
                        newEmployees.push(d)
                    }
                })
            }

            if (newEmployees.length > 0) {
                await this.createMultipleEmployees(newEmployees);
            }

            if (updatingEmployees.length > 0) {
                await this.updateMultipleEmployees(updatingEmployees)
            }

            return 'Successfully Uploaded';
        } catch (error) {
            throw error
        }
    }

    private createMultipleEmployees = async (employees) => {
        try {
            const result = await Employees.insertMany(employees);
            return result
        } catch (error) {
            throw error;
        }
    }

    private updateMultipleEmployees = async (employees) => {
        try {
            const result = await Employees.updateMany(employees);
            return result
        } catch (error) {
            throw error;
        }
    }
}