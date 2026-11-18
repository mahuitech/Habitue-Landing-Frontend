"use client";
import { useState } from "react";
import Image from "next/image";
import type { Commerce } from "../contracts";
import { MerchantLogo } from "@/components/shared/merchant-logo";

export function MerchantHero({ commerce }: { commerce: Commerce }) {
  const [failed, setFailed] = useState(false);
  return <div className="merchant-hero">
    {commerce.heroImageUrl && !failed && <Image src={commerce.heroImageUrl} alt={`Bienvenido a ${commerce.name}`} fill unoptimized preload sizes="(max-width: 480px) 100vw, 420px" onError={() => setFailed(true)} className="merchant-hero-image" />}
    <svg className="hero-wave" viewBox="0 0 420 76" preserveAspectRatio="none" aria-hidden="true"><path d="M0 65C44 2 91 14 144 36S215 73 274 45 365-5 420 35V76H0Z" fill="currentColor" /></svg>
    <MerchantLogo commerce={commerce} className="hero-logo" />
  </div>;
}
