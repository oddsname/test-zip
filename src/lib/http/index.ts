
export interface HttpRequestInterface {
  GET<T>(url: string, options?: any): Promise<T>;
  POST<T>(url: string, body: any, options?: any): Promise<T>;
}


export class Http {
    private static _instance: HttpRequestInterface

    public static register(inst: HttpRequestInterface) {
        this._instance = inst
    }

    public static request(): HttpRequestInterface {
        return this._instance;
    }
}


