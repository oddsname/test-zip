import { HttpRequest } from "@/intrastructure/http"
import { UserParams, UserFormParams } from "./users-interface";

export const usersApi = {
    getAllUsers: async (): Promise<UserParams[]> => {
        const resp = await HttpRequest.instance().GET<{ data: UserParams[] }>('/api/users');

        //some logic
        return resp.data;
    },

    createUser: async (data: UserFormParams): Promise<UserParams> => {
        const resp = await HttpRequest.instance().POST<{ data: UserParams }>('/api/users/create', data);

        return resp.data;
    },

    createUsers: async (data: UserFormParams[]): Promise<void> => {
        await HttpRequest.instance().POST('/api/users/create/many', data);
    },

    updateUser: async (id: number, data: UserFormParams): Promise<UserParams> => {
        const resp = await HttpRequest.instance().PUT<{ data: UserParams }>(`/api/users/${id}/update`, data);

        return resp.data;
    },

    deteleUser: async (id: number): Promise<void> => {
        await HttpRequest.instance().DELETE(`/api/users/${id}/delete`);
    },
}