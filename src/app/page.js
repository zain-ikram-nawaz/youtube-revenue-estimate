// app/page.js (Home Page)
import HomeIntroduction from "./components/SeoText/homeText";
import ListingGuide from "./components/AdminUseOnly/ListingGuide/page";
import HomeFAQ from "./components/FAQ/FAQ";
import { getGuides } from "./hooks/getGuides";

const homeFaqData = [
  {
    q: "What is the difference between CPM and RPM on YouTube?",
    a: "CPM (Cost Per Mille) is what advertisers pay for 1,000 views, while RPM (Revenue Per Mille) is what you actually earn after YouTube's cut and other deductions. Our tool calculates both instantly.",
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
  alternates: { canonical: "https://channelincome.com/" },
  openGraph: {
    title: "AI YouTube Revenue Calculator & Growth Insights | ChannelIncome",
    description: "Master your YouTube growth with AI. Estimate revenue, calculate RPM, and get expert guides for 2026.",
    url: "https://channelincome.com/",
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

export default async function Home() {
  const { guides } = await getGuides();

  return (
    <>
      <JsonLdApp />
      <JsonLdFAQ />

      <HomeIntroduction />

      {/* 2026 Highlight Section (New for SEO) */}
      <section className="bg-blue-50 py-10 px-6 rounded-xl my-8 text-center max-w-5xl mx-auto">
         <h2 className="text-2xl font-bold text-gray-800">New: 2026 AI Growth Engine Integrated</h2>
         <p className="mt-2 text-gray-600">Don't just calculate your revenue. Use our AI tips to understand the **RPM vs CPM difference** and grow your earnings.</p>
      </section>

      <ListingGuide data={guides} />
      <HomeFAQ faq={homeFaqData} />
    </>
  );
}