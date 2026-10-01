import { MessageCircle } from "lucide-react";
import { business } from "../../utils/siteContent";
export default function WhatsAppButton({ product, className = "" }) {
  const text = product
    ? `Hi! I'm looking at ${product.name}. Could you tell me the price for my quantity?`
    : "Hi! I'd like to ask about cleaning products for my business.";
  if (!business.whatsapp) return null;
  return (
    <a
      className={`button button-whatsapp ${className}`}
      href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={17} /> Chat on WhatsApp
    </a>
  );
}
