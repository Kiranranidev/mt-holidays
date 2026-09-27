import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { business, telLink, whatsappLink } from "@/data/business";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-sand">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-foreground">MT Holidays</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {business.legalName} — {business.brandTagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Rail tickets, flight tickets and planned holidays arranged from our office in Amroli,
            Surat.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-foreground">Pages</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/packages", label: "Tour Packages" },
              { to: "/destinations", label: "Destinations" },
              { to: "/estimator", label: "Price Estimator" },
              { to: "/request", label: "Travel Request" },
              { to: "/payment", label: "Online Payment" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-foreground">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {business.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-foreground">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-muted-foreground">
            <span className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {business.address.line1},<br />
                {business.address.line2},<br />
                {business.address.city}, {business.address.state}
              </span>
            </span>
            {business.phones.map((phone) => (
              <a
                key={phone}
                href={telLink(phone)}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {phone}
              </a>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
              WhatsApp {business.whatsapp.display}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
          <p>Prices shown are starting prices and are confirmed at the time of booking.</p>
        </div>
      </div>
    </footer>
  );
}
