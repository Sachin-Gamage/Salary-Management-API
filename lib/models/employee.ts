import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EmployeeSchema = new Schema({
    id:{
        type:String
    },
    userName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    salary:{
        type:Number
    }
});

export interface IEmployee{
    id:string,
    userName:string,
    fullName:string,
    salary:number
}
