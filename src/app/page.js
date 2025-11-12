import HomeIntroduction from "./components/SeoText/homeText";
import ListingGuide from "./components/AdminUseOnly/ListingGuide/page";
import HomeFAQ from "./components/FAQ/page";

// ✅ Fetch Guides from API

async function getGuides() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guide`, { cache: "no-store" });

  return res.json();

}

// ✅ FAQ Data (Optimized for AEO)
const homeFaqData = [
  {
    q: "What is ChannelIncome?",
    a: "ChannelIncome is a free analytics and learning platform for creators. It helps you estimate YouTube & TikTok earnings, analyze crucial metrics like View Velocity, and provides expert guides to grow your channel.",
  },
  {
    q: "Is the YouTube Revenue Estimator 100% free to use?",
    a: "Yes, our YouTube Revenue Estimator is 100% free. You can instantly check estimated earnings, CPM/RPM, and detailed monetization compliance metrics without any hidden costs.",
  },
  {
    q: "What is 'Monetization Compliance' and how does your tool help?",
    a: "Monetization Compliance shows your progress towards the YouTube Partner Program requirements (1000 subscribers and 4000 watch hours). Our tool calculates your Compliance Score and shows exactly the Subscribers Needed and Watch Hours Needed.",
  },
  {
    q: "What kind of guides are available on ChannelIncome?",
    a: "We publish weekly expert-level guides on YouTube SEO, content strategy, retention analysis, monetization tutorials, and future TikTok growth insights to help you succeed as a digital creator.",
  },
];


// ==========================================================
// ✅ Metadata (10/10 SEO/AEO Optimized)
// ==========================================================
export const metadata = {
  title:
    "ChannelIncome | Free YouTube Revenue Calculator, Channel Analytics & Growth Tools",
  description:
    "ChannelIncome is the ultimate free tool for creators: Instantly estimate YouTube earnings, analyze View Velocity, track Monetization Compliance, and get expert SEO & content strategy guides.",
  keywords: [
    "YouTube revenue calculator",
    "YouTube earnings estimator",
    "channel analytics tool",
    "monetization compliance score",
    "view velocity tracker",
    "YouTube growth tips",
    "YouTube SEO guide",
    "CPM RPM calculator",
    "content frequency analysis",
    "TikTok earnings estimator", // Future focus included
    "ChannelIncome",
  ],
  alternates: { canonical: "https://channelincome.com/" },
  openGraph: {
    title:
      "Free YouTube Analytics Tool: Revenue Estimation & Monetization Compliance Check | ChannelIncome",
    description:
      "Get deep YouTube channel analysis for free. Check lifetime revenue, view velocity, monetization status, and get strategies from our expert growth guides.",
    url: "https://channelincome.com/",
    siteName: "ChannelIncome",
    images: [
      {
        url: "https://channelincome.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChannelIncome - Creator Analytics & Growth Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChannelIncome | Free YouTube Analytics Tool for Creators",
    description:
      "Master creator growth with free tools: revenue estimation, compliance tracking, and expert guides for YouTube and TikTok.",
    images: ["https://channelincome.com/og-image.png"],
  },
};

// ==========================================================
// ✅ JSON-LD Schemas (10/10 AEO Optimized)
// ==========================================================

// ✅ JSON-LD: Organization Schema
function JsonLdOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ChannelIncome",
    url: "https://channelincome.com/",
    logo: "https://channelincome.com/logo.png",
    sameAs: [
      "https://www.youtube.com/@channelincome",
      "https://twitter.com/channelincome",
      "https://www.linkedin.com/company/channelincome"
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

// ✅ JSON-LD: Website Schema
function JsonLdWebsite() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ChannelIncome",
    url: "https://channelincome.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://channelincome.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

// ✅ JSON-LD: WebPage Schema (Updated keywords)
function JsonLdWebPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free YouTube Revenue Estimator & Channel Analytics Tool | ChannelIncome",
    description:
      "Discover the best free creator analytics tools. Use our YouTube Revenue Calculator to check estimated earnings, monetization compliance, View Velocity, and access expert growth guides for SEO and content strategy.",
    url: "https://channelincome.com/",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ✅ JSON-LD: FAQ Schema
function JsonLdFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />;
}

// ✅ JSON-LD: Guides Schema (dynamic from API)
function JsonLdGuides({ guides }) {
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Creator Guides - YouTube Growth Tips & Tricks",
    itemListElement: guides?.map((guide, index) => ({
      "@type": "ListItem", // Changed from CreativeWork to ListItem for proper ItemList structure
      position: index + 1,
      name: guide.title,
      description: guide.description || "Expert guide for YouTube SEO, growth, and content strategy.",
      url: `https://channelincome.com/guides/${guide.slug}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }} />;
}


// ==========================================================
// ✅ Home Component
// ==========================================================
export default async function Home() {
  // Fetch data (This is an async function in Next.js)
  const { guides } = await getGuides();

  return (
    <>
      {/* 1. Structured Data */}
      <JsonLdOrg />
      <JsonLdWebsite />
      <JsonLdWebPage />
      <JsonLdFAQ />
      <JsonLdGuides guides={guides} />

      {/* 2. Main Sections */}
      {/* HomeIntroduction contains the H1, H2, CTAs, and detailed feature list */}
      <HomeIntroduction />
      {/* ListingGuide (To display recent guides) */}
      <ListingGuide data={guides} />
      {/* HomeFAQ (Renders the FAQ data, supporting the JsonLdFAQ) */}
      <HomeFAQ faq={homeFaqData} />

      {/* 3. AEO Snippet Section (Answers the "Best X" question) */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        {/* H2: Direct AEO Question */}
        <h2 className="text-3xl font-bold mb-4">
          Why is ChannelIncome the best free YouTube analytics tool?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          ChannelIncome provides a full suite of creator metrics: not just
          estimated revenue, but critical data like Monetization Compliance,
          View Velocity, Content Frequency, and Average Engagement.
          Paired with our exclusive growth guides on YouTube SEO and monetization,
          it&apos;s your complete roadmap from creator to entrepreneur.
        </p>
      </section>
    </>
  );
}