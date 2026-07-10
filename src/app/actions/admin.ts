"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/lib/types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return supabase;
}

function refresh() {
  revalidatePath("/", "layout");
}

// ---------- Auth ----------
export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function changePassword(newPassword: string) {
  const supabase = await requireUser();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ---------- Pages ----------
export async function createPage(data: { slug: string; title: string }) {
  const supabase = await requireUser();
  const { data: page, error } = await supabase
    .from("pages")
    .insert({ slug: data.slug.replace(/^\/+|\/+$/g, ""), title: data.title })
    .select()
    .single();
  if (error) return { ok: false as const, error: error.message };
  refresh();
  return { ok: true as const, id: page.id as string };
}

export async function updatePage(
  id: string,
  data: Partial<{
    slug: string;
    title: string;
    meta_title: string | null;
    meta_description: string | null;
    published: boolean;
  }>
) {
  const supabase = await requireUser();
  const { error } = await supabase.from("pages").update(data).eq("id", id);
  if (error) return { ok: false, error: error.message };
  refresh();
  return { ok: true };
}

export async function deletePage(id: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  refresh();
  return { ok: true };
}

// ---------- Sections ----------
export async function addSection(pageId: string, type: string, afterSort?: number) {
  const supabase = await requireUser();
  const { data: rows } = await supabase
    .from("sections")
    .select("sort_order")
    .eq("page_id", pageId)
    .order("sort_order", { ascending: false })
    .limit(1);
  const sort = afterSort ?? ((rows?.[0]?.sort_order as number) ?? 0) + 10;
  const { data: sec, error } = await supabase
    .from("sections")
    .insert({ page_id: pageId, type, sort_order: sort, content: {} })
    .select()
    .single();
  if (error) return { ok: false as const, error: error.message };
  refresh();
  return { ok: true as const, id: sec.id as string };
}

export async function updateSection(
  id: string,
  data: Partial<{ content: Json; label: string | null; visible: boolean; type: string }>
) {
  const supabase = await requireUser();
  const { error } = await supabase.from("sections").update(data).eq("id", id);
  if (error) return { ok: false, error: error.message };
  refresh();
  return { ok: true };
}

export async function deleteSection(id: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("sections").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  refresh();
  return { ok: true };
}

export async function moveSection(pageId: string, id: string, direction: "up" | "down") {
  const supabase = await requireUser();
  const { data: sections } = await supabase
    .from("sections")
    .select("id, sort_order")
    .eq("page_id", pageId)
    .order("sort_order");
  if (!sections) return { ok: false, error: "Page not found" };
  const idx = sections.findIndex((s) => s.id === id);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapIdx < 0 || swapIdx >= sections.length) return { ok: true };
  const a = sections[idx];
  const b = sections[swapIdx];
  await supabase.from("sections").update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from("sections").update({ sort_order: a.sort_order }).eq("id", b.id);
  refresh();
  return { ok: true };
}

// ---------- Blog ----------
export async function upsertBlogPost(data: {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  category?: string;
  author?: string;
  read_minutes?: number;
  featured?: boolean;
  published?: boolean;
  published_at?: string;
}) {
  const supabase = await requireUser();
  const { id, ...rest } = data;
  const row = { ...rest, slug: rest.slug.replace(/^\/+|\/+$/g, "") };
  const q = id
    ? supabase.from("blog_posts").update(row).eq("id", id).select().single()
    : supabase.from("blog_posts").insert(row).select().single();
  const { data: post, error } = await q;
  if (error) return { ok: false as const, error: error.message };
  refresh();
  return { ok: true as const, id: post.id as string };
}

export async function deleteBlogPost(id: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  refresh();
  return { ok: true };
}

// ---------- Navigation & settings ----------
export async function saveNavigation(menu: "header" | "footer", items: Json[]) {
  const supabase = await requireUser();
  const { error } = await supabase
    .from("navigation")
    .upsert({ menu, items: items as never });
  if (error) return { ok: false, error: error.message };
  refresh();
  return { ok: true };
}

export async function saveSettings(key: string, value: Json) {
  const supabase = await requireUser();
  const { error } = await supabase.from("site_settings").upsert({ key, value: value as never });
  if (error) return { ok: false, error: error.message };
  refresh();
  return { ok: true };
}

// ---------- Leads ----------
export async function updateLeadStatus(id: string, status: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/leads");
  return { ok: true };
}

export async function deleteLead(id: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/leads");
  return { ok: true };
}

// ---------- Media ----------
export async function registerMedia(path: string, url: string, alt?: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("media").insert({ path, url, alt: alt ?? null });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteMedia(id: string, path: string) {
  const supabase = await requireUser();
  await supabase.storage.from("media").remove([path]);
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/media");
  return { ok: true };
}
