"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { deleteMedia, registerMedia } from "@/app/actions/admin";

type MediaItem = { id: string; path: string; url: string; alt: string | null; created_at: string };

export default function MediaLibrary({ items }: { items: MediaItem[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    const supabase = createClient();
    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) {
        alert(`Upload failed: ${error.message}`);
        continue;
      }
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      await registerMedia(path, data.publicUrl, file.name);
    }
    setBusy(false);
    router.refresh();
  }

  return (
    <div>
      <button
        onClick={() => fileRef.current?.click()}
        disabled={busy}
        className="w-full py-10 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 font-semibold hover:border-secondary hover:text-secondary transition-all flex flex-col items-center gap-2 mb-8 bg-white disabled:opacity-50"
      >
        <Upload className="w-8 h-8" />
        {busy ? "Uploading..." : "Click to upload images"}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => upload(e.target.files)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
            <div className="aspect-square bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.alt ?? ""} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(m.url);
                  setCopied(m.id);
                  setTimeout(() => setCopied(null), 1500);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
              >
                {copied === m.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === m.id ? "Copied!" : "Copy URL"}
              </button>
              <button
                onClick={async () => {
                  if (confirm("Delete this image?")) {
                    await deleteMedia(m.id, m.path);
                    router.refresh();
                  }
                }}
                className="text-gray-300 hover:text-accent"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-center text-gray-400 py-6">No uploads yet.</p>
      )}
    </div>
  );
}
