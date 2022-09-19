"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CsvReadableStream = require("csv-reader");
const fs_1 = require("fs");
function readCSV(filePath) {
    debugger;
    let inputStream = fs_1.createReadStream(filePath, 'utf8');
    inputStream.pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', (row) => {
        debugger;
    }).on('end', () => {
        console.log('file end');
    });
}
exports.readCSV = readCSV;
//# sourceMappingURL=csvParser.js.map