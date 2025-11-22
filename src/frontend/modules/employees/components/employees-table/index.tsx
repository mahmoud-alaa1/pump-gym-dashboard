"use no memo";
import DataTable from "@/frontend/components/data-table";
import { columns } from "./columns";
import { useDataTable } from "@/frontend/hooks/use-data-table";
import { Employee } from "@prisma/client";
import { Button } from "@/frontend/components/ui/button";
import useGetEmployees from "../../hooks/useGetEmployees";
import useDeleteEmployees from "../../hooks/useDeleteEmployees";
import { Card } from "@/frontend/components/ui/card";
import { Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import useAuth from "@/frontend/modules/auth/store/useAuth";
import AddEmployeeForm from "../employee-form/add-employee-form";

export default function EmployeesTable() {
  const { data: employees } = useGetEmployees();
  const { mutate: deleteEmployees } = useDeleteEmployees();
  const auth = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];
    if (!searchQuery) return employees;

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

  const { table, rowSelection } = useDataTable<Employee>({
    data: filteredEmployees ?? [],
    columns,
    initialPageSize: 5,
    enableRowSelection: (row) => row.original.role !== "ADMIN",
  });

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <Card className="p-4 border-red-600/20">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <input
              type="text"
              placeholder="ابحث عن موظف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 rounded-md border border-red-600/30 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full max-w-sm"
            />
            {filteredEmployees && (
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                عرض{" "}
                <span className="font-semibold text-red-600">
                  {filteredEmployees.length}
                </span>{" "}
                من{" "}
                <span className="font-semibold">{employees?.length || 0}</span>{" "}
                موظف
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {auth.user?.role === "ADMIN" && (
              <>
                <AddEmployeeForm />

                {Object.keys(rowSelection).length > 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteEmployees(
                        Object.keys(rowSelection).map(
                          (rowIdx) => table.getRow(rowIdx).original.id
                        ),
                        {
                          onSuccess: () => {
                            table.resetRowSelection();
                          },
                        }
                      );
                    }}
                  >
                    <Trash2 className="ml-2 h-4 w-4" />
                    حذف المحدد ({Object.keys(rowSelection).length})
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="border-red-600/20">
        <DataTable table={table} />
      </Card>
    </div>
  );
}
