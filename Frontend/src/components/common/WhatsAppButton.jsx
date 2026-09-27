import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../../utils/mockData";
export default function WhatsAppButton({ product, className = "" }) {
  const text = product
    ? `Hello, I am interested in ${product.name}. I would like more information about bulk pricing.`
    : "Hello, I would like to know more about your cleaning products and bulk supply.";
  return (
    <a
      className={`button button-whatsapp ${className}`}
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={17} /> WhatsApp Us
    </a>
  );
}
