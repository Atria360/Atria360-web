// Field schemas for every section type. The admin panel generates edit forms
// from these definitions, so every piece of content is editable without code.

export type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "icon"
    | "image"
    | "boolean"
    | "number"
    | "select"
    | "link"
    | "strings"
    | "list"
    | "object"
    | "code";
  options?: string[];
  fields?: Field[];
  help?: string;
};

export type SectionSchema = {
  label: string;
  description: string;
  fields: Field[];
};

const COLORS = ["cyan", "orange", "gold", "teal", "brightcyan"];
const THEMES = ["white", "light", "gray", "dark", "black", "teal"];

const link = (key: string, label: string): Field => ({
  key,
  label,
  type: "link",
  fields: [
    { key: "label", label: "Label", type: "text" },
    { key: "href", label: "URL", type: "text" },
  ],
});

const color = (key = "color", label = "Accent color"): Field => ({
  key,
  label,
  type: "select",
  options: COLORS,
});

const theme = (options = THEMES): Field => ({
  key: "theme",
  label: "Background theme",
  type: "select",
  options,
});

const HEADING_HELP =
  "Color markers: [[c:text]]=cyan, [[o:text]]=orange, [[y:text]]=yellow, [[t:text]]=teal. Use | for a line break.";

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  heroHome: {
    label: "Hero — Home",
    description: "Full-screen animated hero with CTAs and trust chips",
    fields: [
      { key: "title", label: "Title", type: "textarea", help: HEADING_HELP },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      link("primaryCta", "Primary CTA"),
      link("secondaryCta", "Secondary CTA"),
      {
        key: "chips",
        label: "Trust chips",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "label", label: "Label", type: "text" },
          color(),
        ],
      },
    ],
  },
  heroPage: {
    label: "Hero — Page",
    description: "Dark gradient page hero with badge, CTAs and stats",
    fields: [
      {
        key: "badge",
        label: "Badge",
        type: "object",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "title", label: "Title", type: "textarea", help: HEADING_HELP },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      link("primaryCta", "Primary CTA"),
      link("secondaryCta", "Secondary CTA"),
      { key: "align", label: "Alignment", type: "select", options: ["left", "center"] },
      {
        key: "stats",
        label: "Stat chips",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          color(),
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
    ],
  },
  iconCards: {
    label: "Icon Card Grid",
    description: "Universal grid of icon cards (features, problems, values, benefits...)",
    fields: [
      { key: "kicker", label: "Kicker", type: "text" },
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      { key: "center", label: "Center heading", type: "boolean" },
      theme(),
      { key: "columns", label: "Columns", type: "number" },
      {
        key: "style",
        label: "Card style",
        type: "select",
        options: ["plain", "accent-left", "accent-top", "glow", "centered", "row"],
      },
      {
        key: "cards",
        label: "Cards",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          color(),
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "label", label: "Small label above title", type: "text" },
          { key: "checks", label: "Checklist items", type: "strings" },
          { key: "subtext", label: "Highlighted subtext", type: "text" },
          link("link", "Link"),
        ],
      },
    ],
  },
  cardCarousel: {
    label: "Service Card Carousel",
    description: "Horizontally scrolling gradient service cards",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "cards",
        label: "Cards",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "textarea", help: "Use | for line break" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "gradient", label: "Gradient (1-5)", type: "number" },
          link("link", "Link"),
        ],
      },
    ],
  },
  productShowcase: {
    label: "Product Showcase",
    description: "Large image product cards on black",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "products",
        label: "Products",
        type: "list",
        fields: [
          { key: "badge", label: "Badge", type: "text" },
          { key: "badgeColor", label: "Badge color", type: "select", options: ["orange", "cyan"] },
          { key: "name", label: "Name", type: "text" },
          { key: "image", label: "Image", type: "image" },
          { key: "text", label: "Text", type: "textarea" },
          link("link", "Link"),
        ],
      },
    ],
  },
  industryCards: {
    label: "Industry Cards",
    description: "Big gradient industry cards (industries hub)",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "cards",
        label: "Cards",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "linkLabel", label: "Link label", type: "text" },
          { key: "href", label: "Link URL", type: "text" },
          { key: "gradient", label: "Gradient (1-5)", type: "number" },
        ],
      },
    ],
  },
  pillGrid: {
    label: "Pill Grid",
    description: "Compact icon pills — great for 'Industries We Serve' strips",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      {
        key: "pills",
        label: "Pills",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "label", label: "Label", type: "text" },
          color(),
        ],
      },
    ],
  },
  industryLinks: {
    label: "Industry Link List",
    description: "Home page industry links with big heading",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      link("link", "See-all link"),
      {
        key: "industries",
        label: "Industries",
        type: "list",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
        ],
      },
    ],
  },
  splitFeature: {
    label: "Split Feature",
    description: "Two-column: text/features beside image or card stack",
    fields: [
      { key: "kicker", label: "Kicker", type: "text" },
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "paragraphs", label: "Paragraphs", type: "strings" },
      {
        key: "features",
        label: "Icon features",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          color(),
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
        ],
      },
      link("link", "Arrow link"),
      link("primaryCta", "Primary CTA"),
      link("secondaryCta", "Secondary CTA"),
      { key: "visual", label: "Visual", type: "select", options: ["image", "cards"] },
      { key: "image", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text" },
      {
        key: "imageOverlay",
        label: "Image overlay",
        type: "object",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
        ],
      },
      {
        key: "imageBadge",
        label: "Image badge",
        type: "object",
        fields: [
          { key: "label", label: "Big label", type: "text" },
          { key: "sub", label: "Sub label", type: "text" },
        ],
      },
      { key: "reverse", label: "Reverse columns", type: "boolean" },
      theme(),
    ],
  },
  checklistGroups: {
    label: "Checklist Groups",
    description: "Numbered checklist groups or two large pillar cards",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      { key: "layout", label: "Layout", type: "select", options: ["rows", "pillars"] },
      {
        key: "groups",
        label: "Groups",
        type: "list",
        fields: [
          { key: "kicker", label: "Kicker (e.g. 01.)", type: "text" },
          { key: "title", label: "Title", type: "textarea" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "icon", label: "Icon (pillars)", type: "icon" },
          color(),
          { key: "checks", label: "Checklist", type: "strings" },
        ],
      },
    ],
  },
  productDetail: {
    label: "Product Detail",
    description: "Deep-dive product split with feature checks (Punch / DOMS)",
    fields: [
      {
        key: "badge",
        label: "Badge",
        type: "object",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "color", label: "Accent", type: "select", options: ["orange", "cyan"] },
      { key: "name", label: "Product name", type: "text" },
      { key: "text", label: "Description", type: "textarea" },
      { key: "features", label: "Feature checks", type: "strings" },
      { key: "idealFor", label: "Ideal for", type: "text" },
      link("primaryCta", "Primary CTA"),
      link("docsLink", "Docs link"),
      { key: "image", label: "Image", type: "image" },
      { key: "reverse", label: "Reverse columns", type: "boolean" },
      theme(["white", "gray"]),
    ],
  },
  missionVision: {
    label: "Mission & Vision",
    description: "Split black/teal statement panels",
    fields: [
      {
        key: "panels",
        label: "Panels",
        type: "list",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "titleColor", label: "Title color", type: "select", options: COLORS },
          { key: "text", label: "Text", type: "textarea" },
          { key: "bg", label: "Background", type: "select", options: ["black", "teal"] },
        ],
      },
    ],
  },
  imageTiles: {
    label: "Image Tiles",
    description: "Square image tiles with captions (culture)",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "tiles",
        label: "Tiles",
        type: "list",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "caption", label: "Caption", type: "text" },
        ],
      },
    ],
  },
  ctaBanner: {
    label: "CTA Banner",
    description: "Full-width call-to-action with side bar",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      link("primaryCta", "Primary CTA"),
      link("secondaryCta", "Secondary CTA"),
      { key: "theme", label: "Background", type: "select", options: ["teal", "black"] },
      { key: "barColor", label: "Side bar color", type: "select", options: ["orange", "cyan"] },
    ],
  },
  statsBar: {
    label: "Stats / Metrics",
    description: "Metric cards with big numbers",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      {
        key: "stats",
        label: "Stats",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "value", label: "Value", type: "text" },
          { key: "suffix", label: "Suffix (%, hrs)", type: "text" },
          { key: "label", label: "Label", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
          color(),
        ],
      },
    ],
  },
  processSteps: {
    label: "Process Steps",
    description: "Numbered step cards",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      {
        key: "steps",
        label: "Steps",
        type: "list",
        fields: [
          { key: "icon", label: "Icon (optional, else number)", type: "icon" },
          color(),
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "timeline", label: "Timeline", type: "text" },
          { key: "deliverable", label: "Deliverable", type: "text" },
        ],
      },
    ],
  },
  timeline: {
    label: "Timeline",
    description: "Vertical year timeline",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      {
        key: "items",
        label: "Milestones",
        type: "list",
        fields: [
          { key: "year", label: "Year", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          color(),
        ],
      },
    ],
  },
  testimonials: {
    label: "Testimonials",
    description: "Quote cards or one large quote",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      { key: "layout", label: "Layout", type: "select", options: ["grid", "single"] },
      {
        key: "quotes",
        label: "Quotes",
        type: "list",
        fields: [
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "badge", label: "Badge", type: "text" },
          { key: "badgeColor", label: "Badge color", type: "select", options: COLORS },
          { key: "metric", label: "Metric", type: "text" },
          { key: "metricNote", label: "Metric note", type: "text" },
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "initials", label: "Initials", type: "text" },
          { key: "image", label: "Photo", type: "image" },
          { key: "stars", label: "Show 5 stars", type: "boolean" },
        ],
      },
    ],
  },
  teamCards: {
    label: "Team Cards",
    description: "Founder / team member cards",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "members",
        label: "Members",
        type: "list",
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "bio", label: "Bio", type: "textarea" },
          { key: "image", label: "Photo", type: "image" },
          { key: "linkedin", label: "LinkedIn URL", type: "text" },
        ],
      },
    ],
  },
  richText: {
    label: "Rich Text",
    description: "Free-form HTML content block",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "html", label: "HTML content", type: "code" },
      theme(),
    ],
  },
  pricingTiers: {
    label: "Pricing Tiers",
    description: "Pricing/plan cards",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      {
        key: "tiers",
        label: "Tiers",
        type: "list",
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
          { key: "price", label: "Price", type: "text" },
          { key: "priceNote", label: "Price note", type: "text" },
          { key: "timeline", label: "Timeline note", type: "text" },
          { key: "badge", label: "Badge (e.g. Most Popular)", type: "text" },
          { key: "accent", label: "Accent", type: "select", options: COLORS },
          { key: "featured", label: "Featured", type: "boolean" },
          { key: "plusLabel", label: "'Everything in X, plus' label", type: "text" },
          { key: "features", label: "Features", type: "strings" },
          link("cta", "CTA"),
          { key: "ctaStyle", label: "CTA style", type: "select", options: ["solid", "outline"] },
        ],
      },
    ],
  },
  comparisonTable: {
    label: "Comparison Table",
    description: "Plan feature comparison (use 'yes'/'no' or text for cells)",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      { key: "columns", label: "Plan columns", type: "strings" },
      {
        key: "groups",
        label: "Feature groups",
        type: "list",
        fields: [
          { key: "name", label: "Group name", type: "text" },
          {
            key: "rows",
            label: "Rows",
            type: "list",
            fields: [
              { key: "label", label: "Feature", type: "text" },
              { key: "values", label: "Values (yes/no/text per column)", type: "strings" },
            ],
          },
        ],
      },
    ],
  },
  logoGrid: {
    label: "Logo Grid",
    description: "Brand logo strip / tech cards / labeled partner grid",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      { key: "layout", label: "Layout", type: "select", options: ["strip", "cards", "labeled"] },
      { key: "footnote", label: "Footnote", type: "textarea" },
      {
        key: "items",
        label: "Logos",
        type: "list",
        fields: [
          { key: "icon", label: "Iconify icon (e.g. logos:aws)", type: "text" },
          { key: "name", label: "Name", type: "text" },
          { key: "text", label: "Description (cards)", type: "textarea" },
          { key: "category", label: "Category (labeled)", type: "text" },
        ],
      },
    ],
  },
  badgeStrip: {
    label: "Badge Strip",
    description: "Compliance/trust badges on dark band",
    fields: [
      {
        key: "items",
        label: "Badges",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
    ],
  },
  caseStudies: {
    label: "Case Studies",
    description: "Challenge / solution / result stories with images",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "cases",
        label: "Cases",
        type: "list",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "badge", label: "Badge", type: "text" },
          { key: "badgeColor", label: "Badge color", type: "select", options: COLORS },
          { key: "title", label: "Title", type: "text" },
          { key: "challenge", label: "Challenge", type: "textarea" },
          { key: "solution", label: "Solution", type: "textarea" },
          { key: "result", label: "Result", type: "textarea" },
        ],
      },
    ],
  },
  specPanels: {
    label: "Spec Panels",
    description: "Key/value technical specification panels",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      link("link", "Side link"),
      {
        key: "panels",
        label: "Panels",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          {
            key: "rows",
            label: "Rows",
            type: "list",
            fields: [
              { key: "label", label: "Label", type: "text" },
              { key: "value", label: "Value", type: "text" },
            ],
          },
        ],
      },
    ],
  },
  faqTabs: {
    label: "FAQ — Tabs & Search",
    description: "Searchable FAQ with category tabs",
    fields: [
      {
        key: "categories",
        label: "Categories",
        type: "list",
        fields: [
          { key: "name", label: "Category name", type: "text" },
          { key: "color", label: "Color", type: "select", options: ["cyan", "orange", "gold", "white"] },
          {
            key: "items",
            label: "Questions",
            type: "list",
            fields: [
              { key: "q", label: "Question", type: "text" },
              { key: "a", label: "Answer", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },
  faqAccordion: {
    label: "FAQ — Simple Accordion",
    description: "Light accordion Q&A list",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "items",
        label: "Questions",
        type: "list",
        fields: [
          { key: "q", label: "Question", type: "text" },
          { key: "a", label: "Answer", type: "textarea" },
        ],
      },
    ],
  },
  contactSection: {
    label: "Contact Form",
    description: "Consultation form (stores leads) + direct contact cards",
    fields: [
      { key: "formHeading", label: "Form heading", type: "text" },
      { key: "industries", label: "Industry options", type: "strings" },
      { key: "needs", label: "Primary need options", type: "strings" },
      { key: "submitLabel", label: "Submit button label", type: "text" },
      {
        key: "direct",
        label: "Direct contact cards",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "select", options: ["mail", "phone", "map-pin", "clock"] },
          { key: "title", label: "Title", type: "text" },
          { key: "value", label: "Value", type: "text" },
          { key: "href", label: "Link (mailto:/tel:)", type: "text" },
        ],
      },
      { key: "socialHeading", label: "Social box heading", type: "text" },
      { key: "socialText", label: "Social box text", type: "textarea" },
    ],
  },
  newsletter: {
    label: "Newsletter Signup",
    description: "Email capture banner (stores as newsletter lead)",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "sub", label: "Subheading", type: "textarea" },
      { key: "buttonLabel", label: "Button label", type: "text" },
    ],
  },
  blogGrid: {
    label: "Blog Grid",
    description: "Dynamic grid of published blog posts",
    fields: [
      { key: "showFeatured", label: "Show featured article", type: "boolean" },
      { key: "featuredLabel", label: "Featured badge label", type: "text" },
      { key: "readLabel", label: "Read link label", type: "text" },
      { key: "emptyText", label: "Empty state text", type: "text" },
    ],
  },
  pressFeatured: {
    label: "Press — Featured Story",
    description: "Dark featured press story with image",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "date", label: "Date", type: "text" },
      { key: "title", label: "Title", type: "textarea", help: HEADING_HELP },
      { key: "text", label: "Text", type: "textarea" },
      link("cta", "CTA"),
      { key: "image", label: "Image", type: "image" },
    ],
  },
  newsCards: {
    label: "Press — News Cards",
    description: "News/announcement cards",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "items",
        label: "News items",
        type: "list",
        fields: [
          { key: "badge", label: "Badge", type: "text" },
          { key: "badgeColor", label: "Badge color", type: "select", options: COLORS },
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "date", label: "Date", type: "text" },
          link("link", "Link"),
        ],
      },
    ],
  },
  mediaLogos: {
    label: "Press — Publication Logos",
    description: "'As featured in' text logos",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      { key: "names", label: "Publication names", type: "strings" },
    ],
  },
  pressKit: {
    label: "Press — Press Kit",
    description: "Downloadable asset columns",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      {
        key: "columns",
        label: "Columns",
        type: "list",
        fields: [
          { key: "title", label: "Column title", type: "text" },
          {
            key: "items",
            label: "Files",
            type: "list",
            fields: [
              { key: "icon", label: "Icon", type: "icon" },
              { key: "name", label: "Name", type: "text" },
              { key: "meta", label: "Meta (e.g. ZIP 12 MB)", type: "text" },
              { key: "href", label: "Download URL", type: "text" },
            ],
          },
        ],
      },
    ],
  },
  mediaContact: {
    label: "Press — Media Contact",
    description: "Media inquiries card + newsletter side text",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "name", label: "Contact name", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "image", label: "Photo", type: "image" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone (tel format)", type: "text" },
      { key: "phoneDisplay", label: "Phone (display)", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "note", label: "Note", type: "text" },
      { key: "sideHeading", label: "Side heading", type: "text" },
      { key: "sideText", label: "Side text", type: "textarea" },
    ],
  },
  devDocs: {
    label: "Developer Docs",
    description: "API facts + code sample blocks",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "sub", label: "Subheading", type: "textarea" },
      theme(),
      {
        key: "blocks",
        label: "Blocks",
        type: "list",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "color", label: "Color", type: "select", options: COLORS },
          { key: "codeTitle", label: "Code window title", type: "text" },
          { key: "code", label: "Code", type: "code" },
          {
            key: "facts",
            label: "Facts",
            type: "list",
            fields: [
              { key: "label", label: "Bold label", type: "text" },
              { key: "text", label: "Text", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },
  architectureFlow: {
    label: "Architecture Flow",
    description: "Node → node → node architecture diagram",
    fields: [
      { key: "heading", label: "Heading", type: "textarea", help: HEADING_HELP },
      { key: "footnote", label: "Footnote", type: "textarea" },
      {
        key: "nodes",
        label: "Nodes",
        type: "list",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          color(),
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "text" },
        ],
      },
    ],
  },
};

export const SECTION_TYPES = Object.keys(SECTION_SCHEMAS);
