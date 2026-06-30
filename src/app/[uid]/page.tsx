import { type Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

import { asText } from "@prismicio/client";
import { cacheTagPrismicPages, getPreviewRef } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";

import { client } from "@/prismicio";
import { components } from "@/slices";

// 1. Fetch a page from Prismic, cached for reuse.
async function fetchPage(uid: string, ref?: string) {
  "use cache";
  const page = await client
    .getByUID("page", uid, { ref })
    .catch(() => notFound());
  cacheTagPrismicPages([page]);
  cacheLife("max");
  return page;
}

// Fetch the site settings, cached for reuse. Used for the page title.
async function fetchSettings(ref?: string) {
  "use cache";
  const settings = await client.getSingle("settings", { ref });
  cacheTagPrismicPages([settings]);
  cacheLife("max");
  return settings;
}

// 2. List the pages to build ahead of time.
export async function generateStaticParams() {
  const pages = await client.getAllByType("page");

  return pages.map((page) => ({ uid: page.uid }));
}

// 3. Set the page's SEO metadata.
export async function generateMetadata({
  params,
}: PageProps<"/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const ref = await getPreviewRef();
  const page = await fetchPage(uid, ref);
  const settings = await fetchSettings(ref);

  return {
    title: `${asText(page.data.title)} | ${settings.data.site_title}`,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

// 4. Render the page's slices.
export default async function Page({ params }: PageProps<"/[uid]">) {
  const { uid } = await params;
  const page = await fetchPage(uid, await getPreviewRef());

  return <SliceZone slices={page.data.slices} components={components} />;
}
