/** Formats a number as Indian rupees without decimals. */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** "6 Nights / 7 Days" */
export function formatDuration(nights: number, days: number): string {
  return `${nights} Nights / ${days} Days`;
}

/** "6N / 7D" */
export function formatDurationShort(nights: number, days: number): string {
  return `${nights}N / ${days}D`;
}
