import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NewPageButton } from "@/components/admin/PageControls";

export const dynamic = "force-dynamic";

export default async function AdminPages() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("pages")
    .select("*, sections(count)")
    .order("sort_order")
    .order("slug");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Pages</h1>
          <p className="text-gray-500 mt-1">Every page and its sections is fully editable</p>
        </div>
        <NewPageButton />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Page</th>
              <th className="px-6 py-4">URL</th>
              <th className="px-6 py-4">Sections</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {(pages ?? []).map((p) => (
              <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-6 py-4 font-semibold text-primary">{p.title}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                  /{p.slug === "home" ? "" : p.slug}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {(p.sections as { count: number }[])?.[0]?.count ?? 0}
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
                <td className="px-6 py-4 text-right space-x-4">
                  <Link
                    href={`/${p.slug === "home" ? "" : p.slug}`}
                    target="_blank"
                    className="text-gray-400 hover:text-primary text-xs font-semibold"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/pages/${p.id}`}
                    className="text-secondary font-semibold hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
