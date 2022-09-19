import * as CsvReadableStream from 'csv-reader';
import { createReadStream } from 'fs'

export function readCSV(filePath: string) {
    const rows = []
    return new Promise((resolve, reject) => {
        let inputStream = createReadStream(filePath, 'utf8');
        inputStream
            .on('error', (err) => {
                reject(err)
            })
            .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
            .on('data', (row) => {
                rows.push(row)
            }).on('end', () => {
                resolve(rows)
            })
    })
}

