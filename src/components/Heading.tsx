import React from "react";

/**
 * Renders CMS heading text with inline color markers:
 *   [[c:text]] → cyan (secondary)   [[o:text]] → orange (accent)
 *   [[y:text]] → yellow (highlight) [[t:text]] → teal (primary)
 *   |  → line break
 */
const COLORS: Record<string, string> = {
  c: "text-secondary",
  o: "text-accent",
  y: "text-highlight drop-shadow-[0_0_20px_rgba(252,215,39,0.3)]",
  t: "text-primary",
};

export function renderMarkedText(text: string | undefined): React.ReactNode {
  if (!text) return null;
  return text.split("|").map((line, li, arr) => (
    <React.Fragment key={li}>
      {line.split(/(\[\[[coyt]:[^\]]*\]\])/g).map((part, pi) => {
        const m = part.match(/^\[\[([coyt]):([^\]]*)\]\]$/);
        if (m) {
          return (
            <span key={pi} className={COLORS[m[1]]}>
              {m[2]}
            </span>
          );
        }
        return <React.Fragment key={pi}>{part}</React.Fragment>;
      })}
      {li < arr.length - 1 && <br />}
    </React.Fragment>
  ));
}
