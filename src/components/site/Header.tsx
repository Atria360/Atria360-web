"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import type { NavItem, SiteSettings } from "@/lib/types";

export default function Header({
  nav,
  settings,
}: {
  nav: NavItem[];
  settings: SiteSettings;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    item.href === pathname ||
    (item.children ?? []).some((c) => c.href === pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {settings.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logo_url} alt={`${settings.site_name} Logo`} className="h-14 sm:h-16 w-auto" />
          ) : (
            <span className="font-header font-extrabold text-2xl text-primary">
              {settings.site_name}
            </span>
          )}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-gray-600 font-medium">
          {nav.map((item) =>
            item.children?.length ? (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={`relative hover:text-primary transition-colors flex items-center gap-1.5 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${
                    isActive(item) ? "text-primary after:w-full" : "after:w-0 group-hover:after:w-full"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 min-w-[240px] z-40">
                  {item.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className={`block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors text-sm font-medium ${
                        pathname === c.href ? "text-primary bg-blue-50" : ""
                      }`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`relative hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${
                  isActive(item) ? "text-primary after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href={settings.cta_href}
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-accent text-white font-semibold rounded-lg text-sm tracking-wide transition-all hover:shadow-[0_0_20px_rgba(237,59,23,0.5)] hover:scale-105"
          >
            {settings.cta_label}
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-primary flex items-center"
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-lg z-50 lg:hidden overflow-y-auto transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            {settings.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logo_url} alt={`${settings.site_name} Logo`} className="h-12 w-auto" />
            ) : (
              <span className="font-header font-extrabold text-xl text-primary">
                {settings.site_name}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-primary hover:text-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {nav.map((item) =>
            item.children?.length ? (
              <div key={item.label}>
                <button
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors font-medium flex items-center justify-between"
                >
                  {item.label}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${expanded === item.label ? "rotate-90" : ""}`}
                  />
                </button>
                {expanded === item.label && (
                  <div className="ml-4 space-y-1 border-l-2 border-blue-200 pl-4 mt-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="p-6 border-t border-gray-200 mt-4">
          <Link
            href={settings.cta_href}
            onClick={() => setOpen(false)}
            className="block w-full px-6 py-3 bg-accent text-white font-semibold rounded-lg text-sm tracking-wide transition-all hover:shadow-[0_0_20px_rgba(237,59,23,0.5)] text-center"
          >
            {settings.cta_label}
          </Link>
        </div>
      </div>
    </header>
  );
}
