import { type Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

import { cacheTagPrismicPages, getPreviewRef } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";

import { client } from "@/prismicio";
import { components } from "@/slices";

// 1. Fetch the homepage from Prismic, cached for reuse.
async function fetchHomepage(ref?: string) {
  "use cache";
  const page = await client
    .getSingle("homepage", { ref })
    .catch(() => notFound());
  cacheTagPrismicPages([page]);
  cacheLife("max");
  return page;
}

// 2. Set the page's SEO metadata.
export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchHomepage(await getPreviewRef());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

// 3. Render the page's slices.
export default async function Home() {
  const page = await fetchHomepage(await getPreviewRef());

  return <SliceZone slices={page.data.slices} components={components} />;
}
