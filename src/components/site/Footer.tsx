import Link from "next/link";
import Icon from "@/components/Icon";
import type { FooterColumn, SiteSettings } from "@/lib/types";

export default function Footer({
  columns,
  settings,
}: {
  columns: FooterColumn[];
  settings: SiteSettings;
}) {
  return (
    <footer className="bg-[#050505] text-gray-400 py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 sm:mb-8 w-fit">
              {settings.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.logo_url} alt={`${settings.site_name} Logo`} className="h-10 w-auto" />
              ) : (
                <span className="font-header font-extrabold text-xl text-white">
                  {settings.site_name}
                </span>
              )}
            </Link>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
              {settings.footer_description}
            </p>
            <div className="flex gap-4">
              {settings.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:text-cyanbright hover:border-secondary transition-colors duration-400"
                >
                  <Icon name={s.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold mb-6 sm:mb-8 text-xs sm:text-sm uppercase tracking-widest">
                {col.title}
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base font-medium">
                {col.links.map((l) => (
                  <li key={l.label} className="hover:text-cyanbright transition-colors duration-400">
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white font-bold mb-6 sm:mb-8 text-xs sm:text-sm uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base font-medium">
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-cyanbright transition-colors duration-400">
                  {settings.email}
                </a>
              </li>
              <li>
                <a href={`tel:${settings.phone}`} className="hover:text-cyanbright transition-colors duration-400">
                  {settings.phone_display}
                </a>
              </li>
              <li className="text-gray-500">
                {settings.address_lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < settings.address_lines.length - 1 && <br />}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-medium text-gray-500 text-center md:text-left">
          <div>{settings.copyright}</div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {settings.legal_links.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-white transition-colors duration-400">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
