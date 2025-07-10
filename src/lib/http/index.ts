import { FetchHttpRequest } from "./fetch";

interface HttpRequestInterface {
    GET<T>(url: string, options?: any): Promise<T>;
    POST<T>(url: string, body: any, options?: any): Promise<T>;
    PUT<T>(url: string, body: any, options?: any): Promise<T>;
    DELETE<T>(url: string, body?: any, options?: any): Promise<T>;
}

class HttpRequest {
    private static _instance: HttpRequestInterface

    public static register(inst: HttpRequestInterface) {
        this._instance = inst
    }

    public static instance(): HttpRequestInterface {
        return this._instance;
    }
}

export {
    HttpRequest, FetchHttpRequest
};

export type { HttpRequestInterface };
