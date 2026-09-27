import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/States";
import { ButtonLink } from "@/components/common/Button";
import { destinationQueries } from "@/services/destinationService";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations — Shimla, Manali, Goa & Rajasthan — MT Holidays" },
      {
        name: "description",
        content:
          "Travel destinations we plan trips to: Shimla, Manali, Goa and Rajasthan. Best seasons, highlights and related tour packages.",
      },
      { property: "og:title", content: "Destinations — MT Holidays" },
      {
        property: "og:description",
        content: "Shimla, Manali, Goa and Rajasthan — highlights, best season and packages.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(destinationQueries.all()),
  component: DestinationsPage,
});

function DestinationsPage() {
  const { data: destinations } = useSuspenseQuery(destinationQueries.all());

  return (
    <div className="container-page py-14 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Destinations"
        title="Places we plan trips to"
        description="Start with a destination, then choose a package or ask us for a custom plan."
      />

      {destinations.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No destinations listed yet"
            action={<ButtonLink to="/request">Ask us about a destination</ButtonLink>}
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item) => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
