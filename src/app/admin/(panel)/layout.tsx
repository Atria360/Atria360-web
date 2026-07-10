import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FileText,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Menu as MenuIcon,
  Newspaper,
  Settings,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/pages", icon: FileText, label: "Pages" },
  { href: "/admin/blog", icon: Newspaper, label: "Blog" },
  { href: "/admin/leads", icon: Inbox, label: "Leads" },
  { href: "/admin/navigation", icon: MenuIcon, label: "Navigation" },
  { href: "/admin/media", icon: ImageIcon, label: "Media" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 bg-[#0a0a0a] text-white flex flex-col fixed inset-y-0 z-40">
        <div className="p-6 border-b border-white/10">
          <div className="font-header font-extrabold text-xl">
            Atria<span className="text-secondary">360</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Content Management</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-medium text-sm"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors font-medium text-sm"
          >
            <ExternalLink className="w-5 h-5" />
            View Site
          </Link>
          <form action={signOut}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors font-medium text-sm">
              Sign out
              <span className="ml-auto text-xs text-gray-600 truncate max-w-[90px]">{user.email}</span>
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 ml-60 p-6 md:p-10">{children}</main>
    </div>
  );
}
