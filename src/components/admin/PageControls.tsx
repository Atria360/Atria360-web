"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Pencil } from "lucide-react";
import {
  addSection,
  createPage,
  deletePage,
  deleteSection,
  moveSection,
  updatePage,
  updateSection,
} from "@/app/actions/admin";
import { SECTION_SCHEMAS } from "@/lib/sectionSchemas";
import type { Page, Section } from "@/lib/types";

const btn = "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all";

export function NewPageButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [busy, setBusy] = useState(false);

  async function create() {
    setBusy(true);
    const res = await createPage({ title, slug });
    if (res.ok) {
      setOpen(false);
      router.push(`/admin/pages/${res.id}`);
      router.refresh();
    } else {
      alert(res.error);
      setBusy(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={`${btn} bg-primary text-white hover:bg-[#003a40]`}>
        <Plus className="w-4 h-4" /> New Page
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-primary mb-6">Create Page</h2>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug (URL path)</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 mb-6 font-mono text-sm"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className={`${btn} text-gray-500 hover:bg-gray-100`}>
                Cancel
              </button>
              <button onClick={create} disabled={busy || !title || !slug} className={`${btn} bg-primary text-white disabled:opacity-50`}>
                {busy ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PageMetaForm({ page }: { page: Page }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: page.title,
    slug: page.slug,
    meta_title: page.meta_title ?? "",
    meta_description: page.meta_description ?? "",
    published: page.published,
  });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setBusy(true);
    const res = await updatePage(page.id, {
      ...form,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
    });
    setBusy(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } else alert(res.error);
  }

  const input = "w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm";
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={input} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Slug</label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={`${input} font-mono`} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Meta title (SEO)</label>
        <input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} className={input} />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Meta description (SEO)</label>
        <textarea
          value={form.meta_description}
          onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
          rows={2}
          className={input}
        />
      </div>
      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 cursor-pointer">
          <button
            type="button"
            onClick={() => setForm({ ...form, published: !form.published })}
            className={`w-12 h-7 rounded-full transition-colors relative ${form.published ? "bg-secondary" : "bg-gray-300"}`}
          >
            <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${form.published ? "left-6" : "left-1"}`} />
          </button>
          Published
        </label>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-sm font-semibold">Saved ✓</span>}
          <button onClick={save} disabled={busy} className={`${btn} bg-primary text-white disabled:opacity-50`}>
            {busy ? "Saving..." : "Save Page Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SectionList({ page, sections }: { page: Page; sections: Section[] }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  async function run(id: string, fn: () => Promise<unknown>) {
    setBusy(id);
    await fn();
    router.refresh();
    setBusy(null);
  }

  return (
    <div className="space-y-3">
      {sections.map((s, i) => {
        const schema = SECTION_SCHEMAS[s.type];
        return (
          <div
            key={s.id}
            className={`bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center gap-4 ${
              !s.visible ? "opacity-50" : ""
            } ${busy === s.id ? "animate-pulse" : ""}`}
          >
            <div className="text-gray-300 font-mono text-xs w-6">{i + 1}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-primary truncate">
                {s.label || schema?.label || s.type}
              </div>
              <div className="text-xs text-gray-400">{schema?.description ?? s.type}</div>
            </div>
            <button
              onClick={() => run(s.id, () => moveSection(page.id, s.id, "up"))}
              className="text-gray-300 hover:text-primary"
              aria-label="Move up"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button
              onClick={() => run(s.id, () => moveSection(page.id, s.id, "down"))}
              className="text-gray-300 hover:text-primary"
              aria-label="Move down"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <button
              onClick={() => run(s.id, () => updateSection(s.id, { visible: !s.visible }))}
              className="text-gray-300 hover:text-primary"
              aria-label="Toggle visibility"
            >
              {s.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                if (confirm("Delete this section?")) run(s.id, () => deleteSection(s.id));
              }}
              className="text-gray-300 hover:text-accent"
              aria-label="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <a
              href={`/admin/pages/${page.id}/sections/${s.id}`}
              className={`${btn} bg-[#0297C7]/10 text-secondary hover:bg-[#0297C7]/20 !py-2`}
            >
              <Pencil className="w-4 h-4" /> Edit
            </a>
          </div>
        );
      })}

      {adding ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary">Choose a section type</h3>
            <button onClick={() => setAdding(false)} className="text-gray-400 text-sm hover:text-primary">
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
            {Object.entries(SECTION_SCHEMAS).map(([type, schema]) => (
              <button
                key={type}
                onClick={async () => {
                  const res = await addSection(page.id, type);
                  if (res.ok) {
                    router.push(`/admin/pages/${page.id}/sections/${res.id}`);
                    router.refresh();
                  } else alert(res.error);
                }}
                className="text-left p-4 rounded-xl border border-gray-200 hover:border-secondary hover:bg-[#0297C7]/5 transition-all"
              >
                <div className="font-semibold text-primary text-sm">{schema.label}</div>
                <div className="text-xs text-gray-400 mt-1">{schema.description}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 font-semibold hover:border-secondary hover:text-secondary transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Section
        </button>
      )}
    </div>
  );
}

export function DeletePageButton({ pageId }: { pageId: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        if (confirm("Delete this page and all its sections? This cannot be undone.")) {
          await deletePage(pageId);
          router.push("/admin/pages");
          router.refresh();
        }
      }}
      className="text-accent text-sm font-semibold hover:underline"
    >
      Delete page
    </button>
  );
}
