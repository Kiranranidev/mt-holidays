import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./Button";

/** Reusable loading state. */
export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground"
    >
      <Loader2 className="size-6 animate-spin" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

/** Reusable empty state. */
export function EmptyState({
  title = "Nothing to show yet",
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="card-surface flex flex-col items-center gap-3 px-6 py-14 text-center">
      <Inbox className="size-7 text-muted-foreground" aria-hidden="true" />
      <h3 className="text-lg text-foreground">{title}</h3>
      {description ? <p className="max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {action}
    </div>
  );
}

/**
 * Reusable error state. Customer-friendly wording only — technical error
 * details are never shown here.
 */
export function ErrorState({
  title = "Something didn't load",
  description = "Please try again in a moment, or contact us on WhatsApp and we will help you directly.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="card-surface flex flex-col items-center gap-3 px-6 py-14 text-center" role="alert">
      <AlertCircle className="size-7 text-destructive" aria-hidden="true" />
      <h3 className="text-lg text-foreground">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

/** Marks content that the agency has not yet confirmed. */
export function PlaceholderNotice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-accent bg-sand px-4 py-3 text-sm text-accent-foreground">
      {children}
    </p>
  );
}
