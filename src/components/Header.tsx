import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="mx-auto max-w-6xl w-[calc(100vw-3rem)] py-6 md:py-8">
      <nav
        aria-label="Main"
        className="flex flex-col justify-between font-medium text-zinc-900 md:flex-row md:items-center"
      >
        <Link href="/">
          <Logo className="size-8 text-zinc-400" />
          <span className="sr-only">{settings.data.site_title || "Home"}</span>
        </Link>
        <ul className="flex gap-6">
          {settings.data.navigation_link.map((item) => (
            <li key={item.key}>
              <PrismicNextLink
                field={item}
                className="inline-flex min-h-11 items-center"
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
