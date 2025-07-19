import { strapi } from "@strapi/client";

import { getStrapiURL } from "@/lib/utils";

const BASE_API_URL = getStrapiURL() + "/api";

// Factory function to create Strapi client with authentication
function createStrapiClient(authToken?: string) {
  return strapi({
    baseURL: BASE_API_URL,
    ...(authToken ? { auth: authToken } : {}),
  });
}

// Default client for non-authenticated requests
const defaultClient = createStrapiClient();

// Export factory and default client
export { defaultClient, createStrapiClient };
