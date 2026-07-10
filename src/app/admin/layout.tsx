import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Atria360 CMS",
  robots: { index: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
