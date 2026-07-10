// Public Supabase credentials (anon key is safe to expose — access is governed by RLS).
// Env vars take precedence; fallbacks let the app run without configuration.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://xlsjxmkcngxdrlabcgxg.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsc2p4bWtjbmd4ZHJsYWJjZ3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MDU4ODksImV4cCI6MjA5OTI4MTg4OX0.Zc-1sHZv8-bUAQJgAG6nPsPLO8OKUPLFvIZ5ZI5N_8c";
