import { HttpRequest } from "@/lib/http"
import { UserParams } from "@/interfaces/users";

export const usersApi = {
    getAllUsers: async (): Promise<UserParams[]> => {
        const resp = await HttpRequest.instance().GET<{ data: UserParams[] }>('/api/users');

        //some logic
        return resp.data;
    },

    createUser: async (data: Omit<UserParams, 'id'>): Promise<UserParams> => {
        const resp = await HttpRequest.instance().POST<{ data: UserParams }>('/api/users/create', data);

        return resp.data;
    },

    updateUser: async (id: number, data: Omit<UserParams, 'id'>): Promise<UserParams> => {
        const resp = await HttpRequest.instance().PUT<{ data: UserParams }>(`/api/users/${id}/update`, data);

        return resp.data;
    },

    deteleUser: async (id: number): Promise<void> => {
        await HttpRequest.instance().DELETE(`/api/users/${id}/delete`);
    },
}