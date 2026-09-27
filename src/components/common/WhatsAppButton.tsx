import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/business";
import { ButtonAnchor, buttonVariants } from "./Button";
import type { VariantProps } from "class-variance-authority";

interface WhatsAppButtonProps extends VariantProps<typeof buttonVariants> {
  /** Optional message prefilled in WhatsApp. */
  message?: string;
  label?: string;
  className?: string;
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
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle aria-hidden="true" />
      {label}
    </ButtonAnchor>
  );
}
