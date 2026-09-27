import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, CreditCard, HeadphonesIcon, MapPin, Train } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { PackageCard } from "@/components/packages/PackageCard";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonLink } from "@/components/common/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { packageQueries } from "@/services/packageService";
import { destinationQueries } from "@/services/destinationService";
import { business, telLink } from "@/data/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MT Holidays — Tour Packages & Travel Planning in Surat" },
      {
        name: "description",
        content:
          "Maa Tarini Tour & Travels in Amroli, Surat. Shimla Manali, Goa and Royal Rajasthan packages, e-railway tickets and flight ticket booking.",
      },
      { property: "og:title", content: "MT Holidays — Tour Packages & Travel Planning in Surat" },
      {
        property: "og:description",
        content: "Plan Shimla Manali, Goa and Rajasthan trips with a travel desk you can talk to.",
      },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(packageQueries.featured()),
      context.queryClient.ensureQueryData(destinationQueries.all()),
    ]);
  },
  component: HomePage,
});

const reasons = [
  {
    icon: Train,
    title: "Authorized e-railway ticket agent",
    description:
      "Train tickets booked through our office, alongside flight tickets for the same trip.",
  },
  {
    icon: HeadphonesIcon,
    title: "You speak to a real person",
    description: `Talk directly to ${business.contactPerson} about dates, budget and changes — no call centre.`,
  },
  {
    icon: MapPin,
    title: "Local office in Amroli, Surat",
    description: "Visit us for planning, documents and payment confirmation whenever you prefer.",
  },
  {
    icon: CreditCard,
    title: "Simple UPI payment",
    description: "Pay by UPI or QR code once your trip and amount are confirmed with us.",
  },
];

function HomePage() {
  const { data: featured } = useSuspenseQuery(packageQueries.featured());
  const { data: destinations } = useSuspenseQuery(destinationQueries.all());

  return (
    <>
      <Hero />

      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured packages"
            title="Trips our customers ask for most"
            description="Starting prices per person. Your final quotation depends on dates, hotel category and group size."
          />
          <ButtonLink to="/packages" variant="outline">
            All packages
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <PackageCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Popular destinations"
            title="Where people travel with us"
            align="center"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((item) => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Why choose us" title="A travel desk, not a booking machine" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="card-surface p-6">
              <reason.icon className="size-6 text-accent-foreground" aria-hidden="true" />
              <h3 className="mt-4 text-lg text-foreground">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <div className="rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl leading-tight sm:text-4xl">
                Tell us your dates. We&apos;ll plan the rest.
              </h2>
              <p className="mt-3 max-w-xl text-primary-foreground/85">
                Share your travel dates, group size and budget. We will come back with a plan and a
                clear price.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink to="/request" variant="accent">
                  Send travel request
                </ButtonLink>
                <WhatsAppButton
                  variant="onImage"
                  message="Hello, I would like to plan a trip. My dates are:"
                />
                <ButtonLink to="/payment" variant="onImage">
                  <CreditCard aria-hidden="true" />
                  Make a payment
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-xl border border-primary-foreground/20 p-6">
              <p className="text-sm font-semibold">{business.legalName}</p>
              <p className="mt-2 text-sm text-primary-foreground/85">
                {business.address.line1}, {business.address.line2},<br />
                {business.address.city}, {business.address.state}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {business.phones.map((phone) => (
                  <li key={phone}>
                    <a href={telLink(phone)} className="underline-offset-4 hover:underline">
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
              >
                Full contact details
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
