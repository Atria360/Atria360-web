import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import BlogEditor from "@/components/admin/BlogEditor";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (!post) notFound();

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> All posts
        </Link>
        <Link
          href={`/blog/${post.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-secondary text-sm font-semibold hover:underline"
        >
          View live <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-primary mb-8">Edit Post</h1>
      <BlogEditor post={post as BlogPost} />
    </div>
  );
}
