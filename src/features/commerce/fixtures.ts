import type { Commerce } from "./contracts";

// Illustrative branding only. No member, visit or reward is created by these fixtures.
export const demoCommerces: Record<string, Commerce> = {
  costra: {
    slug: "costra", name: "Costra", logoUrl: "/demo/costra-logo.svg",
    heroImageUrl: "/demo/coffee.jpg", primaryColor: "#FF9810",
    welcomeTitle: "Únete al Club Costra",
    description: "Un regalo en tu cumpleaños y novedades antes que nadie",
    program: { visitsRequired: 5, welcomeStamps: 1, rewardDescription: "Tu 5º café, gratis. Empiezas con 1 sello" },
    legal: { privacyUrl: "/costra/privacidad", termsUrl: "/costra/condiciones", termsVersion: "demo-v1", marketingVersion: "demo-v1" },
  },
  "fresh-food": {
    slug: "fresh-food", name: "FreshFood", logoUrl: "/demo/fresh-food-logo.svg",
    heroImageUrl: "/demo/food.jpg", primaryColor: "#42B908",
    welcomeTitle: "Únete al Club FreshFood",
    description: "Un regalo en tu cumpleaños y novedades antes que nadie",
    program: { visitsRequired: 5, welcomeStamps: 1, rewardDescription: "En tu 5ta visita, un zumo gratis." },
    legal: { privacyUrl: "/fresh-food/privacidad", termsUrl: "/fresh-food/condiciones", termsVersion: "demo-v1", marketingVersion: "demo-v1" },
  },
};
