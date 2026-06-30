import { createClient } from "@prismicio/client";

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
