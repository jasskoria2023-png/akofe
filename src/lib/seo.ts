import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://akofe.lk").replace(/\/$/, "");
export const siteName = "AKOFE Sri Lanka";
export const defaultImage = "/images/slide1.jpeg";

export function pageMetadata(
  path: string,
  title: string,
  description: string,
  image: string = defaultImage,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      title: `${title} | ${siteName}`,
      description,
      url: path,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [image],
    },
  };
}
