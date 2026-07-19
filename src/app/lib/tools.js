// Central registry of every tool on ChannelIncome — single source of truth
// for the Navbar, Footer, and the RelatedTools cross-linking component.
export const TOOLS = [
  {
    slug: "youtube-revenue-calculator",
    href: "/tool/youtube-revenue-calculator",
    name: "YouTube Revenue Calculator",
    shortName: "Revenue Calculator",
    desc: "Estimate any channel's YouTube earnings by channel name, views, niche & country.",
    icon: "💰",
    status: "live",
  },
  {
    slug: "youtube-channel-comparison",
    href: "/tool/youtube-channel-comparison",
    name: "YouTube Channel Comparison",
    shortName: "Channel Comparison",
    desc: "Compare two YouTube channels side by side — stats and estimated revenue.",
    icon: "⚖️",
    status: "live",
  },
  {
    slug: "youtube-shorts-calculator",
    href: "/tool/youtube-shorts-calculator",
    name: "YouTube Shorts Revenue Calculator",
    shortName: "Shorts Calculator",
    desc: "Estimate YouTube Shorts earnings with niche & country-specific RPM.",
    icon: "🎬",
    status: "live",
  },
  {
    slug: "youtube-tag-extractor",
    href: "/tool/youtube-tag-extractor",
    name: "YouTube Tag & Keyword Extractor",
    shortName: "Tag Extractor",
    desc: "Extract any video's tags and get AI keyword suggestions to improve reach.",
    icon: "🏷️",
    status: "live",
  },
  {
    slug: "tiktok-money-calculator",
    href: "/tool/tiktok-money-calculator",
    name: "TikTok Money Calculator",
    shortName: "TikTok Calculator",
    desc: "Estimate TikTok creator earnings from followers, views & engagement.",
    icon: "🎵",
    status: "live",
  },
];

export function getRelatedTools(currentSlug, limit = 3) {
  return TOOLS.filter((t) => t.slug !== currentSlug && t.status === "live").slice(0, limit);
}

export function getAllLiveTools() {
  return TOOLS.filter((t) => t.status === "live");
}
