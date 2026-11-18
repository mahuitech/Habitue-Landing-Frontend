"use client";
import { useState } from "react";
import Image from "next/image";
import type { Commerce } from "@/features/commerce/contracts";
import { cn } from "@/lib/utils";

export function MerchantLogo({ commerce, className }: { commerce: Commerce; className?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={cn("merchant-logo", className)}>
    {commerce.logoUrl && !failed ? <Image src={commerce.logoUrl} alt={commerce.name} width={80} height={80} unoptimized onError={() => setFailed(true)} /> :
      <span aria-label={commerce.name}>{commerce.name.slice(0, 2).toUpperCase()}</span>}
  </div>;
}
