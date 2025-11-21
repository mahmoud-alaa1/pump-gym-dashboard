import DataTable from "@/frontend/components/data-table";
import { columns, Payment } from "./columns";
import { useDataTable } from "@/frontend/hooks/use-data-table";
import { Button } from "@/frontend/components/ui/button";
const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "فشل",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "نجاح",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "قيد الانتظار",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "قيد الانتظار",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "المعالجة",
    email: "carmella@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "المعالجة",
    email: "carmella@example.com",
  },
  {
    id: "asdasd",
    amount: 721,
    status: "المعالجة",
    email: "carmella@example.com",
  },
  {
    id: "asdasdasd",
    amount: 721,
    status: "المعالجة",
    email: "carmella@example.com",
  },
];

export default function ClientsTable() {
  const { table } = useDataTable<Payment>({
    data,
    columns,
    initialPageSize: 5,
  });

  return (
    <div>
      <DataTable table={table} />
    </div>
  );
}
