import EmployeeForm from ".";
import useAddEmployee from "../../hooks/useAddEmployee";

export default function AddEmployeeForm() {
  const { mutate, isPending } = useAddEmployee();
  return (
    <EmployeeForm
      mode="add"
      onSubmit={(data, reset) => mutate(data, { onSuccess: () => reset() })}
      isPending={isPending}
    />
  );
}
