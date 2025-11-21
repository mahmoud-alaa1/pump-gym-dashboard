import { useQuery } from "@tanstack/react-query";
import { getClientsService } from "../services";

export default function useGetClients() {
  return useQuery({
    queryFn: getClientsService,
    queryKey: ["clients"],
  });
}
