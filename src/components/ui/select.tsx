import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return <select className={cn("form-input", className)} {...props}>{children}</select>;
}
