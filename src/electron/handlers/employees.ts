// src/main/handlers/employees.ts
import { Employee } from "@prisma/client";
import { prisma } from "../main.js";

export async function getAllEmployees() {
  return await prisma.employee.findMany();
}

export async function addEmployee(data: Omit<Employee, "id">) {
  return await prisma.employee.create({ data });
}
