import React from "react";

export const metadata = {
  title: "Disclaimer | YouTube Revenue Estimator",
  description:
    "Disclaimer: Channel Income provides estimated analytics and is not affiliated with YouTube or Google. Actual YouTube earnings may vary.",
  keywords: [
    "YouTube earnings disclaimer",
    "YouTube revenue estimator disclaimer",
    "Channel Income disclaimer",
    "YouTube analytics disclaimer",
  ],
  openGraph: {
    title:"Disclaimer | YouTube Revenue Estimator",
    description:
      "Channel Income provides estimated YouTube analytics for informational purposes only. We are not affiliated with YouTube or Google.",
    url: "https://channelincome.com/disclaimer",
    siteName: "Channel Income",
    locale: "en_US",
    type: "article",
  },
  alternates: {
    canonical: "https://channelincome.com/disclaimer",
  },
};

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
      <p className="mb-4 text-gray-700 leading-relaxed">
        The information provided on <strong>Channel Income</strong> (YouTube Channel Revenue
        Estimator) is for general informational purposes only.
      </p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        All data shown, including estimated revenue, CPM, RPM, or analytics, are{" "}
        <strong>approximations based on internal calculations and publicly available data</strong>.
        Actual YouTube earnings may differ significantly depending on niche, region, and advertiser demand.
      </p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        This site is not affiliated, associated, authorized, endorsed by, or in any way officially
        connected with YouTube or Google LLC.
      </p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        Any blog articles or guides published on this site are based on independent research and may
        not reflect real-world results or official YouTube data.
      </p>
      <p className="text-sm text-gray-600 mt-6">Last updated: October 2025</p>
    </div>
  );
}
