export const consentConfig = {
  consentVersion: "2026-08-16",
  storageKey: "jonasknppel.analytics-consent",
  measurementId: "G-VW07BRCCZ3",
} as const;

export type ConsentState = {
  version: string;
  status: "all_accepted" | "essential_only" | "withdrawn";
  analytics: boolean;
  updatedAt: string;
};

export const googleConsentDefaultsScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });
`;
