import YoutubeAnalyzer from "../../../components/YoutubeChecker/YoutubeChecker";
import FAQ from "../../../components/FAQ/FAQ";
import Script from "next/script";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = {
  // layout.js template adds " | ChannelIncome" → final: "YouTube Revenue Calculator 2026 | ChannelIncome" (47 chars)
  title: "YouTube Revenue Calculator 2026",
  description:
    "Free YouTube revenue calculator. Estimate realistic earnings by views, CPM, RPM, niche & country. Get a 2026 earnings range for your channel.",
  keywords: [
    "YouTube revenue calculator",
    "YouTube channel revenue calculator",
    "YouTube earnings calculator",
    "YouTube CPM calculator",
    "YouTube RPM calculator",
    "how much does YouTube pay",
    "YouTube income calculator",
    "YouTube money calculator 2026"
  ],
  alternates: {
    canonical: "https://channelincome.com/tool/youtube-revenue-calculator"
  },
  openGraph: {
    title: "YouTube Revenue Calculator – Check Channel Earnings Instantly",
    description:
      "Estimate YouTube earnings by views, CPM, RPM, niche & country. Free, realistic 2026 revenue estimates for creators.",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
    siteName: "ChannelIncome",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://channelincome.com/icon.png", width: 512, height: 512, alt: "ChannelIncome YouTube Revenue Calculator" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Revenue Calculator 2026 | ChannelIncome",
    description:
      "Estimate realistic YouTube earnings by views, niche & country. Free CPM/RPM calculator for creators.",
    images: ["https://channelincome.com/icon.png"],
    creator: "@channelincome"
  }
};


export default async function YouTubeRevenueEstimateor() {
const niches = [
  ["Finance & Business",  "$8 – $15"],
  ["Technology / AI",     "$5 – $12"],
  ["Education / How-to",  "$4 – $10"],
  ["Lifestyle / Vlogs",   "$2 – $6"],
  ["Entertainment",       "$2 – $5"],
  ["Gaming",              "$2 – $5"],
  ["Kids Content",        "$1 – $3"],
];
const countries = [
  ["United States",      "$10 – $20"],
  ["United Kingdom",     "$8 – $15"],
  ["Canada / Australia", "$8 – $14"],
  ["Germany / Europe",   "$6 – $12"],
  ["Middle East",        "$4 – $8"],
  ["India",              "$1 – $3"],
  ["Pakistan",           "$0.5 – $2"],
];

const pills = [
  {  title: "Views",           desc: "More views = more ad impressions = more revenue potential." },
  {  title: "CPM",             desc: "What advertisers pay per 1,000 impressions — before YouTube's 45% cut." },
  {  title: "RPM",             desc: "What you actually receive per 1,000 views after YouTube keeps its share." },
  {  title: "Niche & Country", desc: "The two factors most calculators ignore — and the ones that matter most." },
];

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
      {/* ── Schemas ── */}
      <Script id="app-schema"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.app) }} />
      <Script id="faq-schema"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />

      <main className="min-h-screen bg-background text-foreground">

        {/* ════════════════════════════
            HERO — dark green bg
        ════════════════════════════ */}
        <section className="relative bg-primary overflow-hidden px-4 py-14 md:py-20">
          {/* subtle accent glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(48,109,41,0.25),transparent)]" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 bg-primary-hover border border-border rounded-lg px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-lg bg-accent animate-pulse" />
              <span className="text-[11px] font-medium tracking-widest text-background/70 uppercase">Free Tool · Updated 2026</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-background leading-tight tracking-tight mb-4">
              YouTube Revenue <br />
              <span className="text-accent">Calculator 2026</span>
            </h1>

            <p className="text-[15px] text-background/70 leading-relaxed max-w-xl mb-8">
              Most calculators give you one number based on views alone — and it's almost always wrong.
              A finance channel with 100,000 views in the US earns 4–5× more than a gaming channel
              with the same views in Pakistan. Ours accounts for niche and audience country,
              so you get an estimate that actually reflects how YouTube ad revenue works.
            </p>

            <Link
              href="#youtube-tool"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-background active:scale-95 text-foreground text-sm font-semibold px-5 py-3 rounded-lg transition-all"
            >
              <Zap className="w-4 h-4" /> Calculate My Earnings
            </Link>
          </div>
        </section>

        {/* ════════════════════════════
            HOW IT WORKS
        ════════════════════════════ */}
        <section className="bg-background border-y border-border px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">How it works</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-4">
              Three inputs. One realistic estimate.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              The estimate comes from your view count, your content niche, and where your audience is located.
              Select a niche — Finance, Gaming, Education — and the calculator applies the average RPM
              advertisers pay for that category. Select your audience region and it adjusts for CPM
              differences between countries. A viewer in the US generates significantly more ad revenue
              than a viewer in South Asia, even watching the exact same video.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pills.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 bg-secondary border border-border rounded-lg p-4">
              
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                    <p className="text-xs text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            TOOL
        ════════════════════════════ */}
        <section id="youtube-tool" className="bg-secondary border-b border-border">
          <YoutubeAnalyzer seoSections={{ faq: faqData }} />
        </section>

        {/* ════════════════════════════
            CPM / RPM TABLES
        ════════════════════════════ */}
        <section className="bg-background border-b border-border px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">2026 Rate Data</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              YouTube CPM & RPM rates — by niche and country
            </h2>
            <p className="text-sm text-muted mb-8">
              These are the real numbers behind the calculator. Finance content in the US sits at the top.
              Kids content in low-CPM countries sits at the bottom. Everything else falls in between.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Niche table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-primary px-4 py-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-background">RPM by Niche</h3>
                  <span className="text-[11px] text-background/60">2026 averages</span>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left text-[11px] font-semibold text-foreground uppercase tracking-wider px-4 py-2 border-b border-border">Niche</th>
                      <th className="text-right text-[11px] font-semibold text-foreground uppercase tracking-wider px-4 py-2 border-b border-border">Typical RPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {niches.map(([niche, rpm], i) => (
                      <tr key={niche} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                        <td className="px-4 py-2.5 text-foreground border-b border-border text-xs">{niche}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-accent border-b border-border text-xs">{rpm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-muted px-4 py-2.5 border-t border-border bg-secondary">
                  RPM = revenue after YouTube's 45% share
                </p>
              </div>

              {/* Country table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-primary px-4 py-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-background">CPM by Country</h3>
                  <span className="text-[11px] text-background/60">2026 averages</span>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left text-[11px] font-semibold text-foreground uppercase tracking-wider px-4 py-2 border-b border-border">Country / Region</th>
                      <th className="text-right text-[11px] font-semibold text-foreground uppercase tracking-wider px-4 py-2 border-b border-border">Avg CPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map(([country, cpm], i) => (
                      <tr key={country} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                        <td className="px-4 py-2.5 text-foreground border-b border-border text-xs">{country}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-accent border-b border-border text-xs">{cpm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-muted px-4 py-2.5 border-t border-border bg-secondary">
                  CPM = advertiser cost before YouTube's cut
                </p>
              </div>

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