import { createFileRoute } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ButtonAnchor, ButtonLink } from "@/components/common/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { business, fullAddress, telLink } from "@/data/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Maa Tarini Tour & Travels — Amroli, Surat" },
      {
        name: "description",
        content:
          "Call +91 98252 87153 or WhatsApp +91 93778 43778. Office: Shop No. 13, Shree Ganesh Residency, Ganeshpura, Amroli, Surat, Gujarat.",
      },
      { property: "og:title", content: "Contact MT Holidays — Amroli, Surat" },
      {
        property: "og:description",
        content: "Phone numbers, WhatsApp and office address for Maa Tarini Tour & Travels.",
      },
    ],
  }),
  component: ContactPage,
});

const mapQuery = encodeURIComponent(fullAddress);

function ContactPage() {
  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Talk to our travel desk"
        description={`Speak directly to ${business.contactPerson} about tickets, packages and payments.`}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="card-surface p-6">
            <h2 className="text-lg text-foreground">{business.legalName}</h2>
            <address className="mt-3 flex gap-2 text-sm not-italic leading-relaxed text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {business.address.line1},<br />
                {business.address.line2},<br />
                {business.address.city}, {business.address.state}, {business.address.country}
              </span>
            </address>
          </div>

          <div className="card-surface p-6">
            <h2 className="text-lg text-foreground">Call us</h2>
            <div className="mt-4 flex flex-col gap-2">
              {business.phones.map((phone) => (
                <ButtonAnchor
                  key={phone}
                  href={telLink(phone)}
                  variant="outline"
                  size="full"
                  aria-label={`Call ${phone}`}
                >
                  <Phone aria-hidden="true" />
                  {phone}
                </ButtonAnchor>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-lg text-foreground">
              <MessageCircle className="size-5 text-success" aria-hidden="true" />
              WhatsApp
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {business.whatsapp.display} — usually the quickest way to reach us.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <WhatsAppButton
                className="flex-1"
                label="Chat on WhatsApp"
                message="Hello, I have a travel enquiry."
              />
              <ButtonLink to="/request" variant="outline" className="flex-1">
                Send travel request
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="card-surface overflow-hidden">
          <iframe
            title={`Map showing the location of ${business.legalName}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0 lg:h-full lg:min-h-[28rem]"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        We have not published an email address. Please use call or WhatsApp to reach us.
      </p>
    </div>
  );
}
