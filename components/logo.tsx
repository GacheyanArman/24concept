import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)} aria-label="The 24 Concept">
      <span
        className={cn(
          "grid size-12 place-items-center rounded-full border font-serif text-[2rem] leading-none tracking-[-0.12em]",
          inverted ? "border-white/40 text-white" : "border-black/15 text-black",
        )}
      >
        24
      </span>
      <span className={cn("hidden text-[10px] font-semibold uppercase leading-[1.15] tracking-[0.24em] sm:block", inverted ? "text-white" : "text-black")}>
        The<br />Concept
      </span>
    </div>
  );
}
