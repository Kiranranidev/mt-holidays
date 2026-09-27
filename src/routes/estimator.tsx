import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PriceEstimator } from "@/components/pricing/PriceEstimator";
import { packageQueries } from "@/services/packageService";

export const Route = createFileRoute("/estimator")({
  validateSearch: (search: Record<string, unknown>) => ({
    package: typeof search["package"] === "string" ? search["package"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Price Estimator — MT Holidays, Surat" },
      {
        name: "description",
        content:
          "Get an indicative trip estimate: choose package, travellers, nights, hotel category, transport and meals. Final price confirmed by our travel desk.",
      },
      { property: "og:title", content: "Price Estimator — MT Holidays" },
      {
        property: "og:description",
        content: "Estimate your trip cost, then confirm the final price with our travel desk.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(packageQueries.all()),
  component: EstimatorPage,
});

function EstimatorPage() {
  const { package: packageSlug } = Route.useSearch();
  const { data: packages } = useSuspenseQuery(packageQueries.all());

  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Price estimator"
        title="Work out an indicative trip cost"
        description="Choose your options for a rough figure. Our travel desk confirms the actual price before booking."
      />
      <div className="mt-10">
        <PriceEstimator packages={packages} defaultPackageSlug={packageSlug} />
      </div>
    </div>
  );
}
