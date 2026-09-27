import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared button styling. Colours come from design tokens only.
 * `Button` renders a <button>, `ButtonLink` renders a router <Link>,
 * `ButtonAnchor` renders an external <a> (tel:, wa.me, upi:).
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:brightness-110 shadow-[var(--shadow-soft)]",
        accent: "bg-accent text-accent-foreground hover:brightness-105 shadow-[var(--shadow-soft)]",
        outline: "border border-border bg-card text-foreground hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
        whatsapp: "bg-success text-success-foreground hover:brightness-110",
        onImage:
          "border border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        full: "h-11 w-full px-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonAnchor({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"a"> & Variants) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
