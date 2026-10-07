import type { Metadata } from "next";
import { AkofeSite } from "@/components/akofe-site";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/contact-us", "Contact Us", "Contact the Association of KOICA Fellows in Sri Lanka (AKOFE) to discuss inquiries and collaboration on sustainable development.", "/images/contactus.jpg");

export default function ContactUs() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Contact Us", path: "/contact-us" }]} />
      <AkofeSite page="contact" />
    </>
  );
}
