import { Clock, MapPin } from "lucide-react";
import type { Package } from "@/types";
import { formatDurationShort, formatINR } from "@/utils/format";
import { ButtonLink } from "@/components/common/Button";

export function PackageCard({ item }: { item: Package }) {
  return (
    <article className="card-surface group flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]">
      <img
        src={item.image}
        alt={item.imageAlt}
        loading="lazy"
        width={1280}
        height={864}
        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden="true" />
            {item.destination}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {formatDurationShort(item.nights, item.days)}
          </span>
        </div>

        <h3 className="mt-2 text-xl text-foreground">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.shortDescription}
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          Starting{" "}
          <span className="font-display text-xl text-foreground">
            {formatINR(item.startingPrice)}
          </span>{" "}
          <span className="text-xs">per person</span>
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <ButtonLink
            to="/packages/$slug"
            params={{ slug: item.slug }}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            View Details
          </ButtonLink>
          <ButtonLink
            to="/request"
            search={{ package: item.slug }}
            size="sm"
            className="flex-1"
          >
            Plan Trip
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
