"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Clock,
  Copy,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Search,
  SearchX,
  CheckCircle2,
} from "lucide-react";
import { renderMarkedText } from "@/components/Heading";
import { submitLead } from "@/app/actions/public";
import type { Json } from "@/lib/types";

const FAQ_COLORS: Record<string, string> = {
  cyan: "text-[#0297C7]",
  orange: "text-[#ED3B17]",
  gold: "text-[#FCD727]",
  white: "text-white",
};

/** FAQ with hero search, category tabs and accordions (FAQ page) */
export function FaqTabs({ content }: { content: Json }) {
  const c = content as {
    heading?: string;
    categories?: { name?: string; color?: string; items?: { q?: string; a?: string }[] }[];
  };
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const cats = useMemo(() => {
    const all = c.categories ?? [];
    const visible = tab ? all.filter((cat) => cat.name === tab) : all;
    if (!query.trim()) return visible;
    const q = query.toLowerCase();
    return visible
      .map((cat) => ({
        ...cat,
        items: (cat.items ?? []).filter(
          (item) => item.q?.toLowerCase().includes(q) || item.a?.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [c.categories, tab, query]);

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a] px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="relative mb-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for features, pricing, support..."
            className="w-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/50 text-base sm:text-lg rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-secondary transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setTab(null)}
            className={`px-5 py-3 text-sm sm:text-base rounded-xl border font-bold transition-all ${
              tab === null
                ? "bg-secondary border-secondary text-white"
                : "border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            All
          </button>
          {(c.categories ?? []).map((cat) => (
            <button
              key={cat.name}
              onClick={() => setTab(tab === cat.name ? null : cat.name!)}
              className={`px-5 py-3 text-sm sm:text-base rounded-xl border font-bold transition-all ${
                tab === cat.name
                  ? "bg-secondary border-secondary text-white"
                  : "border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {cats.length === 0 && (
          <div className="text-center py-16">
            <SearchX className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No answers found</h3>
            <p className="text-gray-400">Try adjusting your search terms or contact our support team.</p>
          </div>
        )}

        <div className="space-y-12">
          {cats.map((cat) => (
            <div key={cat.name}>
              <h3 className={`text-2xl font-bold mb-6 ${FAQ_COLORS[cat.color ?? "cyan"]}`}>{cat.name}</h3>
              <div className="space-y-4">
                {(cat.items ?? []).map((item, i) => {
                  const id = `${cat.name}-${i}`;
                  const isOpen = open === id;
                  return (
                    <div key={id} className="bg-[#222] rounded-2xl border border-white/5 transition-all duration-300">
                      <button
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="w-full px-5 sm:px-8 py-4 sm:py-6 text-left flex justify-between items-center group"
                      >
                        <h4 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-secondary transition-colors pr-4">
                          {item.q}
                        </h4>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 sm:px-8 pb-6 text-gray-400 leading-relaxed">{item.a}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Simple light accordion (pricing FAQ) */
export function FaqAccordion({ content }: { content: Json }) {
  const c = content as { heading?: string; sub?: string; items?: { q?: string; a?: string }[] };
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6 border-t border-gray-200">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-primary">
            {renderMarkedText(c.heading)}
          </h2>
          {c.sub && <p className="text-gray-600 mt-4">{c.sub}</p>}
        </div>
        <div className="space-y-4">
          {(c.items ?? []).map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 sm:px-8 py-4 sm:py-6 text-left flex justify-between items-center"
              >
                <span className="font-bold text-primary text-base sm:text-lg pr-4">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 sm:px-8 pb-6 text-gray-600 leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Contact form + direct-contact cards. Stores submissions as leads in Supabase. */
export function ContactSection({ content }: { content: Json }) {
  const c = content as {
    formHeading?: string;
    industries?: string[];
    needs?: string[];
    submitLabel?: string;
    direct?: { icon?: string; title?: string; value?: string; href?: string }[];
    socialHeading?: string;
    socialText?: string;
  };
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    need: "",
    message: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    const res = await submitLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      service: [form.industry, form.need].filter(Boolean).join(" / "),
      message: form.message,
      source_page: pathname,
    });
    if (res.ok) setState("done");
    else {
      setState("error");
      setError(res.error ?? "Something went wrong.");
    }
  }

  const inputCls =
    "w-full px-5 py-3.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all";

  const ICONS: Record<string, React.ReactNode> = {
    mail: <Mail className="w-6 h-6" />,
    phone: <Phone className="w-6 h-6" />,
    "map-pin": <MapPin className="w-6 h-6" />,
    clock: <Clock className="w-6 h-6" />,
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f9fafb]">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-primary">{c.formHeading}</h2>
          {state === "done" ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-secondary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-2">Request received!</h3>
              <p className="text-gray-600">
                Thanks for reaching out — our team will get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input required value={form.name} onChange={set("name")} placeholder="John Doe" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input value={form.company} onChange={set("company")} placeholder="Business Inc." className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="john@company.com" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input value={form.phone} onChange={set("phone")} placeholder="(403) 555-0000" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                  <select value={form.industry} onChange={set("industry")} className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">Select industry</option>
                    {(c.industries ?? []).map((ind) => (
                      <option key={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Need</label>
                  <select value={form.need} onChange={set("need")} className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">Select need</option>
                    {(c.needs ?? []).map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">How can we help?</label>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  rows={4}
                  placeholder="Tell us about your business and challenges..."
                  className={`${inputCls} resize-none`}
                />
              </div>
              {state === "error" && <p className="text-accent font-semibold">{error}</p>}
              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full lg:w-auto px-10 py-4 bg-accent text-white font-extrabold text-lg rounded-xl uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 hover:shadow-[0_0_25px_rgba(237,59,23,0.4)] transition-all disabled:opacity-60 disabled:hover:scale-100"
              >
                {state === "sending" ? "Sending..." : c.submitLabel ?? "Book My Consultation"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-2 text-primary">Direct Contact</h3>
          {(c.direct ?? []).map((d, i) => {
            const inner = (
              <>
                <div className="w-12 h-12 rounded-full bg-[#0297C7]/10 text-secondary flex items-center justify-center shrink-0">
                  {ICONS[d.icon ?? "mail"] ?? <Mail className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">{d.title}</div>
                  <div className="text-primary font-bold">{d.value}</div>
                </div>
                {d.href && <Copy className="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </>
            );
            const cls =
              "flex items-center gap-5 p-6 bg-white border border-gray-100 border-l-4 border-l-transparent hover:border-l-secondary rounded-2xl group min-h-[92px] transition-all hover:shadow-md w-full";
            return d.href ? (
              <a key={i} href={d.href} className={cls}>
                {inner}
              </a>
            ) : (
              <div key={i} className={cls}>
                {inner}
              </div>
            );
          })}

          {c.socialHeading && (
            <div className="p-8 bg-[#0a0a0a] rounded-3xl text-white relative overflow-hidden mt-6">
              <h4 className="text-xl font-bold mb-3">{c.socialHeading}</h4>
              <p className="text-white/70 mb-6">{c.socialText}</p>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary opacity-20 blur-3xl pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Email capture banner (blog + press). Stores as a lead tagged "newsletter". */
export function Newsletter({ content }: { content: Json }) {
  const c = content as { heading?: string; sub?: string; buttonLabel?: string };
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const res = await submitLead({
      name: "Newsletter Subscriber",
      email,
      service: "newsletter",
      source_page: pathname,
    });
    setState(res.ok ? "done" : "error");
  }

  return (
    <section className="py-16 md:py-20 bg-[#004F57]/5 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl bg-white p-6 sm:p-8 md:p-12 rounded-[32px] shadow-sm border border-[#004F57]/10 flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-primary">{c.heading}</h2>
          <p className="text-gray-600">{c.sub}</p>
        </div>
        <div className="md:w-[380px]">
          {state === "done" ? (
            <div className="flex items-center gap-3 text-primary font-bold">
              <CheckCircle2 className="w-6 h-6 text-secondary" /> You&apos;re subscribed!
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-[#002b2f] hover:scale-105 transition-all shadow-lg disabled:opacity-60"
              >
                {state === "sending" ? "..." : c.buttonLabel ?? "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
