import { createClient } from "@prismicio/client";
import { cacheTagPrismicPages } from "@prismicio/next";
import { cacheLife } from "next/cache";

import prismicConfig from "../prismic.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismicConfig.repositoryName;

/**
 * A shared Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 */
export const client = createClient(repositoryName, {
  routes: prismicConfig.routes,
});

/**
 * Fetches the site's `settings` document, cached for reuse across the site.
 *
 * The `settings` document holds global content like the site title and
 * navigation, so it is shared by layout components like the header and footer.
 *
 * @param ref - The Prismic ref to query. Pass the preview ref from
 *   `getPreviewRef()` to load draft content during a preview.
 */
export async function fetchSettings(ref?: string) {
  "use cache";
  const settings = await client.getSingle("settings", { ref });
  cacheTagPrismicPages([settings]);
  cacheLife("max");
  return settings;
}
