"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const path_1 = require("path");
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './lib/uploads');
    },
    filename: (req, file, callBack) => {
        console.log(file.originalname);
        callBack(null, `${file.fieldname}-${Date.now()}${path_1.extname(file.originalname)}`);
    }
});
const uploads = multer({ storage: storage });
exports.default = uploads;
//# sourceMappingURL=fileUpload.js.map