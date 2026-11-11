"use client";
import { useId, type ReactNode } from "react";
export function FormField({ label, error, hint, children }: {
  label: string; error?: string; hint?: string;
  children: (props: { id: string; "aria-invalid"?: true; "aria-describedby"?: string }) => ReactNode;
}) {
  const id = useId();
  return <div className="form-field"><label htmlFor={id}>{label}</label>{children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": error || hint ? `${id}-help` : undefined })}{(error || hint) && <p id={`${id}-help`} className={error ? "field-error" : "field-hint"}>{error ?? hint}</p>}</div>;
}
