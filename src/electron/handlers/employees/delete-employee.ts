import { ipcMainHandle } from "../../utils.js";
import { AppError } from "../../errors/AppError.js";
import { prisma } from "../../main.js";

async function handleDeleteEmployees(employeeIds: number[]) {
  // Check if any of the employees to delete are admins
  const employeesToDelete = await prisma.employee.findMany({
    where: {
      id: {
        in: employeeIds,
      },
    },
    select: {
      id: true,
      role: true,
      name: true,
    },
  });

  const adminEmployees = employeesToDelete.filter(
    (emp) => emp.role === "ADMIN"
  );

  if (adminEmployees.length > 0) {
    const adminNames = adminEmployees.map((emp) => emp.name).join(", ");
    throw new AppError(`لا يمكن حذف المديرين: ${adminNames}`, {
      code: "FORBIDDEN",
      status: 403,
    });
  }

  await prisma.employee.deleteMany({
    where: {
      id: {
        in: employeeIds,
      },
    },
  });
}

export function mainHandleDeleteEmployees() {
  ipcMainHandle(
    "deleteEmployees",
    async (payload) => {
      return await handleDeleteEmployees(payload);
    },
    "تم حذف العملاء بنجاح"
  );
}
