import Icon from "@/components/Icon";
import { renderMarkedText } from "@/components/Heading";
import { PrimaryBtn, SecondaryBtn, accent, type Cta } from "./util";
import type { Json } from "@/lib/types";

/** Full-screen animated home hero with trust chips */
export function HeroHome({ content }: { content: Json }) {
  const c = content as {
    title?: string;
    subtitle?: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
    chips?: { icon?: string; label?: string; color?: string }[];
  };
  return (
    <section className="hero-bg min-h-screen flex items-center pt-16 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 -mt-[var(--header-h)]">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="geometric-shape shape-circle hidden sm:block" />
      <div className="geometric-shape shape-square hidden sm:block" />

      <div className="absolute bottom-20 right-10 lg:bottom-32 lg:right-24 pointer-events-none z-10 hidden md:flex gap-8 items-center opacity-70">
        <div className="decor-circle w-16 h-16 border border-[#0297C7]/40 rounded-full" />
        <div className="decor-cross w-12 h-12 relative flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-[#ED3B17]/40" />
          <div className="absolute h-full w-[1px] bg-[#ED3B17]/40" />
        </div>
        <div className="decor-dots grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#FCD727]/40 rounded-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10 pt-24">
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-white mb-6 stagger-1 tracking-tight leading-[1.1] font-extrabold">
            {renderMarkedText(c.title)}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 stagger-2 max-w-2xl leading-relaxed">
            {c.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 stagger-3">
            <PrimaryBtn cta={c.primaryCta} className="w-full sm:w-auto text-base sm:text-lg" />
            {c.secondaryCta?.label && (
              <SecondaryBtn
                cta={c.secondaryCta}
                className="w-full sm:w-auto text-base sm:text-lg bg-[#0a0a0a]/50 backdrop-blur-sm"
              />
            )}
          </div>
        </div>
        {!!c.chips?.length && (
          <div className="mt-12 sm:mt-16 md:mt-24 flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center sm:items-start stagger-4">
            {c.chips.map((chip, i) => (
              <div
                key={i}
                className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-3 px-6 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-medium text-xs sm:text-sm shadow-[0_4px_15px_rgba(0,0,0,0.2)] uppercase"
              >
                <Icon name={chip.icon} className={`w-5 h-5 ${accent(chip.color).text}`} />
                {chip.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** Dark gradient page hero: badge, title, subtitle, CTAs, optional stat chips */
export function HeroPage({ content }: { content: Json }) {
  const c = content as {
    badge?: { icon?: string; label?: string };
    title?: string;
    subtitle?: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
    stats?: { icon?: string; color?: string; value?: string; label?: string }[];
    align?: "left" | "center";
    minHeight?: string;
  };
  const center = c.align === "center";
  return (
    <section
      className={`hero-bg pt-16 pb-16 md:pb-24 px-4 sm:px-6 relative -mt-[var(--header-h)] ${
        c.minHeight === "screen" ? "min-h-screen flex items-center" : ""
      }`}
    >
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className={`container mx-auto relative z-10 pt-28 md:pt-36 ${center ? "text-center" : ""}`}>
        <div className={`max-w-4xl ${center ? "mx-auto" : ""}`}>
          {c.badge?.label && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0297C7]/20 border border-[#0297C7]/30 rounded-full text-[#0297C7] text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 sm:mb-8 stagger-1">
              <Icon name={c.badge.icon} className="w-4 h-4" />
              {c.badge.label}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-white mb-6 stagger-1 tracking-tight leading-[1.1] font-extrabold">
            {renderMarkedText(c.title)}
          </h1>
          {c.subtitle && (
            <p
              className={`text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 stagger-2 max-w-2xl leading-relaxed ${
                center ? "mx-auto" : ""
              }`}
            >
              {c.subtitle}
            </p>
          )}
          {(c.primaryCta?.label || c.secondaryCta?.label) && (
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 stagger-3 ${
                center ? "justify-center" : ""
              }`}
            >
              <PrimaryBtn cta={c.primaryCta} className="w-full sm:w-auto text-base sm:text-lg" />
              <SecondaryBtn
                cta={c.secondaryCta}
                variant="white"
                className="w-full sm:w-auto text-base sm:text-lg"
              />
            </div>
          )}
        </div>
        {!!c.stats?.length && (
          <div className={`mt-12 sm:mt-16 flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10 stagger-4 ${center ? "justify-center" : ""}`}>
            {c.stats.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 shrink-0 rounded-full ${accent(s.color).bg20} flex items-center justify-center ${accent(s.color).text}`}
                >
                  <Icon name={s.icon} className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg leading-tight">{s.value}</div>
                  <div className="text-white/60 text-sm">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
