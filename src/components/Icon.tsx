import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";

// Renders a lucide icon from a CMS string like "shield-check" or "lucide:shield-check".
// Server component — the full icon map never ships to the browser.
export default function Icon({
  name,
  ...props
}: { name: string | undefined } & LucideProps) {
  if (!name) return null;
  const clean = name.replace(/^lucide:/, "");
  const pascal = clean
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const Cmp = icons[pascal as keyof typeof icons];
  if (!Cmp) return null;
  return <Cmp {...props} />;
}
