/**
 * Confirmed business information only.
 * Do not add email, GSTIN, founding year, awards or statistics here
 * unless the agency has supplied them.
 */

export const business = {
  legalName: "Maa Tarini Tour & Travels",
  brand: "MT Holidays",
  brandTagline: "Travel Planner",
  contactPerson: "Narendra Bhai",
  whatsapp: {
    display: "+91 93778 43778",
    url: "https://wa.me/919377843778",
  },
  phones: ["+91 98252 87153", "+91 93778 43778", "+91 81404 70656"],
  address: {
    line1: "Shop No. 13, Shree Ganesh Residency",
    line2: "Ganeshpura, Amroli",
    city: "Surat",
    state: "Gujarat",
    country: "India",
  },
  services: [
    "Authorized e-Railway Ticket Agent",
    "Flight Ticket Booking",
    "MT Holidays – Travel Planner",
  ],
} as const;

export const fullAddress = `${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state}, ${business.address.country}`;

/** Builds a WhatsApp link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  return message
    ? `${business.whatsapp.url}?text=${encodeURIComponent(message)}`
    : business.whatsapp.url;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}
