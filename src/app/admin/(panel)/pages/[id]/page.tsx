import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeletePageButton, PageMetaForm, SectionList } from "@/components/admin/PageControls";
import type { Page, Section } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PageEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("*").eq("id", id).single();
  if (!page) notFound();
  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", id)
    .order("sort_order");

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/pages" className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-primary mb-2">
            <ArrowLeft className="w-4 h-4" /> All pages
          </Link>
          <h1 className="text-3xl font-bold text-primary">{page.title}</h1>
        </div>
        <Link
          href={`/${page.slug === "home" ? "" : page.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
        >
          View live <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-8">
        <PageMetaForm page={page as Page} />
        <div>
          <h2 className="text-lg font-bold text-primary mb-4">Sections</h2>
          <SectionList page={page as Page} sections={(sections as Section[]) ?? []} />
        </div>
        <div className="pt-4 border-t border-gray-200">
          <DeletePageButton pageId={page.id} />
        </div>
      </div>
    </div>
  );
}
