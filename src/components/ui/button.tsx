import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50", {variants: {variant: {default: "bg-primary text-white hover:bg-primary/90", outline: "border border-border bg-white hover:bg-muted", ghost: "hover:bg-muted"}, size: {default: "h-10 px-4", icon: "size-10"}}, defaultVariants:{variant:"default",size:"default"}});
export function Button({className,variant,size,asChild=false,type,...props}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {asChild?:boolean}) { const Comp=asChild?Slot:"button"; return <Comp type={asChild ? undefined : type ?? "button"} className={cn(buttonVariants({variant,size,className}))} {...props}/>; }
