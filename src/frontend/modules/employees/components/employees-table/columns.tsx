import { Button } from "@/frontend/components/ui/button";
import { Checkbox } from "@/frontend/components/ui/checkbox";
import { Badge } from "@/frontend/components/ui/badge";
import { Avatar, AvatarFallback } from "@/frontend/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";

import { Employee } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import useAuth from "@/frontend/modules/auth/store/useAuth";
import useDeleteEmployees from "../../hooks/useDeleteEmployees";
import {
  Trash2,
  MoreHorizontal,
  Mail,
  ShieldCheck,
  User,
  ArrowUpDown,
} from "lucide-react";

const ActionsCell = ({ row }: { row: any }) => {
  const employee = row.original;
  const auth = useAuth();
  const { mutate: deleteEmployee } = useDeleteEmployees();

  if (auth.user?.role !== "ADMIN") return null;
  if (employee.id === auth.user?.id) return null; // Can't delete yourself

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-red-600/10">
          <span className="sr-only">فتح القائمة</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(employee.email)}
          className="cursor-pointer"
        >
          <Mail className="ml-2 h-4 w-4 text-blue-600" />
          <span>نسخ البريد</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => deleteEmployee([employee.id])}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-600/10"
        >
          <Trash2 className="ml-2 h-4 w-4" />
          <span>حذف</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getRoleBadge = (role: string) => {
  if (role === "ADMIN") {
    return (
      <Badge className="bg-linear-to-r from-red-600 to-red-700 text-white border-none">
        <ShieldCheck className="ml-1 h-3 w-3" />
        مدير
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="bg-blue-600/10 text-blue-600 border-blue-600/20"
    >
      <User className="ml-1 h-3 w-3" />
      موظف
    </Badge>
  );
};

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-red-600/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
      />
    ),
    cell: ({ row }) => {
      const employee = row.original;
      const isAdmin = employee.role === "ADMIN";

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          disabled={isAdmin}
          className="border-red-600/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-red-600/10 hover:text-red-600"
      >
        الموظف
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const email = row.original.email;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-red-600/20">
            <AvatarFallback className="bg-red-600/10 text-red-600 font-semibold">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{name}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-red-600/10 hover:text-red-600"
      >
        الصلاحية
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return getRoleBadge(role);
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-red-600/10 hover:text-red-600"
      >
        #المعرف
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return (
        <div className="font-mono text-sm text-muted-foreground">
          #{id.toString().padStart(4, "0")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "إجراءات",
    enableHiding: false,
    cell: ActionsCell,
  },
];
