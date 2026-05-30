import React from "react";
import ContactUs from "../../components/Contact/Contact";

export const metadata = {
  title: "Contact Us",
  description:
    "Reach out to ChannelIncome for support, partnership inquiries, or feature requests. Email support@channelincome.com — response within 24 hours.",
  alternates: { canonical: "https://channelincome.com/contact-us" },
  openGraph: {
    title: "Contact ChannelIncome | YouTube Revenue Tool Support",
    description:
      "Questions about YouTube revenue estimates or feature requests? Contact ChannelIncome — email support@channelincome.com for a response within 24 hours.",
    url: "https://channelincome.com/contact-us",
    type: "website",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ChannelIncome",
    description:
      "Get in touch with ChannelIncome for YouTube revenue calculator support or partnership opportunities.",
    url: "https://channelincome.com/contact-us",
    publisher: {
      "@type": "Organization",
      name: "ChannelIncome",
      url: "https://channelincome.com",
      logo: "https://channelincome.com/icon.png",
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "support@channelincome.com",
          contactType: "customer support",
          areaServed: "Worldwide",
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
