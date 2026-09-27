import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clock, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { packageQueries } from "@/services/packageService";
import { business, telLink, whatsappLink } from "@/data/business";

export const Route = createFileRoute("/request")({
  validateSearch: (search: Record<string, unknown>) => ({
    package: typeof search["package"] === "string" ? search["package"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Travel Request & Feedback — MT Holidays, Surat" },
      {
        name: "description",
        content:
          "Send your travel dates, group size and requirements to Maa Tarini Tour & Travels. No account needed — we reply on call or WhatsApp.",
      },
      { property: "og:title", content: "Travel Request — MT Holidays" },
      {
        property: "og:description",
        content: "Tell us your dates and requirements and we will plan the trip around them.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(packageQueries.all()),
  component: RequestPage,
});

function RequestPage() {
  const { package: packageSlug } = Route.useSearch();
  const { data: packages } = useSuspenseQuery(packageQueries.all());

  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Travel request"
        title="Tell us about your trip"
        description="Share your dates and requirements, or send us feedback about a trip you have already taken. No account or login is needed."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <EnquiryForm packages={packages} defaultPackageSlug={packageSlug} />

        <aside className="space-y-4">
          <div className="card-surface p-6">
            <h2 className="text-lg text-foreground">Prefer to talk?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Speak directly to {business.contactPerson}.
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {business.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telLink(phone)}
                    className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent-foreground"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent-foreground"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp {business.whatsapp.display}
                </a>
              </li>
            </ul>
          </div>

          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-lg text-foreground">
              <Clock className="size-5 text-accent-foreground" aria-hidden="true" />
              What happens next
            </h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>1. We check availability for your dates.</li>
              <li>2. We share a plan and a clear price.</li>
              <li>3. You confirm, and only then do you pay.</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
