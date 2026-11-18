import { getCommerce } from "@/features/commerce/service";
import { LandingScreen } from "@/features/commerce/components/landing-screen";

export default async function CommercePage({ params }: { params: Promise<{ commerceSlug: string }> }) {
  const { commerce } = await getCommerce((await params).commerceSlug);
  return <LandingScreen commerce={commerce} />;
}
