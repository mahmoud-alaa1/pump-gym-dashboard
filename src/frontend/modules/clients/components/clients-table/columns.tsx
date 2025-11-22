"use client";

import { Button } from "@/frontend/components/ui/button";
import { Checkbox } from "@/frontend/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";
import { Badge } from "@/frontend/components/ui/badge";
import { Client } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Trash2,
  User,
  Phone,
  Hash,
  Calendar,
  DollarSign,
  Copy,
  Mars,
  Venus,
} from "lucide-react";
import useAuth from "@/frontend/modules/auth/store/useAuth";
import useDeleteClients from "../../hooks/useDeleteClients";
import { toast } from "sonner";
import EditClientForm from "../client-form/edit-client-form";

// Helper function to format subscription type
const formatSubscriptionType = (type: string) => {
  const subscriptionMap: Record<string, string> = {
    LESSONS_8: "8 حصص",
    LESSONS_12: "12 حصة",
    ONE_MONTH: "شهر واحد",
    TWO_MONTHS: "شهرين",
    THREE_MONTHS: "3 أشهر",
    SIX_MONTHS: "6 أشهر",
    YEAR: "سنة",
  };
  return subscriptionMap[type] || type;
};

// Helper function to format payment type
const formatPaymentType = (type: string) => {
  return type === "NEW" ? "جديد" : "تجديد";
};

// Helper function to format visitor source
const formatVisitor = (visitor: string) => {
  const visitorMap: Record<string, string> = {
    FACEBOOK: "فيسبوك",
    INSTAGRAM: "انستغرام",
    TIKTOK: "تيك توك",
    WHATSAPP: "واتساب",
    REFERRAL: "إحالة",
  };
  return visitorMap[visitor] || visitor;
};

const ActionsCell = ({ row }: { row: any }) => {
  const client = row.original;
  const auth = useAuth();
  const { mutate: deleteClient } = useDeleteClients();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-red-600/10">
          <span className="sr-only">فتح القائمة</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(client.code.toString());
            toast.success(`تم نسخ الكود: ${client.code}`);
          }}
          className="px-4"
        >
          <Copy />
          نسخ الكود
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className=" hover:bg-accent">
          <EditClientForm client={client} />
        </div>
        {auth.user?.role === "ADMIN" && (
          <DropdownMenuItem
            onClick={() => {
              deleteClient([client.id]);
            }}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-600/10"
          >
            <Trash2 className="ml-2 h-4 w-4" />
            <span>حذف</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Client & { created_by?: { name: string } }>[] =
  [
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
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-red-600/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          <Hash className="ml-2 h-4 w-4" />
          الكود
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-red-600/50 text-red-600 font-mono"
          >
            #{row.getValue("code")}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "client_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          <User className="ml-2 h-4 w-4" />
          الاسم
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("client_name")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          <Phone className="ml-2 h-4 w-4" />
          الهاتف
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-mono text-center" dir="ltr">
          {row.getValue("phone")}
        </div>
      ),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          النوع
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const gender = row.getValue("gender") as string;
        return (
          <Badge variant="secondary" className="text-xs w-full justify-center">
            {gender === "MALE" ? " ذكر" : "انثى"}
            &nbsp;
            {gender === "MALE" ? (
              <Mars className="text-blue-500" />
            ) : (
              <Venus className="text-pink-500" />
            )}
          </Badge>
        );
      },
    },
    {
      accessorKey: "subscription_type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          نوع الاشتراك
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const type = row.getValue("subscription_type") as string;
        return (
          <Badge className="bg-linear-to-r from-red-600 to-red-700 text-white border-none">
            {formatSubscriptionType(type)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "payment",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          <DollarSign className="ml-2 h-4 w-4" />
          المبلغ
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const payment = row.getValue("payment") as number;
        return (
          <div className="font-semibold text-green-600">
            {payment.toLocaleString()} ج.م
          </div>
        );
      },
    },
    {
      accessorKey: "payment_type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          نوع الدفع
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const type = row.getValue("payment_type") as string;
        return (
          <Badge variant={type === "NEW" ? "default" : "secondary"}>
            {formatPaymentType(type)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "visitors",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          المصدر
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const visitor = row.getValue("visitors") as string;
        const visitorIcons: Record<string, string> = {
          FACEBOOK: "📘",
          INSTAGRAM: "📷",
          TIKTOK: "🎵",
          WHATSAPP: "💬",
          REFERRAL: "👥",
        };
        return (
          <Badge variant="outline" className="text-xs">
            {visitorIcons[visitor]} {formatVisitor(visitor)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          <Calendar className="ml-2 h-4 w-4" />
          تاريخ التسجيل
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.getValue("created_at") as Date;
        const formattedDate = new Date(date).toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
        );
      },
    },
    {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-red-600/10 hover:text-red-600"
        >
          أضيف بواسطة
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      accessorFn: (row: Client & { created_by?: { name: string } | null }) =>
        row.created_by?.name ?? "غير معروف",
      id: "created_by",
      cell: ({ getValue }) => (
        <div className="text-sm text-muted-foreground">
          {getValue<string>()}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ActionsCell,
    },
  ];
