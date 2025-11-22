import ClientForm from ".";
import useEditClient from "../../hooks/useEditClient";

export default function EditClientForm({ client }: { client: any }) {
  const { mutate, isPending } = useEditClient({ id: client.id });

  console.log(client);
  return (
    <ClientForm
      mode="edit"
      initialData={client}
      onSubmit={(data) => mutate(data)}
      isPending={isPending}
    />
  );
}
