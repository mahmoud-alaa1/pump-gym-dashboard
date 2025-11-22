import { useQuery } from "@tanstack/react-query";
import { getEmployeesService } from "../services";

export default function useGetEmployees() {
  return useQuery({
    queryFn: getEmployeesService,
    queryKey: ["employees"],
  });
}
