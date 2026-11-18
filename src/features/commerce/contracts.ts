export type Commerce = {
  slug: string;
  name: string;
  logoUrl: string | null;
  heroImageUrl: string | null;
  primaryColor: string;
  welcomeTitle: string;
  description: string;
  program: { visitsRequired: number; welcomeStamps: number; rewardDescription: string } | null;
  legal: { privacyUrl: string; termsUrl: string; termsVersion: string; marketingVersion: string };
};

export type CommerceContext = { commerce: Commerce; isPreview: boolean };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
export function isPublicUrl(value: unknown): value is string {
  if (!text(value)) return false;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

/** Proposed public DTO; reject malformed branding instead of rendering another business. */
export function parseCommerce(value: unknown, expectedSlug: string): Commerce {
  if (!isRecord(value) || value.slug !== expectedSlug || !text(value.name) ||
    !text(value.welcomeTitle) || !text(value.description) ||
    typeof value.primaryColor !== "string" || !/^#[0-9a-f]{6}$/i.test(value.primaryColor) ||
    !(value.logoUrl === null || isPublicUrl(value.logoUrl)) ||
    !(value.heroImageUrl === null || isPublicUrl(value.heroImageUrl)) ||
    !isRecord(value.legal) || !isPublicUrl(value.legal.privacyUrl) ||
    !isPublicUrl(value.legal.termsUrl) || !text(value.legal.termsVersion) || !text(value.legal.marketingVersion)) {
    throw new Error("Invalid public commerce configuration");
  }
  const p = value.program;
  if (p !== null && (!isRecord(p) || !Number.isInteger(p.visitsRequired) ||
    (p.visitsRequired as number) < 2 || (p.visitsRequired as number) > 20 ||
    !Number.isInteger(p.welcomeStamps) || (p.welcomeStamps as number) < 0 ||
    (p.welcomeStamps as number) >= (p.visitsRequired as number) || !text(p.rewardDescription))) {
    throw new Error("Invalid public loyalty program");
  }
  return value as Commerce;
}
