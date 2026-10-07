import type { Metadata } from "next";
import { AkofeSite } from "@/components/akofe-site";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/gallery", "Gallery", "A thousand words in every frame: photos of AKOFE workshops, volunteer initiatives and community progress across Sri Lanka.", "/images/slide5.jpeg");

export default function Gallery() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Gallery", path: "/gallery" }]} />
      <AkofeSite page="gallery" />
    </>
  );
}
