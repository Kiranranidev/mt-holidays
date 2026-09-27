import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { business, telLink } from "@/data/business";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-lg bg-primary font-display text-base text-primary-foreground">
            MT
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-foreground">MT Holidays</span>
            <span className="block text-[0.7rem] tracking-wide text-muted-foreground">
              Maa Tarini Tour &amp; Travels
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-foreground" }}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonAnchor
            href={telLink(business.phones[0])}
            variant="outline"
            size="sm"
            aria-label={`Call ${business.phones[0]}`}
          >
            <Phone aria-hidden="true" />
            {business.phones[0]}
          </ButtonAnchor>
          <ButtonLink to="/request" size="sm">
            Plan Your Trip
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile navigation" className="container-page flex flex-col py-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium text-muted-foreground last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 pb-4">
              <ButtonLink to="/request" size="full" onClick={() => setOpen(false)}>
                Plan Your Trip
              </ButtonLink>
              <ButtonAnchor href={telLink(business.phones[0])} variant="outline" size="full">
                <Phone aria-hidden="true" />
                Call {business.phones[0]}
              </ButtonAnchor>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
