import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MerchantHero } from "./merchant-hero";
import { StampPreview } from "@/features/loyalty/components/stamp-preview";
import { ReviewInvitation } from "@/features/reviews/components/review-invitation";
import type { Commerce } from "../contracts";

export function LandingScreen({ commerce }: { commerce: Commerce }) {
  const base = `/${commerce.slug}`;
  return <main className="landing-screen">
    <MerchantHero commerce={commerce} />
    <div className="landing-body">
      <h1>{commerce.welcomeTitle}</h1>
      <p className="welcome-description">{commerce.description}</p>
      {commerce.program && <StampPreview program={commerce.program} />}
      <div className="landing-actions">
        <Button asChild className="w-full"><Link href={`${base}/registro`}>Quiero unirme</Link></Button>
        <Button asChild variant="ghost" size="link"><Link href={`${base}/acceso`}>Ya soy miembro</Link></Button>
      </div>
      <ReviewInvitation />
    </div>
  </main>;
}
