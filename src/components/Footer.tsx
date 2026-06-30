import { fetchSettings } from "@/prismicio";
import { getPreviewRef, PrismicNextLink } from "@prismicio/next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "@/components/Logo";

// The current year is request-time data. Reading it inside a cached function
// (refreshed daily) keeps the footer part of the static shell instead of
// forcing the whole page to render dynamically.
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const settings = await fetchSettings(await getPreviewRef());
  const year = await getCurrentYear();

  return (
    <footer className="text-zinc-600 border-t border-zinc-200">
      <div className="mx-auto max-w-6xl w-[calc(100vw-3rem)] py-4 md:py-6 flex gap-4 items-center justify-between flex-col sm:flex-row">
        <Link href="/">
          <Logo className="size-8 text-zinc-400" />
          <span className="sr-only">{settings.data.site_title || "Home"}</span>
        </Link>
        <p className="text-xs">
          © {year} {settings.data.site_title}
        </p>
        <nav>
          <ul className="flex gap-6">
            {settings.data.navigation_link.map((item) => (
              <li key={item.key}>
                <PrismicNextLink
                  field={item}
                  className="inline-flex min-h-11 items-center text-sm hover:underline"
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
