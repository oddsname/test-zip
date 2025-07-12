import { ExcelJsHelper } from "./excel-js";

interface ExcelHelperInterface {

    test(): string
    parseToValues<T extends []>(arrBuffer: ArrayBuffer): Promise<T[]>;
}

class ExcelHelper {
    private static _instance: ExcelHelperInterface

    public static register(inst: ExcelHelperInterface) {
        this._instance = inst
    }

    public static instance(): ExcelHelperInterface {
        return this._instance;
    }
}

export {
    ExcelHelper,
    ExcelJsHelper
}

export type {
    ExcelHelperInterface
}

