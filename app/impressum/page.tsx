import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Impressum | Jonas Knüppel",
  description: "Impressum und Anbieterkennzeichnung für jonasknppel.me.",
  alternates: {
    canonical: "/impressum/",
  },
};

export default function ImpressumPage() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link className={styles.backLink} href="/">
          ← zurück
        </Link>
        <p className={styles.eyebrow}>jonasknppel.me / legal</p>
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <address>
          Jonas Knüppel
          <br />
          Greifstraße 22
          <br />
          17034 Neubrandenburg
          <br />
          Deutschland
        </address>

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:info@jonasknppel.me">info@jonasknppel.me</a>
        </p>

        <h2>Verantwortlich für den Inhalt</h2>
        <address>
          Jonas Knüppel
          <br />
          Greifstraße 22
          <br />
          17034 Neubrandenburg
          <br />
          Deutschland
        </address>

        <p className={styles.updated}>Stand: 16. August 2026</p>
      </article>
    </main>
  );
}
