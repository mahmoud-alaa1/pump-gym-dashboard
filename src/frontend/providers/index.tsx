import { Toaster } from "@front/components/ui/sonner";
import DirectionProvider from "./direction-provider";
import ReactQueryProvider from "./react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <DirectionProvider>
        {children}
        <Toaster position="top-center" />
      </DirectionProvider>
    </ReactQueryProvider>
  );
}
