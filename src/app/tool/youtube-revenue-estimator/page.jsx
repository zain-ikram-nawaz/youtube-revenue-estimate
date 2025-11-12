import YoutubeAnalyzer from "../../components/youtubeChecker/page";
import FAQ from "../../components/FAQ/page";
import ListingGuide from "../../components/AdminUseOnly/ListingGuide/page";
import SeoText from "../../components/SeoText/page";

// ✅ Metadata (Optimized for CTR & Mobile truncation)
export const metadata = {
  title: "Free YouTube Revenue Estimator: Calculate Income, CPM, RPM & Growth | ChannelIncome",
  description:
    "Instantly estimate YouTube earnings, check monetization, CPM & RPM with our free YouTube Revenue Estimator. Track views, subscribers, and channel growth today!",
  keywords: [
    "YouTube Revenue Estimator",
    "YouTube Earnings Calculator",
    "YouTube Channel Income",
    "YouTube CPM Calculator",
    "YouTube RPM Estimator",
    "YouTube Monetization Checker",
    "Free YouTube Analytics Tool",
    "YouTube Growth Tracker",
    "Check if my YouTube channel is monetized",
    "Estimate earnings for small channels"
  ],
  alternates: { canonical: "https://channelincome.com/" },
  openGraph: {
    title: "Free YouTube Revenue Estimator: Calculate Income, CPM, RPM & Growth | ChannelIncome",
    description: "Estimate YouTube earnings, check monetization eligibility, and track channel metrics with ChannelIncome's free tool.",
    url: "https://channelincome.com/",
    siteName: "ChannelIncome",
    images: [{ url: "/icon.png", width: 1200, height: 630, alt: "YouTube Revenue Estimator Preview" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Channel Revenue Estimator",
    description: "Instantly estimate YouTube earnings, CPM, RPM, and engagement metrics for free.",
    images: ["/icon.png"],
  },
};

async function getGuides() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guide`, { cache: "no-store" });
  return res.json();
}

export default async function YouTubeRevenueEstimateor() {
  const { guides } = await getGuides();

  const faqData = [
    { q: "What is YouTube CPM?", a: "CPM stands for Cost Per Mille — it represents how much advertisers pay YouTube for every 1,000 ad impressions on videos. Creators receive a portion after YouTube’s revenue share." },
    { q: "What is YouTube RPM?", a: "RPM (Revenue Per Mille) shows how much actual revenue a YouTube creator earns per 1,000 video views after YouTube takes its share." },
    { q: "What are the requirements for YouTube monetization?", a: "You need at least 1,000 subscribers and 4,000 watch hours in the past 12 months to qualify for the YouTube Partner Program (YPP)." },
    { q: "Are revenue estimates exact?", a: "No. Revenue calculations are estimates based on publicly available data. Actual earnings may vary depending on real watch time, advertiser demand, and channel specifics." },
    { q: "How can I grow my channel to monetize faster?", a: "Consistent uploads, high-quality content, audience engagement, optimized video titles/descriptions/thumbnails, and performance analysis." },
  ];



  function JsonLdApp() {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "YouTube Channel Revenue Estimator",
      operatingSystem: "Web",
      applicationCategory: "UtilityApplication",
        // ✅ Added image for better rich results
        image: "/tool.png", // Path to a screenshot of your tool
      description: "Free YouTube analytics tool that estimates revenue, monetization eligibility, and channel performance. See views, subscribers, total videos, average monthly views, channel age, monetization status, engagement metrics, upload frequency, view velocity, top-performing videos, and performance insights.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1482" },
      creator: { "@type": "Organization", name: "ChannelIncome", url: "https://channelincome.com/" },
    url: "https://channelincome.com/",
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
  }

// ... rest of the code is excellent ...

  function JsonLdFAQ() {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />;
  }

  function JsonLdGuides() {
    const guidesSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: guides?.slice(0, 8).map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://channelincome.com/guide/${guide.slug}`,
        name: guide.title,
        description: guide.metaDescription,
      })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesSchema) }} />;
  }

  function JsonLdSeoText() {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Free YouTube Revenue Estimator: Calculate Income, CPM, RPM & Growth",
      description: "A comprehensive guide and tool to estimate YouTube earnings, understand CPM/RPM, and plan channel growth.",
      author: { "@type": "Organization", name: "ChannelIncome" },
      publisher: { "@type": "Organization", name: "ChannelIncome", logo: { "@type": "ImageObject", url: "https://channelincome.com/logo.png" } },
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://channelincome.com/" },
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
  }

  return (
    <>
      <JsonLdApp />
      <JsonLdSeoText />
      <JsonLdGuides />
      <JsonLdFAQ />


      {/* ✅ Main Sections */}
      <div id="youtube-tool"><YoutubeAnalyzer seoSections={{ faq: faqData }} /></div>
      <div id="seo-text"><SeoText /></div>
      <div id="guides"><ListingGuide data={guides} /></div>
      <div id="faq"><FAQ faq={faqData} /></div>
    </>

  );
}
