import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { MerchantLogo } from "@/components/shared/merchant-logo";
import { RegistrationForm } from "./registration-form";
import type { Commerce } from "@/features/commerce/contracts";

export function RegistrationScreen({ commerce }: { commerce: Commerce }) {
  return <main className="registration-screen">
    <header className="inner-header">
      <Button asChild variant="ghost" size="icon"><Link href={`/${commerce.slug}`} aria-label="Volver al inicio"><Icon name="arrow-left" width={28} height={28} /></Link></Button>
      <MerchantLogo commerce={commerce} />
    </header>
    <h1>Crea tu tarjeta del club</h1>
    <p className="registration-intro">Solo te llevará un minuto</p>
    <RegistrationForm commerce={commerce} />
  </main>;
}
