import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Bounded } from "./Bounded";

export async function Navbar() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className=" py-4 md:py-6 px-6 header">
      <nav
        aria-label="Main"
        className="flex mx-auto flex-col max-w-6xl justify-between py-2 font-medium text-gray-900 md:flex-row md:items-center"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tighter"
        >
          <Logo className="size-8" />
          <span className="sr-only">{settings.data.site_title || "Home"}</span>
        </Link>
        <ul className="flex gap-6">
          {settings.data.navigation_link.map((item, index) => (
            <li key={index}>
              <PrismicNextLink
                field={item}
                className="inline-flex min-h-11 items-center"
              >
                {item.text}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
