import { DateFnsHelper } from "./date-fns";

const DATE_FORMAT = 'yyyy-MM-dd'

interface DateHelperInterface {
    toString(date: Date, format: string): string;
}

class DateHelper {
    private static _instance: DateHelperInterface

    public static register(inst: DateHelperInterface) {
        this._instance = inst
    }

    public static instance(): DateHelperInterface {
        return this._instance;
    }
}


export {
    DateHelper,
    DateFnsHelper,
    DATE_FORMAT,
}

export type {
    DateHelperInterface
}
