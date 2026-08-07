import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/cms";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: `${s.site_name} | ${s.tagline}`,
    description: s.meta_description || s.footer_description,
    icons: s.logo_url ? { icon: s.logo_url } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
        <meta name='impact-site-verification' value='4d741a3b-bb50-4ef6-afb1-c1acf457e6f9'>
      </head>
      <body>{children}</body>
    </html>
  );
}
