import { cn } from "@/shared/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-zinc-900/10 dark:bg-zinc-50/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
