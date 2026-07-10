import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SectionEditor from "@/components/admin/SectionEditor";
import type { Section } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SectionEditPage({
  params,
}: {
  params: Promise<{ id: string; sid: string }>;
}) {
  const { id, sid } = await params;
  const supabase = await createClient();
  const { data: section } = await supabase.from("sections").select("*").eq("id", sid).single();
  const { data: page } = await supabase.from("pages").select("slug,title").eq("id", id).single();
  if (!section || !page) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href={`/admin/pages/${id}`}
        className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-primary mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to {page.title}
      </Link>
      <SectionEditor section={section as Section} pageSlug={page.slug} />
    </div>
  );
}
