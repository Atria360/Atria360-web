import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RevealInit from "@/components/site/RevealInit";
import { getNavigation, getSiteSettings } from "@/lib/cms";
import type { FooterColumn, NavItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, headerNav, footerNav] = await Promise.all([
    getSiteSettings(),
    getNavigation("header"),
    getNavigation("footer"),
  ]);

  return (
    <>
      <Header nav={headerNav.items as NavItem[]} settings={settings} />
      <main className="pt-[var(--header-h)]">{children}</main>
      <Footer columns={footerNav.items as FooterColumn[]} settings={settings} />
      <RevealInit />
    </>
  );
}
