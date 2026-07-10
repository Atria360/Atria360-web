import Icon from "@/components/Icon";
import { renderMarkedText } from "@/components/Heading";
import { PrimaryBtn, SecondaryBtn, SectionHeading, THEME_BG, accent, isDark } from "./util";
import type { Cta } from "./util";
import { Quote, Star } from "lucide-react";
import type { Json } from "@/lib/types";

/** Full-width CTA banner with orange side bar */
export function CtaBanner({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
    theme?: string;
    barColor?: string;
  };
  const bg = c.theme === "black" ? "bg-[#0a0a0a]" : "bg-[#004F57]";
  const bar = c.barColor === "cyan" ? "bg-[#0297C7] shadow-[5px_0_30px_rgba(2,151,199,0.5)]" : "bg-[#ED3B17] shadow-[5px_0_30px_rgba(237,59,23,0.5)]";
  return (
    <section className={`py-16 sm:py-20 md:py-24 ${bg} text-white px-4 sm:px-6 relative overflow-hidden`}>
      <div className={`absolute left-0 top-0 bottom-0 w-3 sm:w-4 ${bar}`} />
      <div className="container mx-auto max-w-4xl text-center reveal-item">
        <h2 className="text-3xl sm:text-4xl lg:text-[56px] mb-6 sm:mb-8 leading-tight font-extrabold text-white tracking-tight">
          {renderMarkedText(c.heading)}
        </h2>
        {c.sub && (
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-10 sm:mb-12 max-w-2xl mx-auto">
            {c.sub}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <PrimaryBtn cta={c.primaryCta} className="w-full sm:w-auto text-base sm:text-xl" />
          <SecondaryBtn cta={c.secondaryCta} variant="white" className="w-full sm:w-auto text-base sm:text-xl" />
        </div>
      </div>
    </section>
  );
}

/** Metric/stat cards */
export function StatsBar({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    theme?: string;
    stats?: { icon?: string; value?: string; suffix?: string; label?: string; desc?: string; color?: string }[];
  };
  const dark = isDark(c.theme);
  const cols = (c.stats?.length ?? 4) === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "black"]}`}>
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
        <div className={`grid grid-cols-1 ${cols} gap-6 sm:gap-8`}>
          {(c.stats ?? []).map((s, i) => {
            const a = accent(s.color);
            return (
              <div
                key={i}
                className={`p-8 sm:p-10 rounded-[32px] text-center relative overflow-hidden reveal-item ${
                  dark
                    ? "bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-gray-800 hover:border-gray-700"
                    : "bg-white border border-gray-100 shadow-sm"
                } transition-all`}
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 ${a.bg10} rounded-full blur-2xl`} />
                {s.icon && (
                  <div className={`w-12 h-12 mx-auto rounded-full ${a.bg10} flex items-center justify-center mb-4 ${a.text}`}>
                    <Icon name={s.icon} className="w-6 h-6" />
                  </div>
                )}
                {s.label && (
                  <h4 className={`${a.text} font-bold text-xs sm:text-sm uppercase tracking-widest mb-4`}>
                    {s.label}
                  </h4>
                )}
                <div className={`text-5xl sm:text-6xl font-extrabold font-header ${dark ? "text-white" : "text-primary"}`}>
                  {s.value}
                  {s.suffix && <span className={`text-2xl ml-1 ${a.text}`}>{s.suffix}</span>}
                </div>
                {s.desc && <p className={`mt-4 text-sm sm:text-base ${dark ? "text-gray-400" : "text-gray-500"}`}>{s.desc}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Numbered process steps */
export function ProcessSteps({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    theme?: string;
    steps?: {
      icon?: string;
      color?: string;
      title?: string;
      text?: string;
      timeline?: string;
      deliverable?: string;
    }[];
  };
  const dark = isDark(c.theme);
  const n = c.steps?.length ?? 4;
  const cols =
    n <= 3 ? "md:grid-cols-3" : n === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
  return (
    <section className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
        <div className={`grid grid-cols-1 ${cols} gap-6 sm:gap-8`}>
          {(c.steps ?? []).map((s, i) => {
            const a = accent(s.color, ["orange", "cyan", "gold", "teal"][i % 4]);
            return (
              <div
                key={i}
                className={`relative p-6 sm:p-8 rounded-[24px] text-center flex flex-col items-center reveal-item ${
                  dark ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-100"
                }`}
              >
                <div className={`w-16 h-16 ${a.bg10} ${a.text} rounded-full flex items-center justify-center text-2xl font-bold font-header mb-6`}>
                  {s.icon ? <Icon name={s.icon} className="w-7 h-7" /> : i + 1}
                </div>
                <h4 className={`text-xl font-bold mb-3 ${dark ? "text-white" : "text-primary"}`}>{s.title}</h4>
                <p className={`text-sm sm:text-base leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  {s.text}
                </p>
                {s.timeline && (
                  <div className={`mt-4 text-xs font-bold uppercase tracking-widest ${a.text}`}>{s.timeline}</div>
                )}
                {s.deliverable && (
                  <div className={`mt-2 text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    Deliverable: {s.deliverable}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Vertical timeline (about journey, press milestones) */
export function Timeline({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    theme?: string;
    items?: { year?: string; title?: string; text?: string; color?: string }[];
  };
  const dark = isDark(c.theme);
  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 overflow-hidden ${THEME_BG[c.theme ?? "black"]}`}>
      <div className="container mx-auto max-w-4xl">
        <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
        <div className="relative">
          <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full ${dark ? "bg-secondary/30" : "bg-secondary/20"}`} />
          <div className="space-y-12">
            {(c.items ?? []).map((item, i) => {
              const a = accent(item.color, ["cyan", "orange", "gold", "teal"][i % 4]);
              const right = i % 2 === 1;
              return (
                <div key={i} className="relative pl-16 md:pl-0 reveal-item">
                  <div
                    className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm z-10 text-white ${
                      item.color === "gold" ? "bg-highlight !text-primary" : item.color === "orange" ? "bg-accent" : item.color === "teal" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {item.year}
                  </div>
                  <div className={`md:w-[calc(50%-3rem)] ${right ? "md:ml-auto md:text-left" : "md:text-right"}`}>
                    <h4 className={`text-xl sm:text-2xl font-bold mb-2 ${dark ? "text-white" : "text-primary"}`}>
                      {item.title}
                    </h4>
                    <p className={dark ? "text-gray-400" : "text-gray-500"}>{item.text}</p>
                    <div className={`mt-2 text-xs font-bold uppercase tracking-widest ${a.text}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Testimonial cards (quotes, ratings, badges) or single large quote */
export function Testimonials({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    theme?: string;
    layout?: "grid" | "single";
    quotes?: {
      badge?: string;
      badgeColor?: string;
      quote?: string;
      metric?: string;
      metricNote?: string;
      name?: string;
      role?: string;
      initials?: string;
      image?: string;
      stars?: boolean;
      color?: string;
    }[];
  };
  const dark = isDark(c.theme);

  if (c.layout === "single" && c.quotes?.[0]) {
    const q = c.quotes[0];
    return (
      <section className={`py-16 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "black"]}`}>
        <div className="container mx-auto max-w-4xl text-center">
          <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-secondary/20 mx-auto mb-6 sm:mb-8" />
          <blockquote className={`text-2xl sm:text-3xl font-medium leading-relaxed mb-10 ${dark ? "text-white" : "text-primary"}`}>
            &ldquo;{q.quote}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            {q.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={q.image} alt={q.name ?? ""} className="w-14 h-14 rounded-full object-cover" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {q.initials}
              </div>
            )}
            <div className="text-left">
              <div className={`font-bold ${dark ? "text-white" : "text-primary"}`}>{q.name}</div>
              <div className={dark ? "text-gray-400" : "text-gray-500"}>{q.role}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "black"]}`}>
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8`}>
          {(c.quotes ?? []).map((q, i) => {
            const a = accent(q.badgeColor ?? q.color, ["cyan", "orange", "gold"][i % 3]);
            return (
              <div
                key={i}
                className={`p-8 sm:p-10 rounded-[32px] flex flex-col reveal-item ${
                  dark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-100 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  {q.badge && (
                    <span className={`px-3 py-1 ${a.bg20} ${a.text} text-xs font-bold rounded uppercase`}>
                      {q.badge}
                    </span>
                  )}
                  {q.stars && (
                    <div className="flex gap-1 text-highlight">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  )}
                  {!q.badge && !q.stars && <Quote className="w-8 h-8 text-white/20" />}
                </div>
                <p className={`text-base sm:text-lg leading-relaxed flex-1 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                  &ldquo;{q.quote}&rdquo;
                </p>
                {q.metric && (
                  <div className={`mt-6 p-4 rounded-xl ${a.bg10} flex items-center justify-between`}>
                    <span className={`font-bold ${a.text}`}>{q.metric}</span>
                    <span className={`text-xs uppercase tracking-wider ${dark ? "text-gray-400" : "text-gray-500"}`}>
                      {q.metricNote}
                    </span>
                  </div>
                )}
                {(q.name || q.initials) && (
                  <div className="mt-6 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${["bg-primary", "bg-secondary", "bg-accent"][i % 3]}`}>
                      {q.initials}
                    </div>
                    <div>
                      <div className={`font-bold ${dark ? "text-white" : "text-primary"}`}>{q.name}</div>
                      <div className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{q.role}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Founder / team member cards */
export function TeamCards({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    members?: { name?: string; role?: string; bio?: string; image?: string; linkedin?: string }[];
  };
  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a] px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} center dark />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {(c.members ?? []).map((m, i) => (
            <div
              key={i}
              className="hover-card bg-[#222] p-6 sm:p-8 md:p-10 rounded-[24px] md:rounded-[32px] border border-white/5 flex flex-col items-center text-center reveal-item"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-6 border-2 border-secondary/40">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt={m.name ?? ""} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
                    {(m.name ?? "?").charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">{m.name}</h3>
              <div className="text-secondary font-semibold mb-4">{m.role}</div>
              <p className="text-gray-400 leading-relaxed">{m.bio}</p>
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noreferrer" className="mt-6 text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Icon name="linkedin" className="w-6 h-6" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Free-form rich text (renders trusted CMS HTML) */
export function RichText({ content }: { content: Json }) {
  const c = content as { heading?: string; html?: string; theme?: string };
  const dark = isDark(c.theme);
  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
      <div className="container mx-auto max-w-4xl">
        {c.heading && (
          <h2 className={`text-3xl sm:text-4xl mb-8 ${dark ? "text-white" : "text-primary"}`}>
            {renderMarkedText(c.heading)}
          </h2>
        )}
        {/* Content is authored by trusted CMS admins */}
        <div className="prose-atria" dangerouslySetInnerHTML={{ __html: c.html ?? "" }} />
      </div>
    </section>
  );
}
