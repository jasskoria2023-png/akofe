import type { Metadata } from "next";
import { AkofeSite } from "@/components/akofe-site";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/projects", "Our Projects", "Empowering communities, sustaining futures: AKOFE educational, social and sustainable development projects across Sri Lanka.", "/images/slide3.jpeg");

export default function Projects() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Our Projects", path: "/projects" }]} />
      <AkofeSite page="projects" />
    </>
  );
}
