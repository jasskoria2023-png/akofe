import type { Metadata } from "next";
import { AkofeSite } from "@/components/akofe-site";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/koica", "KOICA in Sri Lanka", "Discover how KOICA has supported Sri Lanka and how AKOFE fellows turn Korean training into local development action.", "/images/koica.png");

export default function Koica() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "KOICA in Sri Lanka", path: "/koica" }]} />
      <AkofeSite page="koica" />
    </>
  );
}
