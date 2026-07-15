import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:ring-2 focus:ring-black/5",
        className,
      )}
      {...props}
    />
  );
}
