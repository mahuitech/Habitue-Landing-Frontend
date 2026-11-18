import type { ReactNode } from "react";
import { PoweredBy } from "./powered-by";
import type { CommerceContext } from "@/features/commerce/contracts";
import { commerceTheme } from "@/features/commerce/theme";

export function MerchantShell({ context, children }: { context: CommerceContext; children: ReactNode }) {
  return <div className="merchant-shell" style={commerceTheme(context.commerce.primaryColor)}>
    {context.isPreview && <div className="preview-notice">Vista previa · No se guardan datos</div>}
    <div className="merchant-content">{children}</div>
    <PoweredBy />
  </div>;
}
