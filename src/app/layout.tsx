import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/components/locale-provider";
import { locales } from "@/lib/copy";
import { defaultImage, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const description =
  "AKOFE, the Association of KOICA Fellows in Sri Lanka, works alongside communities to create lasting opportunities for people, families and the places they call home.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AKOFE Sri Lanka | Growing brighter, together",
    template: "%s | AKOFE Sri Lanka",
  },
  description,
  applicationName: siteName,
  keywords: [
    "AKOFE",
    "KOICA",
    "KOICA fellows Sri Lanka",
    "Association of KOICA Fellows",
    "Sri Lanka NGO",
    "community development",
    "Korea Sri Lanka",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    title: "AKOFE Sri Lanka | Growing brighter, together",
    description,
    url: "/",
    images: [{ url: defaultImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKOFE Sri Lanka | Growing brighter, together",
    description,
    images: [defaultImage],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Association of KOICA Fellows in Sri Lanka (AKOFE)",
  alternateName: "AKOFE Sri Lanka",
  url: siteUrl,
  logo: `${siteUrl}/images/logo1.png`,
  description,
  areaServed: "LK",
  sameAs: [] as string[],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: ["en", "si", "ta", "ko"],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const savedLocale = (await cookies()).get("akofe-locale")?.value;
  const initialLocale = locales.find((locale) => locale.code === savedLocale)?.code ?? "en";

  return (
    <html lang={initialLocale} data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
