import { useQuery } from "@tanstack/react-query";
import { trocaService } from "@/services/entities/trocaService";
export const useTrocaQuery = () => {
  const query = useQuery({
    queryKey: ["troca"],
    queryFn: trocaService.listTrocas,
  });

  return query;
};
export const useTrocaByIdQuery = (id) => {
  const query = useQuery({
    queryKey: ["trocaId", id],
    queryFn: async () => trocaService.getById(id),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
  });

  return query;
};
