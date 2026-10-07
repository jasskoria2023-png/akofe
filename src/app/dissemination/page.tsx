import type { Metadata } from "next";
import { AkofeSite } from "@/components/akofe-site";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/dissemination", "Knowledge Dissemination", "AKOFE knowledge dissemination programs: electronics, AI, election and community lectures sharing Korean learning in Sri Lanka.", "/images/dissamination/ai-01.jpeg");

export default function Dissemination() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Knowledge Dissemination", path: "/dissemination" }]} />
      <AkofeSite page="dissemination" />
    </>
  );
}
