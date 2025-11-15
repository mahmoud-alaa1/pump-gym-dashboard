import { Provider } from "@radix-ui/react-direction";

export default function DirectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider dir="ltr">{children}</Provider>;
}
