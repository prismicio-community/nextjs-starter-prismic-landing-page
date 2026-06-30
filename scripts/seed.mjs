/**
 * Seeds a Prismic repository with the example documents in `documents/`.
 *
 * Log in, then run it once after creating your repository:
 *
 *     npx prismic login
 *     npm run seed
 *
 * Repository resolution and auth go through the Prismic CLI. Uses the
 * prismic@pr-205 prerelease for `--name`/`--json` on `token create`
 * (https://github.com/prismicio/cli/pull/205) — switch to `prismic` once those
 * options ship in a stable release.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";

import { createMigration, createWriteClient } from "@prismicio/client";

const PRISMIC_CLI = "prismic@pr-205";
const documentsURL = new URL("../documents/", import.meta.url);

const prismic = (...args) =>
  execFileSync("npx", [PRISMIC_CLI, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

async function seed() {
  // Resolve the repository through the CLI (also confirms login and access).
  const { domain } = JSON.parse(prismic("repo", "view", "--json"));

  // Mint a temporary write token scoped to that repository.
  const args = [
    "--write",
    "--repo",
    domain,
    "--name",
    `${domain} seed`,
    "--json",
  ];
  const { token } = JSON.parse(prismic("token", "create", ...args));

  try {
    const migration = createMigration();
    for (const file of readdirSync(documentsURL).filter((f) =>
      f.endsWith(".json"),
    )) {
      const document = JSON.parse(
        readFileSync(new URL(file, documentsURL), "utf8"),
      );
      migration.createDocumentFromPrismic(
        document,
        document.uid ?? document.type,
      );
    }
    await createWriteClient(domain, { writeToken: token }).migrate(migration, {
      reporter: (event) => console.info(event.type),
    });
  } finally {
    try {
      prismic("token", "delete", token);
    } catch {
      // Best-effort cleanup; the token is identifiable by its name.
    }
  }

  console.info(
    `\nSeeded "${domain}". Publish the documents from your dashboard to go live.`,
  );
}

seed().catch((error) => {
  console.error(error.stderr?.toString().trim() || error.message);
  process.exit(1);
});
