import Icon from "@/components/Icon";
import { renderMarkedText } from "@/components/Heading";
import {
  ArrowLink,
  PrimaryBtn,
  SecondaryBtn,
  SectionHeading,
  THEME_BG,
  accent,
  isDark,
  type Cta,
} from "./util";
import { Check, CheckCircle2 } from "lucide-react";
import type { Json } from "@/lib/types";

/**
 * Two-column feature: heading + paragraphs + icon features/checklist on one side,
 * image or decorative card stack on the other.
 */
export function SplitFeature({ content }: { content: Json }) {
  const c = content as {
    kicker?: string;
    heading?: string;
    paragraphs?: string[];
    features?: { icon?: string; color?: string; title?: string; text?: string }[];
    link?: Cta;
    primaryCta?: Cta;
    secondaryCta?: Cta;
    visual?: "image" | "cards";
    image?: string;
    imageAlt?: string;
    imageOverlay?: { icon?: string; title?: string; text?: string };
    imageBadge?: { label?: string; sub?: string };
    reverse?: boolean;
    theme?: string;
  };
  const dark = isDark(c.theme);
  return (
    <section className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden ${THEME_BG[c.theme ?? "white"]}`}>
      <div
        className={`container mx-auto flex flex-col lg:flex-row items-center gap-10 sm:gap-16 ${
          c.reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="lg:w-1/2">
          {c.kicker && (
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">
              {c.kicker}
            </div>
          )}
          <h2 className={`text-3xl sm:text-4xl lg:text-[48px] mb-4 sm:mb-6 leading-tight ${dark ? "text-white" : "text-primary"}`}>
            {renderMarkedText(c.heading)}
          </h2>
          {(c.paragraphs ?? []).map((p, i) => (
            <p key={i} className={`text-base sm:text-lg mb-5 leading-relaxed max-w-xl ${dark ? "text-gray-400" : "text-gray-600"}`}>
              {p}
            </p>
          ))}
          {!!c.features?.length && (
            <div className="space-y-6 sm:space-y-8 mt-8">
              {c.features.map((f, i) => {
                const a = accent(f.color);
                return (
                  <div key={i} className="flex gap-4 sm:gap-5 items-start group">
                    <div
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-[20px] flex items-center justify-center border transition-colors ${
                        dark
                          ? `bg-white/5 border-white/10 ${a.text}`
                          : `bg-gray-50 border-gray-100 text-primary group-hover:${a.border}`
                      }`}
                    >
                      <Icon name={f.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg sm:text-xl mb-1 sm:mb-2 ${dark ? "text-white" : "text-primary"}`}>
                        {f.title}
                      </h4>
                      <p className={`text-sm sm:text-base leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
                        {f.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
            {c.link?.label && <ArrowLink cta={c.link} className="text-secondary text-base sm:text-lg" />}
            <PrimaryBtn cta={c.primaryCta} />
            <SecondaryBtn cta={c.secondaryCta} />
          </div>
        </div>

        <div className="lg:w-1/2 relative w-full max-w-lg mx-auto">
          {c.visual === "cards" ? (
            <div className="aspect-square bg-[#f9fafb] rounded-[24px] sm:rounded-[32px] border border-gray-200 overflow-hidden flex items-center justify-center p-6 sm:p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-highlight opacity-20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary opacity-20 rounded-full blur-2xl" />
              <div className="relative z-10 w-full">
                <div className="bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center gap-4 mb-4 sm:mb-6 -rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#0297C7]/10 rounded-full flex items-center justify-center text-secondary">
                    <Icon name="activity" className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 sm:h-2.5 bg-gray-100 rounded w-1/3 mb-2 sm:mb-3" />
                    <div className="h-1.5 sm:h-2 bg-gray-50 rounded w-1/2" />
                  </div>
                </div>
                <div className="bg-primary shadow-[0_15px_35px_rgba(0,79,87,0.3)] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white translate-x-4 sm:translate-x-6 flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/10 rounded-full flex items-center justify-center">
                    <Icon name="cpu" className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] sm:text-xs font-bold tracking-widest text-white/80 mb-1 sm:mb-2">
                      SYSTEM SYNC
                    </div>
                    <div className="h-1.5 sm:h-2 bg-white/30 rounded w-1/2" />
                  </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center gap-4 rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#ED3B17]/10 rounded-full flex items-center justify-center text-accent">
                    <Icon name="check-circle" className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 sm:h-2.5 bg-gray-100 rounded w-2/3 mb-2 sm:mb-3" />
                    <div className="h-1.5 sm:h-2 bg-gray-50 rounded w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          ) : c.image ? (
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,79,87,0.15)] reveal-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.imageAlt ?? ""}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              {c.imageOverlay?.title && (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#004F57]/80 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <Icon name={c.imageOverlay.icon} className="w-8 h-8 text-highlight mb-3" />
                  <h4 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-white">
                    {c.imageOverlay.title}
                  </h4>
                  <p className="text-white/80 text-sm sm:text-base max-w-sm">{c.imageOverlay.text}</p>
                </div>
              )}
              {c.imageBadge?.label && (
                <div className="absolute bottom-6 right-6 bg-accent text-white rounded-xl px-5 py-3 shadow-xl">
                  <div className="text-2xl font-extrabold leading-none">{c.imageBadge.label}</div>
                  <div className="text-xs uppercase tracking-wider opacity-90 mt-1">
                    {c.imageBadge.sub}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Numbered check-list groups (branding "What's included", healthcare pillars) */
export function ChecklistGroups({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    theme?: string;
    layout?: "rows" | "pillars";
    groups?: {
      kicker?: string;
      title?: string;
      text?: string;
      icon?: string;
      color?: string;
      checks?: string[];
    }[];
  };
  const dark = isDark(c.theme);

  if (c.layout === "pillars") {
    return (
      <section className={`py-16 sm:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
        <div className="container mx-auto">
          <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {(c.groups ?? []).map((g, i) => {
              const a = accent(g.color, i === 0 ? "teal" : "cyan");
              return (
                <div
                  key={i}
                  className={`rounded-[32px] p-8 md:p-12 border relative overflow-hidden reveal-item group ${
                    i === 0 ? "bg-gray-50 border-gray-100" : "bg-blue-50/50 border-blue-100"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 ${a.bg10} rounded-full blur-3xl -mr-20 -mt-20`} />
                  <div
                    className={`w-16 h-16 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg relative z-10 ${
                      g.color === "cyan" ? "bg-secondary" : "bg-primary"
                    }`}
                  >
                    <Icon name={g.icon} className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary relative z-10">
                    {renderMarkedText(g.title)}
                  </h3>
                  {g.text && <p className="text-gray-600 mb-8 relative z-10">{g.text}</p>}
                  <ul className="space-y-4 relative z-10">
                    {(g.checks ?? []).map((ch, j) => (
                      <li key={j} className="flex items-start gap-4 text-gray-700 font-medium">
                        <CheckCircle2 className={`w-5 h-5 mt-1 shrink-0 ${a.text}`} />
                        {ch}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeading heading={c.heading} sub={c.sub} dark={dark} />
        <div className="space-y-12 md:space-y-16">
          {(c.groups ?? []).map((g, i) => {
            const a = accent(g.color);
            return (
              <div key={i} className="flex flex-col lg:flex-row gap-6 lg:gap-12 border-t border-gray-100 pt-10 reveal-item">
                <div className="lg:w-1/3">
                  <h3 className="text-primary mb-3 uppercase tracking-widest text-sm font-bold">
                    {g.kicker}
                  </h3>
                  <div className="text-2xl font-bold text-primary font-header mb-2">{g.title}</div>
                  {g.text && <p className="text-gray-500">{g.text}</p>}
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {(g.checks ?? []).map((ch, j) => (
                    <div key={j} className="flex items-center gap-3 text-gray-700 font-medium">
                      <Check className={`w-5 h-5 shrink-0 ${a.text}`} />
                      {ch}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Product deep dive (products page Punch/DOMS) */
export function ProductDetail({ content }: { content: Json }) {
  const c = content as {
    badge?: { icon?: string; label?: string };
    color?: string;
    name?: string;
    text?: string;
    features?: string[];
    idealFor?: string;
    primaryCta?: Cta;
    docsLink?: Cta;
    image?: string;
    reverse?: boolean;
    theme?: string;
  };
  const a = accent(c.color, "orange");
  return (
    <section className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
      <div
        className={`container mx-auto flex flex-col lg:flex-row items-center gap-10 sm:gap-16 ${
          c.reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="lg:w-1/2">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 ${a.bg10} ${a.text} rounded-full text-xs font-bold uppercase tracking-widest mb-6`}>
            <Icon name={c.badge?.icon} className="w-4 h-4" />
            {c.badge?.label}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-primary">{c.name}</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">{c.text}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {(c.features ?? []).map((f, i) => (
              <div key={i} className="flex items-center gap-3 font-semibold text-gray-700">
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${a.text}`} />
                {f}
              </div>
            ))}
          </div>
          {c.idealFor && (
            <div className="mb-10 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Ideal For
              </div>
              <div className="font-semibold text-primary">{c.idealFor}</div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            {c.primaryCta?.label && (
              <PrimaryBtn
                cta={c.primaryCta}
                className={`!px-8 !py-4 ${c.color === "cyan" ? "!bg-secondary" : ""}`}
              />
            )}
            {c.docsLink?.label && (
              <ArrowLink cta={c.docsLink} className={c.color === "cyan" ? "text-accent" : "text-secondary"} />
            )}
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="product-card rounded-[32px] overflow-hidden bg-gray-100 border border-gray-200 shadow-xl group">
            {c.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.image}
                alt={`${c.name} interface`}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Split black/teal Mission & Vision panels */
export function MissionVision({ content }: { content: Json }) {
  const c = content as {
    panels?: { title?: string; titleColor?: string; text?: string; bg?: string }[];
  };
  return (
    <section className="flex flex-col lg:flex-row min-h-[400px]">
      {(c.panels ?? []).map((p, i) => (
        <div
          key={i}
          className={`flex-1 p-8 sm:p-12 lg:p-24 text-white ${p.bg === "teal" ? "bg-[#004F57]" : "bg-[#0a0a0a]"}`}
        >
          <h3 className={`text-3xl sm:text-4xl lg:text-[48px] font-bold mb-6 md:mb-8 ${accent(p.titleColor).text}`}>
            {p.title}
          </h3>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">{p.text}</p>
        </div>
      ))}
    </section>
  );
}

/** Image tiles with caption overlay (about culture) */
export function ImageTiles({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    tiles?: { image?: string; caption?: string }[];
  };
  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(c.tiles ?? []).map((t, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square reveal-item">
              {t.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.image}
                  alt={t.caption ?? ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-lg">{t.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
