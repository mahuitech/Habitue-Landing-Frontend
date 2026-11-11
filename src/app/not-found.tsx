import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-6">
    <h1 className="text-2xl font-bold">No encontramos esta página</h1>
    <p>Comprueba el enlace o vuelve a acercar tu móvil al NFC del comercio.</p>
    <Button asChild><Link href="/">Volver al inicio</Link></Button>
  </main>;
}
