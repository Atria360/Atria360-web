"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Logo from "@/components/site/Logo";
import type { NavItem, SiteSettings } from "@/lib/types";

// A menu whose children themselves have children renders as a mega-menu
// panel (one column per group) instead of a single flat dropdown. A
// three-level hover flyout is unusable on touch, so we flatten to columns.
const hasGroups = (item: NavItem) =>
  (item.children ?? []).some((c) => (c.children?.length ?? 0) > 0);

const descendants = (item: NavItem): NavItem[] =>
  (item.children ?? []).flatMap((c) => [c, ...descendants(c)]);

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
    item.href === pathname || descendants(item).some((c) => c.href === pathname);

  const linkCls = (active: boolean) =>
    `relative hover:text-primary transition-colors flex items-center gap-1.5 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${
      active ? "text-primary after:w-full" : "after:w-0 group-hover:after:w-full"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      {/* Height comes from --header-h (globals.css); main offsets content by
          it and heroes pull up by it, so it stays a single source of truth.
          relative: the mega-menu panel anchors to this container rather than
          its trigger, so a wide panel can never overflow the viewport edge. */}
      <div className="container mx-auto px-6 h-[var(--header-h)] flex items-center justify-between relative">
        <Link href="/" className="flex items-center">
          <Logo settings={settings} height={40} className="sm:hidden" />
          <Logo settings={settings} height={50} className="hidden sm:flex" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-600 font-medium">
          {nav.map((item) => {
            if (!item.children?.length) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${
                    isActive(item) ? "text-primary after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            // Grouped mega-menu
            if (hasGroups(item)) {
              return (
                <div key={item.label} className="group">
                  <Link href={item.href} className={linkCls(isActive(item))}>
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute top-full left-0 right-0 pt-3 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-40">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 w-full max-w-[1040px] max-h-[76vh] overflow-y-auto grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
                      {item.children.map((group) =>
                        group.children?.length ? (
                          <div key={group.label}>
                            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary mb-3 pb-2 border-b border-gray-100">
                              {group.label}
                            </div>
                            <ul className="space-y-0.5">
                              {group.children.map((leaf) => (
                                <li key={leaf.label}>
                                  <Link
                                    href={leaf.href}
                                    className={`block px-3 py-2 rounded-lg text-sm text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors ${
                                      pathname === leaf.href ? "text-primary bg-blue-50 font-semibold" : ""
                                    }`}
                                  >
                                    {leaf.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <Link
                            key={group.label}
                            href={group.href}
                            className={`block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:text-primary hover:bg-blue-50 transition-colors self-start ${
                              pathname === group.href ? "text-primary bg-blue-50" : ""
                            }`}
                          >
                            {group.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Flat dropdown
            return (
              <div key={item.label} className="relative group">
                <Link href={item.href} className={linkCls(isActive(item))}>
                  {item.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-40">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[250px]">
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
              </div>
            );
          })}
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
        className={`fixed top-0 left-0 h-screen w-[85vw] max-w-sm bg-white shadow-lg z-50 lg:hidden overflow-y-auto overscroll-contain transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
            <Logo settings={settings} height={40} />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-primary hover:text-accent transition-colors p-1"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {nav.map((item) =>
            item.children?.length ? (
              <div key={item.label}>
                <button
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  aria-expanded={expanded === item.label}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-primary transition-colors font-semibold flex items-center justify-between min-h-[48px]"
                >
                  {item.label}
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      expanded === item.label ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expanded === item.label && (
                  <div className="ml-2 mt-1 mb-2 space-y-3 border-l-2 border-blue-200 pl-3">
                    {item.children.map((group) =>
                      group.children?.length ? (
                        <div key={group.label}>
                          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary px-3 pt-1 pb-1.5">
                            {group.label}
                          </div>
                          {group.children.map((leaf) => (
                            <Link
                              key={leaf.label}
                              href={leaf.href}
                              onClick={() => setOpen(false)}
                              className={`block px-3 py-2.5 rounded-lg text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors text-sm min-h-[44px] flex items-center ${
                                pathname === leaf.href ? "text-primary bg-blue-50 font-semibold" : ""
                              }`}
                            >
                              {leaf.label}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          key={group.label}
                          href={group.href}
                          onClick={() => setOpen(false)}
                          className={`block px-3 py-2.5 rounded-lg text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors text-sm font-medium min-h-[44px] flex items-center ${
                            pathname === group.href ? "text-primary bg-blue-50 font-semibold" : ""
                          }`}
                        >
                          {group.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-blue-50 hover:text-primary transition-colors font-semibold min-h-[48px] flex items-center"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="p-4 border-t border-gray-200 mt-2">
          <Link
            href={settings.cta_href}
            onClick={() => setOpen(false)}
            className="block w-full px-6 py-3.5 bg-accent text-white font-semibold rounded-lg text-sm tracking-wide transition-all hover:shadow-[0_0_20px_rgba(237,59,23,0.5)] text-center"
          >
            {settings.cta_label}
          </Link>
        </div>
      </div>
    </header>
  );
}
