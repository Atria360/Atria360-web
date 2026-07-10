import { createClient } from "@/lib/supabase/server";
import NavigationEditor from "@/components/admin/NavigationEditor";

export const dynamic = "force-dynamic";

export default async function AdminNavigation() {
  const supabase = await createClient();
  const { data } = await supabase.from("navigation").select("*");
  const header = data?.find((n) => n.menu === "header")?.items ?? [];
  const footer = data?.find((n) => n.menu === "footer")?.items ?? [];

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-2">Navigation</h1>
      <p className="text-gray-500 mb-8">Edit the header menu (with dropdowns) and footer link columns</p>
      <NavigationEditor initialHeader={header} initialFooter={footer} />
    </div>
  );
}
