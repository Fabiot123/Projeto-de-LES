import { api } from "@/libs/axios";

export const vendaService = {
  async listVendas() {
    return (await api.get("/vendas")).data;
  },

  async getById(id) {
    const { data } = await api.get(`/vendas/${id}`);
    return data;
  },

  async update(id, values) {
    const { data } = await api.put(`/vendas/${id}`, values);
    return data;
  },
};
