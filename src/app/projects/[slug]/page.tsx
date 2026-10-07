import type { Metadata } from "next";
import { AkofeSite } from "@/components/akofe-site";
import projects from "@/data/projects.json";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const text = String(project.description).slice(0, 155);
  return pageMetadata(`/projects/${slug}`, project.title, text, project.images?.[0]);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: "Our Projects", path: "/projects" },
          { name: project?.title ?? slug, path: `/projects/${slug}` },
        ]}
      />
      <AkofeSite page="projects" projectSlug={slug} />
    </>
  );
}
