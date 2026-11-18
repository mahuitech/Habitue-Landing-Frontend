"use client";
import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/shared/form-field";
import { validateRegistration, type RegistrationErrors, type RegistrationValues } from "../validation";
import type { Commerce } from "@/features/commerce/contracts";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export function RegistrationForm({ commerce }: { commerce: Commerce }) {
  const id = useId();
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [notice, setNotice] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: RegistrationValues = {
      name: String(data.get("name") ?? ""), contact: String(data.get("contact") ?? ""),
      birthdayDay: String(data.get("birthdayDay") ?? ""), birthdayMonth: String(data.get("birthdayMonth") ?? ""),
      acceptedTerms: data.has("acceptedTerms"), acceptedMarketing: data.has("acceptedMarketing"),
    };
    const nextErrors = validateRegistration(values);
    setErrors(nextErrors);
    setNotice(Object.keys(nextErrors).length === 0);
    // No persistence or fake membership creation. Activate submission after the API is agreed.
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
    }
  }

  return <form className="registration-form" onSubmit={submit} noValidate onChange={() => setNotice(false)}>
    <FormField label="Nombre" error={errors.name}>
      {(props) => <Input {...props} name="name" autoComplete="given-name" placeholder="Cómo te llamamos" maxLength={80} required />}
    </FormField>
    <FormField label="Email o móvil" error={errors.contact}>
      {(props) => <Input {...props} name="contact" type="text" autoComplete="username" placeholder="Para enviarte tu regalo" maxLength={254} autoCapitalize="none" spellCheck={false} required />}
    </FormField>
    <fieldset className="birthday-field">
      <legend>Cumpleaños <span>(opcional, para tu regalo)</span></legend>
      <div className="birthday-selects">
        <Select name="birthdayDay" aria-label="Día de cumpleaños" autoComplete="bday-day" aria-invalid={errors.birthday ? true : undefined} aria-describedby={errors.birthday ? `${id}-birthday-error` : undefined} defaultValue="">
          <option value="">Día</option>{Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </Select>
        <Select name="birthdayMonth" aria-label="Mes de cumpleaños" autoComplete="bday-month" aria-invalid={errors.birthday ? true : undefined} aria-describedby={errors.birthday ? `${id}-birthday-error` : undefined} defaultValue="">
          <option value="">Mes</option>{months.map((month, i) => <option key={month} value={i + 1}>{month}</option>)}
        </Select>
      </div>
      {errors.birthday && <p id={`${id}-birthday-error`} className="field-error">{errors.birthday}</p>}
    </fieldset>
    <div className="consent-group">
      <label className="consent-label">
        <Checkbox name="acceptedTerms" required aria-invalid={errors.acceptedTerms ? true : undefined} aria-describedby={errors.acceptedTerms ? `${id}-terms-error` : undefined} />
        <span>Acepto las <Link href={commerce.legal.termsUrl}>condiciones del club</Link> y he leído la <Link href={commerce.legal.privacyUrl}>política de privacidad</Link>.</span>
      </label>
      {errors.acceptedTerms && <p id={`${id}-terms-error`} className="field-error">{errors.acceptedTerms}</p>}
      <label className="consent-label">
        <Checkbox name="acceptedMarketing" />
        <span>Quiero recibir ventajas y novedades de {commerce.name}. <span className="text-muted-foreground">(Opcional)</span></span>
      </label>
    </div>
    <Button type="submit" className="w-full">Crear mi tarjeta</Button>
    {notice && <div className="form-notice" role="status">Tu formulario está completo. El alta todavía no está disponible; no hemos guardado ni enviado tus datos.</div>}
  </form>;
}
