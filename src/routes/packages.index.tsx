import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PackageCard } from "@/components/packages/PackageCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/States";
import { ButtonLink } from "@/components/common/Button";
import { packageQueries } from "@/services/packageService";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Tour Packages — MT Holidays, Surat" },
      {
        name: "description",
        content:
          "Shimla Manali 6N/7D from ₹14,999, Goa 3N/4D from ₹6,999 and Royal Rajasthan 4N/5D from ₹6,999. Starting prices per person.",
      },
      { property: "og:title", content: "Tour Packages — MT Holidays" },
      {
        property: "og:description",
        content: "Shimla Manali, Goa and Royal Rajasthan holiday packages with starting prices.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(packageQueries.all()),
  component: PackagesPage,
});

function PackagesPage() {
  const { data: packages } = useSuspenseQuery(packageQueries.all());

  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Tour packages"
        title="Holiday packages planned from our Surat office"
        description="Prices shown are starting prices per person. The final quotation depends on your travel dates, hotel category, transport and group size."
      />

      {packages.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No packages listed right now"
            description="New packages are added through the season. Send us a request and we will plan a trip for you."
            action={<ButtonLink to="/request">Send travel request</ButtonLink>}
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((item) => (
            <PackageCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="mt-12 card-surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl text-foreground">Want a custom trip instead?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We also plan trips that are not listed here — tell us where you want to go.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ButtonLink to="/estimator" variant="outline">
            Price estimator
          </ButtonLink>
          <ButtonLink to="/request">Plan Your Trip</ButtonLink>
        </div>
      </div>
    </div>
  );
}
