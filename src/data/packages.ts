import type { Package } from "@/types";
import shimlaManaliImage from "@/assets/dest-shimla-manali.jpg";
import goaImage from "@/assets/dest-goa.jpg";
import rajasthanImage from "@/assets/dest-rajasthan.jpg";

/**
 * MOCK DATA LAYER — replaced later by GET /api/packages.
 * Durations and starting prices are confirmed by the agency.
 * Itinerary, inclusions and exclusions are PLACEHOLDER text and are shown
 * in the UI with a visible "to be confirmed" notice.
 */

const placeholderItinerary = (days: number): Package["itinerary"] =>
  Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    title: `Day ${index + 1} — Sample day title`,
    description:
      "Placeholder day plan. The final day-wise itinerary will be provided by the travel desk.",
  }));

const placeholderInclusions = [
  "Accommodation (category as selected) — to be confirmed",
  "Transfers and sightseeing as per final plan — to be confirmed",
  "Driver allowance, tolls and parking — to be confirmed",
];

const placeholderExclusions = [
  "Air or rail fare unless quoted separately",
  "Entry tickets, ropeway and adventure activity charges",
  "Personal expenses and anything not listed as included",
];

export const packages: Package[] = [
  {
    id: "pkg-shimla-manali",
    slug: "shimla-manali",
    name: "Shimla Manali",
    destination: "Himachal Pradesh",
    nights: 6,
    days: 7,
    startingPrice: 14999,
    shortDescription:
      "Hill stations, deodar forests and snow points across Shimla and Manali.",
    overview:
      "A relaxed Himachal circuit covering Shimla and Manali with time for mall road evenings, valley viewpoints and snow points in season. The exact routing is planned around your travel dates and group size.",
    image: shimlaManaliImage,
    imageAlt: "Hillside houses among pine trees with snow-capped Himalayan peaks behind",
    itinerary: placeholderItinerary(7),
    inclusions: placeholderInclusions,
    exclusions: placeholderExclusions,
    contentIsPlaceholder: true,
  },
  {
    id: "pkg-goa",
    slug: "goa",
    name: "Goa",
    destination: "Goa",
    nights: 3,
    days: 4,
    startingPrice: 6999,
    shortDescription:
      "Beaches, sunsets and easy sightseeing across North and South Goa.",
    overview:
      "A short beach break built around North and South Goa sightseeing, with free time for the beaches you want most. Suitable for families, couples and small groups.",
    image: goaImage,
    imageAlt: "Wooden fishing boat on a Goa beach at sunset with palm trees",
    itinerary: placeholderItinerary(4),
    inclusions: placeholderInclusions,
    exclusions: placeholderExclusions,
    contentIsPlaceholder: true,
  },
  {
    id: "pkg-royal-rajasthan",
    slug: "royal-rajasthan",
    name: "Royal Rajasthan",
    destination: "Rajasthan",
    nights: 4,
    days: 5,
    startingPrice: 6999,
    shortDescription: "Forts, palaces and bazaars on a compact Rajasthan route.",
    overview:
      "A heritage-focused Rajasthan trip through forts, palaces and local markets. The city combination is finalised with you based on your dates and travel pace.",
    image: rajasthanImage,
    imageAlt: "Pink sandstone palace facade in Rajasthan with a hill fort at sunset",
    itinerary: placeholderItinerary(5),
    inclusions: placeholderInclusions,
    exclusions: placeholderExclusions,
    contentIsPlaceholder: true,
  },
];
