import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { EnquiryPayload, Package } from "@/types";
import { submitEnquiry } from "@/services/enquiryService";
import { Button } from "@/components/common/Button";
import { Field, inputClasses, selectClasses, textareaClasses } from "@/components/common/FormField";
import { ErrorState } from "@/components/common/States";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

interface EnquiryFormProps {
  packages: Package[];
  defaultPackageSlug?: string;
}

type Errors = Partial<Record<"name" | "mobile" | "email" | "message", string>>;

const emptyForm = {
  name: "",
  mobile: "",
  email: "",
  packageSlug: "",
  travelDate: "",
  travelers: "",
  nights: "",
  message: "",
};

function validate(form: typeof emptyForm): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[0-9+\s-]{10,15}$/.test(form.mobile.trim()))
    errors.mobile = "Please enter a valid mobile number.";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Please check the email address.";
  if (form.message.trim().length < 10)
    errors.message = "Please tell us a little more about your trip (at least 10 characters).";
  return errors;
}

export function EnquiryForm({ packages, defaultPackageSlug }: EnquiryFormProps) {
  const [form, setForm] = useState({ ...emptyForm, packageSlug: defaultPackageSlug ?? "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);

  function update<K extends keyof typeof emptyForm>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload: EnquiryPayload = {
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim() || undefined,
      packageSlug: form.packageSlug || undefined,
      travelDate: form.travelDate || undefined,
      travelers: form.travelers ? Number(form.travelers) : undefined,
      nights: form.nights ? Number(form.nights) : undefined,
      message: form.message.trim(),
    };

    setStatus("submitting");
    try {
      // Single call site — swapped for POST /api/enquiries later.
      const response = await submitEnquiry(payload);
      setReference(response.reference);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const selectedPackage = packages.find((item) => item.slug === form.packageSlug);
  const whatsappMessage = [
    "Travel request",
    form.name ? `Name: ${form.name}` : null,
    selectedPackage ? `Package: ${selectedPackage.name}` : null,
    form.travelDate ? `Travel date: ${form.travelDate}` : null,
    form.travelers ? `Travellers: ${form.travelers}` : null,
    form.nights ? `Nights: ${form.nights}` : null,
    form.message ? `Requirements: ${form.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (status === "sent") {
    return (
      <div className="card-surface p-8 text-center">
        <CheckCircle2 className="mx-auto size-8 text-success" aria-hidden="true" />
        <h3 className="mt-3 text-xl text-foreground">Request captured</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Your details were captured locally with reference {reference}. The website is not yet
          connected to our booking system, so please also send the same details to us on WhatsApp or
          call us — that way we can reply to you straight away.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <WhatsAppButton label="Send on WhatsApp" message={whatsappMessage} />
          <Button
            variant="outline"
            onClick={() => {
              setForm({ ...emptyForm, packageSlug: defaultPackageSlug ?? "" });
              setStatus("idle");
              setReference(null);
            }}
          >
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="enq-name" label="Name" required error={errors.name}>
          <input
            id="enq-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "enq-name-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field id="enq-mobile" label="Mobile number" required error={errors.mobile}>
          <input
            id="enq-mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.mobile}
            onChange={(event) => update("mobile", event.target.value)}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={errors.mobile ? "enq-mobile-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field id="enq-email" label="Email (optional)" error={errors.email}>
          <input
            id="enq-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enq-email-error" : undefined}
            className={inputClasses}
          />
        </Field>

        <Field id="enq-package" label="Selected package (optional)">
          <select
            id="enq-package"
            value={form.packageSlug}
            onChange={(event) => update("packageSlug", event.target.value)}
            className={selectClasses}
          >
            <option value="">Not decided yet</option>
            {packages.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="enq-date" label="Travel date (optional)">
          <input
            id="enq-date"
            type="date"
            value={form.travelDate}
            onChange={(event) => update("travelDate", event.target.value)}
            className={inputClasses}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field id="enq-travelers" label="Travellers">
            <input
              id="enq-travelers"
              type="number"
              min={1}
              max={40}
              value={form.travelers}
              onChange={(event) => update("travelers", event.target.value)}
              className={inputClasses}
            />
          </Field>
          <Field id="enq-nights" label="Nights">
            <input
              id="enq-nights"
              type="number"
              min={1}
              max={30}
              value={form.nights}
              onChange={(event) => update("nights", event.target.value)}
              className={inputClasses}
            />
          </Field>
        </div>

        <Field
          id="enq-message"
          label="Message / requirements"
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id="enq-message"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Where would you like to go, how many people are travelling, and anything else we should know?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "enq-message-error" : undefined}
            className={textareaClasses}
          />
        </Field>
      </div>

      {status === "error" ? (
        <div className="mt-5">
          <ErrorState title="We couldn't send your request" />
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button type="submit" className="flex-1" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Travel Request"}
        </Button>
        <WhatsAppButton className="flex-1" label="Send on WhatsApp instead" message={whatsappMessage} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        No account is needed. This form does not send email from your browser — it is ready to be
        connected to our booking system, and WhatsApp remains the fastest way to reach us.
      </p>
    </form>
  );
}
