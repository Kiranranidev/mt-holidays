import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/business";

/** Persistent WhatsApp shortcut, useful for mobile visitors. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Hello, I would like to enquire about a tour package.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full bg-success text-success-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
