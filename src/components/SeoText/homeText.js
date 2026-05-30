import Link from "next/link";

const subscriberEarnings = [
  { subs: "1,000 (YPP eligible)", monthly: "$1 – $10", yearly: "$12 – $120", note: "Just starting" },
  { subs: "10,000", monthly: "$50 – $300", yearly: "$600 – $3,600", note: "Growing channel" },
  { subs: "100,000", monthly: "$500 – $3,000", yearly: "$6K – $36K", note: "Mid-tier creator" },
  { subs: "500,000", monthly: "$2,000 – $10,000", yearly: "$24K – $120K", note: "Established" },
  { subs: "1,000,000", monthly: "$5,000 – $50,000", yearly: "$60K – $600K", note: "Top creator" },
];

const steps = [
  { n: "1", title: "Enter your monthly views", desc: "Use your YouTube Studio analytics or estimate based on recent uploads." },
  { n: "2", title: "Pick your content niche", desc: "Finance and tech channels earn 3–5× more than gaming or entertainment." },
  { n: "3", title: "Select your audience country", desc: "US viewers generate 5–10× more ad revenue than viewers in South Asia." },
  { n: "4", title: "Get your earnings range", desc: "The calculator returns a realistic low–high estimate based on real RPM/CPM data." },
];

export default function HomeIntroduction() {
  return (
    <main className="bg-secondary min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── QUICK ANSWER BOX (GEO + AEO + Featured Snippet) ── */}
        <section
          aria-label="Quick Answer"
          className="bg-background border-l-4 border-primary rounded-lg shadow-sm p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-2">
            TL;DR — Quick Answer
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            YouTube pays creators <strong>$0.50 – $10 per 1,000 views (RPM)</strong> on average. The actual amount depends on your content niche and where your audience is located. Finance channels in the US earn the most; kids content in low-CPM countries earns the least. Use our free calculator below to get a realistic estimate for your specific channel.
          </p>
        </section>

        {/* ── HERO SECTION ── */}
        <section className="text-center bg-background border border-border rounded-lg shadow-sm p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            YouTube Money Calculator – Check Channel Earnings Instantly
          </h1>

          <p className="text-sm text-muted leading-relaxed max-w-2xl mx-auto">
            Estimate YouTube revenue with a fast, free tool built for creators, marketers, and channel owners. This{" "}
            <strong>YouTube money calculator</strong> uses views, CPM, RPM, niche, and country to help you understand realistic earnings — not just a random number based on views alone.
          </p>

          <div className="mt-4 text-xs text-muted">
            No signup needed. Free forever. Results in seconds.
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tool/youtube-revenue-calculator"
              className="inline-flex items-center justify-center gap-2 bg-primary text-background font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition"
            >
              Try the YouTube Revenue Calculator →
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-secondary transition"
            >
              Read Creator Guides
            </Link>
          </div>
        </section>

        {/* ── HOW TO USE (Step-by-Step — AEO / Voice Search) ── */}
        <section className="bg-background border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            How to Use the YouTube Revenue Calculator
          </h2>
          <ol className="space-y-3">
            {steps.map((s) => (
              <li key={s.n} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-background text-xs font-bold flex items-center justify-center mt-0.5">
                  {s.n}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5">
            <Link
              href="/tool/youtube-revenue-calculator"
              className="text-primary font-semibold underline text-sm"
            >
              Open the Calculator →
            </Link>
          </div>
        </section>

        {/* ── SUBSCRIBER EARNINGS TABLE (GEO Box — AI Search Ready) ── */}
        <section className="bg-background border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-1">
            YouTube Earnings by Subscriber Count (2026)
          </h2>
          <p className="text-xs text-muted mb-4 leading-relaxed">
            These are realistic monthly ad revenue ranges based on average RPM across niches and countries. Your actual earnings may be higher or lower depending on your content category and audience location.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">Subscribers</th>
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">Est. Monthly Earnings</th>
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">Est. Yearly Earnings</th>
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground hidden sm:table-cell">Stage</th>
                </tr>
              </thead>
              <tbody>
                {subscriberEarnings.map((row, i) => (
                  <tr key={row.subs} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                    <td className="px-3 py-2 border border-border font-semibold text-foreground">{row.subs}</td>
                    <td className="px-3 py-2 border border-border text-primary font-semibold">{row.monthly}</td>
                    <td className="px-3 py-2 border border-border text-muted">{row.yearly}</td>
                    <td className="px-3 py-2 border border-border text-muted hidden sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted mt-2">
            * Ranges assume a mix of niches and countries. Finance/tech channels in the US will be at the high end; entertainment/kids channels in South Asia at the low end.
          </p>
        </section>

        {/* ── WHAT IT DOES ── */}
        <section className="bg-background border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            What Is a YouTube Earnings Calculator?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            A YouTube earnings calculator is a free tool that estimates how much ad revenue a channel can earn based on views, CPM (cost per thousand impressions), RPM (revenue per thousand views), content niche, and audience country. Unlike basic estimators that only look at view count, ChannelIncome factors in niche and geography — the two variables that matter most.
          </p>
        </section>

        {/* ── FEATURES ── */}
        <section className="bg-background border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            What You Can Check with This Tool
          </h2>
          <ul className="text-sm text-muted space-y-2 list-disc pl-5">
            <li><strong>Monthly YouTube earnings estimate</strong> — based on your views, niche, and country</li>
            <li><strong>Lifetime channel income range</strong> — total revenue potential</li>
            <li><strong>CPM &amp; RPM breakdown</strong> — what advertisers pay vs. what you keep</li>
            <li><strong>Country and audience impact</strong> — how viewer location changes your income</li>
            <li><strong>Niche comparison</strong> — see how a niche switch could affect revenue</li>
          </ul>
        </section>

        {/* ── METHODOLOGY (EEAT: Expertise + Authority) ── */}
        <section className="bg-background border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            How This Calculator Works — Our Methodology
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            We built this tool by studying publicly available CPM and RPM patterns across dozens of YouTube niches and 30+ countries. The estimates are based on real advertising market data and YouTube's revenue-sharing model (creators keep 55%, YouTube takes 45%).
          </p>
          <ul className="text-sm text-muted list-disc pl-5 space-y-2">
            <li><strong>Views</strong> estimate total ad impressions and reach.</li>
            <li><strong>CPM</strong> reflects what advertisers pay per 1,000 impressions in your niche.</li>
            <li><strong>RPM</strong> shows what you actually earn after YouTube's 45% revenue share.</li>
            <li><strong>Niche &amp; country</strong> apply realistic adjustments — a Finance channel in the US can earn 10× more than Kids content in India for the same view count.</li>
          </ul>
          <p className="text-xs text-muted mt-3 leading-relaxed">
            <strong>Important:</strong> These are estimates, not guaranteed figures. YouTube's actual payout depends on ad auction dynamics, seasonality, viewer engagement, and advertiser budgets. For exact numbers, check YouTube Studio.
          </p>
        </section>

        {/* ── EEAT: Trust + Experience ── */}
        <section className="bg-background border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Why Trust ChannelIncome?
          </h2>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>
              <strong>We don't store your data.</strong> When you use our tool, no channel information is saved on our servers permanently. We analyze publicly available metrics only — subscriber counts, view estimates, and niche benchmarks.
            </p>
            <p>
              <strong>Realistic estimates, not inflated numbers.</strong> Many calculators give you the best-case scenario to make you feel good. We give you a realistic range — low and high — so you can plan your content strategy based on what's actually likely.
            </p>
            <p>
              <strong>Built by creators, for creators.</strong> ChannelIncome was built specifically because existing tools were either inaccurate, expensive, or ignored the two biggest revenue factors: niche and geography.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/about-us" className="text-primary font-semibold underline text-sm">
              About ChannelIncome →
            </Link>
            <Link href="/disclaimer" className="text-primary font-semibold underline text-sm">
              See Our Disclaimer →
            </Link>
          </div>
        </section>

        {/* ── GUIDE SECTION LINK ── */}
        <section className="bg-background border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Learn How YouTube Earnings Work
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Want to understand CPM vs RPM in depth? Curious why your earnings dropped last month? Our free guides explain YouTube monetization in plain language — no fluff, just useful information.
          </p>
          <Link
            href="/guide"
            className="text-primary font-semibold underline text-sm"
          >
            Explore YouTube Creator Guides →
          </Link>
        </section>

        {/* ── WHY THIS MATTERS ── */}
        <section className="bg-background border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Why Niche and Country Matter More Than Views
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Two channels can have identical view counts and earn completely different amounts. A finance creator in the US with 100,000 monthly views can earn <strong>$800 – $1,500</strong>. A gaming channel in Pakistan with the same views might earn <strong>$50 – $150</strong>. That's a 10× difference — and most YouTube calculators ignore it entirely. This <strong>YouTube channel money calculator</strong> accounts for both niche and geography to give you an honest estimate.
          </p>
        </section>

        {/* ── CTA ── */}
        <section className="text-center bg-primary text-background rounded-lg p-8">
          <h2 className="text-lg font-bold mb-2">
            Start Checking Any YouTube Channel
          </h2>
          <p className="text-sm opacity-80 mb-5">
            Get instant revenue estimates. Understand your real earning potential in under 30 seconds.
          </p>
          <Link
            href="/tool/youtube-revenue-calculator"
            className="inline-flex items-center gap-2 bg-background text-foreground font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Open the Free Calculator →
          </Link>
        </section>

      </div>
    </main>
  );
}
