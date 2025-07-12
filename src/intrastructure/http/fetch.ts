import { HttpRequestInterface } from "./index";

export class FetchHttpRequest implements HttpRequestInterface {
    async GET<T>(url: string, options: RequestInit = {}): Promise<T> {
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
            ...options,
        });

        return await res.json();
    }

    async POST<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
            body: JSON.stringify(body),
            ...options,
        });

        return await res.json();
    }

    async PUT<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
            body: JSON.stringify(body),
            ...options,
        });

        return await res.json();
    }

    async DELETE<T>(url: string, body: any = {}, options: RequestInit = {}): Promise<T> {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
            body: JSON.stringify(body),
            ...options,
        });

        return await res.json();
    }
}