import Link from "next/link";

export default function HomeIntroduction() {
  return (
    <main className="bg-secondary min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HERO SECTION */}
        <section className="text-center bg-background border border-border rounded-md shadow-sm p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            YouTube Money Calculator – Check Channel Earnings Instantly
          </h1>

          <p className="text-sm text-muted leading-relaxed max-w-2xl mx-auto">
            Estimate YouTube revenue with a fast, free tool built for creators, marketers, and channel owners. This
            <strong> YouTube money calculator</strong> uses views, CPM, RPM, niche, and country to help you understand realistic earnings.
          </p>

          <div className="mt-6 text-xs text-muted">
            No signup. Free to use. Fast results.
          </div>

          <div className="mt-6">
            <Link
              href="/tool/youtube-revenue-calculator"
              className="text-primary font-semibold underline text-sm"
            >
              Try the YouTube Revenue Calculator →
            </Link>
          </div>
        </section>

        {/* WHAT IT DOES */}
        <section className="bg-background border border-border rounded-md shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Understand YouTube Earnings Easily
          </h2>

          <p className="text-xs text-muted leading-relaxed">
            ChannelIncome is a practical <strong>YouTube revenue estimator</strong> built to show how views, CPM, RPM, niche, and audience location combine to shape real income potential.
          </p>
        </section>

        {/* FEATURES */}
        <section className="bg-background border border-border rounded-md shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            What You Can Check
          </h2>

          <ul className="text-xs text-muted space-y-2 list-disc pl-5">
            <li>Monthly YouTube earnings estimate</li>
            <li>Lifetime channel income</li>
            <li>CPM & RPM breakdown</li>
            <li>Country and audience impact</li>
            <li>Channel growth insights</li>
          </ul>
        </section>

        {/* METHODOLOGY */}
        <section className="bg-background border border-border rounded-md shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            How this calculator works
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            Enter views, CPM, RPM, niche, and country to generate a revenue estimate. The calculator adjusts the result based on realistic YouTube ad value and creator revenue patterns.
          </p>
          <ul className="text-xs text-muted list-disc pl-5 space-y-2 mt-4">
            <li>Views estimate ad impressions and total reach.</li>
            <li>CPM reflects advertiser spend per 1,000 impressions.</li>
            <li>RPM shows actual creator earnings after YouTube's share.</li>
            <li>Niche and country adjust the estimate for likely ad rates.</li>
          </ul>
        </section>

        {/* GUIDE SECTION LINK */}
        <section className="bg-background border border-border rounded-md shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Learn How YouTube Earnings Work
          </h2>

          <p className="text-xs text-muted leading-relaxed mb-4">
            Want to grow faster? Explore our guides and learn how creators earn money using smart strategies and real data insights.
          </p>

          <Link
            href="/guide"
            className="text-primary font-semibold underline text-sm"
          >
            Explore YouTube Creator Guides →
          </Link>
        </section>

        {/* WHY SECTION */}
        <section className="bg-background border border-border rounded-md shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Why This Matters
          </h2>

          <p className="text-xs text-muted leading-relaxed">
            YouTube earnings are not the same for every channel. A
            <strong> YouTube channel money calculator </strong> helps you understand how views, niche, and audience location change income results.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center bg-primary text-background rounded-md p-8">
          <h2 className="text-lg font-bold mb-2">
            Start Checking Any YouTube Channel
          </h2>
          <p className="text-xs opacity-90">
            Get instant revenue estimates and understand real earning potential.
          </p>
        </section>

      </div>
    </main>
  );
}