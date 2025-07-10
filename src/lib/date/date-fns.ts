import { DateHelper } from ".";
import { format } from 'date-fns';;

export class DateFnsHelper implements DateHelper {

    public toString(date: Date, _format: string): string {
        return format(date, _format);
    }

}