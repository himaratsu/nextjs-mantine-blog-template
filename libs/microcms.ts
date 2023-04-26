import { createClient } from "microcms-js-sdk";

export const microcms = createClient({
  serviceDomain: process.env.MICROCMS_API_DOMAIN ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});
