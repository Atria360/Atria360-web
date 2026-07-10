import BrandIcon from "@/components/BrandIcon";
import Icon from "@/components/Icon";
import Link from "next/link";
import { renderMarkedText } from "@/components/Heading";
import { SectionHeading, THEME_BG, accent, isDark, type Cta } from "./util";
import { Check, CheckCircle2, Minus, PlusCircle } from "lucide-react";
import type { Json } from "@/lib/types";

/** Pricing tier cards — light or dark theme */
export function PricingTiers({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    theme?: string;
    tiers?: {
      name?: string;
      desc?: string;
      price?: string;
      priceNote?: string;
      badge?: string;
      accent?: string;
      featured?: boolean;
      features?: string[];
      plusLabel?: string;
      cta?: Cta;
      ctaStyle?: "solid" | "outline";
      timeline?: string;
    }[];
  };
  const dark = isDark(c.theme);
  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden ${THEME_BG[c.theme ?? "gray"]}`}>
      {dark && (
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#ED3B17]/10 rounded-full blur-[120px] pointer-events-none" />
      )}
      <div className="container mx-auto relative z-10">
        <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
          {(c.tiers ?? []).map((t, i) => {
            const a = accent(t.accent, ["orange", "cyan", "gold"][i % 3]);
            const featured = !!t.featured;
            return (
              <div
                key={i}
                className={`relative rounded-[24px] p-6 sm:p-8 flex flex-col reveal-item ${
                  dark
                    ? featured
                      ? "bg-gradient-to-b from-[#1a2b2f] to-[#151515] border-2 border-secondary"
                      : "bg-[#151515] border border-white/10"
                    : `bg-white border border-gray-100 border-l-4 ${a.borderL} shadow-sm ${featured ? "shadow-xl md:-translate-y-2" : ""}`
                }`}
              >
                {t.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg whitespace-nowrap">
                    {t.badge}
                  </div>
                )}
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 mt-2 ${dark ? "text-white" : "text-primary"}`}>
                  {t.name}
                </h3>
                <p className={`text-sm mb-6 ${dark ? "text-gray-400" : "text-gray-500"}`}>{t.desc}</p>
                <div className="mb-8">
                  <div className={`text-3xl font-extrabold font-header ${dark ? "text-white" : "text-primary"}`}>
                    {t.price}
                  </div>
                  {t.priceNote && (
                    <div className={`text-xs mt-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>{t.priceNote}</div>
                  )}
                  {t.timeline && (
                    <div className={`text-xs mt-1 font-bold uppercase tracking-widest ${a.text}`}>
                      {t.timeline}
                    </div>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.plusLabel && (
                    <li className={`flex items-start gap-3 font-semibold ${dark ? "text-white" : "text-primary"}`}>
                      <PlusCircle className={`w-5 h-5 mt-0.5 shrink-0 ${a.text}`} />
                      {t.plusLabel}
                    </li>
                  )}
                  {(t.features ?? []).map((f, j) => (
                    <li key={j} className={`flex items-start gap-3 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${a.text}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                {t.cta?.label && (
                  <Link
                    href={t.cta.href || "/contact"}
                    className={`w-full min-h-[48px] py-4 rounded-xl font-bold text-center transition-all inline-flex justify-center items-center ${
                      t.ctaStyle === "outline"
                        ? dark
                          ? "border border-white/20 text-white hover:bg-white/10"
                          : `bg-white border-2 ${a.border} ${a.text} hover:bg-gray-50`
                        : featured && dark
                          ? "bg-secondary text-white hover:bg-cyanbright hover:shadow-[0_0_20px_rgba(2,151,199,0.5)]"
                          : "bg-accent text-white hover:shadow-[0_0_20px_rgba(237,59,23,0.4)] hover:scale-[1.02]"
                    }`}
                  >
                    {t.cta.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Feature comparison table (pricing page) */
export function ComparisonTable({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    columns?: string[];
    groups?: { name?: string; rows?: { label?: string; values?: string[] }[] }[];
  };
  const colColors = ["text-white", "text-[#0297C7]", "text-[#FCD727]"];
  const renderCell = (v: string | undefined, key: number) => {
    if (v === "yes")
      return <Check key={key} className="w-5 h-5 text-green-500" />;
    if (v === "no") return <Minus key={key} className="w-5 h-5 text-gray-600" />;
    return <span key={key}>{v}</span>;
  };
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading heading={c.heading} sub={c.sub} center dark />
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 sm:py-6 px-4 w-1/4" />
                {(c.columns ?? []).map((col, i) => (
                  <th key={i} className={`py-4 sm:py-6 px-4 w-1/4 text-lg sm:text-xl font-bold ${colColors[i % 3]}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(c.groups ?? []).map((g, gi) => (
                <>
                  <tr key={`g${gi}`} className="bg-white/5">
                    <td colSpan={(c.columns?.length ?? 3) + 1} className="py-3 px-4 font-bold text-white uppercase tracking-widest text-xs">
                      {g.name}
                    </td>
                  </tr>
                  {(g.rows ?? []).map((r, ri) => (
                    <tr key={`g${gi}r${ri}`} className="border-b border-white/5">
                      <td className="py-4 px-4 font-medium text-white">{r.label}</td>
                      {(r.values ?? []).map((v, vi) => (
                        <td key={vi} className="py-4 px-4 text-gray-400">
                          {renderCell(v, vi)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/** Logo / partner / tech grids driven by iconify brand icons */
export function LogoGrid({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    theme?: string;
    layout?: "strip" | "cards" | "labeled";
    footnote?: string;
    items?: { icon?: string; name?: string; text?: string; category?: string }[];
  };
  const dark = isDark(c.theme);

  if (c.layout === "cards") {
    return (
      <section className={`py-16 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
        <div className="container mx-auto">
          <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {(c.items ?? []).map((item, i) => (
              <div
                key={i}
                className={`hover-card p-6 sm:p-8 rounded-[24px] reveal-item ${
                  dark ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-100"
                }`}
              >
                <BrandIcon name={item.icon} className="text-6xl mb-6" />
                <h3 className={`text-xl font-bold mb-3 ${dark ? "text-white" : "text-primary"}`}>{item.name}</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>{item.text}</p>
              </div>
            ))}
          </div>
          {c.footnote && (
            <p className={`text-center mt-10 max-w-2xl mx-auto ${dark ? "text-gray-400" : "text-gray-500"}`}>{c.footnote}</p>
          )}
        </div>
      </section>
    );
  }

  if (c.layout === "labeled") {
    return (
      <section className={`py-16 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
        <div className="container mx-auto">
          <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
            {(c.items ?? []).map((item, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center gap-4 w-full h-[120px] p-4 rounded-2xl transition-colors ${
                  dark ? "hover:bg-white/5" : "hover:bg-gray-50"
                }`}
              >
                <BrandIcon name={item.icon} className="text-5xl sm:text-6xl" />
                <span className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  {item.category}
                </span>
              </div>
            ))}
          </div>
          {c.footnote && (
            <p className={`text-center mt-10 max-w-2xl mx-auto ${dark ? "text-gray-400" : "text-gray-500"}`}>{c.footnote}</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 text-center ${THEME_BG[c.theme ?? "teal"]}`}>
      <div className="container mx-auto">
        {c.heading && (
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12 reveal-item ${dark ? "text-white" : "text-primary"}`}>
            {renderMarkedText(c.heading)}
          </h2>
        )}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
          {(c.items ?? []).map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <BrandIcon
                name={item.icon}
                className="text-4xl sm:text-5xl md:text-6xl grayscale hover:grayscale-0 transition-all duration-300"
              />
              {item.name && <span className={`text-xs ${dark ? "text-white/60" : "text-gray-500"}`}>{item.name}</span>}
            </div>
          ))}
        </div>
        {c.footnote && <p className={`mt-10 max-w-2xl mx-auto ${dark ? "text-white/70" : "text-gray-500"}`}>{c.footnote}</p>}
      </div>
    </section>
  );
}

/** Compliance/trust badge strip (enterprise) */
export function BadgeStrip({ content }: { content: Json }) {
  const c = content as { items?: { icon?: string; label?: string }[] };
  return (
    <section className="bg-[#06181A] border-y border-white/10 py-6 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto flex flex-wrap justify-center gap-8 sm:gap-14">
        {(c.items ?? []).map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-white/80 font-bold text-xs sm:text-sm tracking-widest">
            <Icon name={item.icon} className="w-6 h-6 text-secondary" />
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Case studies with images + challenge/solution/result (services) */
export function CaseStudies({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    cases?: {
      image?: string;
      badge?: string;
      badgeColor?: string;
      title?: string;
      challenge?: string;
      solution?: string;
      result?: string;
    }[];
  };
  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} center />
        <div className="space-y-16 md:space-y-24">
          {(c.cases ?? []).map((cs, i) => {
            const a = accent(cs.badgeColor, i % 2 === 0 ? "cyan" : "orange");
            return (
              <div
                key={i}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center reveal-item ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2 w-full">
                  <div className="rounded-[24px] overflow-hidden aspect-[4/3] bg-gray-100">
                    {cs.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cs.image} alt={cs.title ?? ""} className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className={`inline-block px-4 py-1.5 ${a.bg10} ${a.text} font-bold text-xs sm:text-sm rounded-full mb-4 sm:mb-6`}>
                    {cs.badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4">{cs.title}</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      <strong className="text-primary">The Challenge: </strong>
                      {cs.challenge}
                    </p>
                    <p>
                      <strong className="text-primary">The Solution: </strong>
                      {cs.solution}
                    </p>
                    <p>
                      <strong className="text-primary">The Result: </strong>
                      {cs.result}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Key/value spec panels (enterprise technical specifications) */
export function SpecPanels({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    link?: Cta;
    panels?: { icon?: string; title?: string; rows?: { label?: string; value?: string }[] }[];
  };
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              {renderMarkedText(c.heading)}
            </h2>
            {c.sub && <p className="text-gray-400">{c.sub}</p>}
          </div>
          {c.link?.label && (
            <Link href={c.link.href || "#"} className="text-secondary hover:text-white font-bold mt-4 md:mt-0 transition-colors">
              {c.link.label} →
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {(c.panels ?? []).map((p, i) => (
            <div key={i} className="bg-[#0f0f0f] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon name={p.icon} className="w-6 h-6 text-secondary" />
                <h4 className="font-bold text-white text-lg">{p.title}</h4>
              </div>
              <dl className="space-y-3">
                {(p.rows ?? []).map((r, j) => (
                  <div key={j} className="flex justify-between gap-4 border-b border-white/5 pb-3">
                    <dt className="text-gray-400">{r.label}</dt>
                    <dd className="font-mono text-sm text-white text-right">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
