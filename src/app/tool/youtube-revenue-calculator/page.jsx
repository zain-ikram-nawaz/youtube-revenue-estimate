import YoutubeAnalyzer from "../../../components/YoutubeChecker/YoutubeChecker";
import FAQ from "../../../components/FAQ/FAQ";
import Script from "next/script";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = {
  title: "YouTube Revenue Calculator 2026 | Channel Earnings, RPM & CPM",
  description:
    "Free YouTube revenue calculator to estimate realistic earnings using views, CPM, RPM, niche, and country. Discover a 2026 earnings range for YouTube channels and creators.",
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
      "Estimate YouTube earnings based on views, CPM, RPM, niche, and audience location. Free, realistic revenue estimates for creators and channels.",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
    type: "website",
    images: [{ url: "https://channelincome.com/icon.png" }]
  }
};


export default async function YouTubeRevenueEstimateor() {

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
      q: "Can this estimate include Shorts revenue?",
      a: "This calculator focuses on ad revenue and typical CPM/RPM ranges. Shorts and non-ad income may vary and are not fully captured by the core estimate."
    },
    {
      q: "How accurate are these YouTube revenue estimates?",
      a: "Estimates are based on average CPM and RPM values and should be used as a planning guide. Actual earnings may vary depending on your channel, audience, and niche."
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
                estimate reliable channel earnings using views, CPM, RPM,
                niche, and audience location. Ideal for creators who want a
                more realistic projection than a basic views-only calculator.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-3">
                Compare earnings across countries and niches to understand how
                YouTube revenue changes with ad value, geography, and content type.
              </p>
            </div>

            <div className="bg-background rounded-md shadow-sm border border-border p-5 mt-5">
              <h2 className="text-base font-bold text-foreground mb-3">
                How the calculator works
              </h2>
              <p className="text-xs text-muted leading-relaxed">
                Enter views, CPM, RPM, niche, and audience location to get an estimated monthly and annual revenue range. This tool uses realistic creator revenue patterns to help you make better channel decisions.
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-xs text-muted">
                <li>Views measure potential ad impressions.</li>
                <li>CPM shows advertiser spend per 1,000 impressions.</li>
                <li>RPM reveals creator income after YouTube’s share.</li>
                <li>Niche and country adjust the estimate for typical ad value.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* TOOL */}
        <section id="youtube-tool" className="bg-white border-y border-gray-100">
          <YoutubeAnalyzer seoSections={{ faq: faqData }} />
        </section>

        <section className="bg-[#fafafa] px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-background rounded-md shadow-sm border border-border p-5">
              <h2 className="text-base font-bold text-foreground mb-3">
                Sample YouTube earnings example
              </h2>
              <p className="text-xs text-muted leading-relaxed">
                Example: A video with 100,000 views in a high-value niche could earn between $400 and $1,200 depending on CPM and RPM. A similar video in a lower-value niche may earn substantially less, so understanding both audience and topic is essential.
              </p>
            </div>
          </div>
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
            <Zap className="w-3 h-3" /> ESTIMATE NOW.
          </Link>
        </div>

      </main>
    </>
  );
}