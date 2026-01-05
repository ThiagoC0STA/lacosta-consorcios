export const WHATSAPP_PHONE_NUMBER = "554130761050";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site e gostaria de fazer uma simulação de consórcio.";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;

/**
 * Handles WhatsApp link click with Google Ads conversion tracking
 * @param url - The WhatsApp URL to open
 * @param e - Optional event object to prevent default behavior
 */
export const handleWhatsAppClick = (
  url: string,
  e?: React.MouseEvent<HTMLAnchorElement>
) => {
  if (e) {
    e.preventDefault();
  }

  // @ts-expect-error - gtag_report_conversion is defined globally
  if (typeof window !== "undefined" && typeof window.gtag_report_conversion === "function") {
    // @ts-expect-error - gtag_report_conversion is defined globally
    window.gtag_report_conversion(url);
  } else {
    // Fallback if conversion function is not available
    window.open(url, "_blank", "noopener,noreferrer");
  }
};