import Link from "next/link";
import { FileText, Inbox, Newspaper, Layers } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [pages, sections, posts, leads, recentLeads] = await Promise.all([
    supabase.from("pages").select("id", { count: "exact", head: true }),
    supabase.from("sections").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Pages", value: pages.count ?? 0, icon: FileText, href: "/admin/pages" },
    { label: "Sections", value: sections.count ?? 0, icon: Layers, href: "/admin/pages" },
    { label: "Blog Posts", value: posts.count ?? 0, icon: Newspaper, href: "/admin/blog" },
    { label: "New Leads", value: leads.count ?? 0, icon: Inbox, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-10">Manage every page, section and setting of atria360.com</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-secondary transition-all"
          >
            <s.icon className="w-6 h-6 text-secondary mb-4" />
            <div className="text-3xl font-extrabold text-primary font-header">{s.value}</div>
            <div className="text-gray-500 text-sm mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-primary">Recent Leads</h2>
          <Link href="/admin/leads" className="text-secondary text-sm font-semibold hover:underline">
            View all →
          </Link>
        </div>
        {(recentLeads.data ?? []).length === 0 ? (
          <p className="p-6 text-gray-400">No leads yet. They&apos;ll appear here when visitors submit the contact form.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {(recentLeads.data ?? []).map((l) => (
                <tr key={l.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-4 font-semibold text-primary">{l.name}</td>
                  <td className="px-6 py-4 text-gray-500">{l.email}</td>
                  <td className="px-6 py-4 text-gray-500">{l.service}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(l.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0297C7]/10 text-secondary uppercase">
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
