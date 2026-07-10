"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SchemaForm from "@/components/admin/SchemaForm";
import { saveNavigation } from "@/app/actions/admin";
import type { Field } from "@/lib/sectionSchemas";
import type { Json } from "@/lib/types";

const HEADER_FIELDS: Field[] = [
  {
    key: "items",
    label: "Menu items",
    type: "list",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "href", label: "URL", type: "text" },
      {
        key: "children",
        label: "Dropdown items",
        type: "list",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
    ],
  },
];

const FOOTER_FIELDS: Field[] = [
  {
    key: "items",
    label: "Footer columns",
    type: "list",
    fields: [
      { key: "title", label: "Column title", type: "text" },
      {
        key: "links",
        label: "Links",
        type: "list",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
    ],
  },
];

export default function NavigationEditor({
  initialHeader,
  initialFooter,
}: {
  initialHeader: Json[];
  initialFooter: Json[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"header" | "footer">("header");
  const [header, setHeader] = useState<Record<string, unknown>>({ items: initialHeader });
  const [footer, setFooter] = useState<Record<string, unknown>>({ items: initialFooter });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setBusy(true);
    const value = tab === "header" ? header : footer;
    const res = await saveNavigation(tab, (value.items as Json[]) ?? []);
    setBusy(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    } else alert(res.error);
  }

  return (
    <div>
      <div className="flex rounded-xl border border-gray-200 overflow-hidden w-fit mb-6 bg-white">
        {(["header", "footer"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2.5 text-sm font-semibold capitalize ${
              tab === t ? "bg-primary text-white" : "text-gray-500"
            }`}
          >
            {t} menu
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {tab === "header" ? (
          <SchemaForm fields={HEADER_FIELDS} value={header} onChange={setHeader} />
        ) : (
          <SchemaForm fields={FOOTER_FIELDS} value={footer} onChange={setFooter} />
        )}
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        {saved && <span className="text-green-600 font-semibold text-sm">Saved — live ✓</span>}
        <button
          onClick={save}
          disabled={busy}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#003a40] disabled:opacity-50"
        >
          {busy ? "Saving..." : `Save ${tab} menu`}
        </button>
      </div>
    </div>
  );
}
