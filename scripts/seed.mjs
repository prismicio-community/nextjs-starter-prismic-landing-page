/**
 * Seeds a fresh Prismic repository with the example documents in `documents/`.
 *
 * Run it once after creating your repository (e.g. with `npx prismic init`):
 *
 *     npm run seed
 *
 * Authentication goes through the Prismic CLI: the script mints a temporary
 * write token from your CLI session, imports the documents with the Migration
 * API, then revokes the token. You must be logged in (`npx prismic login`) and
 * have access to the repository.
 *
 * Requires a Prismic CLI version that supports `--name` and `--json` on
 * `prismic token create`.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";

import {
  createClient,
  createMigration,
  createWriteClient,
} from "@prismicio/client";

const prismicConfig = JSON.parse(
  readFileSync(new URL("../prismic.config.json", import.meta.url), "utf8"),
);
const repositoryName = prismicConfig.repositoryName;
const tokenName = `${repositoryName} seed`;
const documentsURL = new URL("../documents/", import.meta.url);

// Temporary: use the prerelease CLI that adds `--name` and `--json` to
// `token create` (https://github.com/prismicio/cli/pull/205). Switch back to
// "prismic" once those options ship in a stable release.
const PRISMIC_CLI = "prismic@pr-205";

/**
 * Runs a Prismic CLI command and returns its stdout. Forwards the CLI's own
 * error message and halts if the command fails — for example when the user is
 * not logged in or lacks access to the repository.
 *
 * @param {string[]} args
 * @returns {string}
 */
function runPrismicCLI(args) {
  try {
    return execFileSync("npx", [PRISMIC_CLI, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    const { stdout, stderr } =
      /** @type {{ stdout?: string; stderr?: string }} */ (error);
    const message = `${stderr ?? ""}${stdout ?? ""}`.trim();
    console.error(
      message || `Prismic CLI command failed: prismic ${args.join(" ")}`,
    );
    process.exit(1);
  }
}

async function seed() {
  // Skip if the repository already has content (best effort).
  try {
    const client = createClient(repositoryName);
    const { total_results_size } = await client.get({ pageSize: 1 });
    if (total_results_size > 0) {
      console.info(
        `Repository "${repositoryName}" already has ${total_results_size} document(s). Nothing to seed.`,
      );
      return;
    }
  } catch {
    // Could not determine existing content (e.g. a private repository); continue.
  }

  // Read the example documents.
  const documents = readdirSync(documentsURL)
    .filter((file) => file.endsWith(".json"))
    .map((file) =>
      JSON.parse(readFileSync(new URL(file, documentsURL), "utf8")),
    );

  if (documents.length === 0) {
    console.error("No documents found to seed.");
    process.exit(1);
  }

  // Mint a temporary write token from the CLI session.
  const { token } = JSON.parse(
    runPrismicCLI([
      "token",
      "create",
      "--write",
      "--name",
      tokenName,
      "--json",
    ]),
  );

  try {
    // Import the documents. The Migration API uploads referenced assets and
    // remaps links between documents automatically.
    const writeClient = createWriteClient(repositoryName, {
      writeToken: token,
    });
    const migration = createMigration();
    for (const document of documents) {
      migration.createDocumentFromPrismic(
        document,
        document.uid ?? document.type,
      );
    }
    await writeClient.migrate(migration, {
      reporter: (event) => {
        if (event.type.endsWith(":created")) console.info(`  ${event.type}`);
      },
    });
  } finally {
    // Revoke the temporary write token.
    try {
      execFileSync("npx", [PRISMIC_CLI, "token", "delete", token], {
        stdio: "ignore",
      });
    } catch {
      console.warn(
        `\nCould not delete the temporary token "${tokenName}". ` +
          "Remove it with `npx prismic token list` and `npx prismic token delete <token>`.",
      );
    }
  }

  console.info(
    `\nSeeded ${documents.length} document(s) into "${repositoryName}".`,
  );
  console.info("Publish them from your Prismic dashboard to make them live.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
