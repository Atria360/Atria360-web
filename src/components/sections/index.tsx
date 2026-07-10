import type { ComponentType } from "react";
import type { Json, Section } from "@/lib/types";
import { HeroHome, HeroPage } from "./heroes";
import { CardCarousel, IconCards, IndustryCards, IndustryLinks, ProductShowcase } from "./cards";
import { ChecklistGroups, ImageTiles, MissionVision, ProductDetail, SplitFeature } from "./features";
import { CtaBanner, ProcessSteps, RichText, StatsBar, TeamCards, Testimonials, Timeline } from "./content";
import { BadgeStrip, CaseStudies, ComparisonTable, LogoGrid, PricingTiers, SpecPanels } from "./commerce";
import { ContactSection, FaqAccordion, FaqTabs, Newsletter } from "./interactive";
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
};

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => {
        const Cmp = SECTION_REGISTRY[section.type];
        if (!Cmp) return null;
        return <Cmp key={section.id} content={section.content} />;
      })}
    </>
  );
}
