import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminBlog() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Blog</h1>
          <p className="text-gray-500 mt-1">Write, edit and publish articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-primary text-white hover:bg-[#003a40]"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {(posts ?? []).map((p) => (
              <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-6 py-4 font-semibold text-primary">
                  {p.title}
                  {p.featured && (
                    <span className="ml-2 px-2 py-0.5 bg-[#FCD727]/30 text-yellow-700 text-[10px] font-bold rounded uppercase">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">{p.category}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(p.published_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.published ? "Live" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/blog/${p.id}`} className="text-secondary font-semibold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(posts ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                  No posts yet — create your first article.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
