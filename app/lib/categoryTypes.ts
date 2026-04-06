export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface CategoryBenefit {
  title: string;
  description: string;
  highlight: string;
}

export interface ComparisonRow {
  label: string;
  financing: string;
  consortium: string;
  winner: "consortium" | "financing" | "tie";
}

export interface CategoryStep {
  title: string;
  description: string;
}

export interface StatHighlight {
  value: string;
  label: string;
  description: string;
}

export interface FeatureCard {
  title: string;
  description: string;
}

export type BenefitsLayout = "list" | "grid" | "bento";
export type ComparisonStyle = "table" | "cards";
export type StepsStyle = "horizontal" | "timeline";

export type SectionType =
  | "stats"
  | "problem-solution"
  | "comparison"
  | "features"
  | "steps"
  | "benefits"
  | "faq"
  | "cross-sell";

export interface CategoryTheme {
  accent: string;
  accentLight: string;
  accentRgb: string;
  gradient: string;
  darkBg: string;
  benefitsLayout: BenefitsLayout;
  comparisonStyle: ComparisonStyle;
  stepsStyle: StepsStyle;
}

export interface CategoryData {
  slug: string;
  name: string;
  shortName: string;
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  calculatorCategory: string;
  benefits: CategoryBenefit[];
  faqs: CategoryFAQ[];
  ctaHeadline: string;
  ctaSub: string;
  ctaStats: string;
  ctaFeatures: string;
  ctaSteps: string;
  introTitle: string;
  introText: string;
  avgSaving: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
  comparison: ComparisonRow[];
  comparisonNote: string;
  steps: CategoryStep[];
  theme: CategoryTheme;
  sectionOrder: SectionType[];
  statsHighlight: StatHighlight[];
  featureTitle: string;
  featureSubtitle: string;
  featureCards: FeatureCard[];
}
