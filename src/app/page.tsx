import { redirect } from "next/navigation";

export default function HomePage() {
  if (!process.env.HABITUE_API_BASE_URL) redirect("/costra");
  return <main className="message-screen mx-auto max-w-md min-h-dvh"><h1>Tu club te espera</h1><p>Acerca tu móvil al NFC de tu comercio para entrar en su club.</p></main>;
}
