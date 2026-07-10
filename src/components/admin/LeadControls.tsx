"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Trash2 } from "lucide-react";
import { deleteLead, updateLeadStatus } from "@/app/actions/admin";
import type { Lead } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-[#0297C7]/10 text-[#0297C7]",
  contacted: "bg-[#FCD727]/20 text-yellow-700",
  qualified: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export function LeadRow({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center gap-4 text-left">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-primary">{lead.name}</div>
          <div className="text-sm text-gray-500 truncate">
            {lead.email}
            {lead.company ? ` · ${lead.company}` : ""}
          </div>
        </div>
        <div className="hidden md:block text-sm text-gray-400">{lead.service}</div>
        <div className="text-sm text-gray-400 whitespace-nowrap">
          {new Date(lead.created_at).toLocaleDateString()}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${STATUS_STYLES[lead.status]}`}>
          {lead.status}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-300 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 border-t border-gray-100 pt-4">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
            {lead.phone && (
              <div>
                <dt className="text-gray-400 text-xs uppercase font-bold">Phone</dt>
                <dd className="text-gray-700">{lead.phone}</dd>
              </div>
            )}
            {lead.source_page && (
              <div>
                <dt className="text-gray-400 text-xs uppercase font-bold">Source page</dt>
                <dd className="text-gray-700 font-mono text-xs">{lead.source_page}</dd>
              </div>
            )}
          </dl>
          {lead.message && (
            <p className="text-gray-600 text-sm bg-gray-50 rounded-xl p-4 mb-4">{lead.message}</p>
          )}
          <div className="flex items-center gap-3">
            {(["new", "contacted", "qualified", "closed"] as const).map((s) => (
              <button
                key={s}
                onClick={async () => {
                  await updateLeadStatus(lead.id, s);
                  router.refresh();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  lead.status === s ? STATUS_STYLES[s] : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={async () => {
                if (confirm("Delete this lead?")) {
                  await deleteLead(lead.id);
                  router.refresh();
                }
              }}
              className="ml-auto text-gray-300 hover:text-accent"
              aria-label="Delete lead"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
