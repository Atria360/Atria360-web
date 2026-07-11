"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SchemaForm from "@/components/admin/SchemaForm";
import { changePassword, saveSettings } from "@/app/actions/admin";
import type { Field } from "@/lib/sectionSchemas";
import type { SiteSettings } from "@/lib/types";

const FIELDS: Field[] = [
  { key: "site_name", label: "Site name", type: "text" },
  { key: "tagline", label: "Tagline (used in browser title)", type: "text" },
  { key: "meta_description", label: "Default SEO meta description", type: "textarea" },
  { key: "logo_url", label: "Logo URL", type: "image" },
  { key: "footer_description", label: "Footer description", type: "textarea" },
  { key: "contact_heading", label: "Footer contact column title", type: "text" },
  { key: "email", label: "Contact email", type: "text" },
  { key: "phone", label: "Phone (tel: format, e.g. +14035550123)", type: "text" },
  { key: "phone_display", label: "Phone (display)", type: "text" },
  { key: "address_lines", label: "Address lines", type: "strings" },
  {
    key: "socials",
    label: "Social links",
    type: "list",
    fields: [
      { key: "icon", label: "Icon (lucide name, e.g. linkedin)", type: "icon" },
      { key: "label", label: "Label", type: "text" },
      { key: "href", label: "URL", type: "text" },
    ],
  },
  { key: "cta_label", label: "Header CTA label", type: "text" },
  { key: "cta_href", label: "Header CTA URL", type: "text" },
  { key: "copyright", label: "Copyright line", type: "text" },
  {
    key: "legal_links",
    label: "Legal links",
    type: "list",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "href", label: "URL", type: "text" },
    ],
  },
];

export default function SettingsEditor({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [value, setValue] = useState<Record<string, unknown>>(initial as unknown as Record<string, unknown>);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pw, setPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  async function save() {
    setBusy(true);
    const res = await saveSettings("general", value);
    setBusy(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      router.refresh();
    } else alert(res.error);
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <SchemaForm fields={FIELDS} value={value} onChange={setValue} />
      </div>
      <div className="flex items-center justify-end gap-4">
        {saved && <span className="text-green-600 font-semibold text-sm">Saved — live ✓</span>}
        <button
          onClick={save}
          disabled={busy}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#003a40] disabled:opacity-50"
        >
          {busy ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-primary mb-4">Change admin password</h2>
        <div className="flex gap-3">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="New password (min 8 characters)"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm"
          />
          <button
            onClick={async () => {
              const res = await changePassword(pw);
              setPwMsg(res.ok ? "Password updated ✓" : res.error ?? "Failed");
              if (res.ok) setPw("");
            }}
            disabled={pw.length < 8}
            className="px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg text-sm disabled:opacity-40"
          >
            Update
          </button>
        </div>
        {pwMsg && <p className="text-sm mt-2 text-gray-600">{pwMsg}</p>}
      </div>
    </div>
  );
}
