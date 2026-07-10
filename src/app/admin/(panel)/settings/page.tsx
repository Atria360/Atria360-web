import { createClient } from "@/lib/supabase/server";
import SettingsEditor from "@/components/admin/SettingsEditor";
import { DEFAULT_SETTINGS } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "general").single();
  const settings = { ...DEFAULT_SETTINGS, ...((data?.value as object) ?? {}) };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-2">Site Settings</h1>
      <p className="text-gray-500 mb-8">Branding, contact details, socials and legal links — used across the whole site</p>
      <SettingsEditor initial={settings} />
    </div>
  );
}
