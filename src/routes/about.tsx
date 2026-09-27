import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plane, Train, Compass } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonLink } from "@/components/common/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { business } from "@/data/business";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Maa Tarini Tour & Travels — MT Holidays, Surat" },
      {
        name: "description",
        content:
          "Maa Tarini Tour & Travels is a travel agency in Amroli, Surat — authorized e-railway ticket agent, flight ticket booking and MT Holidays travel planning.",
      },
      { property: "og:title", content: "About Maa Tarini Tour & Travels" },
      {
        property: "og:description",
        content: "A travel agency in Amroli, Surat: rail tickets, flight tickets and holidays.",
      },
    ],
  }),
  component: AboutPage,
});

const serviceIcons = [Train, Plane, Compass];

function AboutPage() {
  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="About us"
        title={business.legalName}
        description={`${business.brand} — ${business.brandTagline}. A travel agency operating from Amroli, Surat, Gujarat.`}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-muted-foreground">
          <p className="leading-relaxed">
            {business.legalName} arranges travel for customers from our office in Amroli, Surat. We
            work on train and flight ticketing as well as planned holiday packages under our{" "}
            {business.brand} brand.
          </p>
          <p className="leading-relaxed">
            Enquiries are handled directly by {business.contactPerson}, so you discuss your dates,
            budget and changes with the same person throughout. You can reach us on call or WhatsApp,
            or visit the office in person.
          </p>
          <p className="leading-relaxed">
            Package prices shown on this website are starting prices. The final amount depends on
            your travel dates, hotel category, transport and group size, and is confirmed with you
            before any payment.
          </p>
        </div>

        <div className="card-surface h-fit p-6">
          <h2 className="text-lg text-foreground">Office</h2>
          <address className="mt-3 flex gap-2 text-sm not-italic leading-relaxed text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {business.address.line1},<br />
              {business.address.line2},<br />
              {business.address.city}, {business.address.state}, {business.address.country}
            </span>
          </address>
          <div className="mt-5 flex flex-col gap-2">
            <ButtonLink to="/contact" size="full">
              Contact details
            </ButtonLink>
            <WhatsAppButton size="full" variant="outline" label="Message us" />
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl text-foreground">What we do</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {business.services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Compass;
            return (
              <div key={service} className="card-surface p-6">
                <Icon className="size-6 text-accent-foreground" aria-hidden="true" />
                <h3 className="mt-4 text-lg text-foreground">{service}</h3>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Only the services confirmed by the agency are listed here.
        </p>
      </section>
    </div>
  );
}
