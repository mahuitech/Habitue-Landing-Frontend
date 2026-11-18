"use client";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="message-screen mx-auto max-w-md min-h-dvh">
    <h1>No hemos podido cargar el comercio</h1>
    <p>Comprueba tu conexión e inténtalo de nuevo en unos instantes.</p>
    <Button onClick={reset}>Volver a intentar</Button>
  </main>;
}
