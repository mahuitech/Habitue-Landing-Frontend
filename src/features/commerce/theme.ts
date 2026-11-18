import type { CSSProperties } from "react";

/** Choose a readable CTA foreground for any validated six-digit merchant color. */
export function commerceTheme(color: string): CSSProperties {
  const hex = /^#[0-9a-f]{6}$/i.test(color) ? color : "#FF9810";
  const rgb = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const [r, g, b] = rgb.map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return { "--primary": hex, "--primary-foreground": luminance > 0.179 ? "#171714" : "#ffffff" } as CSSProperties;
}
