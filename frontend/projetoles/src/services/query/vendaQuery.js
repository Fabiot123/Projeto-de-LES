import { useQuery } from "@tanstack/react-query";
import { vendaService } from "@/services/entities/vendaService";
export const useVendaQuery = () => {
  const query = useQuery({
    queryKey: ["venda"],
    queryFn: vendaService.listVendas,
  });

  return query;
};
