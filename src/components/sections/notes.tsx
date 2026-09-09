import { Info } from "lucide-react";
import Icon from "@/components/Icon";
import type { Json } from "@/lib/types";
import { THEME_BG } from "./util";

type Note = { heading?: string; icon?: string; notes?: string[]; tone?: string; theme?: string };

const TONE: Record<string, { border: string; bg: string; icon: string }> = {
  neutral: { border: "border-gray-200", bg: "bg-gray-50", icon: "text-gray-500" },
  info: { border: "border-[#0297C7]/30", bg: "bg-[#0297C7]/5", icon: "text-[#0297C7]" },
  warning: { border: "border-[#FCD727]/50", bg: "bg-[#FCD727]/10", icon: "text-[#ED3B17]" },
};

export function NoteBlock({ content }: { content: Json }) {
  const c = content as Note;
  const notes = (c.notes ?? []).filter(Boolean);
  if (!notes.length && !c.heading) return null;

  const tone = TONE[c.tone ?? "neutral"] ?? TONE.neutral;

  return (
    <section className={`${THEME_BG[c.theme ?? "white"] ?? "bg-white"} py-10 sm:py-14`}>
      <div className="container mx-auto px-6">
        <div className={`max-w-4xl mx-auto rounded-xl border ${tone.border} ${tone.bg} p-5 sm:p-7`}>
          <div className="flex gap-4">
            <div className={`shrink-0 mt-0.5 ${tone.icon}`}>
              {c.icon ? <Icon name={c.icon} className="w-5 h-5" /> : <Info className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              {c.heading && (
                <h3 className="font-header font-bold text-primary text-base sm:text-lg mb-2">
                  {c.heading}
                </h3>
              )}
              <div className="space-y-2">
                {notes.map((n, i) => (
                  <p key={i} className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                    {n}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
