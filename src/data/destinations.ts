import type { Destination } from "@/types";
import shimlaManaliImage from "@/assets/dest-shimla-manali.jpg";
import goaImage from "@/assets/dest-goa.jpg";
import rajasthanImage from "@/assets/dest-rajasthan.jpg";

/**
 * MOCK DATA LAYER — replaced later by GET /api/destinations.
 * Descriptions are general travel information, not agency claims.
 */
export const destinations: Destination[] = [
  {
    id: "dest-shimla",
    slug: "shimla",
    name: "Shimla",
    state: "Himachal Pradesh",
    tagline: "Colonial charm on a pine-covered ridge",
    description:
      "Shimla sits along a forested ridge in Himachal Pradesh and is known for its colonial-era architecture, the Mall Road promenade and easy day trips to nearby viewpoints. It is usually the first stop on a Himachal circuit.",
    image: shimlaManaliImage,
    imageAlt: "Shimla hillside with colonial houses and deodar pines",
    bestSeason: "March to June, and December to January for snow",
    highlights: ["Mall Road and The Ridge", "Kufri viewpoints", "Toy train section", "Jakhoo hill"],
    relatedPackageSlugs: ["shimla-manali"],
  },
  {
    id: "dest-manali",
    slug: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    tagline: "Valley town at the foot of the high passes",
    description:
      "Manali lies in the Kullu valley beside the Beas river and works as a base for Solang, Rohtang and the surrounding villages. Snow activities depend on the season and road conditions.",
    image: shimlaManaliImage,
    imageAlt: "Himalayan valley near Manali with pine forest and snow peaks",
    bestSeason: "March to June for pleasant weather, winter for snow",
    highlights: ["Solang valley", "Old Manali", "Hadimba temple", "Rohtang side trips in season"],
    relatedPackageSlugs: ["shimla-manali"],
  },
  {
    id: "dest-goa",
    slug: "goa",
    name: "Goa",
    state: "Goa",
    tagline: "Beaches, churches and long slow evenings",
    description:
      "Goa combines beaches, Portuguese-era churches and riverside towns. North Goa is livelier, while South Goa is quieter and suits families looking for calm beaches.",
    image: goaImage,
    imageAlt: "Goa beach at sunset with palm trees and a fishing boat",
    bestSeason: "October to March",
    highlights: ["North Goa beaches", "South Goa beaches", "Old Goa churches", "Sunset cruise options"],
    relatedPackageSlugs: ["goa"],
  },
  {
    id: "dest-rajasthan",
    slug: "rajasthan",
    name: "Rajasthan",
    state: "Rajasthan",
    tagline: "Forts, palaces and desert colour",
    description:
      "Rajasthan is a heritage circuit of forts, palaces, stepwells and busy bazaars. Routes are commonly built around Jaipur, Udaipur, Jodhpur and Jaisalmer depending on trip length.",
    image: rajasthanImage,
    imageAlt: "Rajasthan palace facade and hill fort in evening light",
    bestSeason: "October to March",
    highlights: ["Hill forts and palaces", "Local bazaars", "Desert landscapes", "Folk music evenings"],
    relatedPackageSlugs: ["royal-rajasthan"],
  },
];
