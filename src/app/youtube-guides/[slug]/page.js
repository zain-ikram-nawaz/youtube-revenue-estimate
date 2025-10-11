import React from "react";
import data from "../../../data/data.json";
import YoutubeGuide from "../../components/YoutubeGuide/page";

// ✅ 1. Generate SEO metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } =await params;

  const guidData = data.find((item) => item.slug === slug);

  if (!guidData) {
    return {
      title: "Guide Not Found | Channel Income",
      description: "The requested YouTube guide could not be found.",
    };
  }

  return {
    title: `${guidData.title} | Channel Income`,
    description: guidData.description || "YouTube tips and monetization guides by Channel Income.",
    openGraph: {
      title: guidData.title,
      description: guidData.description,
      url: `https://channelincome.com/guide/${slug}`,
      images: [
        {
          url: guidData.image || "https://channelincome.com/images/default-guide.jpg",
          width: 1200,
          height: 630,
          alt: guidData.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: guidData.title,
      description: guidData.description,
      images: [guidData.image || "https://channelincome.com/images/default-guide.jpg"],
    },
    alternates: {
      canonical: `https://channelincome.com/guide/${slug}`,
    },
  };
}

// ✅ 2. Page component (SSR)
export default async function Page({ params }) {
  const { slug } = await params;
  const guidData = data.find((item) => item.slug === slug);

  // ❌ If not found
  if (!guidData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No guide found.</p>
      </div>
    );
  }

  // ✅ 3. JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: guidData.title,
    description: guidData.description,
    image: guidData.image || "https://channelincome.com/images/default-guide.jpg",
    author: {
      "@type": "Organization",
      name: "Channel Income",
      url: "https://channelincome.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Channel Income",
      logo: {
        "@type": "ImageObject",
        url: "https://channelincome.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://channelincome.com/guide/${slug}`,
    },
  };

  return (
    <>
      {/* ✅ Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ Render Guide content */}
      <YoutubeGuide guidData={guidData} />
    </>
  );
}
