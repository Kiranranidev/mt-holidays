import { QrCode } from "lucide-react";
import { useState } from "react";
import { business, whatsappLink } from "@/data/business";
import { Button, ButtonAnchor } from "@/components/common/Button";
import { Field, inputClasses } from "@/components/common/FormField";
import { PlaceholderNotice } from "@/components/common/States";

/**
 * UPI payment panel.
 * The real UPI ID and QR image have not been supplied yet, so both are shown
 * as clearly marked placeholders.
 */
const UPI_ID_PLACEHOLDER = "PLACEHOLDER-UPI-ID@bank (to be provided by the agency)";

export function PaymentCard() {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  const confirmationMessage = [
    "Payment confirmation",
    amount ? `Amount: ₹${amount}` : null,
    reference ? `Reference / booking: ${reference}` : null,
    "I have attached the payment screenshot.",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-surface p-6">
        <h2 className="text-xl text-foreground">Pay by UPI</h2>
        <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>1. Confirm the payable amount with our travel desk on call or WhatsApp.</li>
          <li>2. Scan the QR code or pay to the UPI ID shown here.</li>
          <li>3. Take a screenshot of the successful payment.</li>
          <li>4. Send the screenshot to us on WhatsApp so we can confirm your booking.</li>
        </ol>

        <div className="mt-6 rounded-lg border border-border bg-sand p-4">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            UPI ID
          </p>
          <p className="mt-1 text-sm font-medium break-words text-foreground">
            {UPI_ID_PLACEHOLDER}
          </p>
        </div>

        <div className="mt-4 grid aspect-square w-40 place-items-center rounded-lg border border-dashed border-accent bg-sand text-center">
          <div className="px-3">
            <QrCode className="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
            <p className="mt-2 text-xs text-muted-foreground">QR code placeholder</p>
          </div>
        </div>

        <PlaceholderNotice>
          The UPI ID and QR code above are placeholders. They will be replaced with the agency&apos;s
          real payment details before the site goes live — please confirm the payment details with us
          before transferring any money.
        </PlaceholderNotice>
      </div>

      <div className="card-surface p-6">
        <h2 className="text-xl text-foreground">Tell us about your payment</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page does not process payments online. Fill in the details and send them to us on
          WhatsApp so we can verify and confirm.
        </p>

        <div className="mt-5 space-y-4">
          <Field
            id="payment-amount"
            label="Amount paid or estimated total (₹)"
            hint="Use the figure confirmed by our travel desk."
          >
            <input
              id="payment-amount"
              type="number"
              inputMode="numeric"
              min={0}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="e.g. 5000"
              className={inputClasses}
            />
          </Field>

          <Field id="payment-reference" label="Booking name or reference">
            <input
              id="payment-reference"
              type="text"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Name used for the booking"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <ButtonAnchor
            href={whatsappLink(confirmationMessage)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            className="flex-1"
          >
            Send payment details on WhatsApp
          </ButtonAnchor>
          <Button
            variant="outline"
            onClick={() => {
              setAmount("");
              setReference("");
            }}
          >
            Clear
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Prefer to call? {business.phones[0]} or {business.phones[1]}.
        </p>
      </div>
    </div>
  );
}
