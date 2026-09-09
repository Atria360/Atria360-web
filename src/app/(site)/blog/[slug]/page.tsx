import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/cms";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Atria360 Blog`,
    description: post.excerpt ?? undefined,
    openGraph: post.cover_image ? { images: [post.cover_image] } : undefined,
  };
}

/** Minimal markdown → HTML for CMS blog content (headings, bold, lists, paragraphs). */
function mdToHtml(md: string): string {
  const esc = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = esc.split("\n");
  const out: string[] = [];
  let inList = false;
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  const inline = (s: string) =>
    s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("### ")) { closeList(); out.push(`<h3>${inline(t.slice(4))}</h3>`); }
    else if (t.startsWith("## ")) { closeList(); out.push(`<h2>${inline(t.slice(3))}</h2>`); }
    else if (t.startsWith("> ")) { closeList(); out.push(`<blockquote>${inline(t.slice(2))}</blockquote>`); }
    else if (t.startsWith("- ")) {
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(t.slice(2))}</li>`);
    } else if (t === "") closeList();
    else { closeList(); out.push(`<p>${inline(t)}</p>`); }
  }
  closeList();
  return out.join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const more = (await getBlogPosts({ limit: 4 })).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="hero-bg pt-16 pb-16 md:pb-20 px-4 sm:px-6 -mt-[var(--header-h)]">
        <div className="blob blob-1" />
        <div className="container mx-auto max-w-4xl relative z-10 pt-28 md:pt-36">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/70 text-sm">
              <Clock className="w-4 h-4" /> {post.read_minutes} min read
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 leading-tight stagger-1">
            {post.title}
          </h1>
          <div className="text-white/70">
            <span className="font-semibold text-white">{post.author}</span>
            <span className="mx-2">·</span>
            {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        </div>
      </section>

      <article className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          {post.cover_image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-3xl mb-12 shadow-xl -mt-28 md:-mt-32 relative z-10 border-4 border-white"
            />
          )}
          <div className="prose-atria" dangerouslySetInnerHTML={{ __html: mdToHtml(post.content ?? "") }} />
        </div>
      </article>

      {more.length > 0 && (
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-[#f9fafb] border-t border-gray-100">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl sm:text-3xl text-primary mb-10">Keep Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {more.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover-card group block">
                  <div className="aspect-video overflow-hidden">
                    {p.cover_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
