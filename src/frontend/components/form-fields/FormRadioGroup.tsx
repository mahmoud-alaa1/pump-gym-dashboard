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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface RadioOption {
  label: ReactNode;
  value: string;
}

interface FormRadioGroupProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  options: RadioOption[];
  label?: ReactNode;
  labelPosition?: "top" | "left" | "right" | "none";
  description?: string | ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

export default function FormRadioGroup<TFormValues extends FieldValues>({
  name,
  options,
  label,
  labelPosition = "top",
  description,
  labelClassName,
  descriptionClassName,
  className,
}: FormRadioGroupProps<TFormValues>) {
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
              <RadioGroup
                id={name}
                value={field.value}
                onValueChange={field.onChange}
                className={cn("flex gap-2 flex-wrap", className)}
              >
                {options.map((opt) => (
                  <>
                    <RadioGroupItem
                      key={opt.value}
                      value={opt.value}
                      id={`${name}-${opt.value}`}
                    />
                    <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
                  </>
                ))}
              </RadioGroup>
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
