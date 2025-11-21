"use no memo";
import DataTable from "@/frontend/components/data-table";
import { columns } from "./columns";
import { useDataTable } from "@/frontend/hooks/use-data-table";
import AddClient from "../add-client";
import useGetClients from "../../hooks/useGetClients";
import { Client } from "@prisma/client";
import { Button } from "@/frontend/components/ui/button";
import useDeleteClients from "../../hooks/useDeleteClients";
import ClientsTableFilters, { ClientFilters } from "./filters";
import { useMemo, useState } from "react";

export default function ClientsTable() {
  const { data: clients } = useGetClients();
  const { mutate: deleteClients } = useDeleteClients();

  const [filters, setFilters] = useState<ClientFilters>({
    clientName: "",
    subscriptionType: "",
    paymentType: "",
    startDate: "",
    endDate: "",
  });

  const filteredClients = useMemo(() => {
    if (!clients) return [];

    return clients.filter((client) => {
      // Filter by client name
      if (
        filters.clientName &&
        !client.client_name
          .toLowerCase()
          .includes(filters.clientName.toLowerCase())
      ) {
        return false;
      }

      // Filter by subscription type
      if (
        filters.subscriptionType &&
        filters.subscriptionType !== "all" &&
        client.subscription_type !== filters.subscriptionType
      ) {
        return false;
      }

      // Filter by payment type
      if (
        filters.paymentType &&
        filters.paymentType !== "all" &&
        client.payment_type !== filters.paymentType
      ) {
        return false;
      }

      // Filter by start date
      if (filters.startDate) {
        const clientDate = new Date(client.created_at);
        const startDate = new Date(filters.startDate);
        if (clientDate < startDate) {
          return false;
        }
      }

      // Filter by end date
      if (filters.endDate) {
        const clientDate = new Date(client.created_at);
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999); // Include the entire end day
        if (clientDate > endDate) {
          return false;
        }
      }

      return true;
    });
  }, [clients, filters]);

  const { table, rowSelection } = useDataTable<
    Client & { created_by?: { name: string } }
  >({
    data: filteredClients ?? [],
    columns,
  });

  const handleClearFilters = () => {
    setFilters({
      clientName: "",
      subscriptionType: "",
      paymentType: "",
      startDate: "",
      endDate: "",
    });
  };
  console.log(
    Object.keys(rowSelection).map((rowIdx) => table.getRow(rowIdx).original.id)
  );
  return (
    <div className="space-y-5">
      {/* Filters */}
      <ClientsTableFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Actions Bar */}
      <div className="flex justify-between gap-5 flex-wrap">
        <AddClient />
        <div className="flex items-center gap-3">
          {filteredClients && (
            <div className="text-sm text-muted-foreground">
              عرض{" "}
              <span className="font-semibold text-red-600">
                {filteredClients.length}
              </span>{" "}
              من <span className="font-semibold">{clients?.length || 0}</span>{" "}
              عميل
            </div>
          )}
          <Button
            variant="destructive"
            disabled={!Object.keys(rowSelection).length}
            onClick={() => {
              deleteClients(
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
            حذف العملاء المحددين ({Object.keys(rowSelection).length})
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTable table={table} />
    </div>
  );
}
