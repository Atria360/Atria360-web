import { createClient } from "@/lib/supabase/server";
import type { BlogPost, FooterColumn, NavItem, Page, Section, SiteSettings } from "@/lib/types";

export const DEFAULT_SETTINGS: SiteSettings = {
  site_name: "Atria360",
  tagline: "Smarter Systems From Every Angle",
  meta_description:
    "Atria360 unifies IT infrastructure, custom software, and operations intelligence into one connected ecosystem.",
  logo_url: "",
  contact_heading: "Contact",
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
  head_meta_tags: [],
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

// PostgREST reports "no rows matched" for .single() with this code. Anything
// else (network failure, auth, timeout) is an infrastructure problem, and must
// surface as a 5xx rather than a 404 — a 404 carries noindex and would
// deindex live pages during a transient outage.
const NO_ROWS = "PGRST116";

export async function getPageWithSections(
  slug: string
): Promise<{ page: Page; sections: Section[] } | null> {
  const supabase = await createClient();
  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    if (error.code === NO_ROWS) return null;
    throw new Error(`Failed to load page "${slug}": ${error.message}`);
  }
  if (!page) return null;

  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", page.id)
    .eq("visible", true)
    .order("sort_order");
  return { page: page as Page, sections: (sections as Section[]) ?? [] };
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
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    if (error.code === NO_ROWS) return null;
    throw new Error(`Failed to load post "${slug}": ${error.message}`);
  }
  return (data as BlogPost) ?? null;
}
