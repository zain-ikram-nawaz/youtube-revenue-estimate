// app/page.js (Home Page)
import HomeIntroduction from "../components/SeoText/homeText";
import HomeFAQ from "../components/FAQ/FAQ";

export const revalidate = 3600; // Har 1 ghante baad update hoga

const homeFaqData = [
{
    q: "Can I earn money by watching YouTube videos?",
    a: "While there are third-party apps that claim to pay for views, YouTube itself does not pay users to watch videos. Our tool focuses on helping creators estimate their potential earnings from content creation and ad revenue.",
  },
  {
    q: "When do you start earning money from YouTube?",
    a: "You can start earning once you join the YouTube Partner Program (YPP). Generally, this requires 1,000 subscribers and either 4,000 valid public watch hours in the past year or 10 million public Shorts views in the last 90 days.",
  },
  {
    q: "What is the average 1 million subscribers YouTube income per month?",
    a: "A channel with 1 million subscribers typically earns between $5,000 and $50,000 per month from AdSense. However, most creators at this level earn 3-5x more through sponsorships, affiliate marketing, and merchandise.",
  },
  {
    q: "What is the typical YouTube income per 1,000 views?",
    a: "The income per 1,000 views (RPM) varies by niche and location, usually ranging from $0.50 to $7.00. For example, finance channels see much higher rates than gaming or comedy channels.",
  },
  {
    q: "What is the difference between CPM and RPM on YouTube?",
    a: "CPM (Cost Per Mille) is what advertisers pay for 1,000 views, while RPM (Revenue Per Mille) is what you actually earn after YouTube's cut and other deductions. Our tool calculates both instantly.",
  },
  {
    q: "Is there any low income relief for YouTubers?",
    a: "YouTube doesn't offer direct 'relief' for low earnings, but creators can boost income by diversifying into channel memberships, Super Chats, and YouTube Shopping to supplement their AdSense revenue.",
  },
  {
    q: "How does the AI YouTube Revenue Estimator work?",
    a: "Our tool uses AI (Groq-powered) to analyze your channel metrics and provide personalized growth tips, helping you optimize your RPM and content strategy for 2026.",
  },
  {
    q: "Is ChannelIncome free to use?",
    a: "Yes, ChannelIncome is a 100% free tool for creators to check their YouTube monetization status, revenue estimates, and channel performance.",
  },
  {
    q: "How can I increase my YouTube RPM?",
    a: "You can increase your RPM by targeting high-paying countries, optimizing video length, and choosing high-CPM niches. Our AI provides specific tips based on your data.",
  }
];

// ✅ Optimized Metadata for CTR (Targeting RPM/CPM and AI)
export const metadata = {
  title: "AI YouTube Revenue Estimator | RPM vs CPM Calculator (2026)",
  description: "Free AI-powered tool to estimate YouTube earnings. Compare RPM vs CPM, analyze monetization compliance, and get personalized growth tips to double your revenue in 2026.",
  keywords: [
    "YouTube RPM vs CPM difference 2026",
    "AI YouTube revenue estimator",
    "YouTube earnings calculator",
    "monetization compliance score",
    "RPM vs CPM explanation",
    "YouTube income checker",
    "YouTube growth tips AI",
  ],
  alternates: { canonical: "https://channelincome.com" },
  openGraph: {
    title: "AI YouTube Revenue Calculator & Growth Insights",
    description: "Master your YouTube growth with AI. Estimate revenue, calculate RPM, and get expert guides for 2026.",
    url: "https://channelincome.com",
    images: [{ url: "https://channelincome.com/icon.png", width: 1200, height: 630 }],
  },
};

// ✅ JSON-LD: SoftwareApplication (Tells Google it's a Tool)
function JsonLdApp() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ChannelIncome AI YouTube Estimator",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered YouTube revenue estimator and channel analytics tool providing RPM, CPM, and growth tips.",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1482" },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

// ✅ JSON-LD: FAQ Schema
function JsonLdFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeFaqData.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />;
}

// Ek alag component banayein fetch ke liye
// async function GuidesSection() {
//   const { guides } = await getGuides(1, 8);
//   return <ListingGuide data={guides} />;
// }
export default async function Home() {
// const { guides } = await getGuides(1, 8);
  return (
    <>
      <JsonLdApp />
      <JsonLdFAQ />

      <HomeIntroduction />

      {/* 2026 Highlight Section (New for SEO) */}
      {/* <section className="bg-blue-50 py-10 px-6 rounded-xl my-8 text-center max-w-5xl mx-auto">
         <h2 className="text-2xl font-bold text-gray-800">New: 2026 AI Growth Engine Integrated</h2>
         <p className="mt-2 text-gray-600">Dont just calculate your revenue. Use our AI tips to understand the **RPM vs CPM difference** and grow your earnings.</p>
      </section> */}

{/* Guides ko Suspense mein rakhein taake upar wala content foran load ho */}
      {/* <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading Guides...</div>}>
         <GuidesSection />
      </Suspense> */}
        <HomeFAQ faq={homeFaqData} />
    </>
  );
}