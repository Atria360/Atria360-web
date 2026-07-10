import Link from "next/link";
import Icon from "@/components/Icon";
import { renderMarkedText } from "@/components/Heading";
import {
  ArrowLink,
  SectionHeading,
  THEME_BG,
  accent,
  isDark,
  type Cta,
} from "./util";
import { ArrowRight, Check } from "lucide-react";
import type { Json } from "@/lib/types";

/**
 * The universal icon-card grid. Covers feature cards, problem cards, value cards,
 * benefit cards, solution cards, awards, pain points, "why us" grids, etc.
 */
export function IconCards({ content }: { content: Json }) {
  const c = content as {
    kicker?: string;
    heading?: string;
    sub?: string;
    center?: boolean;
    theme?: string;
    columns?: number;
    style?: "accent-left" | "accent-top" | "glow" | "plain" | "centered" | "row";
    cards?: {
      icon?: string;
      color?: string;
      title?: string;
      text?: string;
      checks?: string[];
      link?: Cta;
      label?: string;
      subtext?: string;
    }[];
  };
  const dark = isDark(c.theme);
  const cols =
    { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4", 5: "sm:grid-cols-2 lg:grid-cols-5" }[
      c.columns ?? 3
    ] ?? "md:grid-cols-2 lg:grid-cols-3";
  const cardBase = dark
    ? "bg-[#222] border border-white/5"
    : "bg-white border border-gray-100";
  const cardBg = c.theme === "black" ? "bg-white/5 border border-white/10" : cardBase;

  return (
    <section className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
      <div className="container mx-auto">
        <SectionHeading kicker={c.kicker} heading={c.heading} sub={c.sub} center={c.center} dark={dark} />
        <div className={`grid grid-cols-1 ${cols} gap-6 sm:gap-8`}>
          {(c.cards ?? []).map((card, i) => {
            const a = accent(card.color);
            const styleCls =
              c.style === "accent-left"
                ? `border-l-4 ${a.borderL}`
                : c.style === "accent-top"
                  ? `border-t-4 ${a.borderT}`
                  : c.style === "glow"
                    ? `card-glow-${card.color === "orange" ? "orange" : card.color === "gold" ? "gold" : "cyan"}`
                    : "";
            return (
              <div
                key={i}
                className={`reveal-item hover-card p-6 sm:p-8 rounded-[24px] ${cardBg} ${styleCls} ${
                  c.style === "centered" ? "text-center flex flex-col items-center" : ""
                } ${c.style === "row" ? "flex flex-col sm:flex-row gap-4 sm:gap-6 items-start" : ""}`}
              >
                {card.icon && (
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 ${a.bg10} rounded-2xl flex items-center justify-center mb-6 shrink-0 ${a.text}`}
                  >
                    <Icon name={card.icon} className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                )}
                <div className="flex-1">
                  {card.label && (
                    <div className={`${a.text} font-bold text-xs uppercase tracking-widest mb-3`}>
                      {card.label}
                    </div>
                  )}
                  <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${dark ? "text-white" : "text-primary"}`}>
                    {card.title}
                  </h3>
                  {card.text && (
                    <p className={`${dark ? "text-gray-400" : "text-gray-500"} leading-relaxed`}>
                      {card.text}
                    </p>
                  )}
                  {!!card.checks?.length && (
                    <ul className="mt-5 space-y-2.5">
                      {card.checks.map((ch, j) => (
                        <li key={j} className={`flex items-start gap-2 text-sm sm:text-base ${dark ? "text-gray-300" : "text-gray-600"}`}>
                          <Check className={`w-5 h-5 mt-0.5 shrink-0 ${a.text}`} />
                          {ch}
                        </li>
                      ))}
                    </ul>
                  )}
                  {card.subtext && (
                    <div className={`mt-5 text-sm font-semibold ${a.text}`}>{card.subtext}</div>
                  )}
                  {card.link?.label && (
                    <div className="mt-6">
                      <ArrowLink cta={card.link} className={a.text} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Horizontal snap-scroll gradient service cards (home page pillars) */
export function CardCarousel({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    cards?: { icon?: string; title?: string; text?: string; link?: Cta; gradient?: number }[];
  };
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#1a1a1a] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] mb-4 sm:mb-6 text-white">
            {renderMarkedText(c.heading)}
          </h2>
          {c.sub && <p className="text-base sm:text-lg text-gray-400">{c.sub}</p>}
        </div>
      </div>
      <div className="flex gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-12 pt-6 scroll-smooth no-scrollbar">
        {(c.cards ?? []).map((card, i) => (
          <div
            key={i}
            className={`service-card bg-grad-${(card.gradient ?? (i % 5) + 1)} rounded-[24px] p-6 sm:p-8 lg:p-10 flex flex-col min-h-[380px] sm:min-h-[420px] shadow-2xl w-[85vw] sm:w-auto shrink-0`}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-6 sm:mb-8 shadow-inner">
              <Icon name={card.icon} className="card-icon w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-2xl sm:text-[28px] font-bold text-white mb-3 sm:mb-4 leading-tight">
              {renderMarkedText(card.title)}
            </h3>
            <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 flex-1 leading-relaxed">
              {card.text}
            </p>
            {card.link?.label && (
              <Link
                href={card.link.href || "#"}
                className="mt-auto text-cyanbright font-bold text-base sm:text-lg flex items-center gap-2 hover:gap-4 transition-all duration-400"
              >
                {card.link.label} <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Big image product cards (home page "We build") */
export function ProductShowcase({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    products?: {
      badge?: string;
      badgeColor?: string;
      name?: string;
      image?: string;
      text?: string;
      link?: Cta;
    }[];
  };
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0a0a0a] px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[56px] mb-4 sm:mb-6 font-bold text-white">
            {renderMarkedText(c.heading)}
          </h2>
          {c.sub && <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">{c.sub}</p>}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {(c.products ?? []).map((p, i) => {
            const badgeBg = p.badgeColor === "cyan" ? "bg-[#0297C7]" : "bg-[#ED3B17]";
            const linkColor = p.badgeColor === "cyan" ? "text-accent" : "text-secondary";
            return (
              <div
                key={i}
                className="product-card group bg-[#1a1a1a] rounded-[24px] sm:rounded-[32px] overflow-hidden reveal-item"
              >
                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/40 to-transparent z-10" />
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.name ?? ""}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                    />
                  )}
                  <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 z-20">
                    <div
                      className={`${badgeBg} text-white px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded uppercase tracking-widest mb-2 sm:mb-4 inline-block`}
                    >
                      {p.badge}
                    </div>
                    <h3 className="text-3xl sm:text-[40px] font-extrabold text-white leading-none">
                      {p.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 sm:p-10">
                  <p className="text-gray-300 text-base sm:text-xl mb-6 sm:mb-10 leading-relaxed font-light">
                    {p.text}
                  </p>
                  <ArrowLink cta={p.link} className={`${linkColor} text-base sm:text-lg`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Big gradient industry cards (industries hub) */
export function IndustryCards({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    cards?: { icon?: string; title?: string; text?: string; linkLabel?: string; href?: string; gradient?: number }[];
  };
  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a] px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[56px] text-white font-bold mb-4 sm:mb-6">
            {renderMarkedText(c.heading)}
          </h2>
          {c.sub && <p className="text-base sm:text-lg text-gray-400">{c.sub}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {(c.cards ?? []).map((card, i) => (
            <Link
              key={i}
              href={card.href || "#"}
              className={`group service-card bg-grad-${card.gradient ?? (i % 5) + 1} rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col min-h-[380px] reveal-item`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-6 sm:mb-8">
                <Icon name={card.icon} className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white mb-4 leading-tight">
                {card.title}
              </h3>
              <p className="text-white/80 mb-8 flex-1 leading-relaxed">{card.text}</p>
              <span className="mt-auto text-white font-bold text-lg flex items-center gap-2">
                {card.linkLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Home page industries link list */
export function IndustryLinks({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    link?: Cta;
    industries?: { label?: string; href?: string }[];
  };
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0a0a0a] text-white px-4 sm:px-6 relative overflow-hidden">
      <div className="corner-tl" />
      <div className="corner-br" />
      <div className="decor-line top-20 right-0 w-[200px] sm:w-[300px]" />
      <div
        className="decor-line bottom-20 left-0 w-[150px] sm:w-[200px]"
        style={{ background: "linear-gradient(90deg, transparent, #ED3B17, transparent)" }}
      />
      <div className="container mx-auto flex flex-col lg:flex-row gap-10 sm:gap-12 md:gap-20 items-center relative z-10">
        <div className="lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] mb-6 sm:mb-8 leading-[1.1] font-bold text-white tracking-tight">
            {renderMarkedText(c.heading)}
          </h2>
          {c.link?.label && (
            <Link
              href={c.link.href || "/industries"}
              className="inline-flex items-center gap-2 sm:gap-3 text-white font-bold text-lg sm:text-xl hover:text-highlight transition-colors duration-400 group"
            >
              <span className="border-b-2 border-transparent group-hover:border-highlight pb-1 transition-colors">
                {c.link.label}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-400" />
            </Link>
          )}
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="space-y-4 text-lg sm:text-xl md:text-2xl lg:text-[36px] font-bold">
            {(c.industries ?? []).map((ind, i) => (
              <Link
                key={i}
                href={ind.href || "#"}
                className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-5 sm:p-6 flex justify-between items-center group hover:bg-[#222] border border-white/5 hover:border-secondary transition-all duration-400 hover:shadow-[0_10px_30px_rgba(2,151,199,0.15)] hover:-translate-y-1 reveal-item"
              >
                <span className="text-white/80 group-hover:text-white transition-colors duration-300 font-header font-bold">
                  {ind.label}
                </span>
                <ArrowRight className="w-6 h-6 text-white/10 group-hover:text-cyanbright transition-all duration-300 group-hover:translate-x-2" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
