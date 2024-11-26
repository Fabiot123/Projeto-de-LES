import { api } from "@/libs/axios";

export const vendaService = {
  async listVendas() {
    return (await api.get("/vendas")).data;
  },

  async update(id, values) {
    const { data } = await api.put(`/vendas/${id}`, values);
    return data;
  },
};
