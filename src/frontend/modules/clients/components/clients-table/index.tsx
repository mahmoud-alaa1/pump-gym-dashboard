"use no memo";
import DataTable from "@/frontend/components/data-table";
import { columns } from "./columns";
import { useDataTable } from "@/frontend/hooks/use-data-table";
import AddClient from "../add-client";
import useGetClients from "../../hooks/useGetClients";
import { Client } from "@prisma/client";

export default function ClientsTable() {
  const { data: clients } = useGetClients();
  const { table } = useDataTable<Client>({
    data: clients ?? [],
    columns,
  });
  console.log(clients);
  return (
    <div className="space-y-5">
      <AddClient />
      <DataTable table={table} />
    </div>
  );
}
