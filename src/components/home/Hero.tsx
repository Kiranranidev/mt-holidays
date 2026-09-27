import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-himalaya.jpg";
import { business } from "@/data/business";
import { ButtonLink } from "@/components/common/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        alt="Mountain road winding through pine forest towards snow-capped Himalayan peaks"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/90 via-primary/70 to-primary/30" />

      <div className="container-page flex min-h-[32rem] flex-col justify-center py-20 text-primary-foreground sm:min-h-[36rem]">
        <p className="rise-in inline-flex w-fit items-center gap-2 rounded-full border border-primary-foreground/30 px-3 py-1.5 text-xs font-medium">
          <MapPin className="size-3.5" aria-hidden="true" />
          Amroli, Surat, Gujarat
        </p>

        <h1 className="rise-in mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
          Plan your next trip with a travel desk you can actually talk to
        </h1>

        <p className="rise-in mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
          {business.legalName} arranges rail tickets, flight tickets and planned holiday packages.
          Tell us your dates and we will build the trip around them.
        </p>

        <div className="rise-in mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/packages" variant="accent" size="lg">
            Explore Packages
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <WhatsAppButton
            variant="onImage"
            size="lg"
            message="Hello, I would like help planning a trip."
          />
        </div>

        <ul className="rise-in mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/90">
          {business.services.map((service) => (
            <li key={service} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {service}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
