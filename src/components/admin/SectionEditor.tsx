"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Braces, ExternalLink, ListTree } from "lucide-react";
import SchemaForm from "@/components/admin/SchemaForm";
import { updateSection } from "@/app/actions/admin";
import { SECTION_SCHEMAS } from "@/lib/sectionSchemas";
import type { Json, Section } from "@/lib/types";

export default function SectionEditor({
  section,
  pageSlug,
}: {
  section: Section;
  pageSlug: string;
}) {
  const router = useRouter();
  const schema = SECTION_SCHEMAS[section.type];
  const [content, setContent] = useState<Json>(section.content ?? {});
  const [label, setLabel] = useState(section.label ?? "");
  const [mode, setMode] = useState<"form" | "json">(schema ? "form" : "json");
  const [jsonText, setJsonText] = useState(JSON.stringify(section.content ?? {}, null, 2));
  const [jsonError, setJsonError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    let next = content;
    if (mode === "json") {
      try {
        next = JSON.parse(jsonText);
        setContent(next);
        setJsonError("");
      } catch {
        setJsonError("Invalid JSON — fix it before saving.");
        return;
      }
    }
    setBusy(true);
    const res = await updateSection(section.id, { content: next, label: label || null });
    setBusy(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    } else alert(res.error);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-primary">{schema?.label ?? section.type}</h1>
          <p className="text-gray-400 text-sm">{schema?.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/${pageSlug === "home" ? "" : pageSlug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-secondary hover:bg-[#0297C7]/10"
          >
            Preview <ExternalLink className="w-4 h-4" />
          </a>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setMode("form")}
              className={`px-4 py-2 text-sm font-semibold flex items-center gap-1.5 ${
                mode === "form" ? "bg-primary text-white" : "bg-white text-gray-500"
              }`}
            >
              <ListTree className="w-4 h-4" /> Form
            </button>
            <button
              onClick={() => {
                setJsonText(JSON.stringify(content, null, 2));
                setMode("json");
              }}
              className={`px-4 py-2 text-sm font-semibold flex items-center gap-1.5 ${
                mode === "json" ? "bg-primary text-white" : "bg-white text-gray-500"
              }`}
            >
              <Braces className="w-4 h-4" /> JSON
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          Internal label <span className="font-normal text-gray-400">(shown only in admin)</span>
        </label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm mb-0"
          placeholder={schema?.label}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {mode === "form" && schema ? (
          <SchemaForm fields={schema.fields} value={content} onChange={setContent} />
        ) : (
          <div>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={24}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 font-mono text-xs focus:outline-none focus:border-secondary"
              spellCheck={false}
            />
            {jsonError && <p className="text-accent text-sm font-semibold mt-2">{jsonError}</p>}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 mt-6 py-4 bg-gray-100/90 backdrop-blur flex items-center justify-end gap-4">
        {saved && <span className="text-green-600 font-semibold text-sm">Saved — changes are live ✓</span>}
        <button
          onClick={save}
          disabled={busy}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#003a40] transition-colors disabled:opacity-50"
        >
          {busy ? "Saving..." : "Save Section"}
        </button>
      </div>
    </div>
  );
}
