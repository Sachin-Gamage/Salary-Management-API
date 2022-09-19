import { Request } from "express";
import * as multer from 'multer';
import {extname} from 'path';
import { unlink } from 'fs'



const storage = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null, './lib/uploads')
    },

   filename:(req:Request, file,callBack) => {
       console.log(file.originalname)
       callBack(null,`${file.fieldname}-${Date.now()}${extname(file.originalname)}`)
   }
})

const uploads = multer({storage:storage});

export function deleteFile(filePath){
    unlink(filePath,(err => {
        return 'failed to delete' + err
    }))
}


export default uploads;
