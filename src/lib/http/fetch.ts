import { HttpRequestInterface } from ".";

export class Fetch implements HttpRequestInterface{
    async GET<T>(url: string, options?: any): Promise<T> {
        return '';
    }

    async POST<T>(url: string, body: any, options?: any): Promise<T> {
        return '';
    }
}