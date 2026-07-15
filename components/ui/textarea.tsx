import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black/40 focus:ring-2 focus:ring-black/5",
        className,
      )}
      {...props}
    />
  );
}
