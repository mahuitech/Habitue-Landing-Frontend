import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCommerce } from "@/features/commerce/service";

export default async function LegalPreview({ params }: { params: Promise<{ commerceSlug: string }> }) {
  const { commerce, isPreview } = await getCommerce((await params).commerceSlug);
  if (!isPreview) notFound();
  return <main className="message-screen"><h1>Condiciones del club</h1>
    <p>Esta es una vista previa de {commerce.name}. Aquí aparecerá el documento del comercio antes de habilitar el alta. No se recogen ni envían datos desde este formulario de demostración.</p>
    <Button asChild><Link href={`/${commerce.slug}/registro`}>Volver al formulario</Link></Button>
  </main>;
}
