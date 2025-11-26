import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Bounded } from "./Bounded";

export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <Bounded as="footer" className="!py-4 md:!py-6 text-gray-600 border-t border-gray-200">
      <div className="flex gap-4 items-center justify-between flex-col sm:flex-row">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
          <Logo className="size-8" />
          <span className="sr-only">{settings.data.site_title || "Home"}</span>
        </Link>
        <p className="text-xs">© {new Date().getFullYear()} {settings.data.site_title}</p>
        <nav>
          <ul className="flex gap-6">
            {settings.data.navigation_link.map((item, index) => (
              <li key={index}>
                <PrismicNextLink
                  field={item}
                  className="inline-flex min-h-11 items-center text-sm hover:underline"
                >
                  {item.text}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}

