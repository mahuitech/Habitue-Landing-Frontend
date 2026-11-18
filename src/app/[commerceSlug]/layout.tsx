import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getCommerce } from "@/features/commerce/service";
import { MerchantShell } from "@/components/shared/merchant-shell";

type Props = { params: Promise<{ commerceSlug: string }>; children: ReactNode };
export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { commerce } = await getCommerce((await params).commerceSlug);
  return { title: `${commerce.name} · Club habitué`, description: commerce.description };
}
export default async function CommerceLayout({ params, children }: Props) {
  const context = await getCommerce((await params).commerceSlug);
  return <MerchantShell context={context}>{children}</MerchantShell>;
}
