import { api } from "@/libs/axios";

export const userService = {
    async list() {
        return (await api.get("/clients")).data;
    },

    async create(values) {
        const { data } = await api.post('/clients', values);
        return data;
    },
    
    async getById(id) {
        const { data } = await api.get(`/clients/${id}`);
        return data; 
    },

    async update(id, values) {
        const {data} = await api.put(`/clients/${id}`, values);

        return data;
    },
    async delete(id) {
        await api.delete(`/clients/${id}`);
    }
    
}
