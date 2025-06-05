"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HowItWorksDesktop = dynamic(() => import("./HowItWorksDesktop"), {
  ssr: false,
});
const HowItWorksMobile = dynamic(() => import("./HowItWorksMobile"), {
  ssr: false,
});

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <HowItWorksMobile /> : <HowItWorksDesktop />;
}
