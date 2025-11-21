import type { ReactNode } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/frontend/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  options: SelectOption[];
  label?: ReactNode;
  labelPosition?: "top" | "left" | "right" | "none";
  description?: string | ReactNode;
  placeholder?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

export default function FormSelect<TFormValues extends FieldValues>({
  name,
  options,
  label,
  labelPosition = "top",
  description,
  placeholder = "اختر...",
  labelClassName,
  descriptionClassName,
  className,
}: FormSelectProps<TFormValues>) {
  const form = useFormContext<TFormValues>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div
            className={cn(
              labelPosition === "left" && "flex items-center gap-2",
              labelPosition === "right" &&
                "flex flex-row-reverse items-center gap-2",
              labelPosition === "top" && "flex flex-col"
            )}
          >
            {labelPosition !== "none" && label && (
              <FormLabel
                htmlFor={name}
                className={cn("mb-2.5", labelClassName, {
                  "mb-0": labelPosition !== "top",
                })}
              >
                {label}
              </FormLabel>
            )}

            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={cn("w-full", className)}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>

          {description && (
            <FormDescription className={descriptionClassName}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
