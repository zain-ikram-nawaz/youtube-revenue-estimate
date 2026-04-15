import YoutubeAnalyzer from "../../../components/YoutubeChecker/YoutubeChecker";
import FAQ from "../../../components/FAQ/FAQ";
import ListingGuide from "../../../components/AdminUseOnly/ListingGuide/page";
import SeoText from "../../../components/SeoText/page";
import Script from "next/script";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = {
  title: "YouTube Views to Money Calculator 2026: Check RPM & CPM Rates",
  description: "Wondering how much money per view you get on YouTube? Use our free calculator to estimate your earnings, check RPM/CPM by country, and see 2026 growth tips.",
  keywords: [
    "YouTube Views to Money Calculator",
    "how much money per hit on youtube", "YouTube channel revenue estimator", "how much money is per view on youtube", "YouTube earnings calculator",
  ],
  alternates: { canonical: "https://channelincome.com/tool/youtube-revenue-calculator" }, openGraph: {
    title: "YouTube Views to Money Calculator: Estimate Your Earnings Instantly",
    description: "Calculate your YouTube income based on views, niche, and country. Free tool for creators to track RPM and CPM in 2026.",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
    type: "website",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
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
    // --- New High Volume Keywords Integrated ---
    {
      q: "How to make money on YouTube?",
      a: "You can make money on YouTube by joining the YouTube Partner Program (YPP) once you meet the eligibility criteria. Revenue comes from ad impressions, YouTube Premium, channel memberships, and affiliate marketing."
    },
    {
      q: "How much money per hit (view) do you get on YouTube?",
      a: "On average, YouTube creators earn between $0.01 to $0.03 per view, depending on their RPM. This means 1,000 views can generate anywhere from $1 to $30+ depending on the audience location and niche."
    },
    {
      q: "How much money is per 1000 views on YouTube?",
      a: "The amount varies based on your RPM. While the global average is around $2-$5 per 1,000 views, high-CPM niches like Finance or Tech in Tier 1 countries can earn $20 or more per 1,000 views."
    },
    {
      q: "Does it cost money to subscribe to a YouTube channel?",
      a: "No, subscribing to a YouTube channel is completely free. However, 'Channel Memberships' are a paid feature where viewers pay a monthly fee for exclusive perks."
    },
    {
      q: "How much money do skit YouTubers make?",
      a: "Skit YouTubers typically have a lower RPM (around $1-$3) compared to educational channels because their content is broad. They rely on high view volumes and brand sponsorships to maximize their earnings."
    },

    // --- Your Existing FAQs ---
    {
      q: "What is YouTube CPM?",
      a: "CPM stands for Cost Per Mille — it represents how much advertisers pay YouTube for every 1,000 ad impressions."
    },
    {
      q: "What is YouTube RPM?",
      a: "RPM (Revenue Per Mille) shows how much actual revenue a creator earns per 1,000 video views after YouTube's share."
    },
    {
      q: "What are the requirements for YouTube monetization?",
      a: "To monetize your channel, you need at least 1,000 subscribers and 4,000 valid public watch hours in the past 12 months, or 10 million public Shorts views in the last 90 days."
    },
    {
      q: "Are revenue estimates exact?",
      a: "No, revenue estimates are projections based on industry averages, regional CPM rates, and niche performance. Actual earnings are finalized in your YouTube Analytics."
    },
    {
      q: "How can I grow my channel faster?",
      a: "Focus on high-retention content, optimize your video SEO (titles and tags), use engaging thumbnails, and consistently upload videos that target high-interest topics in your niche."
    },
  ];
  const schemas = {
    app: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "YouTube Revenue Estimator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
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
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://channelincome.com/tool/youtube-revenue-calculator" } // Corrected
      ]
    }
  };

  return (
    <>
      <Script id="app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.app) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
      <main className="min-h-screen bg-[#fafafa]">
        {/* Page Header */}
        <header className="text-center py-10 px-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-snug max-w-2xl mx-auto">
            YouTube Views to Money Calculator: Free Revenue Estimator (2026)
          </h1>
          <p className="text-[13px] text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
            Figuring out your possible income as a creator can feel unclear, especially when you encounter different figures across platforms. A YouTube Views to Money Calculator helps close that gap. It gives an estimated earnings range based on video views and performance metrics.
          </p>
          <p className="text-[13px] text-gray-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            However, it is important to realize that platforms do not fix a flat rate for every view. Instead, your real income comes from a complex ad auction system. It depends on ad rates, where your audience lives, your content niche, and viewer engagement.
          </p>
        </header>

        {/* Tool Section */}
        <section id="youtube-tool" className="bg-white border-y border-gray-100">
          <div className="">
            <YoutubeAnalyzer seoSections={{ faq: faqData }} />
          </div>
        </section>

        {/* SEO Text Section */}
        <section id="seo-text" className="py-6 px-4">
          <SeoText />
        </section>

        {/* Guides Library */}
        <section id="guides" className="py-10 bg-white border-y border-gray-100 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Growth Library</h2>
                <p className="text-[13px] text-gray-600">Expert strategies to increase your CPM and RPM.</p>
              </div>
              <Link href="/guide" className="text-red-600 text-sm font-semibold hover:underline flex items-center gap-1">
                Browse All Guides <span>→</span>
              </Link>
            </div>
            <ListingGuide data={guides} />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-10 bg-[#fafafa] px-4">
          <div className="max-w-2xl mx-auto">
            <FAQ faq={faqData} />
          </div>
        </section>

        {/* Floating Mobile CTA */}
        <div className="fixed bottom-4 right-4 md:hidden z-50">
          <Link
            href="#youtube-tool"
            className="bg-red-600 text-white px-4 py-3 rounded-[6px] shadow-lg text-xs font-semibold flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Zap className="w-3 h-3" /> ESTIMATE NOW
          </Link>
        </div>
      </main>
    </>
  );
}