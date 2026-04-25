export default function SeoText() {
  return (
    <div className="bg-secondary min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-4">

        Intro
        <div className="bg-background rounded-md shadow-sm border border-border p-5 text-center">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
            Understand Your YouTube Earnings in Seconds
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            This YouTube revenue calculator gives you a quick idea of how much a channel can earn based on views, CPM, niche, and audience location. Simple, fast, and easy to understand.
          </p>
        </div>

        {/* What affects earnings */}
        <div className="bg-background rounded-md shadow-sm border border-border p-5">
          <h2 className="text-base font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            What Actually Affects YouTube Earnings?
          </h2>
          <div className="text-xs text-muted leading-relaxed space-y-3">
            <p>
              YouTube income is not fixed. Two channels with the same views can earn completely different amounts.
            </p>
            <p>
              The biggest factors are CPM (advertiser rate), RPM (your real earnings), niche, and audience location.
              High-value topics like finance, tech, and business usually earn more compared to entertainment or vlogs.
            </p>
            <p>
              Audience location also matters a lot. Views from countries like the US, UK, and Canada usually generate higher revenue than lower CPM regions.
            </p>
          </div>
        </div>

        {/* CPM vs RPM */}
        <div className="bg-background rounded-md shadow-sm border border-border p-5">
          <h2 className="text-base font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            CPM vs RPM (Simple Explanation)
          </h2>
          <div className="text-xs text-muted leading-relaxed space-y-3">
            <p>
              CPM is what advertisers pay for 1,000 ad views. RPM is what you actually earn after YouTube takes its share.
            </p>
            <p>
              For example, if CPM is $10, you don’t get the full amount. You usually earn around 55% of it as RPM.
            </p>
            <p>
              So CPM shows the market value, while RPM shows your real income.
            </p>
          </div>
        </div>

        {/* Tool purpose */}
        <div className="bg-background rounded-md shadow-sm border border-border p-5">
          <h2 className="text-base font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            What This Calculator Helps You Do
          </h2>
          <div className="text-xs text-muted leading-relaxed space-y-3">
            <p>
              This tool helps you estimate YouTube earnings without any confusion or manual calculations.
            </p>
            <p>
              Just enter a channel name, URL, or video link and get a clear breakdown of monthly and lifetime revenue.
            </p>
            <p>
              It’s useful for creators, beginners, and anyone curious about how much YouTube channels actually make.
            </p>
          </div>
        </div>

        {/* Closing */}
        <div className="bg-background rounded-md shadow-sm border border-border p-5">
          <h2 className="text-base font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            Simple, Fast, and Free
          </h2>
          <div className="text-xs text-muted leading-relaxed space-y-3">
            <p>
              No signup, no complexity — just quick estimates based on real YouTube data patterns.
            </p>
            <p>
              Use it to understand channel performance, compare ideas, or explore earning potential before starting your own channel.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}