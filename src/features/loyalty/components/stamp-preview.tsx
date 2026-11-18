import { Icon } from "@/components/shared/icon";
import type { Commerce } from "@/features/commerce/contracts";

export function StampPreview({ program }: { program: NonNullable<Commerce["program"]> }) {
  // Illustrative welcome benefit, never the current progress of a real member.
  const visible = program.visitsRequired;
  return <section className="stamp-card" aria-label="Así funciona el club">
    <div className="stamp-row" aria-hidden="true">
      {Array.from({ length: visible }, (_, index) => {
        const last = index === visible - 1;
        return <span key={index} className={`stamp ${index < program.welcomeStamps ? "stamp-filled" : ""} ${last ? "stamp-gift" : ""}`}>
          {last ? <Icon name="gift" width={22} height={22} /> : index < program.welcomeStamps ? <Icon name="check" /> : null}
        </span>;
      })}
    </div>
    <p>{program.rewardDescription}</p>
  </section>;
}
