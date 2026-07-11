import Link from "next/link";
import Icon from "@/components/Icon";
import { renderMarkedText } from "@/components/Heading";
import { SectionHeading, THEME_BG, accent, isDark, type Cta } from "./util";
import { ArrowRight, Clock, Download, Mail, MapPin, Phone, Star } from "lucide-react";
import { getBlogPosts } from "@/lib/cms";
import type { BlogPost, Json } from "@/lib/types";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const CAT_BADGES: Record<string, string> = {
  Operations: "bg-[#ED3B17]/10 text-[#ED3B17]",
  Technology: "bg-[#0297C7] text-white",
  Healthcare: "bg-[#0297C7] text-white",
  Automation: "bg-[#FCD727] text-[#004F57]",
  "Company News": "bg-[#004F57] text-white",
};

/** Dynamic blog grid pulling published posts from Supabase */
export async function BlogGrid({ content }: { content: Json }) {
  const c = content as {
    showFeatured?: boolean;
    featuredLabel?: string;
    readLabel?: string;
    emptyText?: string;
  };
  const posts = await getBlogPosts();
  const featured = c.showFeatured !== false ? posts.find((p) => p.featured) : undefined;
  const rest = posts.filter((p) => p.id !== featured?.id);

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 bg-[#f9fafb]">
      <div className="container mx-auto">
        {featured && (
          <>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-8 flex items-center gap-2">
              <Star className="w-4 h-4" /> {c.featuredLabel ?? "Featured Article"}
            </h2>
            <Link
              href={`/blog/${featured.slug}`}
              className="block bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 lg:flex group transition-all duration-500 hover:shadow-2xl mb-16"
            >
              <div className="lg:w-3/5 relative overflow-hidden min-h-[240px]">
                {featured.cover_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.cover_image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#004F57]/40 to-transparent" />
              </div>
              <div className="lg:w-2/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center border-l-4 border-primary">
                <div className="flex items-center gap-4 mb-5">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${CAT_BADGES[featured.category ?? ""] ?? "bg-[#ED3B17]/10 text-[#ED3B17]"}`}>
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" /> {featured.read_minutes} min read
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4 sm:mb-6 leading-tight group-hover:text-secondary transition-colors">
                  {featured.title}
                </h3>
                <p className="text-gray-600 mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-primary">{featured.author}</span>
                    <span className="mx-2">·</span>
                    {fmtDate(featured.published_at)}
                  </div>
                  <span className="text-secondary font-bold flex items-center gap-2">
                    {c.readLabel ?? "Read Article"} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rest.map((p: BlogPost) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 group hover-card reveal-item block"
            >
              <div className="w-full aspect-video relative overflow-hidden">
                {p.cover_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.cover_image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg ${CAT_BADGES[p.category ?? ""] ?? "bg-[#0297C7] text-white"}`}>
                  {p.category}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 right-4 flex items-center gap-1.5 text-white text-xs">
                  <Clock className="w-3.5 h-3.5" /> {p.read_minutes} min read
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors leading-tight">
                  {p.title}
                </h3>
                <p className="text-gray-500 mb-5 text-sm sm:text-base">{p.excerpt}</p>
                <div className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-600">{p.author}</span>
                  <span className="mx-2">·</span>
                  {fmtDate(p.published_at)}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            {c.emptyText ?? "No articles published yet — check back soon."}
          </p>
        )}
      </div>
    </section>
  );
}

/** Featured press story: dark split with image */
export function PressFeatured({ content }: { content: Json }) {
  const c = content as {
    badge?: string;
    date?: string;
    title?: string;
    text?: string;
    cta?: Cta;
    image?: string;
  };
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white px-4 sm:px-6">
      <div className="container mx-auto flex flex-col lg:flex-row gap-10 items-center group">
        <div className="lg:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-[#0297C7]/20 text-secondary rounded-full text-xs font-bold uppercase tracking-wider">
              {c.badge}
            </span>
            <span className="text-gray-400 text-sm">{c.date}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            {renderMarkedText(c.title)}
          </h2>
          <p className="text-gray-400 text-lg mb-8">{c.text}</p>
          {c.cta?.label && (
            <Link
              href={c.cta.href || "#"}
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-accent text-white font-bold rounded-xl primary-btn"
            >
              {c.cta.label} <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
        <div className="lg:w-1/2 relative overflow-hidden rounded-[24px] aspect-video">
          {c.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={c.image}
              alt={c.title ?? ""}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/** News/announcement cards (press page) */
export function NewsCards({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    items?: { badge?: string; badgeColor?: string; title?: string; text?: string; date?: string; link?: Cta }[];
  };
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} dark />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(c.items ?? []).map((item, i) => {
            const a = accent(item.badgeColor, ["gold", "cyan", "orange"][i % 3]);
            return (
              <div
                key={i}
                className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col min-h-[300px] hover-card reveal-item group"
              >
                <span className={`self-start px-3 py-1 ${a.bg10} ${a.text} rounded-lg text-xs font-bold uppercase tracking-wider mb-6`}>
                  {item.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-4 leading-tight group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 flex-1">{item.text}</p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <span className="text-gray-500 text-sm">{item.date}</span>
                  {item.link?.label && (
                    <Link href={item.link.href || "#"} className="text-white group-hover:text-secondary transition-colors flex items-center gap-2 text-sm font-bold">
                      {item.link.label} <ArrowRight className="w-4 h-4" />
                    </Link>
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

/** Text-logo publication strip ("As Featured In") */
export function MediaLogos({ content }: { content: Json }) {
  const c = content as { heading?: string; sub?: string; names?: string[] };
  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6">
      <div className="container mx-auto text-center">
        <SectionHeading heading={c.heading} sub={c.sub} center />
        <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16">
          {(c.names ?? []).map((n, i) => (
            <span
              key={i}
              className="text-2xl sm:text-3xl font-extrabold font-header text-gray-300 hover:text-primary transition-colors cursor-default tracking-tight"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Press kit download columns */
export function PressKit({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    columns?: { title?: string; items?: { icon?: string; name?: string; meta?: string; href?: string }[] }[];
  };
  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100 px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(c.columns ?? []).map((col, i) => (
            <div key={i}>
              <h3 className="text-xl font-bold text-primary mb-6 border-b border-gray-200 pb-4">{col.title}</h3>
              <div className="space-y-4">
                {(col.items ?? []).map((item, j) => (
                  <a
                    key={j}
                    href={item.href || "#"}
                    className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:shadow-md hover:border-secondary hover:bg-[#0297C7]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <Icon name={item.icon} className="w-5 h-5 text-secondary" />
                      <div className="text-left">
                        <div className="font-bold text-[15px] text-primary">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.meta}</div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Media contact card on teal band (press page) */
export function MediaContact({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    name?: string;
    role?: string;
    image?: string;
    email?: string;
    phone?: string;
    phoneDisplay?: string;
    location?: string;
    note?: string;
    sideHeading?: string;
    sideText?: string;
  };
  return (
    <section className="py-16 md:py-24 bg-[#004F57] relative overflow-hidden px-4 sm:px-6">
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-accent shadow-[5px_0_30px_rgba(237,59,23,0.5)]" />
      <div className="container mx-auto flex flex-col lg:flex-row gap-10 items-stretch">
        <div className="lg:w-1/2 w-full bg-white rounded-[32px] p-6 sm:p-10 md:p-14 flex flex-col justify-center items-center text-center reveal-item">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">{c.heading}</h2>
          {c.image && (
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name ?? ""} className="w-full h-full object-cover" />
            </div>
          )}
          <h3 className="text-2xl font-bold text-primary mb-1">{c.name}</h3>
          <div className="text-gray-500 mb-8">{c.role}</div>
          <div className="space-y-3 w-full max-w-xs text-left">
            {c.email && (
              <a href={`mailto:${c.email}`} className="flex items-center gap-4 text-gray-600 hover:text-secondary transition-colors group">
                <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                {c.email}
              </a>
            )}
            {c.phone && (
              <a href={`tel:${c.phone}`} className="flex items-center gap-4 text-gray-600 hover:text-secondary transition-colors group">
                <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </span>
                {c.phoneDisplay ?? c.phone}
              </a>
            )}
            {c.location && (
              <div className="flex items-center gap-4 text-gray-600">
                <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary">
                  <MapPin className="w-5 h-5" />
                </span>
                {c.location}
              </div>
            )}
          </div>
          {c.note && <p className="text-gray-400 text-sm mt-8">{c.note}</p>}
        </div>
        <div className="lg:w-1/2 w-full text-white flex flex-col justify-center p-2 sm:p-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{c.sideHeading}</h2>
          <p className="text-white/80 text-lg max-w-md">{c.sideText}</p>
        </div>
      </div>
    </section>
  );
}

/** Developer docs blocks: API/webhooks facts + code samples (integrations page) */
export function DevDocs({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    sub?: string;
    theme?: string;
    blocks?: {
      title?: string;
      color?: string;
      code?: string;
      codeTitle?: string;
      facts?: { label?: string; text?: string }[];
    }[];
  };
  const dark = isDark(c.theme);
  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 ${THEME_BG[c.theme ?? "white"]}`}>
      <div className="container mx-auto">
        <SectionHeading heading={c.heading} sub={c.sub} center dark={dark} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {(c.blocks ?? []).map((b, i) => {
            const a = accent(b.color, i % 2 === 0 ? "cyan" : "orange");
            return (
              <div key={i}>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-6 ${a.text}`}>{b.title}</h3>
                {b.code && (
                  <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 overflow-hidden mb-6">
                    {b.codeTitle && (
                      <div className="px-5 py-3 border-b border-white/10 text-xs font-mono text-gray-500 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-highlight inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block" />
                        <span className="ml-2">{b.codeTitle}</span>
                      </div>
                    )}
                    <pre className="p-5 text-sm text-gray-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                      {b.code}
                    </pre>
                  </div>
                )}
                <ul className="space-y-4">
                  {(b.facts ?? []).map((f, j) => (
                    <li key={j} className={`flex gap-3 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                      <span className={`mt-1 ${a.text}`}>
                        <Icon name="check-circle" className="w-5 h-5" />
                      </span>
                      <span>
                        <strong className={dark ? "text-white" : "text-primary"}>{f.label} </strong>
                        {f.text}
                      </span>
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

/** Horizontal architecture flow with arrows (integrations page) */
export function ArchitectureFlow({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    footnote?: string;
    nodes?: { icon?: string; color?: string; title?: string; text?: string }[];
  };
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] text-white px-4 sm:px-6 overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 md:mb-16 text-secondary reveal-item">
          {renderMarkedText(c.heading)}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {(c.nodes ?? []).map((n, i) => (
            <div key={i} className="contents">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full md:w-auto md:min-w-[200px]">
                <Icon name={n.icon} className={`w-9 h-9 mx-auto mb-4 ${accent(n.color).text}`} />
                <h4 className="text-sm font-bold uppercase tracking-widest">{n.title}</h4>
                <p className="text-gray-400 text-sm mt-1">{n.text}</p>
              </div>
              {i < (c.nodes?.length ?? 0) - 1 && (
                <ArrowRight className="w-6 h-6 text-white/20 rotate-90 md:rotate-0 shrink-0" />
              )}
            </div>
          ))}
        </div>
        {c.footnote && <p className="text-gray-400 max-w-3xl mx-auto mt-12">{c.footnote}</p>}
      </div>
    </section>
  );
}
