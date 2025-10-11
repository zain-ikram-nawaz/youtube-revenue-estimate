import React from "react";
import ContactUs from "../components/contact/page";

export const metadata = {
  title: "Contact Us | YouTube Channel Revenue Estimator",
  description:
    "Get in touch with our YouTube analytics experts. Contact us for inquiries, support, or partnerships.",
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact YT Revenue Pro",
    "description":
      "Get in touch with our YouTube analytics experts to maximize your channel's revenue potential.",
    "url": "https://channelincome.com/contact-us",
    "publisher": {
      "@type": "Organization",
      "name": "YT Revenue Pro",
      "url": "https://channelincome.com",
      "logo": "https://channelincome.com/images/logoo.png",
      "sameAs": [
        "https://twitter.com/",
        "https://www.linkedin.com/",
        "https://www.youtube.com/",
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+92-308-2821704",
          "contactType": "customer support",
          "areaServed": "Worldwide",
          "availableLanguage": ["English"],
        },
        {
          "@type": "ContactPoint",
          "email": "Zainikram704@gmail.com",
          "contactType": "customer support",
          "availableLanguage": ["English"],
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
