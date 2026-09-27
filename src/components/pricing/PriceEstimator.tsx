import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import type { HotelCategory, MealPlan, Package, PricingResult, TransportOption } from "@/types";
import { calculatePricing } from "@/services/pricingService";
import { formatINR } from "@/utils/format";
import { Button, ButtonLink } from "@/components/common/Button";
import { Field, selectClasses, inputClasses } from "@/components/common/FormField";
import { ErrorState, LoadingState, PlaceholderNotice } from "@/components/common/States";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

interface PriceEstimatorProps {
  packages: Package[];
  /** Preselected package slug, e.g. on a package detail page. */
  defaultPackageSlug?: string;
  /** Hides the package dropdown when the package is fixed by the page. */
  lockPackage?: boolean;
}

export function PriceEstimator({
  packages,
  defaultPackageSlug,
  lockPackage = false,
}: PriceEstimatorProps) {
  const initial = packages.find((item) => item.slug === defaultPackageSlug) ?? packages[0];

  const [packageSlug, setPackageSlug] = useState(initial?.slug ?? "");
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(initial?.nights ?? 3);
  const [hotelCategory, setHotelCategory] = useState<HotelCategory>("standard");
  const [transport, setTransport] = useState<TransportOption>("none");
  const [mealPlan, setMealPlan] = useState<MealPlan>("none");

  const [result, setResult] = useState<PricingResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const selected = useMemo(
    () => packages.find((item) => item.slug === packageSlug),
    [packages, packageSlug],
  );

  function handlePackageChange(slug: string) {
    setPackageSlug(slug);
    const next = packages.find((item) => item.slug === slug);
    if (next) setNights(next.nights);
    setResult(null);
  }

  async function handleCalculate() {
    setStatus("loading");
    try {
      // Single call site — swapped for POST /api/pricing/calculate later.
      const response = await calculatePricing({
        packageSlug,
        travelers,
        nights,
        hotelCategory,
        transport,
        mealPlan,
      });
      setResult(response);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  if (packages.length === 0) {
    return <ErrorState title="Packages are unavailable right now" />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="card-surface p-6">
        <h2 className="flex items-center gap-2 text-xl text-foreground">
          <Calculator className="size-5 text-accent-foreground" aria-hidden="true" />
          Estimate your trip
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose your options to see an indicative figure. Our travel desk confirms the final price.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {!lockPackage ? (
            <Field id="est-package" label="Package" className="sm:col-span-2">
              <select
                id="est-package"
                value={packageSlug}
                onChange={(event) => handlePackageChange(event.target.value)}
                className={selectClasses}
              >
                {packages.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name} — {item.nights}N / {item.days}D
                  </option>
                ))}
              </select>
            </Field>
          ) : null}

          <Field id="est-travelers" label="Number of travellers">
            <input
              id="est-travelers"
              type="number"
              min={1}
              max={40}
              value={travelers}
              onChange={(event) => setTravelers(Number(event.target.value))}
              className={inputClasses}
            />
          </Field>

          <Field
            id="est-nights"
            label="Number of nights"
            hint={selected ? `Package includes ${selected.nights} nights` : undefined}
          >
            <input
              id="est-nights"
              type="number"
              min={1}
              max={30}
              value={nights}
              onChange={(event) => setNights(Number(event.target.value))}
              className={inputClasses}
            />
          </Field>

          <Field id="est-hotel" label="Hotel category (optional)">
            <select
              id="est-hotel"
              value={hotelCategory}
              onChange={(event) => setHotelCategory(event.target.value as HotelCategory)}
              className={selectClasses}
            >
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="premium">Premium</option>
            </select>
          </Field>

          <Field id="est-transport" label="Transport (optional)">
            <select
              id="est-transport"
              value={transport}
              onChange={(event) => setTransport(event.target.value as TransportOption)}
              className={selectClasses}
            >
              <option value="none">Not required</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="tempo">Tempo traveller</option>
            </select>
          </Field>

          <Field id="est-meals" label="Meals / add-ons (optional)" className="sm:col-span-2">
            <select
              id="est-meals"
              value={mealPlan}
              onChange={(event) => setMealPlan(event.target.value as MealPlan)}
              className={selectClasses}
            >
              <option value="none">No meal plan</option>
              <option value="breakfast">Breakfast only</option>
              <option value="half-board">Breakfast and dinner</option>
            </select>
          </Field>
        </div>

        <Button className="mt-6" size="full" onClick={handleCalculate} disabled={status === "loading"}>
          {status === "loading" ? "Calculating…" : "Calculate estimate"}
        </Button>
      </div>

      <div className="card-surface flex flex-col p-6">
        <h3 className="text-xl text-foreground">Your estimate</h3>

        {status === "loading" ? <LoadingState label="Working out your estimate…" /> : null}

        {status === "error" ? (
          <div className="mt-4">
            <ErrorState
              title="We couldn't work out an estimate"
              onRetry={() => {
                void handleCalculate();
              }}
            />
          </div>
        ) : null}

        {status === "idle" && !result ? (
          <p className="mt-4 flex-1 text-sm text-muted-foreground">
            Select your options and choose “Calculate estimate” to see an indicative breakdown.
          </p>
        ) : null}

        {status === "idle" && result ? (
          <div className="mt-4 flex-1">
            <p className="text-sm font-medium text-foreground">{result.packageName}</p>
            <dl className="mt-3 divide-y divide-border">
              {result.lines.map((line) => (
                <div key={line.label} className="flex items-start justify-between gap-4 py-2.5">
                  <dt className="text-sm text-muted-foreground">
                    {line.label}
                    {line.note ? (
                      <span className="mt-0.5 block text-xs opacity-80">{line.note}</span>
                    ) : null}
                  </dt>
                  <dd className="text-sm font-medium text-foreground">{formatINR(line.amount)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
              <span className="text-sm font-semibold text-secondary-foreground">
                Estimated total
              </span>
              <span className="font-display text-2xl text-foreground">
                {formatINR(result.estimatedTotal)}
              </span>
            </div>
          </div>
        ) : null}

        <div className="mt-5 space-y-3">
          <PlaceholderNotice>
            This is an indicative estimate only, calculated in the browser for demonstration. Hotel,
            transport and meal amounts are placeholders. Final pricing is confirmed by our travel
            desk.
          </PlaceholderNotice>
          <div className="flex flex-col gap-2 sm:flex-row">
            <ButtonLink
              to="/request"
              search={{ package: packageSlug }}
              variant="outline"
              className="flex-1"
            >
              Send travel request
            </ButtonLink>
            <WhatsAppButton
              className="flex-1"
              label="Confirm on WhatsApp"
              message={`Hello, I would like a quotation for ${selected?.name ?? "a tour package"} for ${travelers} traveller(s) and ${nights} night(s).`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
