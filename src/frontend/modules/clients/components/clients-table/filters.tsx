import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/frontend/components/ui/select";
import { Card } from "@/frontend/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/frontend/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/frontend/components/ui/popover";
import { Calendar } from "@/frontend/components/ui/calendar";
import {
  Filter,
  X,
  Search,
  Calendar as CalendarIcon,
  CreditCard,
  Package,
} from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export interface ClientFilters {
  clientName: string;
  subscriptionType: string;
  paymentType: string;
  startDate: string;
  endDate: string;
}

interface ClientsTableFiltersProps {
  filters: ClientFilters;
  onFiltersChange: (filters: ClientFilters) => void;
  onClearFilters: () => void;
}

export default function ClientsTableFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: ClientsTableFiltersProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: filters.startDate ? new Date(filters.startDate) : undefined,
    to: filters.endDate ? new Date(filters.endDate) : undefined,
  });

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  const handleFilterChange = (key: keyof ClientFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onFiltersChange({
      ...filters,
      startDate: range?.from ? range.from.toISOString().split("T")[0] : "",
      endDate: range?.to ? range.to.toISOString().split("T")[0] : "",
    });
  };

  const subscriptionTypes = [
    { value: "LESSONS_8", label: "8 حصص" },
    { value: "LESSONS_12", label: "12 حصة" },
    { value: "ONE_MONTH", label: "شهر واحد" },
    { value: "TWO_MONTHS", label: "شهرين" },
    { value: "THREE_MONTHS", label: "3 أشهر" },
    { value: "SIX_MONTHS", label: "6 أشهر" },
    { value: "YEAR", label: "سنة" },
  ];

  const paymentTypes = [
    { value: "NEW", label: "جديد" },
    { value: "RENEWAL", label: "تجديد" },
  ];

  return (
    <Card className="border-red-600/20 bg-linear-to-br from-background to-red-50/30 dark:to-red-950/10">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-600/10">
              <Filter className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">تصفية النتائج</h3>
              {hasActiveFilters && (
                <p className="text-xs text-muted-foreground">
                  {Object.values(filters).filter((v) => v).length} فلتر نشط
                </p>
              )}
            </div>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-600/10"
            >
              <X className="h-4 w-4 ml-1" />
              مسح الكل
            </Button>
          )}
        </div>

        {/* Accordion for Filters */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="filters" className="border-none">
            <AccordionTrigger className="hover:bg-red-600/5 rounded-lg px-3 py-2 hover:no-underline">
              <span className="text-sm font-medium">
                {hasActiveFilters ? "تعديل الفلاتر" : "عرض الفلاتر"}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Client Name Filter */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Search className="h-4 w-4 text-red-600" />
                    اسم العميل
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="ابحث باسم العميل..."
                      value={filters.clientName}
                      onChange={(e) =>
                        handleFilterChange("clientName", e.target.value)
                      }
                      className="border-red-600/30 focus-visible:ring-red-600 pr-10"
                    />
                    {filters.clientName && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-red-600/10"
                        onClick={() => handleFilterChange("clientName", "")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Subscription Type Filter */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Package className="h-4 w-4 text-red-600" />
                    نوع الاشتراك
                  </Label>
                  <Select
                    value={filters.subscriptionType}
                    onValueChange={(value) =>
                      handleFilterChange("subscriptionType", value)
                    }
                  >
                    <SelectTrigger className="border-red-600/30 focus:ring-red-600">
                      <SelectValue placeholder="اختر نوع الاشتراك" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الاشتراكات</SelectItem>
                      {subscriptionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Payment Type Filter */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <CreditCard className="h-4 w-4 text-red-600" />
                    نوع الدفع
                  </Label>
                  <Select
                    value={filters.paymentType}
                    onValueChange={(value) =>
                      handleFilterChange("paymentType", value)
                    }
                  >
                    <SelectTrigger className="border-red-600/30 focus:ring-red-600">
                      <SelectValue placeholder="اختر نوع الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      {paymentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range Filter */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <CalendarIcon className="h-4 w-4 text-red-600" />
                    نطاق التاريخ
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-right font-normal border-red-600/30 hover:bg-red-600/5"
                      >
                        <CalendarIcon className="ml-2 h-4 w-4 text-red-600" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "dd MMM yyyy", {
                                locale: ar,
                              })}{" "}
                              -{" "}
                              {format(dateRange.to, "dd MMM yyyy", {
                                locale: ar,
                              })}
                            </>
                          ) : (
                            format(dateRange.from, "dd MMM yyyy", {
                              locale: ar,
                            })
                          )
                        ) : (
                          <span className="text-muted-foreground">
                            اختر نطاق التاريخ
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        locale={ar}
                        mode="range"
                        captionLayout="dropdown"
                        selected={dateRange}
                        onSelect={handleDateRangeChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  {(filters.startDate || filters.endDate) && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {filters.startDate && (
                        <span>من: {filters.startDate}</span>
                      )}
                      {filters.startDate && filters.endDate && <span>•</span>}
                      {filters.endDate && <span>إلى: {filters.endDate}</span>}
                    </div>
                  )}
                </div>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                  <div className="md:col-span-2 pt-4 border-t">
                    <p className="text-sm font-medium mb-3">الفلاتر النشطة:</p>
                    <div className="flex flex-wrap gap-2">
                      {filters.clientName && (
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-600/10 text-red-600 text-sm">
                          <Search className="h-3 w-3" />
                          <span>{filters.clientName}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-red-600/20 ml-1"
                            onClick={() => handleFilterChange("clientName", "")}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {filters.subscriptionType &&
                        filters.subscriptionType !== "all" && (
                          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-600/10 text-red-600 text-sm">
                            <Package className="h-3 w-3" />
                            <span>
                              {subscriptionTypes.find(
                                (t) => t.value === filters.subscriptionType
                              )?.label || filters.subscriptionType}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-red-600/20 ml-1"
                              onClick={() =>
                                handleFilterChange("subscriptionType", "")
                              }
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      {filters.paymentType && filters.paymentType !== "all" && (
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-600/10 text-red-600 text-sm">
                          <CreditCard className="h-3 w-3" />
                          <span>
                            {paymentTypes.find(
                              (t) => t.value === filters.paymentType
                            )?.label || filters.paymentType}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-red-600/20 ml-1"
                            onClick={() =>
                              handleFilterChange("paymentType", "")
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {(filters.startDate || filters.endDate) && (
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-600/10 text-red-600 text-sm">
                          <CalendarIcon className="h-3 w-3" />
                          <span>
                            {filters.startDate && `من: ${filters.startDate}`}
                            {filters.startDate && filters.endDate && " • "}
                            {filters.endDate && `إلى: ${filters.endDate}`}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-red-600/20 ml-1"
                            onClick={() => {
                              handleDateRangeChange(undefined);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
}
