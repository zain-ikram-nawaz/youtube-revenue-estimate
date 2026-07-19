// Shared RPM/CPM benchmark constants — single source of truth so every
// tool on the site (long-form calculator, comparison tool, Shorts calculator)
// uses consistent niche/region multipliers instead of inventing new ones.

export const NICHE_FACTORS = {
  finance: 7.5, business: 5.5, tech: 4.8, education: 3.0,
  lifestyle: 1.5, entertainment: 1.0, kids: 0.6, default: 1.2,
};

export const REGION_FACTORS = {
  tier1: 3.2, tier2: 1.4, tier3: 0.4, auto: 1.0,
};

export const COUNTRY_RPM = { US: 3.0, GB: 2.8, CA: 2.8, IN: 0.5, PK: 0.3, default: 1.0 };

// YouTube Shorts pay far less per view than long-form (pooled ad revenue,
// shared across all Shorts watched in the feed). Base rates below are USD
// RPM per 1,000 Shorts views for a US audience, no licensed music.
export const SHORTS_NICHE_RPM = {
  finance: 0.35, business: 0.28, tech: 0.25, education: 0.18,
  lifestyle: 0.12, entertainment: 0.08, gaming: 0.07, kids: 0.04, default: 0.06,
};

// Country multiplier derived from the same COUNTRY_RPM ratios (relative to US)
// used by the long-form calculator, so Shorts estimates stay consistent
// with the rest of the site instead of using an unrelated scale.
export function countryMultiplier(country) {
  const rpm = COUNTRY_RPM[country] ?? COUNTRY_RPM.default;
  return rpm / COUNTRY_RPM.US;
}

// Licensed background music reduces a Shorts video's share of the ad pool.
export const MUSIC_IMPACT = {
  none: 1.0,
  one_track: 0.67,
  multiple_tracks: 0.5,
};
