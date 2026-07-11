import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";

// Older lucide names that were renamed upstream — accept both so CMS content
// written with either generation of names always renders.
const ALIASES: Record<string, string> = {
  "alert-triangle": "triangle-alert",
  "alert-circle": "circle-alert",
  "help-circle": "circle-help",
  "x-circle": "circle-x",
  "bar-chart": "chart-no-axes-column-increasing",
  "bar-chart-2": "chart-column",
  "bar-chart-3": "chart-column-big",
  "bar-chart-4": "chart-column-increasing",
  "check-circle": "circle-check",
  "check-circle-2": "circle-check-big",
  "check-square": "square-check-big",
  "code-2": "code-xml",
  "edit": "square-pen",
  "edit-2": "pen",
  "edit-3": "pen-line",
  "file-signature": "file-pen-line",
  "file-edit": "file-pen",
  "globe-2": "earth",
  "layout": "panels-top-left",
  "layout-dashboard": "layout-dashboard",
  "line-chart": "chart-line",
  "pie-chart": "chart-pie",
  "gps": "navigation",
  "sliders": "sliders-vertical",
  "verified": "badge-check",
  "user-2": "user-round",
  "users-2": "users-round",
};

// Renders a lucide icon from a CMS string like "shield-check" or "lucide:shield-check".
// Server component — the full icon map never ships to the browser.
export default function Icon({
  name,
  ...props
}: { name: string | undefined } & LucideProps) {
  if (!name) return null;
  let clean = name.replace(/^lucide:/, "").trim().toLowerCase();
  clean = ALIASES[clean] ?? clean;
  const pascal = clean
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const Cmp = icons[pascal as keyof typeof icons];
  if (!Cmp) return null;
  return <Cmp {...props} />;
}
