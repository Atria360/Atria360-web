import { createClient } from "@/lib/supabase/server";
import type { BlogPost, FooterColumn, NavItem, Page, Section, SiteSettings } from "@/lib/types";

export const DEFAULT_SETTINGS: SiteSettings = {
  site_name: "Atria360",
  tagline: "Smarter Systems From Every Angle",
  logo_url: "",
  footer_description:
    "Modernizing businesses through intelligent operational ecosystems powered by automation and secure infrastructure.",
  email: "info@atria360.com",
  phone: "+14035550123",
  phone_display: "(403) 555-0123",
  address_lines: ["Calgary, Alberta", "Canada"],
  socials: [],
  cta_label: "Book a Consultation",
  cta_href: "/contact",
  copyright: "© 2026 Atria360. All rights reserved.",
  legal_links: [],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("key,value");
    const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
    return { ...DEFAULT_SETTINGS, ...(map.general as object | undefined) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getNavigation(menu: "header" | "footer"): Promise<{
  items: NavItem[] | FooterColumn[];
}> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("navigation").select("items").eq("menu", menu).single();
    return { items: (data?.items as never) ?? [] };
  } catch {
    return { items: [] };
  }
}

export async function getPageWithSections(
  slug: string
): Promise<{ page: Page; sections: Section[] } | null> {
  try {
    const supabase = await createClient();
    const { data: page } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (!page) return null;
    const { data: sections } = await supabase
      .from("sections")
      .select("*")
      .eq("page_id", page.id)
      .eq("visible", true)
      .order("sort_order");
    return { page: page as Page, sections: (sections as Section[]) ?? [] };
  } catch {
    return null;
  }
}

export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("pages").select("slug").eq("published", true);
    return (data ?? []).map((p) => p.slug);
  } catch {
    return [];
  }
}

export async function getBlogPosts(opts?: { limit?: number }): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    let q = supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (opts?.limit) q = q.limit(opts.limit);
    const { data } = await q;
    return (data as BlogPost[]) ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    return (data as BlogPost) ?? null;
  } catch {
    return null;
  }
}
