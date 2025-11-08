import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormInput from "./FormInput";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "../ui/button";

interface FormPasswordProps<TFormValues extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "name" | "defaultValue" | "type"
  > {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  description?: string;
  labelClassName?: string;
}

export default function FormPassword<TFormValues extends FieldValues>({
  name,
  label,
  description,
  className,
  labelClassName,
  ...inputProps
}: FormPasswordProps<TFormValues>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      name={name}
      label={label}
      description={description}
      type={showPassword ? "text" : "password"}
      className={className}
      {...inputProps}
      labelClassName={labelClassName}
      Icon={
        <Button
          variant="link"
          className=" w-fit cursor-pointer p-0"
          size="icon"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="size-5" />
          ) : (
            <EyeOff className="size-5" />
          )}
        </Button>
      }
    />
  );
}
