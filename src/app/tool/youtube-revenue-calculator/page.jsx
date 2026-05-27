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
    title: "YouTube Revenue Calculator 2026 – Estimate RPM, CPM & Earnings",
    description:
      "Estimate YouTube earnings based on views, CPM, RPM, niche, and audience location. Free, realistic revenue estimates for creators and channels.",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
    siteName: "ChannelIncome",
    locale: "en_US",
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
      a: "RPM is the actual revenue a creator earns per 1,000 views after YouTube's share."
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
    },
    {
      q: "What is a good RPM on YouTube in 2026?",
      a: "A good RPM in 2026 ranges from $2–$15 depending on niche. Finance, tech, and business channels tend to have the highest RPMs, while entertainment and gaming are typically lower."
    },
  ];

  const schemas = {
    app: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "YouTube Revenue Calculator",
      url: "https://channelincome.com/tool/youtube-revenue-calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: "Free YouTube revenue calculator to estimate realistic earnings using views, CPM, RPM, niche, and audience country. Updated 2026.",
      featureList: [
        "YouTube RPM estimation by niche",
        "YouTube CPM rates by country",
        "Channel revenue range calculator",
        "YouTube Partner Program eligibility checker",
        "AI-powered channel analysis"
      ],
      creator: {
        "@type": "Organization",
        name: "ChannelIncome",
        url: "https://channelincome.com"
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://channelincome.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "YouTube Revenue Calculator",
          item: "https://channelincome.com/tool/youtube-revenue-calculator",
        },
      ],
    },
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

      <main className="min-h-screen bg-background text-foreground">

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
        </section>

        {/* ════════════════════════════
            TOOL
        ════════════════════════════ */}
        <section id="youtube-tool" className="bg-secondary border-b border-border">
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

        {/* ════════════════════════════
            FAQ
        ════════════════════════════ */}
        <section id="faq" className="bg-secondary px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">FAQ</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              Common questions
            </h2>
            <p className="text-sm text-muted mb-8">
              Everything creators ask about YouTube revenue, RPM, and CPM in 2026.
            </p>

            <FAQ faq={faqData} />

            {/* Accuracy note */}
            <div className="mt-8 flex gap-4 items-start bg-background border border-border rounded-lg p-5">
              <span className="text-xl flex-shrink-0 mt-0.5">✅</span>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">A note on accuracy</h3>
                <p className="text-xs text-muted leading-relaxed">
                  No external calculator has access to your actual YouTube Studio data.
                  What this tool does is give you a realistic range based on how ad revenue
                  actually works — factoring in niche and geography, not just views.
                  Use it to compare potential across niches and plan your content strategy.
                  For exact figures, YouTube Studio is the only source.
                </p>
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  Read our YouTube growth guides →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ════════════════════════════
          MOBILE FLOATING CTA
      ════════════════════════════ */}
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <Link
          href="#youtube-tool"
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-background text-xs font-bold px-5 py-3.5 rounded-lg shadow-lg active:scale-95 transition-all tracking-wide"
        >
          <Zap className="w-3.5 h-3.5" /> ESTIMATE NOW
        </Link>
      </div>
    </>
  );
}
