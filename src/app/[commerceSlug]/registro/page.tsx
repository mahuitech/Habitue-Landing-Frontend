import { getCommerce } from "@/features/commerce/service";
import { RegistrationScreen } from "@/features/membership/components/registration-screen";

export default async function RegistrationPage({ params }: { params: Promise<{ commerceSlug: string }> }) {
  const { commerce } = await getCommerce((await params).commerceSlug);
  return <RegistrationScreen commerce={commerce} />;
}
