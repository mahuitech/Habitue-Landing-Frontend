import type { SVGProps } from "react";

type IconName = "arrow-left" | "check" | "gift" | "star";
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths = {
    "arrow-left": <path d="m15 18-6-6 6-6" />,
    check: <path d="m5 12 4 4L19 6" />,
    gift: <><path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13" /><path d="M12 8H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z" /></>,
    star: <path d="m12 2 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8L2.2 9.2l6.8-1L12 2Z" />,
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" fill={name === "star" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
