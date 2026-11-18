import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-center font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-2xl bg-primary text-primary-foreground hover:bg-primary/85",
        outline: "rounded-2xl border border-border bg-white hover:bg-muted",
        ghost: "rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground",
      },
      size: { default: "min-h-12 px-5 py-3 text-base", icon: "size-12", link: "min-h-11 px-3 py-2 text-sm font-normal" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({ className, variant, size, asChild = false, type, ...props }:
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp type={asChild ? undefined : type ?? "button"} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
