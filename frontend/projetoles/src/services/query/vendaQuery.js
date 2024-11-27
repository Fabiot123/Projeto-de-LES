import { useQuery } from "@tanstack/react-query";
import { vendaService } from "@/services/entities/vendaService";
export const useVendaQuery = () => {
  const query = useQuery({
    queryKey: ["venda"],
    queryFn: vendaService.listVendas,
  });

  return query;
};
export const useVendaByIdQuery = (id) => {
  const query = useQuery({
    queryKey: ["vendaId", id],
    queryFn: async () => vendaService.getById(id),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
  });

  return query;
};
