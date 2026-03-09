"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HowItWorksDesktopV2 = dynamic(() => import("./HowItWorksDesktopV2"), {
  ssr: false,
});
const HowItWorksMobileV2 = dynamic(() => import("./HowItWorksMobileV2"), {
  ssr: false,
});

export default function HowItWorksV2() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <HowItWorksMobileV2 /> : <HowItWorksDesktopV2 />;
}
