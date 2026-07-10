"use client";

import { Icon as Iconify } from "@iconify/react";

// Brand/logo icons (e.g. "logos:aws") loaded at runtime from the Iconify API.
export default function BrandIcon({ name, className }: { name?: string; className?: string }) {
  if (!name) return null;
  return <Iconify icon={name} className={className} />;
}
