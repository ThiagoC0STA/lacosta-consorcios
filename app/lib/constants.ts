export const WHATSAPP_PHONE_NUMBER = "554130761050";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site e gostaria de fazer uma simulação de consórcio.";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;

const SECTION_MESSAGES: Record<string, string> = {
  benefits_section:
    "Olá! Vi as vantagens do consórcio sem juros no site e gostaria de saber quanto posso economizar.",
  investment_mindset:
    "Olá! Quero entender melhor como o consórcio funciona como investimento. Podem me ajudar?",
  how_it_works:
    "Olá! Vi como funciona o consórcio no site e quero começar. Podem me orientar?",
  how_it_works_mobile:
    "Olá! Vi como funciona o consórcio no site e quero começar. Podem me orientar?",
  faq:
    "Olá! Estava lendo as perguntas frequentes sobre consórcio e gostaria de tirar mais dúvidas.",
  urgency_section:
    "Olá! Vi a consultoria gratuita no site e gostaria de aproveitar. Podem me atender?",
  floating_button:
    "Olá! Vim pelo site e gostaria de falar com um especialista em consórcio.",
  footer:
    "Olá! Vim pelo site da Lacosta e gostaria de mais informações sobre consórcio.",
  exit_intent:
    "Olá! Quase saí do site, mas decidi simular um consórcio. Podem me ajudar?",
  sticky_cta:
    "Olá! Vim pelo site e gostaria de simular um consórcio gratuitamente.",
};

export function buildWhatsAppLink(source?: string): string {
  const msg = (source && SECTION_MESSAGES[source]) || WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/**
 * Handles WhatsApp link click with Google Ads conversion tracking
 * @param url - The WhatsApp URL to open
 * @param e - Optional event object to prevent default behavior
 * @param source - Source of the click for tracking purposes
 */
export const handleWhatsAppClick = (
  url: string,
  e?: React.MouseEvent<HTMLAnchorElement>,
  source?: string
) => {
  if (e) {
    e.preventDefault();
  }

  const contextualUrl = source ? buildWhatsAppLink(source) : url;

  if (source && typeof window !== "undefined") {
    import("./analytics").then(({ trackWhatsAppClick }) => {
      trackWhatsAppClick(source);
    });
  }

  if (typeof window !== "undefined") {
    // @ts-expect-error - gtag_report_conversion is defined globally
    if (typeof window.gtag_report_conversion === "function") {
      // @ts-expect-error - gtag_report_conversion is defined globally
      window.gtag_report_conversion(contextualUrl);
    }
    window.open(contextualUrl, "_blank", "noopener,noreferrer");
  }
};