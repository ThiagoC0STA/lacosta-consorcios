"use client";

import { Toaster } from "react-hot-toast";
import Hero from "./components/Hero";

import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import UrgencySection from "./components/UrgencySection";
// import UrgencyPopup from "./components/UrgencyPopup";
import PartnersSection from "./components/PartnersSection";
import VideoReelsSection from "./components/VideoReelsSection";

export default function Home() {
  return (
    <main className="relative">
      <Toaster position="top-right" />
      <Hero />
      <VideoReelsSection />
      <PartnersSection />

      <Benefits />
      <UrgencySection />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      {/* <UrgencyPopup /> */}
    </main>
  );
}
