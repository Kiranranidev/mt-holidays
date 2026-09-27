import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PaymentCard } from "@/components/payment/PaymentCard";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Online Payment (UPI) — MT Holidays, Surat" },
      {
        name: "description",
        content:
          "Pay your confirmed trip amount by UPI or QR code and send us the payment screenshot on WhatsApp so we can confirm your booking.",
      },
      { property: "og:title", content: "Online Payment — MT Holidays" },
      {
        property: "og:description",
        content: "UPI and QR payment details, and how to confirm your booking with us.",
      },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Online payment"
        title="Pay by UPI once your trip is confirmed"
        description="Always confirm the payable amount with our travel desk before you pay."
      />
      <div className="mt-10">
        <PaymentCard />
      </div>
    </div>
  );
}
