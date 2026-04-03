"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HowItWorksDesktopV2 = dynamic(() => import("./HowItWorksDesktopV2"), {
  ssr: true,
});
const HowItWorksMobileV2 = dynamic(() => import("./HowItWorksMobileV2"), {
  ssr: true,
});

export default function HowItWorksV2() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile === null) {
    return (
      <>
        <div className="hidden md:block">
          <HowItWorksDesktopV2 />
        </div>
        <div className="md:hidden">
          <HowItWorksMobileV2 />
        </div>
      </>
    );
  }

  return isMobile ? <HowItWorksMobileV2 /> : <HowItWorksDesktopV2 />;
}
