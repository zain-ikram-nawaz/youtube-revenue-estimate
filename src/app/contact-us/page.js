import React from "react";
import ContactUs from "../components/contact/page";

// ✅ Page-level metadata for Next.js App Router
export const metadata = {
  title: "Contact Us | ChannelIncome",
  description:
    "Get in touch with our YouTube analytics experts. Contact us for inquiries, support, or partnerships.",
  keywords: [
    "Contact ChannelIncome",
    "YouTube analytics support",
    "creator tools help",
    "monetization guidance",
  ],
  alternates: { canonical: "https://channelincome.com/contact-us" },
};

export default function Page() {
  // ✅ JSON-LD structured data for ContactPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ChannelIncome",
    description:
      "Get in touch with our YouTube analytics experts to maximize your channel's revenue potential.",
    url: "https://channelincome.com/contact-us",
    publisher: {
      "@type": "Organization",
      name: "ChannelIncome",
      url: "https://channelincome.com",
      logo: "https://channelincome.com/icon.png",
      // sameAs: [
      //   "https://twitter.com/channelincome",
      //   "https://www.linkedin.com/company/channelincome",
      //   "https://www.youtube.com/@channelincome",
      // ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+92-308-2821704",
          contactType: "customer support",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          email: "Zainikram704@gmail.com",
          contactType: "customer support",
          availableLanguage: ["English"],
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactUs />
    </>
  );
}
