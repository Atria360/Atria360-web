import { createClient } from "@/lib/supabase/server";
import MediaLibrary from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default async function AdminMedia() {
  const supabase = await createClient();
  const { data: media } = await supabase.from("media").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-2">Media Library</h1>
      <p className="text-gray-500 mb-8">
        Upload images to Supabase Storage, then copy their URL into any image field
      </p>
      <MediaLibrary items={media ?? []} />
    </div>
  );
}
