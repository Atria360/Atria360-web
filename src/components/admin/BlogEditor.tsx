"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogPost, upsertBlogPost } from "@/app/actions/admin";
import type { BlogPost } from "@/lib/types";

const input = "w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-secondary";

export default function BlogEditor({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: post?.slug ?? "",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    cover_image: post?.cover_image ?? "",
    category: post?.category ?? "Operations",
    author: post?.author ?? "Atria360 Team",
    read_minutes: post?.read_minutes ?? 5,
    featured: post?.featured ?? false,
    published: post?.published ?? true,
  });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  async function save() {
    setBusy(true);
    const res = await upsertBlogPost({ id: post?.id, ...form });
    setBusy(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      if (!post) router.push(`/admin/blog/${res.id}`);
      router.refresh();
    } else alert(res.error);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Title</label>
          <input
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!post)
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
            }}
            className={input}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Slug</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={`${input} font-mono`} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
            <input
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              list="blog-categories"
              className={input}
              placeholder="e.g. Operations"
            />
            <datalist id="blog-categories">
              {["Operations", "Technology", "Healthcare", "Automation", "Company News"].map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Author</label>
            <input value={form.author} onChange={(e) => set("author", e.target.value)} className={input} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Read minutes</label>
            <input
              type="number"
              value={form.read_minutes}
              onChange={(e) => set("read_minutes", Number(e.target.value))}
              className={input}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Cover image URL</label>
            <input value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} className={input} />
          </div>
        </div>
        {form.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.cover_image} alt="" className="h-32 rounded-xl object-cover border border-gray-200" />
        )}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className={input} />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Content <span className="font-normal text-gray-400">(Markdown: ## headings, **bold**, - lists, &gt; quotes)</span>
          </label>
          <textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            rows={20}
            className={`${input} font-mono text-xs`}
          />
        </div>
        <div className="flex items-center gap-8 pt-2">
          {(["featured", "published"] as const).map((k) => (
            <label key={k} className="flex items-center gap-3 text-sm font-semibold text-gray-700 capitalize">
              <button
                type="button"
                onClick={() => set(k, !form[k])}
                className={`w-12 h-7 rounded-full transition-colors relative ${form[k] ? "bg-secondary" : "bg-gray-300"}`}
              >
                <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${form[k] ? "left-6" : "left-1"}`} />
              </button>
              {k}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {post ? (
          <button
            onClick={async () => {
              if (confirm("Delete this post?")) {
                await deleteBlogPost(post.id);
                router.push("/admin/blog");
                router.refresh();
              }
            }}
            className="text-accent text-sm font-semibold hover:underline"
          >
            Delete post
          </button>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-4">
          {saved && <span className="text-green-600 font-semibold text-sm">Saved ✓</span>}
          <button
            onClick={save}
            disabled={busy || !form.title || !form.slug}
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#003a40] disabled:opacity-50"
          >
            {busy ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
