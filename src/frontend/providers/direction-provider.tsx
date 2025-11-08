import { Provider } from "@radix-ui/react-direction";

export default function DirectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider dir="rtl">{children}</Provider>;
}
