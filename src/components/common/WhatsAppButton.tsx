import { MessageCircle } from "lucide-react";
import type { MouseEvent } from "react";
import { business, whatsappLink } from "@/data/business";
import { ButtonAnchor, buttonVariants } from "./Button";
import type { VariantProps } from "class-variance-authority";

interface WhatsAppButtonProps extends VariantProps<typeof buttonVariants> {
  /** Optional message prefilled in WhatsApp. */
  message?: string | undefined;
  label?: string | undefined;
  className?: string | undefined;
}

const phoneDigits = business.whatsapp.url.replace(/\D/g, "");

/**
 * Opens WhatsApp in a new tab. On computers it goes straight to WhatsApp Web,
 * which avoids the "couldn't open" page shown when the desktop app is missing.
 * On phones it uses wa.me so the WhatsApp app opens.
 */
function openWhatsApp(event: MouseEvent<HTMLAnchorElement>, message?: string) {
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (isMobile) return; // let the normal wa.me link work
  event.preventDefault();
  const text = message ? `&text=${encodeURIComponent(message)}` : "";
  const url = `https://web.whatsapp.com/send?phone=${phoneDigits}${text}`;
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = whatsappLink(message);
}

export function WhatsAppButton({
  message,
  label = "WhatsApp Us",
  variant = "whatsapp",
  size,
  className,
}: WhatsAppButtonProps) {
  return (
    <ButtonAnchor
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => openWhatsApp(event, message)}
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle aria-hidden="true" />
      {label}
    </ButtonAnchor>
  );
}
