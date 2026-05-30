// app/page.js (Home Page)
import HomeIntroduction from "../components/SeoText/homeText";
import HomeFAQ from "../components/FAQ/FAQ";

export const revalidate = 3600;

const homeFaqData = [
  {
    q: "How much does YouTube pay per 1,000 views?",
    a: "YouTube pays creators between $0.50 and $10 per 1,000 views (RPM) depending on niche, audience country, and ad engagement. Finance and tech channels in the US typically earn $5–$10 RPM, while entertainment or gaming channels in South Asia may earn $0.50–$2 RPM."
  },
  {
    q: "Can I earn money by watching YouTube videos?",
    a: "YouTube does not pay users for watching videos. Our tool is made for creators who want to estimate their YouTube earnings from content creation and ad revenue."
  },
  {
    q: "When do you start earning money from YouTube?",
    a: "You can start earning after joining the YouTube Partner Program (YPP). Requirements are 1,000 subscribers and either 4,000 watch hours in the past 12 months or 10 million Shorts views. Once approved, ads run on your videos and you receive 55% of ad revenue."
  },
  {
    q: "What is the average income for 1 million YouTube subscribers?",
    a: "A channel with 1 million subscribers can earn between $5,000 and $50,000 per month from ad revenue alone. The wide range depends on upload frequency, niche CPM, and audience location. Many top creators also earn from sponsorships, memberships, and merchandise on top of this."
  },
  {
    q: "What is the difference between CPM and RPM on YouTube?",
    a: "CPM (Cost Per Mille) is what advertisers pay per 1,000 ad impressions — this is the advertiser-side metric. RPM (Revenue Per Mille) is what creators actually earn per 1,000 views after YouTube takes its 45% share. RPM is always lower than CPM and is the number that actually matters for your bank account."
  },
  {
    q: "YouTube se paise kaise milte hain? (How do YouTube payments work?)",
    a: "YouTube payments are processed through AdSense and sent monthly once your balance reaches $100. You earn 55% of the ad revenue generated on your videos. In India and Pakistan, earnings are usually $1–$3 RPM due to lower advertiser CPM rates compared to the US or UK."
  },
  {
    q: "How can I increase my YouTube earnings?",
    a: "Three proven ways: (1) Switch to a higher-CPM niche like finance, tech, or education; (2) Create content targeting Tier-1 audiences in the US, UK, or Canada; (3) Improve watch time — longer watch sessions mean more mid-roll ads, which directly increases RPM."
  },
  {
    q: "How does the YouTube Revenue Calculator work?",
    a: "Enter your estimated monthly views, select your content niche, and choose your audience's primary country. The calculator applies average RPM values for that niche-country combination to generate a realistic low-to-high earnings range. It uses the same revenue logic as YouTube — views × RPM / 1,000."
  },
  {
    q: "Is ChannelIncome free to use?",
    a: "Yes, completely free with no signup required. The YouTube revenue calculator, CPM/RPM tables, and all creator guides are available at no cost."
  },
  {
    q: "How accurate are YouTube revenue estimates?",
    a: "No third-party tool can access your actual YouTube Studio data. Our estimates are based on real CPM/RPM benchmarks across niches and countries, giving you a realistic range rather than a single inflated number. For exact figures, YouTube Studio Analytics is the only accurate source."
  }
];

export const metadata = {
  title: "YouTube Revenue Calculator 2026 | Free Earnings Estimator – ChannelIncome",
  description:
    "Calculate your YouTube earnings instantly. Enter views, niche & country to get a free RPM & CPM-based revenue estimate. Trusted by creators in 2026.",
  keywords: [
    "youtube revenue calculator",
    "youtube earnings calculator",
    "youtube money calculator",
    "how much does youtube pay",
    "youtube channel earnings",
    "youtube rpm calculator",
    "youtube cpm calculator",
    "youtube income estimator 2026"
  ],
  alternates: {
    canonical: "https://channelincome.com",
  },
  openGraph: {
    title: "YouTube Revenue Calculator 2026 – Free Earnings Estimator",
    description:
      "Find out how much your YouTube channel can earn. Free calculator based on real RPM & CPM data by niche and country. Used by thousands of creators.",
    url: "https://channelincome.com",
    type: "website",
    images: [
      {
        url: "https://channelincome.com/icon.png",
        width: 1200,
        height: 630,
        alt: "ChannelIncome YouTube Revenue Calculator – Free Earnings Estimator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Revenue Calculator 2026 – Free Earnings Estimator",
    description:
      "Calculate how much your YouTube channel earns. Free RPM & CPM based tool by ChannelIncome.",
    images: ["https://channelincome.com/icon.png"],
  },
};

// ✅ WebSite Schema with SearchAction (enables Sitelinks Searchbox in Google)
function JsonLdWebSite() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ChannelIncome",
    url: "https://channelincome.com",
    description: "Free YouTube revenue calculator and creator analytics tools.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://channelincome.com/guide?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ✅ SoftwareApplication Schema
function JsonLdApp() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YouTube Revenue Calculator",
    operatingSystem: "Web",
    applicationCategory: "FinanceApplication",
    brand: {
      "@type": "Brand",
      name: "ChannelIncome",
    },
    description:
      "Free YouTube revenue calculator to estimate channel earnings using views, CPM, RPM, niche, and country. Updated 2026.",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
    featureList: [
      "YouTube RPM estimation by niche",
      "YouTube CPM rates by country",
      "Earnings range calculator",
      "Niche comparison tool"
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "ChannelIncome",
      url: "https://channelincome.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ✅ FAQ Schema
function JsonLdFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export default async function Home() {
  return (
    <>
      <JsonLdWebSite />
      <JsonLdApp />
      <JsonLdFAQ />
      <HomeIntroduction />
      <HomeFAQ faq={homeFaqData} />
    </>
  );
}
