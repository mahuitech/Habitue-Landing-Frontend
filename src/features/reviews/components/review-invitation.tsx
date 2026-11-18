"use client";
import { useState } from "react";
import { Icon } from "@/components/shared/icon";

export function ReviewInvitation() {
  const [message, setMessage] = useState(false);
  return <section className="review-invitation" aria-label="Comparte tu experiencia">
    <p>¿Qué tal tu visita?</p>
    <button type="button" className="review-stars" aria-label="Compartir mi experiencia en Google" onClick={() => setMessage(true)}>
      {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" width={27} height={27} />)}
    </button>
    {message && <p role="status" className="review-message">Podrás compartir tu experiencia en Google después de una visita válida. Todas las opiniones son bienvenidas.</p>}
  </section>;
}
