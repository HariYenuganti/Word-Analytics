// Platform character limits used across the app
// Source: Instagram ~2200, Facebook ~63,206, Twitter/X 280
export const INSTAGRAM_MAX = 2200 as const;
export const FACEBOOK_MAX = 63206 as const;
export const TWITTER_MAX = 280 as const;

export type PlatformLimitKey = 'instagram' | 'facebook' | 'twitter';
export const LIMITS_DEFAULT: Record<PlatformLimitKey, number> = {
  instagram: INSTAGRAM_MAX,
  facebook: FACEBOOK_MAX,
  twitter: TWITTER_MAX,
};
