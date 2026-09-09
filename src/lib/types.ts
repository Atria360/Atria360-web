export type Json = Record<string, unknown>;

export interface Page {
  id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  published: boolean;
  sort_order: number;
  updated_at: string;
}

export interface Section {
  id: string;
  page_id: string;
  type: string;
  label: string | null;
  content: Json;
  sort_order: number;
  visible: boolean;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  read_minutes: number | null;
  featured: boolean;
  published: boolean;
  published_at: string;
  updated_at?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string | null;
  source_page: string | null;
  status: "new" | "contacted" | "qualified" | "closed";
  created_at: string;
}

// Recursive so the header can carry grouped menus:
// Services > Technology > IT Infrastructure. A child that itself has
// children is rendered as a column heading in the mega-menu panel.
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  meta_description: string;
  logo_url: string;
  footer_description: string;
  contact_heading: string;
  email: string;
  phone: string;
  phone_display: string;
  address_lines: string[];
  socials: { icon: string; href: string; label: string }[];
  cta_label: string;
  cta_href: string;
  copyright: string;
  legal_links: { label: string; href: string }[];
  head_meta_tags: { name: string; content?: string; value?: string }[];
}
