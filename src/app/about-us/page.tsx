import type { Metadata } from "next";
import { AkofeSite } from "@/components/akofe-site";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/about-us", "About Us", "Learn about the Association of KOICA Fellows in Sri Lanka (AKOFE): our mission, our 900+ members and our work across the island.", "/images/slide2.jpeg");

export default function AboutUs() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "About Us", path: "/about-us" }]} />
      <AkofeSite page="about" />
    </>
  );
}
