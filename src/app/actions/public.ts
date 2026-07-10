"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitLead(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  source_page?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!formData.name?.trim() || !formData.email?.trim()) {
    return { ok: false, error: "Name and email are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({
      name: formData.name.trim().slice(0, 200),
      email: formData.email.trim().slice(0, 200),
      phone: formData.phone?.trim().slice(0, 50) || null,
      company: formData.company?.trim().slice(0, 200) || null,
      service: formData.service?.slice(0, 100) || null,
      message: formData.message?.trim().slice(0, 5000) || null,
      source_page: formData.source_page?.slice(0, 200) || null,
    });
    if (error) return { ok: false, error: "Something went wrong. Please try again." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
