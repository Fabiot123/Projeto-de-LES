import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/entities/userService";
export const useUserQuery = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: userService.list,
  });

  return query;
};
export const useClientByIdQuery = (id) => {
  const query = useQuery({
    queryKey: ["userId", id],
    queryFn: async () => userService.getById(id),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
  });

  return query;
};
