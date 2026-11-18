export type RegistrationValues = {
  name: string;
  contact: string;
  birthdayDay: string;
  birthdayMonth: string;
  acceptedTerms: boolean;
  acceptedMarketing: boolean;
};
export type RegistrationErrors = Partial<Record<"name" | "contact" | "birthday" | "acceptedTerms", string>>;
export type RegistrationRequest = {
  name: string;
  contact: { type: "EMAIL" | "PHONE"; value: string };
  birthday: { day: number; month: number } | null;
  consents: { purpose: "CLUB_TERMS" | "MARKETING"; textVersion: string; accepted: boolean }[];
};

export function validateRegistration(values: RegistrationValues): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const name = values.name.trim();
  if (name.length < 2 || name.length > 80) errors.name = "Escribe tu nombre (entre 2 y 80 caracteres).";
  const contact = values.contact.trim();
  if (contact.includes("@")) {
    if (contact.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) errors.contact = "Introduce un email válido.";
  } else {
    const digits = contact.replace(/[\s().-]/g, "");
    if (!/^\+?[0-9]{8,15}$/.test(digits)) errors.contact = "Introduce un email o un móvil válido, con prefijo de país.";
  }
  const day = Number(values.birthdayDay);
  const month = Number(values.birthdayMonth);
  if (values.birthdayDay || values.birthdayMonth) {
    const maxDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(day) || day < 1 || day > maxDays[month - 1]) {
      errors.birthday = "Selecciona un día y un mes válidos, o deja ambos sin completar.";
    }
  }
  if (!values.acceptedTerms) errors.acceptedTerms = "Acepta las condiciones del club para continuar.";
  return errors;
}

export function registrationRequest(values: RegistrationValues, versions: { termsVersion: string; marketingVersion: string }): RegistrationRequest {
  if (Object.keys(validateRegistration(values)).length) throw new Error("Invalid registration");
  const contact = values.contact.trim();
  return {
    name: values.name.trim(),
    contact: contact.includes("@") ? { type: "EMAIL", value: contact } : { type: "PHONE", value: contact.replace(/[\s().-]/g, "") },
    birthday: values.birthdayDay ? { day: Number(values.birthdayDay), month: Number(values.birthdayMonth) } : null,
    consents: [
      { purpose: "CLUB_TERMS", textVersion: versions.termsVersion, accepted: values.acceptedTerms },
      { purpose: "MARKETING", textVersion: versions.marketingVersion, accepted: values.acceptedMarketing },
    ],
  };
}
