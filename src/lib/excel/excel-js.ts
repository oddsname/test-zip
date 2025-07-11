import { ExcelHelperInterface } from ".";
import ExcelJS from 'exceljs';

export class ExcelJsHelper implements ExcelHelperInterface {

    public test(): string {
        return 'excel-js';
    }

    async parseToValues<T extends []>(arrBuffer: ArrayBuffer): Promise<T[]> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrBuffer);

        const worksheet = workbook.getWorksheet(1); // 1-based index

        if (!worksheet) return [];

        const data: any[] = [];

        worksheet.eachRow({ includeEmpty: false }, (row) => {
            data.push([row.values])
        });

        return data;
    }
}