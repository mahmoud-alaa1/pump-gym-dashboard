import ClientForm from ".";
import useAddClient from "../../hooks/useAddClient";

export default function AddClientForm() {
  const { mutate, isPending } = useAddClient();

  return (
    <div>
      <ClientForm
        mode="add"
        onSubmit={(data, reset) => mutate(data, { onSuccess: reset })}
        isPending={isPending}
      />
    </div>
  );
}
