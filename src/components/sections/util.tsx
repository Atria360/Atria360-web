import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { renderMarkedText } from "@/components/Heading";

export type Cta = { label?: string; href?: string };

export const ACCENTS: Record<
  string,
  { text: string; bg10: string; bg20: string; border: string; borderL: string; borderT: string }
> = {
  cyan: {
    text: "text-[#0297C7]",
    bg10: "bg-[#0297C7]/10",
    bg20: "bg-[#0297C7]/20",
    border: "border-[#0297C7]",
    borderL: "border-l-[#0297C7]",
    borderT: "border-t-[#0297C7]",
  },
  brightcyan: {
    text: "text-[#00D9FF]",
    bg10: "bg-[#0297C7]/10",
    bg20: "bg-[#0297C7]/20",
    border: "border-[#0297C7]",
    borderL: "border-l-[#0297C7]",
    borderT: "border-t-[#0297C7]",
  },
  orange: {
    text: "text-[#ED3B17]",
    bg10: "bg-[#ED3B17]/10",
    bg20: "bg-[#ED3B17]/20",
    border: "border-[#ED3B17]",
    borderL: "border-l-[#ED3B17]",
    borderT: "border-t-[#ED3B17]",
  },
  gold: {
    text: "text-[#FCD727]",
    bg10: "bg-[#FCD727]/10",
    bg20: "bg-[#FCD727]/20",
    border: "border-[#FCD727]",
    borderL: "border-l-[#FCD727]",
    borderT: "border-t-[#FCD727]",
  },
  teal: {
    text: "text-[#004F57]",
    bg10: "bg-[#004F57]/10",
    bg20: "bg-[#004F57]/20",
    border: "border-[#004F57]",
    borderL: "border-l-[#004F57]",
    borderT: "border-t-[#004F57]",
  },
};

export function accent(name: string | undefined, fallback = "cyan") {
  return ACCENTS[name ?? fallback] ?? ACCENTS[fallback];
}

export function PrimaryBtn({ cta, className = "" }: { cta?: Cta; className?: string }) {
  if (!cta?.label) return null;
  return (
    <Link
      href={cta.href || "/contact"}
      className={`inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 bg-accent text-white font-bold rounded-xl primary-btn tracking-wide text-center min-h-[48px] ${className}`}
    >
      {cta.label}
    </Link>
  );
}

export function SecondaryBtn({
  cta,
  variant = "cyan",
  className = "",
}: {
  cta?: Cta;
  variant?: "cyan" | "white";
  className?: string;
}) {
  if (!cta?.label) return null;
  if (variant === "white") {
    return (
      <Link
        href={cta.href || "/about"}
        className={`inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-white border-2 border-white/30 font-bold rounded-xl hover:border-white hover:bg-white/10 transition-all duration-400 text-center min-h-[48px] ${className}`}
      >
        {cta.label}
      </Link>
    );
  }
  return (
    <Link
      href={cta.href || "/about"}
      className={`inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-secondary font-bold rounded-xl secondary-btn text-center min-h-[48px] ${className}`}
    >
      {cta.label}
    </Link>
  );
}

export function ArrowLink({
  cta,
  className = "text-secondary",
}: {
  cta?: Cta;
  className?: string;
}) {
  if (!cta?.label) return null;
  return (
    <Link
      href={cta.href || "#"}
      className={`inline-flex items-center gap-2 font-bold hover:gap-4 transition-all duration-400 ${className}`}
    >
      {cta.label} <ArrowRight className="w-5 h-5" />
    </Link>
  );
}

export function SectionHeading({
  kicker,
  heading,
  sub,
  center,
  dark,
  className = "",
}: {
  kicker?: string;
  heading?: string;
  sub?: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  if (!kicker && !heading && !sub) return null;
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-10 sm:mb-16 ${className}`}>
      {kicker && (
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">
          {kicker}
        </div>
      )}
      {heading && (
        <h2
          className={`text-3xl sm:text-4xl lg:text-[48px] mb-4 sm:mb-6 leading-tight ${
            dark ? "text-white" : "text-primary"
          }`}
        >
          {renderMarkedText(heading)}
        </h2>
      )}
      {sub && (
        <p className={`text-base sm:text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>{sub}</p>
      )}
    </div>
  );
}

export const THEME_BG: Record<string, string> = {
  white: "bg-white",
  light: "bg-[#f9fafb]",
  gray: "bg-gray-50",
  dark: "bg-[#1a1a1a]",
  black: "bg-[#0a0a0a]",
  teal: "bg-[#004F57]",
};

export function isDark(theme?: string) {
  return theme === "dark" || theme === "black" || theme === "teal";
}
