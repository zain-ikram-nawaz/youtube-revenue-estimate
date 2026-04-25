import YoutubeAnalyzer from "../../../components/YoutubeChecker/YoutubeChecker";
import FAQ from "../../../components/FAQ/FAQ";
import Script from "next/script";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = {
  title: "YouTube Revenue Calculator 2026 | Channel Earnings, RPM & CPM",
  description:
    "Free YouTube revenue calculator to estimate earnings using views, CPM, RPM, niche, and country. Check how much a YouTube channel makes in 2026 with accurate insights.",
  keywords: [
    "YouTube revenue calculator",
    "YouTube channel revenue calculator",
    "YouTube earnings calculator",
    "YouTube CPM calculator",
    "YouTube RPM calculator"
  ],
  alternates: {
    canonical:
      "https://channelincome.com/tool/youtube-revenue-calculator"
  },
  openGraph: {
    title: "YouTube Revenue Calculator – Check Channel Earnings Instantly",
    description:
      "Estimate YouTube earnings based on views, CPM, RPM, niche, and audience location. Free and accurate revenue calculator for creators.",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
    type: "website",
    images: [{ url: "/icon.png" }]
  }
};

async function getGuides() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/guide`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function YouTubeRevenueEstimateor() {
  const { guides } = await getGuides();

  const faqData = [
    {
      q: "How to make money on YouTube?",
      a: "You can earn money by joining the YouTube Partner Program and monetizing your videos through ads, memberships, and other features."
    },
    {
      q: "How much money per 1,000 views on YouTube?",
      a: "On average, creators earn between $1 to $10 per 1,000 views depending on niche, audience location, and CPM rates."
    },
    {
      q: "What is YouTube CPM?",
      a: "CPM is the cost advertisers pay per 1,000 ad impressions on YouTube videos."
    },
    {
      q: "What is YouTube RPM?",
      a: "RPM is the actual revenue a creator earns per 1,000 views after YouTube’s share."
    },
    {
      q: "How can I increase YouTube earnings?",
      a: "Focus on high-CPM niches, improve watch time, and target Tier-1 audience countries for better revenue."
    }
  ];

  const schemas = {
    app: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "YouTube Revenue Calculator",
      url:
        "https://channelincome.com/tool/youtube-revenue-calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description:
        "YouTube revenue calculator to estimate earnings using views, CPM, RPM, niche, and country.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    },

    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a
        }
      }))
    },

    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://channelincome.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "YouTube Revenue Calculator Tool",
          item:
            "https://channelincome.com/tool/youtube-revenue-calculator"
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.app)
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.faq)
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumb)
        }}
      />

      <main className="min-h-screen bg-[#fafafa]">

        {/* INTRO */}
        <div className="bg-secondary px-4">
          <div className="max-w-5xl mx-auto">

            {/* H1 */}
            <div className="bg-background rounded-md shadow-sm border border-border p-5 text-center">
              <h1 className="text-lg md:text-xl font-bold text-foreground mb-3">
                YouTube Revenue Calculator
              </h1>
              <p className="text-sm text-muted leading-relaxed">
                Estimate how much a YouTube channel earns based on views,
                CPM, RPM, niche, and audience location.
              </p>
            </div>

            {/* SEO TEXT */}
            <div className="bg-background rounded-md shadow-sm border border-border p-5">
              <p className="text-sm text-muted leading-relaxed space-y-3">
                Our <strong>YouTube revenue calculator</strong> helps you
                estimate real channel earnings using views, CPM, RPM, and
                country data. Whether you're checking your own channel or
                competitors, it gives fast and accurate insights into YouTube
                income.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-3">
                You can also compare earnings across different countries and
                niches to understand how creators make money on YouTube in
                2026.
              </p>
            </div>

          </div>
        </div>

        {/* TOOL */}
        <section id="youtube-tool" className="bg-white border-y border-gray-100">
          <YoutubeAnalyzer seoSections={{ faq: faqData }} />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-10 bg-[#fafafa] px-4">
          <div className="max-w-2xl mx-auto">
            <FAQ faq={faqData} />
          </div>
        </section>

        {/* CTA */}
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