import { cache } from "react";
import { notFound } from "next/navigation";
import { parseCommerce, type CommerceContext } from "./contracts";
import { demoCommerces } from "./fixtures";

/** Server-only loading boundary. The path/DTO are proposals until backend confirms them. */
export const getCommerce = cache(async (slug: string): Promise<CommerceContext> => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 80) notFound();
  const baseUrl = process.env.HABITUE_API_BASE_URL;
  if (!baseUrl) {
    const commerce = Object.hasOwn(demoCommerces, slug) ? demoCommerces[slug] : undefined;
    if (!commerce) notFound();
    return { commerce, isPreview: true };
  }
  const url = new URL(`${baseUrl.replace(/\/$/, "")}/api/public/businesses/${encodeURIComponent(slug)}/landing`);
  if (url.protocol !== "https:" && !(process.env.NODE_ENV === "development" && url.hostname === "localhost")) {
    throw new Error("The public API must use HTTPS");
  }
  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (response.status === 404 || response.status === 410) notFound();
  if (!response.ok) throw new Error("Public commerce configuration unavailable");
  return { commerce: parseCommerce(await response.json(), slug), isPreview: false };
});
