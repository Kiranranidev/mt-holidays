import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Destination } from "@/types";

export function DestinationCard({ item }: { item: Destination }) {
  return (
    <Link
      to="/destinations/$slug"
      params={{ slug: item.slug }}
      className="group relative block overflow-hidden rounded-xl border border-border shadow-[var(--shadow-soft)]"
    >
      <img
        src={item.image}
        alt={item.imageAlt}
        loading="lazy"
        width={1280}
        height={864}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary/85 via-primary/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
        <p className="text-xs tracking-wide opacity-90">{item.state}</p>
        <h3 className="mt-1 text-xl">{item.name}</h3>
        <p className="mt-1 text-sm opacity-90">{item.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
          Explore
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
