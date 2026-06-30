import {
  cacheTagPrismicPages,
  getPreviewRef,
  PrismicPreview,
} from "@prismicio/next";
import { cacheLife } from "next/cache";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { client, repositoryName } from "@/prismicio";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

// Fetch the site's `settings` document, cached for reuse across the layout. It
// holds global content like the site title, navigation, and footer copyright,
// shared by the header and footer.
async function fetchSettings(ref?: string) {
  "use cache";
  const settings = await client.getSingle("settings", { ref });
  cacheTagPrismicPages([settings]);
  cacheLife("max");
  return settings;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSettings(await getPreviewRef());

  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-white text-zinc-900 antialiased selection:bg-black selection:text-white">
        <Header settings={settings} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
