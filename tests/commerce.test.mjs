import test from "node:test";
import assert from "node:assert/strict";
import { parseCommerce } from "../src/features/commerce/contracts.ts";
import { commerceTheme } from "../src/features/commerce/theme.ts";

const fixture = { slug: "costra", name: "Costra", primaryColor: "#FF9810", logoUrl: null, heroImageUrl: "https://example.com/hero.jpg", welcomeTitle: "Club Costra", description: "Bienvenido", program: null, legal: { privacyUrl: "https://example.com/privacy", termsUrl: "https://example.com/terms", termsVersion: "v1", marketingVersion: "v1" } };

test("accepts null images/program and checks commerce identity", () => {
  assert.deepEqual(parseCommerce(fixture, "costra"), fixture);
  assert.throws(() => parseCommerce(fixture, "other-business"));
});
test("rejects unsafe URLs, CSS and invalid program values", () => {
  for (const patch of [{ primaryColor: "red;display:none" }, { logoUrl: "javascript:alert(1)" }, { heroImageUrl: "http://example.com/image" }, { legal: null }, { program: { visitsRequired: 0, welcomeStamps: 1, rewardDescription: "Regalo" } }]) {
    assert.throws(() => parseCommerce({ ...fixture, ...patch }, "costra"));
  }
});
test("CTA text contrasts with both light and dark merchant colors", () => {
  assert.equal(commerceTheme("#FFFFFF")["--primary-foreground"], "#171714");
  assert.equal(commerceTheme("#000000")["--primary-foreground"], "#ffffff");
  assert.equal(commerceTheme("invalid")["--primary"], "#FF9810");
});
