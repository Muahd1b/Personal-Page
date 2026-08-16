"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { consentConfig, type ConsentState } from "./consent/config";
import styles from "./AnalyticsConsent.module.css";

const scriptId = "google-analytics-script";
const consentChangeEvent = "jonasknppel:analytics-consent-change";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const loadGoogleAnalytics = (measurementId: string) => {
  if (document.getElementById(scriptId)) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "granted",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
  document.head.appendChild(script);
};

const denyGoogleAnalytics = () => {
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  });
};

const removeGoogleAnalyticsCookies = () => {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name.startsWith("_ga"));

  for (const name of cookieNames) {
    document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
    document.cookie =
      name + "=; Max-Age=0; path=/; domain=." + window.location.hostname;
  }
};

const readConsentSnapshot = () => {
  try {
    return window.localStorage.getItem(consentConfig.storageKey);
  } catch {
    return null;
  }
};

const subscribeToHydration = () => () => undefined;
const readHydratedSnapshot = () => true;
const readServerHydratedSnapshot = () => false;

const parseConsentState = (stored: string | null): ConsentState | null => {
  if (!stored) return null;

  if (stored === "accepted") {
    return {
      version: consentConfig.consentVersion,
      status: "all_accepted",
      analytics: true,
      updatedAt: new Date(0).toISOString(),
    };
  }

  if (stored === "rejected") {
    return {
      version: consentConfig.consentVersion,
      status: "essential_only",
      analytics: false,
      updatedAt: new Date(0).toISOString(),
    };
  }

  try {
    const parsed = JSON.parse(stored) as Partial<ConsentState>;
    if (
      parsed.version !== consentConfig.consentVersion ||
      typeof parsed.analytics !== "boolean" ||
      !parsed.status ||
      !parsed.updatedAt
    ) {
      return null;
    }

    return parsed as ConsentState;
  } catch {
    return null;
  }
};

const subscribeToConsentChoice = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(consentChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(consentChangeEvent, onStoreChange);
  };
};

const persistConsentState = (state: ConsentState) => {
  try {
    window.localStorage.setItem(consentConfig.storageKey, JSON.stringify(state));
    window.dispatchEvent(new Event(consentChangeEvent));
    return true;
  } catch {
    return false;
  }
};

const createConsentState = (
  analytics: boolean,
  status: ConsentState["status"],
): ConsentState => ({
  version: consentConfig.consentVersion,
  status,
  analytics,
  updatedAt: new Date().toISOString(),
});

export default function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    readHydratedSnapshot,
    readServerHydratedSnapshot,
  );
  const snapshot = useSyncExternalStore(subscribeToConsentChoice, readConsentSnapshot, () => null);
  const consent = useMemo(() => parseConsentState(snapshot), [snapshot]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isOpen = consent === null || settingsOpen;

  useEffect(() => {
    if (consent?.analytics) {
      loadGoogleAnalytics(measurementId);
    } else {
      denyGoogleAnalytics();
    }
  }, [consent, measurementId]);

  const acceptAnalytics = () => {
    if (persistConsentState(createConsentState(true, "all_accepted"))) {
      loadGoogleAnalytics(measurementId);
      setSettingsOpen(false);
    }
  };

  const useNecessaryOnly = () => {
    const wasAccepted = consent?.analytics === true;
    denyGoogleAnalytics();
    const state = createConsentState(
      false,
      wasAccepted ? "withdrawn" : "essential_only",
    );
    const persisted = persistConsentState(state);
    removeGoogleAnalyticsCookies();
    if (persisted) setSettingsOpen(false);

    if (wasAccepted && persisted) {
      const windowRecord = window as unknown as Record<string, unknown>;
      windowRecord[`ga-disable-${measurementId}`] = true;
      window.location.reload();
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      <nav className={styles.legalControls} aria-label="Rechtliches und Cookie-Einstellungen">
        <Link className={styles.legalLink} href="/impressum/">
          Impressum
        </Link>
        <Link className={styles.legalLink} href="/datenschutz/">
          Datenschutz
        </Link>
        <button
          className={styles.settingsButton}
          type="button"
          onClick={() => setSettingsOpen(true)}
        >
          Cookie-Einstellungen
        </button>
      </nav>

      {isOpen ? (
        <div className={styles.backdrop}>
          <section
            aria-labelledby="analytics-consent-title"
            aria-modal="true"
            className={styles.dialog}
            role="dialog"
          >
            <h2 className={styles.title} id="analytics-consent-title">
              Analytics-Einstellungen
            </h2>
            <p className={styles.copy}>
              Diese Website kann Google Analytics zur anonymisierten Reichweitenmessung laden.
              Das geschieht nur mit Ihrer Einwilligung. Notwendige Funktionen bleiben immer
              aktiv. Mehr dazu in der{" "}
              <Link className={styles.privacyLink} href="/datenschutz/">
                Datenschutzerklärung
              </Link>
              .
            </p>
            <div className={styles.actions}>
              <button className={styles.button} type="button" onClick={useNecessaryOnly}>
                Nur notwendige
              </button>
              <button
                className={[styles.button, styles.accept].join(" ")}
                type="button"
                onClick={acceptAnalytics}
              >
                Analytics akzeptieren
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
