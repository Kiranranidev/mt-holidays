import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, Clock, MapPin, X } from "lucide-react";
import { packageQueries } from "@/services/packageService";
import { formatDuration, formatINR } from "@/utils/format";
import { ButtonLink } from "@/components/common/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { PlaceholderNotice } from "@/components/common/States";
import { PriceEstimator } from "@/components/pricing/PriceEstimator";
import { SectionHeading } from "@/components/common/SectionHeading";

export const Route = createFileRoute("/packages/$slug")({
  loader: async ({ context, params }) => {
    const item = await context.queryClient.ensureQueryData(packageQueries.bySlug(params.slug));
    if (!item) throw notFound();
    return { name: item.name, nights: item.nights, days: item.days, price: item.startingPrice };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Package unavailable — MT Holidays" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} Package — ${loaderData.nights}N / ${loaderData.days}D — MT Holidays`;
    const description = `${loaderData.name} tour package, ${loaderData.nights} nights and ${loaderData.days} days, starting ${formatINR(loaderData.price)} per person. Planned by Maa Tarini Tour & Travels, Surat.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PackageDetailPage,
  notFoundComponent: PackageNotFound,
});

function PackageNotFound() {
  return (
    <div className="container-page py-20 text-center">
      <h1 className="text-3xl text-foreground">Package not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This package may have been renamed or is no longer listed.
      </p>
      <ButtonLink to="/packages" className="mt-6">
        View all packages
      </ButtonLink>
    </div>
  );
}

function PackageDetailPage() {
  const { slug } = Route.useParams();
  const { data: item } = useSuspenseQuery(packageQueries.bySlug(slug));
  const { data: allPackages } = useSuspenseQuery(packageQueries.all());

  if (!item) return <PackageNotFound />;

  return (
    <article>
      <div className="relative isolate">
        <img
          src={item.image}
          alt={item.imageAlt}
          width={1280}
          height={864}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-primary/95 via-primary/70 to-primary/40" />
        <div className="container-page py-20 text-primary-foreground">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden="true" />
              {item.destination}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {formatDuration(item.nights, item.days)}
            </span>
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl">{item.name}</h1>
          <p className="mt-4 max-w-xl text-primary-foreground/90">{item.shortDescription}</p>
          <p className="mt-6 text-sm text-primary-foreground/85">
            Starting{" "}
            <span className="font-display text-3xl text-primary-foreground">
              {formatINR(item.startingPrice)}
            </span>{" "}
            per person
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/request" search={{ package: item.slug }} variant="accent">
              Send travel request
            </ButtonLink>
            <WhatsAppButton
              variant="onImage"
              message={`Hello, I am interested in the ${item.name} package (${item.nights}N / ${item.days}D).`}
            />
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl text-foreground">Overview</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{item.overview}</p>
          </section>

          <section>
            <h2 className="text-2xl text-foreground">Day-wise itinerary</h2>
            {item.contentIsPlaceholder ? (
              <div className="mt-3">
                <PlaceholderNotice>
                  Editable placeholder content. The confirmed day-wise itinerary will be supplied by
                  our travel desk and published here.
                </PlaceholderNotice>
              </div>
            ) : null}
            <ol className="mt-4 space-y-3">
              {item.itinerary.map((day) => (
                <li key={day.day} className="card-surface p-5">
                  <p className="eyebrow">Day {day.day}</p>
                  <h3 className="mt-1 text-lg text-foreground">{day.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {day.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 sm:grid-cols-2">
            <div className="card-surface p-5">
              <h2 className="text-lg text-foreground">Inclusions</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {item.inclusions.map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-5">
              <h2 className="text-lg text-foreground">Exclusions</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {item.exclusions.map((line) => (
                  <li key={line} className="flex gap-2">
                    <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6">
            <h2 className="text-lg text-foreground">Quick summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Destination</dt>
                <dd className="font-medium text-foreground">{item.destination}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Duration</dt>
                <dd className="font-medium text-foreground">
                  {formatDuration(item.nights, item.days)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Starting price</dt>
                <dd className="font-medium text-foreground">{formatINR(item.startingPrice)}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-col gap-2">
              <ButtonLink to="/estimator" search={{ package: item.slug }} size="full">
                Open price estimator
              </ButtonLink>
              <ButtonLink to="/payment" variant="outline" size="full">
                Online payment
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>

      <section className="bg-sand py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Price estimator"
            title={`Estimate your ${item.name} trip`}
            description="An indicative figure based on your options. The travel desk confirms the final price."
          />
          <div className="mt-8">
            <PriceEstimator packages={allPackages} defaultPackageSlug={item.slug} />
          </div>
        </div>
      </section>
    </article>
  );
}
