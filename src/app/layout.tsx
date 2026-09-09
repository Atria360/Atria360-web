import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: `${s.site_name} | ${s.tagline}`,
    description: s.meta_description || s.footer_description,
    // The icon mark, not the wide lockup — a wordmark is unreadable at 16px.
    icons: s.favicon_url
      ? { icon: s.favicon_url, apple: s.favicon_url }
      : s.logo_url
        ? { icon: s.logo_url }
        : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        {/* Site-verification / custom meta tags managed in Admin → Settings.
            Some services (e.g. Impact) use a nonstandard `value` attribute. */}
        {(settings.head_meta_tags ?? []).map((t, i) => {
          const props: Record<string, string> = { name: t.name };
          if (t.content) props.content = t.content;
          if (t.value) props.value = t.value;
          return <meta key={`${t.name}-${i}`} {...props} />;
        })}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
       
      </head>
      <body>{children}</body>
    </html>
  );
}
