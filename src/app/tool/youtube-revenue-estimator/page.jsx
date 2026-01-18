import YoutubeAnalyzer from "../../components/youtubeChecker/page";
import FAQ from "../../components/FAQ/page";
import ListingGuide from "../../components/AdminUseOnly/ListingGuide/page";
import SeoText from "../../components/SeoText/page";
import Script from "next/script";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = {
  title: "Free YouTube Revenue Estimator [2026] - Accuracy-Driven CPM & RPM Tool",
  description: "Calculate accurate YouTube income, check monetization eligibility, and track RPM/CPM rates by country. Get real-time channel growth insights with ChannelIncome.",
  keywords: [
    "YouTube RPM Estimator 2026", "YouTube CPM Rates by Country", "check if channel is monetized",
    "YouTube Revenue Estimator", "YouTube Earnings Calculator", "YouTube Channel Income"
  ],
  alternates: { canonical: "https://channelincome.com/youtube-revenue-estimator" },
  openGraph: {
    title: "Free YouTube Revenue Estimator: Calculate Income, CPM, RPM & Growth | ChannelIncome",
    description: "Estimate YouTube earnings, check monetization eligibility, and track channel metrics with ChannelIncome's free tool.",
    url: "https://channelincome.com/youtube-revenue-estimator",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
};

async function getGuides() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guide`, { cache: "no-store" });
  return res.json();
}

export default async function YouTubeRevenueEstimateor() {
  const { guides } = await getGuides();

  const faqData = [
    { q: "What is YouTube CPM?", a: "CPM stands for Cost Per Mille — it represents how much advertisers pay YouTube for every 1,000 ad impressions." },
    { q: "What is YouTube RPM?", a: "RPM (Revenue Per Mille) shows how much actual revenue a creator earns per 1,000 video views after YouTube's share." },
    { q: "What are the requirements for YouTube monetization?", a: "You need 1,000 subscribers and 4,000 watch hours in the past 12 months." },
    { q: "Are revenue estimates exact?", a: "No, they are based on publicly available data and region-adjusted averages." },
    { q: "How can I grow my channel faster?", a: "Consistent uploads, high retention content, and optimized SEO are key." },
  ];

  const schemas = {
    app: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "YouTube Revenue Estimator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1482" }
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
    },
    breadcrumb: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://channelincome.com" },
            { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://channelincome.com/youtube-revenue-estimator" }
        ]
    }
  };

  return (
    <>
      <Script id="app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.app) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />

      <main className="min-h-screen bg-[#f8fafc]">
        {/* Tool Section */}
        <div id="youtube-tool" className="bg-white border-b border-gray-100">
          <YoutubeAnalyzer seoSections={{ faq: faqData }} />
        </div>

        {/* SEO Text (Replaces the old YouTubeRevenueContent) */}
        <section id="seo-text" className="py-10">
          <SeoText />
        </section>

        {/* Guides Library */}
        <section id="guides" className="py-20 bg-white border-y border-gray-100 px-4">
          <div className="max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 mb-2">Growth Library</h2>
                    <p className="text-gray-500 font-medium">Expert strategies to increase your CPM and RPM.</p>
                </div>
                <Link href="/guide" className="text-red-600 font-bold hover:underline">Browse All Guides →</Link>
             </div>
             <ListingGuide data={guides} />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50 px-4">
          <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-black mb-10 text-center">Frequently Asked Questions</h2>
             <FAQ faq={faqData} />
          </div>
        </section>

        {/* Floating Mobile CTA */}
        <div className="fixed bottom-6 right-6 md:hidden z-50">
            <Link href="#youtube-tool" className="bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl font-black flex items-center gap-2">
                <Zap className="w-4 h-4" /> ESTIMATE NOW
            </Link>
        </div>
      </main>
    </>
  );
}