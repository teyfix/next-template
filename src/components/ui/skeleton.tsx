import { cn } from "@/lib/utils";
import { Slot } from "./slot";

function Skeleton({
  asChild,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Cmp = asChild ? Slot : "div";

  return (
    <Cmp
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
