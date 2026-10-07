import type { MetadataRoute } from "next";
import projects from "@/data/projects.json";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about-us", "/koica", "/projects", "/dissemination", "/gallery", "/contact-us"];
  const now = new Date();
  return [
    ...pages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
