import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPost() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-primary mb-4">
        <ArrowLeft className="w-4 h-4" /> All posts
      </Link>
      <h1 className="text-3xl font-bold text-primary mb-8">New Post</h1>
      <BlogEditor />
    </div>
  );
}
