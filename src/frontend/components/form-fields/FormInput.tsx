/** Choose where to place the label */
import type { InputHTMLAttributes, ReactNode } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/frontend/lib/utils";

interface FormInputProps<TFormValues extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {
  name: Path<TFormValues>;
  label?: ReactNode;
  labelPosition?: "top" | "left" | "right" | "none";
  description?: string | ReactNode;
  Icon?: ReactNode;
  labelClassName?: string;
  defaultValue?: string | number | readonly string[];
  descriptionClassName?: string;
}

export default function FormInput<TFormValues extends FieldValues>({
  label,
  name,
  Icon,
  description,
  className,
  labelClassName,
  descriptionClassName,
  labelPosition = "top",
  dir,
  ...inputProps
}: FormInputProps<TFormValues>) {
  const form = useFormContext<TFormValues>();
  console.log(dir,name);

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

            {/* === Input with optional icon === */}
            <FormControl>
              <div className="relative h-fit">
                {Icon && (
                  <div
                    className={cn(
                      "absolute inset-y-0 flex items-center justify-center text-primary",
                      dir === "ltr" ? "start-2.5" : "end-2.5"
                    )}
                  >
                    {Icon}
                  </div>
                )}
                <Input
                  id={name}
                  {...field}
                  {...inputProps}
                  dir={dir}
                  className={cn(Icon && "pe-9 transition-all", className)}
                  value={field.value}
                />
              </div>
            </FormControl>
          </div>

          {/* === Description and Error === */}
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
