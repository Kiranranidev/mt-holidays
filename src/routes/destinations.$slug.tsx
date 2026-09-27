import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, Sparkles } from "lucide-react";
import { destinationQueries } from "@/services/destinationService";
import { packageQueries } from "@/services/packageService";
import { PackageCard } from "@/components/packages/PackageCard";
import { ButtonLink } from "@/components/common/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { EmptyState } from "@/components/common/States";

export const Route = createFileRoute("/destinations/$slug")({
  loader: async ({ context, params }) => {
    const item = await context.queryClient.ensureQueryData(
      destinationQueries.bySlug(params.slug),
    );
    if (!item) throw notFound();
    await context.queryClient.ensureQueryData(packageQueries.all());
    return { name: item.name, state: item.state, tagline: item.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Destination unavailable — MT Holidays" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.name}, ${loaderData.state} — Travel Guide — MT Holidays`;
    const description = `${loaderData.name}: ${loaderData.tagline}. Highlights, best travel season and tour packages planned by Maa Tarini Tour & Travels, Surat.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DestinationDetailPage,
  notFoundComponent: DestinationNotFound,
});

function DestinationNotFound() {
  return (
    <div className="container-page py-20 text-center">
      <h1 className="text-3xl text-foreground">Destination not found</h1>
      <ButtonLink to="/destinations" className="mt-6">
        View all destinations
      </ButtonLink>
    </div>
  );
}

function DestinationDetailPage() {
  const { slug } = Route.useParams();
  const { data: item } = useSuspenseQuery(destinationQueries.bySlug(slug));
  const { data: packages } = useSuspenseQuery(packageQueries.all());

  if (!item) return <DestinationNotFound />;

  const related = packages.filter((pkg) => item.relatedPackageSlugs.includes(pkg.slug));

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
          <p className="text-sm tracking-wide">{item.state}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{item.name}</h1>
          <p className="mt-3 max-w-xl text-primary-foreground/90">{item.tagline}</p>
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr]">
        <section>
          <h2 className="text-2xl text-foreground">About {item.name}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>

          <h3 className="mt-8 flex items-center gap-2 text-lg text-foreground">
            <Sparkles className="size-5 text-accent-foreground" aria-hidden="true" />
            Highlights
          </h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <aside className="card-surface h-fit p-6">
          <h2 className="flex items-center gap-2 text-lg text-foreground">
            <CalendarDays className="size-5 text-accent-foreground" aria-hidden="true" />
            Best season
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{item.bestSeason}</p>
          <div className="mt-5 flex flex-col gap-2">
            <ButtonLink to="/request" size="full">
              Plan a {item.name} trip
            </ButtonLink>
            <WhatsAppButton
              size="full"
              variant="outline"
              label="Ask about {name}".replace("{name}", item.name)
              message={`Hello, I would like to know more about travelling to ${item.name}.`}
            />
          </div>
        </aside>
      </div>

      <section className="bg-sand py-14">
        <div className="container-page">
          <h2 className="text-2xl text-foreground">Packages covering {item.name}</h2>
          {related.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No listed package covers this destination yet"
                description="We can still plan a custom trip for these dates."
                action={<ButtonLink to="/request">Send travel request</ButtonLink>}
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((pkg) => (
                <PackageCard key={pkg.id} item={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
