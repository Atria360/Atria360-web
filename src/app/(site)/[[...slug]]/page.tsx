import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/sections";
import { getPageWithSections } from "@/lib/cms";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug?: string[] }> };

function slugFromParams(slug?: string[]) {
  return (slug ?? []).join("/") || "home";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageWithSections(slugFromParams(slug));
  if (!data) return {};
  return {
    title: data.page.meta_title || data.page.title,
    description: data.page.meta_description ?? undefined,
    openGraph: data.page.og_image ? { images: [data.page.og_image] } : undefined,
  };
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPageWithSections(slugFromParams(slug));
  if (!data) notFound();
  return <SectionRenderer sections={data.sections} />;
}
