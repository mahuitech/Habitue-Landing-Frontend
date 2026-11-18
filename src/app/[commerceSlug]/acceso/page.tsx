import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MerchantLogo } from "@/components/shared/merchant-logo";
import { getCommerce } from "@/features/commerce/service";

export default async function AccessPage({ params }: { params: Promise<{ commerceSlug: string }> }) {
  const { commerce } = await getCommerce((await params).commerceSlug);
  return <main className="message-screen">
    <MerchantLogo commerce={commerce} />
    <h1>Tu club, siempre contigo</h1>
    <p>Si ya tienes una tarjeta, puedes consultarla desde tu Wallet. Estamos preparando la recuperación de acceso desde este dispositivo.</p>
    <Button asChild><Link href={`/${commerce.slug}`}>Volver al inicio</Link></Button>
  </main>;
}
