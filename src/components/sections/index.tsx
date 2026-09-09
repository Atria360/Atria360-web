import type { ComponentType } from "react";
import type { Json, Section } from "@/lib/types";
import { HeroHome, HeroPage } from "./heroes";
import { CardCarousel, IconCards, IndustryCards, IndustryLinks, PillGrid, ProductShowcase } from "./cards";
import { ChecklistGroups, ImageTiles, MissionVision, ProductDetail, SplitFeature } from "./features";
import { CtaBanner, ProcessSteps, RichText, StatsBar, TeamCards, Testimonials, Timeline } from "./content";
import { BadgeStrip, CaseStudies, ComparisonTable, LogoGrid, PricingTiers, SpecPanels } from "./commerce";
import { ContactSection, FaqAccordion, FaqTabs, Newsletter } from "./interactive";
import { NoteBlock } from "./notes";
import {
  ArchitectureFlow,
  BlogGrid,
  DevDocs,
  MediaContact,
  MediaLogos,
  NewsCards,
  PressFeatured,
  PressKit,
} from "./special";

// The section registry: every CMS-editable section type maps to a component.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SECTION_REGISTRY: Record<string, ComponentType<{ content: Json }>> = {
  heroHome: HeroHome,
  heroPage: HeroPage,
  iconCards: IconCards,
  cardCarousel: CardCarousel,
  productShowcase: ProductShowcase,
  industryCards: IndustryCards,
  industryLinks: IndustryLinks,
  pillGrid: PillGrid,
  splitFeature: SplitFeature,
  checklistGroups: ChecklistGroups,
  productDetail: ProductDetail,
  missionVision: MissionVision,
  imageTiles: ImageTiles,
  ctaBanner: CtaBanner,
  statsBar: StatsBar,
  processSteps: ProcessSteps,
  timeline: Timeline,
  testimonials: Testimonials,
  teamCards: TeamCards,
  richText: RichText,
  pricingTiers: PricingTiers,
  comparisonTable: ComparisonTable,
  logoGrid: LogoGrid,
  badgeStrip: BadgeStrip,
  caseStudies: CaseStudies,
  specPanels: SpecPanels,
  faqTabs: FaqTabs,
  faqAccordion: FaqAccordion,
  contactSection: ContactSection,
  newsletter: Newsletter,
  blogGrid: BlogGrid as ComponentType<{ content: Json }>,
  pressFeatured: PressFeatured,
  newsCards: NewsCards,
  mediaLogos: MediaLogos,
  pressKit: PressKit,
  mediaContact: MediaContact,
  devDocs: DevDocs,
  architectureFlow: ArchitectureFlow,
  noteBlock: NoteBlock,
};

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => {
        const Cmp = SECTION_REGISTRY[section.type];
        if (!Cmp) return null;
        // An `anchor` on any section makes it a deep-link target, so nav
        // sub-items can point at /services/custom-signage#permits.
        // scroll-mt clears the fixed header.
        const anchor = typeof section.content?.anchor === "string" ? section.content.anchor : "";
        const rendered = <Cmp content={section.content} />;
        return anchor ? (
          <div key={section.id} id={anchor} className="scroll-mt-28">
            {rendered}
          </div>
        ) : (
          <span key={section.id} className="contents">
            {rendered}
          </span>
        );
      })}
    </>
  );
}
