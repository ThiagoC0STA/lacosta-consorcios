"use client";

import { Toaster } from "react-hot-toast";
import HeroV2 from "./components/HeroV2";

import BenefitsV2 from "./components/BenefitsV2";
import InvestmentMindsetSectionV2 from "./components/InvestmentMindsetSectionV2";
import HowItWorksV2 from "./components/HowItWorksV2";
import TestimonialsV2 from "./components/TestimonialsV2";
import FAQV2 from "./components/FAQV2";
import ContactV2 from "./components/ContactV2";
import Footer from "./components/Footer";
import UrgencySectionV2 from "./components/UrgencySectionV2";
// import UrgencyPopup from "./components/UrgencyPopup";
import PartnersSectionV2 from "./components/PartnersSectionV2";
import VideoReelsSectionV2 from "./components/VideoReelsSectionV2";
import OpportunitiesCarouselV2 from "./components/OpportunitiesCarouselV2";

export default function Home() {
  return (
    <main className="relative">
      <Toaster position="top-right" />
      <HeroV2 />

      <InvestmentMindsetSectionV2 />
      <PartnersSectionV2 />
      <BenefitsV2 />
      {/* <UrgencySectionV2 /> */}
      <HowItWorksV2 />
      <TestimonialsV2 />
      <FAQV2 />
      <ContactV2 />
      <VideoReelsSectionV2 />
      <Footer />
      {/* <UrgencyPopup /> */}
    </main>
  );
}
