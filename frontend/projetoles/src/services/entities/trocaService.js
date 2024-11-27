import { api } from "@/libs/axios";

export const trocaService = {
  async listTrocas() {
    return (await api.get("/trocas")).data;
  },

  async getById(id) {
    const { data } = await api.get(`/trocas/${id}`);
    return data;
  },

  async update(id, values) {
    const { data } = await api.put(`/trocas/${id}`, values);
    return data;
  },
};
