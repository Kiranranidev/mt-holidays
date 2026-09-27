import type { EnquiryPayload, EnquiryResponse } from "@/types";
import { USE_API, apiRequest, mockDelay } from "./apiClient";

/**
 * POST /api/enquiries
 *
 * Until the backend exists this only simulates a successful submission and
 * returns a local reference. No email or message is actually sent from the
 * browser — the UI states this clearly to the customer.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  if (USE_API) {
    return apiRequest<EnquiryResponse>("/api/enquiries", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  return mockDelay({
    reference: `LOCAL-${Date.now().toString().slice(-6)}`,
    receivedAt: new Date().toISOString(),
  });
}
