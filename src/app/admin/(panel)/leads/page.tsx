import { createClient } from "@/lib/supabase/server";
import { LeadRow } from "@/components/admin/LeadControls";
import type { Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-2">Leads</h1>
      <p className="text-gray-500 mb-8">Consultation requests and newsletter signups from the website</p>

      <div className="space-y-3">
        {(leads ?? []).map((l) => (
          <LeadRow key={l.id} lead={l as Lead} />
        ))}
        {(leads ?? []).length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
            No leads yet. Submissions from the contact form and newsletter will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
