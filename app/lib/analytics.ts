/**
 * Google Analytics 4 Event Tracking
 * 
 * To get your GA4 Measurement ID:
 * 1. Go to https://analytics.google.com/
 * 2. Create a new property or select existing one
 * 3. Go to Admin > Data Streams > Web
 * 4. Copy your Measurement ID (format: G-XXXXXXXXXX)
 * 5. Add it to your .env.local file as NEXT_PUBLIC_GA4_ID
 */

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// GA4 Measurement ID
export const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_ID || "G-DDKE5B2QJ6";

/**
 * Track page views
 */
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA4_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom events
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track WhatsApp clicks
 */
export const trackWhatsAppClick = (source: string) => {
  event({
    action: "whatsapp_click",
    category: "engagement",
    label: source,
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: "button_click",
    category: "engagement",
    label: `${buttonName}_${location}`,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName: string) => {
  event({
    action: "form_submit",
    category: "conversion",
    label: formName,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  event({
    action: "scroll",
    category: "engagement",
    label: `${depth}%`,
    value: depth,
  });
};

/**
 * Track calculator interactions
 */
export const trackCalculatorInteraction = (
  action: string,
  details?: Record<string, any>
) => {
  event({
    action: `calculator_${action}`,
    category: "engagement",
    label: JSON.stringify(details),
  });
};

/**
 * Track section views (when user scrolls to a section)
 */
export const trackSectionView = (sectionName: string) => {
  event({
    action: "section_view",
    category: "engagement",
    label: sectionName,
  });
};

