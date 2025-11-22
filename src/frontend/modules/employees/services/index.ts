import { callService } from "@/frontend/lib/utils";
import { Employee } from "@prisma/client";

export async function addEmployeeService(
  EmployeeData: EventMap["addEmployee"]["request"]
) {
  return callService<Employee>(() => window.electron.addEmployee(EmployeeData));
}

export async function getEmployeesService() {
  return callService<Employee[]>(() => window.electron.getEmployees());
}

export async function deleteEmployeesService(EmployeeIds: number[]) {
  return callService<void>(() => window.electron.deleteEmployees(EmployeeIds));
}
