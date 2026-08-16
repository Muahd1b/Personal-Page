import type { Metadata } from "next";
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Jonas Knüppel",
  description: "Informationen zur Verarbeitung personenbezogener Daten auf jonasknppel.me.",
  alternates: {
    canonical: "/datenschutz/",
  },
};

export default function DatenschutzPage() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link className={styles.backLink} href="/">
          ← zurück
        </Link>
        <p className={styles.eyebrow}>jonasknppel.me / privacy</p>
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <address>
          Jonas Knüppel
          <br />
          Greifstraße 22
          <br />
          17034 Neubrandenburg
          <br />
          Deutschland
          <br />
          E-Mail: <a href="mailto:info@jonasknppel.me">info@jonasknppel.me</a>
        </address>

        <h2>2. Server-Logfiles und Hosting</h2>
        <p>
          Beim Aufruf dieser Website übermittelt Ihr Browser technisch erforderliche Daten an
          den Webserver. Dazu können IP-Adresse, Datum und Uhrzeit, aufgerufene Seite,
          übertragene Datenmenge, Referrer, Browser und Betriebssystem gehören. Diese Daten
          werden verarbeitet, um die Website sicher und zuverlässig bereitzustellen und
          technische Fehler zu untersuchen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          Das berechtigte Interesse liegt im sicheren und störungsfreien Betrieb dieser Website.
          Soweit ein Hosting-Dienstleister Zugriff erhält, verarbeitet er diese Daten als
          technischer Dienstleister.
        </p>

        <h2>3. Kontaktaufnahme per E-Mail</h2>
        <p>
          Wenn Sie per E-Mail Kontakt aufnehmen, werden die von Ihnen übermittelten Angaben zur
          Bearbeitung Ihrer Anfrage verarbeitet. Bei vorvertraglichen oder vertraglichen
          Anliegen ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage; in anderen Fällen Art. 6
          Abs. 1 lit. f DSGVO aufgrund des Interesses an der Beantwortung Ihrer Nachricht. Die
          Daten werden gelöscht, sobald sie für die Anfrage nicht mehr benötigt werden und keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>

        <h2>4. Speicherung Ihrer Auswahl</h2>
        <p>
          Die Website speichert Ihre Entscheidung zu optionaler Reichweitenmessung unter dem
          Schlüssel <code>jonasknppel.analytics-consent</code> im lokalen Speicher Ihres
          Browsers. Diese technisch notwendige Einstellung wird nicht an einen Drittanbieter
          übertragen. Sie verhindert, dass die Auswahl bei jedem Seitenaufruf erneut abgefragt
          werden muss.
        </p>

        <h2>5. Google Analytics</h2>
        <p>
          Diese Website verwendet nach Ihrer ausdrücklichen Einwilligung Google Analytics 4,
          einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin
          4, Irland. Google Analytics dient dazu, aggregierte Informationen über Nutzung und
          Reichweite der Website zu erhalten. Dabei können insbesondere Seitenaufrufe,
          ungefähre Standortdaten sowie Browser- und Geräteinformationen verarbeitet werden.
          Google Analytics setzt unter anderem die Cookies <code>_ga</code> und
          <code>_ga_&lt;Container-ID&gt;</code>. Nach Angaben von Google werden IP-Adressen bei
          Google Analytics 4 nicht protokolliert oder gespeichert.
        </p>
        <p>
          Google Analytics und die zugehörigen Google-Skripte werden erst geladen, nachdem Sie
          „Analytics akzeptieren“ gewählt haben. Rechtsgrundlagen sind Ihre Einwilligung nach
          § 25 Abs. 1 TDDDG und Art. 6 Abs. 1 lit. a DSGVO. Ohne Einwilligung findet durch diese
          Website keine Übermittlung an Google Analytics statt. Eine Verarbeitung durch Google
          kann auch außerhalb der Europäischen Union erfolgen.
        </p>
        <p>
          Weitere Informationen finden Sie in den{" "}
          <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
            Datenschutzhinweisen von Google
          </a>{" "}
          und in Googles{" "}
          <a
            href="https://support.google.com/analytics/answer/6004245"
            rel="noopener noreferrer"
            target="_blank"
          >
            Informationen zum Datenschutz bei Analytics
          </a>
          .
        </p>

        <h2>6. Einwilligung widerrufen</h2>
        <p>
          Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ am unteren Rand jeder
          Seite ändern. Beim Widerruf wird Google Analytics für zukünftige Seitenaufrufe
          deaktiviert; erreichbare Google-Analytics-Cookies dieser Domain werden entfernt. Die
          Rechtmäßigkeit der Verarbeitung bis zum Widerruf bleibt unberührt.
        </p>

        <h2>7. Ihre Rechte</h2>
        <p>
          Unter den gesetzlichen Voraussetzungen haben Sie Rechte auf Auskunft, Berichtigung,
          Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine
          erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Sie
          können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere
          beim{" "}
          <a href="https://www.datenschutz-mv.de/" rel="noopener noreferrer" target="_blank">
            Landesbeauftragten für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern
          </a>
          .
        </p>

        <p className={styles.updated}>Stand: 16. August 2026</p>
      </article>
    </main>
  );
}
