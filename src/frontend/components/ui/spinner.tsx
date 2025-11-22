import { Loader } from "lucide-react";

export default function Spinner({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return <Loader className={`animate-spin ${className}`} size={size} />;
}
