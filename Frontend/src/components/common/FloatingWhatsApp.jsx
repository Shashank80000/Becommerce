import { MessageCircle } from "lucide-react";
import { business } from "../../utils/siteContent";

export default function FloatingWhatsApp() {
  if (!business.whatsapp) return null;

  return (
    <a
      className="floating-whatsapp"
      href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
        "Hi! I'd like to ask about cleaning products for my business.",
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact CleanWiper on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2.2} />
    </a>
  );
}
