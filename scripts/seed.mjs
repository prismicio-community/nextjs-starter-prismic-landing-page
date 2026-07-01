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
import { execSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";

import { createMigration, createWriteClient } from "@prismicio/client";

const PRISMIC_CLI = "prismic@pr-205";
const documentsURL = new URL("../documents/", import.meta.url);

// Run a Prismic CLI command and return its stdout. The interpolated values (the
// repo domain and JWT token) are Prismic-issued identifiers with no shell
// metacharacters, so the command string is safe across platforms.
const prismic = (command) =>
  execSync(`npx ${PRISMIC_CLI} ${command}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

async function seed() {
  // Resolve the repository through the CLI (also confirms login and access).
  const { domain } = JSON.parse(prismic("repo view --json"));

  // Mint a temporary write token scoped to that repository.
  const { token } = JSON.parse(
    prismic(
      `token create --write --repo ${domain} --name "${domain} seed" --json`,
    ),
  );

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
      reporter: ({ type, data }) => {
        if (type === "assets:created")
          console.info(`Uploaded ${data.created} assets.`);
        if (type === "documents:created")
          console.info(`Created ${data.created} documents.`);
      },
    });
  } finally {
    try {
      prismic(`token delete ${token}`);
    } catch {
      // Best-effort cleanup; the token is identifiable by its name.
    }
  }

  console.info(`\nSeeded "${domain}". Publish the documents to go live:`);
  console.info(`https://${domain}.prismic.io/builder/migration`);
}

seed().catch((error) => {
  console.error(error.stderr?.toString().trim() || error.message);
  process.exit(1);
});
