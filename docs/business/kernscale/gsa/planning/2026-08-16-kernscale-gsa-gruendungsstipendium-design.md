# Kernscale GSA-Gründungsstipendium – Antragsdesign

**Stand:** 16.08.2026  
**Status:** Fachlich freigegebene Arbeitsgrundlage; noch keine Einreichungsfassung  
**Antragsteller:** Jonas Knüppel als natürliche Person  
**Unternehmen:** Kernscale UG (haftungsbeschränkt) in Gründung

## Zweck

Dieses Dokument definiert die inhaltliche Grundlage für die Projektidee und den späteren Förderantrag bei der GSA. Es trennt belegbare bestehende Substanz von den im Fördervorhaben zu entwickelnden Fähigkeiten. Zeiträume, Preise und Finanzzahlen werden bewusst in einem späteren Planungsschritt ergänzt.

## Förderfähige Ausgangslage

- Jonas Knüppel ist mindestens 18 Jahre alt.
- Kernscale ist seine Haupttätigkeit; es besteht nach eigener Angabe keine parallele Schule oder Ausbildung.
- Hauptwohnsitz und geplanter Betriebssitz liegen in Mecklenburg-Vorpommern.
- Die Kernscale UG (haftungsbeschränkt) befindet sich in Gründung.
- Jonas Knüppel und Linus Kern sind zu jeweils 50 Prozent beteiligt und beide Geschäftsführer.
- Antragsteller des Stipendiums ist Jonas Knüppel persönlich, nicht die UG.
- Der genaue rechtliche Gründungsstand, das für die Zwölfmonatsgrenze relevante Datum und die Nachweise werden vor Einreichung geprüft.

## Arbeitstitel

**Kernscale Media Intelligence Loop**

Der Arbeitstitel kann vor Einreichung durch einen deutschsprachigen oder markenrechtlich besser geeigneten Projektnamen ersetzt werden.

## Problem

Lokale kleine und mittlere Unternehmen sowie Dienstleister betreiben Websites, Social-Media-Kanäle, Werbekonten, Unternehmensprofile, Shops und weitere Medien meist getrennt voneinander. Daten, Inhalte und Erkenntnisse verbleiben in einzelnen Plattformen. Dadurch entstehen:

- inkonsistente Markenkommunikation;
- Medienbrüche zwischen Aufmerksamkeit, Website, Anfrage und Kauf;
- hoher manueller Koordinationsaufwand;
- langsame oder isolierte Content-Produktion;
- unklare Zusammenhänge zwischen Medienaktivität und Geschäftsergebnis;
- fehlendes organisationales Lernen aus früheren Maßnahmen.

Klassische Agenturen bearbeiten häufig einzelne Kampagnen oder Kanäle. Publishing-, Analytics-, CRM- und AI-Tools lösen jeweils Teilprobleme, erzeugen aber für lokale KMU nicht automatisch einen gemeinsamen, fortlaufend lernenden Medienfunnel.

## Lösung

Kernscale verbindet eine betreute Dienstleistung mit einer workspace-basierten Softwareplattform. Das System führt öffentliche Medieninformationen und vom Kunden freigegebene interne Leistungsdaten in einer dauerhaften Kontextbasis zusammen.

Der Zielprozess lautet:

```text
öffentliche und interne Quellen
-> strukturierte Medienartefakte
-> kanalübergreifende Signale
-> Marken- und Geschäftskontext
-> priorisierte Empfehlungen
-> Strategien, Skripte und Medienvarianten
-> menschliche Prüfung und Umsetzung
-> Ergebnismessung
-> gespeichertes Lernen
-> verbesserte nächste Maßnahme
```

## Innovationskern

Die Innovation liegt nicht in der isolierten Verwendung generativer AI. Sie liegt in der Verbindung von fünf Elementen:

1. **Kanalübergreifende Kontextbasis:** Marke, Zielgruppen, Angebote, Kanäle, Inhalte und Leistungsdaten werden nicht als getrennte Einzelquellen behandelt.
2. **Zusammenhängende Funnel-Analyse:** Das System untersucht Übergänge zwischen Aufmerksamkeit, Medienkontakt, Website, Anfrage und Kauf.
3. **Kontextgebundene Generierung:** Strategien, Skripte und Medienvarianten werden aus freigegebenem Marken- und Leistungskontext erzeugt, nicht aus isolierten Prompts.
4. **Human-in-the-loop:** Analysen, Empfehlungen und generierte Ergebnisse werden vor kundenwirksamer Nutzung geprüft.
5. **Geschlossener Verbesserungsloop:** Umgesetzte Änderungen und erzielte Ergebnisse fließen als überprüfte Lernrecords in zukünftige Analysen ein.

Der langfristig verteidigbare Wert ist die strukturierte Beweiskette:

```text
Problem -> Ausgangsprozess -> Maßnahme -> veränderter Prozess -> Ergebnis -> wiederverwendbare Erkenntnis
```

## Zielgruppe

Erste Zielgruppe sind lokale KMU und Dienstleister ohne eigenes ausgebautes Marketing-, Daten- oder Medienteam. Sie benötigen einen einfachen Einstieg und eine betreute Umsetzung statt eines reinen Self-Service-Tools.

## Geschäftsmodell

Das Erlösmodell verbindet:

- einmalige Analyse- und Einrichtungspauschale;
- monatliche Plattformgebühr;
- monatliche Betreuungs- und Optimierungspauschale;
- optionale Produktionsleistungen für Websites, Accounts und Medieninhalte.

Vier bisherige zahlende Kunden belegen die grundsätzliche Vertriebs- und Umsetzungskompetenz von Kernscale. Diese Kunden haben bislang Websites, Accounts und verwandte Leistungen erhalten, jedoch noch nicht den vollständigen Media Intelligence Loop. Diese Abgrenzung wird im Antrag ausdrücklich beibehalten.

## Bestehende technische Grundlage

Das Kernscale Dashboard ist bereits mehr als eine UI-Idee. Im Repository bestehen unter anderem:

- Laravel-/React-Anwendung mit PostgreSQL-Ausrichtung;
- getrennte Kernscale- und Kunden-Workspaces;
- Workspace-Mitgliedschaften, Supervision und Berechtigungsgrundlagen;
- Datenmodelle und Oberflächen für Quellen, Artefakte, Signale und Empfehlungen;
- regelbasierte Signalerkennung;
- menschliche Prüfpfade und Decision Queue;
- Knowledge Base und Knowledge Graph;
- Aufgaben, Dateien, Kommunikation, Kundenorganisation sowie weitere operative Module;
- vorgesehene Quellenanbieter für Google, GA4, Search Console, Google Ads, Meta, Instagram, Facebook Ads und HubSpot.

Der bereits teilweise umgesetzte Datenfluss lautet:

```text
Quelle -> Artefakt -> regelbasiertes Signal -> menschliche Prüfung
-> Wissen -> Empfehlung -> Entscheidung
```

## Noch zu entwickelnde Produktfähigkeiten

Gegenstand des Fördervorhabens ist die Erweiterung dieser Grundlage um:

- echte, autorisierte Synchronisation relevanter Medien- und Leistungsquellen;
- öffentliches Marken- und Medienmonitoring mit nachvollziehbarer Herkunft;
- ein strukturiertes Marken-, Angebots-, Zielgruppen- und Funnel-Kontextmodell;
- kanalübergreifende AI-gestützte Analyse;
- Generierung von Strategien, Skripten und Medienvarianten;
- Medien- und Freigabeworkflows;
- Ergebnis- und Vorher-/Nachher-Snapshots;
- Rückführung gemessener Ergebnisse in überprüfte Lernrecords;
- reale Social-, Search-, Ads-, Data- und AI-Oberflächen auf Basis produktiver Daten;
- kundenverständliche Berichte und Handlungsempfehlungen.

Automatische Veröffentlichung ist keine Voraussetzung für den ersten marktfähigen Umfang. Kundenwirksame Inhalte bleiben zunächst freigabepflichtig.

## Kanal- und Integrationsmodell

Die Plattform wird kanaloffen und modular aufgebaut. „Alle Kanäle“ bedeutet alle für den jeweiligen Kunden relevanten Quellen, nicht jede existierende Plattform bereits im ersten Release.

Vorgesehene Kategorien:

- Website, Analytics und Search Console;
- Instagram, Facebook, LinkedIn und weitere Social-Media-Kanäle;
- Google Unternehmensprofil;
- Google Ads, Meta Ads und weitere Werbeplattformen;
- Shops und Stores, etwa Shopify oder WooCommerce;
- CRM-, Lead- und Buchungssysteme;
- analoge Medien und Offline-Maßnahmen über strukturierte manuelle Erfassung oder Importe.

Direkte Schnittstellen werden eingesetzt, wenn stabile und rechtlich nutzbare APIs verfügbar sind. Andernfalls werden standardisierte Importe verwendet. Die Implementierungsreihenfolge wird später festgelegt.

## Integration in die vorhandene Dashboard-UI

- **Socials:** Reichweite, Interaktion, Content-Leistung, Signale und Empfehlungen.
- **Search:** Suchanfragen, Seitenleistung, Sichtbarkeit und priorisierte SEO-Chancen.
- **Ads:** Ausgaben, Conversions, Akquisitionskosten, Attribution und Optimierung.
- **Data Sources:** Integrationen, Synchronisationszustand, Artefakte und Herkunft.
- **Knowledge Graph:** Marken-, Zielgruppen-, Angebots-, Kanal- und Erkenntnisbeziehungen.
- **Recommendations und Decision Queue:** belegte, überprüfbare Maßnahmen mit Freigabe.
- **AI:** Analyse und Generierung innerhalb klarer Daten-, Werkzeug- und Freigabegrenzen.
- **Dashboard:** zusammengeführter Medienfunnel, Handlungsbedarf und Ergebnisentwicklung.

Die vorhandenen UI-Studien dienen als visuelle Spezifikation. Sie werden nicht als Nachweis bereits produktiver Social-, Search-, Ads- oder AI-Funktionen dargestellt. Ebenso werden statische Beispieldaten der Startseite nicht als reale Kundenmetriken verwendet.

## Daten- und Sicherheitsprinzipien

- Verarbeitung nur öffentlich verfügbarer oder ausdrücklich freigegebener Kundendaten.
- Strikte Trennung der Kunden-Workspaces.
- Kein organisationsübergreifendes Lernen aus identifizierbaren Kundendaten ohne eigene Rechtsgrundlage und Freigabe.
- Geschützte und widerrufbare Verbindungsdaten für Integrationen.
- Herkunfts-, Synchronisations- und Qualitätsmetadaten für importierte Informationen.
- Trennung von Rohdaten, generierten Entwürfen und menschlich bestätigten Erkenntnissen.
- Menschliche Freigabe vor kundenwirksamen Aktionen.
- Lösch-, Export- und Berechtigungskonzepte.
- Fehlende oder widersprüchliche Daten werden sichtbar gemacht und nicht als sichere Erkenntnis ausgegeben.

## Qualität und Validierung

Zu validieren sind insbesondere:

- Zuverlässigkeit und Nachvollziehbarkeit der Datenimporte;
- Mandantentrennung und Berechtigungsgrenzen;
- fachliche Qualität und Markenkonsistenz generierter Ergebnisse;
- Qualität kanalübergreifender Empfehlungen;
- Zeitersparnis gegenüber manuellen Arbeitsabläufen;
- Verständlichkeit und tatsächliche Nutzung des Dashboards;
- Zahlungsbereitschaft für Setup, Plattform und Betreuung;
- messbare Veränderung ausgewählter Medien-, Anfrage- und Conversion-Kennzahlen;
- Wiederverwendbarkeit bestätigter Erkenntnisse für spätere Kundenprojekte.

## Risiken

- Plattform-APIs ändern sich oder schränken Zugriffe ein.
- Kundendaten sind unvollständig, inkonsistent oder nicht ausreichend historisiert.
- AI-Ausgaben enthalten Fehler oder unbelegte Schlussfolgerungen.
- Onboarding und Datenfreigabe sind für kleine Unternehmen zu komplex.
- Kunden bezahlen weiterhin nur Einzelprojekte statt einer laufenden Plattformleistung.
- Das Vorhaben wird als klassische Marketingagentur statt als innovatives System eingeordnet.
- Der Produktumfang wird durch zu viele Integrationen überladen.

Diese Risiken werden durch modulare Schnittstellen, sichtbare Datenqualität, menschliche Freigaben, fokussierte Pilotierung und eine klare Trennung von bestehender Dienstleistung und neuem System adressiert.

## Team

### Jonas Knüppel – Technik und Produkt

- 50 Prozent Gesellschafter und Geschäftsführer;
- technische Architektur und Produktentwicklung;
- Dashboard und Benutzeroberfläche;
- Datenintegrationen und Kontextsystem;
- AI-gestützte Analyse- und Generierungsworkflows;
- Datenschutz, technische Qualität und Weiterentwicklung.

### Linus Kern – Markt und Medien

- 50 Prozent Gesellschafter und Geschäftsführer;
- Marken- und Medienstrategie;
- Kunden- und Kommunikationsanalyse;
- Content- und Kanalkonzeption;
- Kundengewinnung und Betreuung;
- Pilotierung und wirtschaftliche Validierung.

Gemeinsam verantworten beide Gründer Produktstrategie, Geschäftsmodell, Finanzen und Unternehmensaufbau. Jonas ist als Antragsteller wesentlicher technischer Kompetenzträger des Vorhabens.

## Abgrenzung zum Wettbewerb

Der Antrag vergleicht Kernscale mindestens mit folgenden Kategorien:

- klassische Digital- und Marketingagenturen;
- Social-Media-Management- und Publishing-Tools;
- Analytics- und Reporting-Plattformen;
- CRM- und Marketing-Automation-Systeme;
- generative Content-Tools;
- AI-gestützte Marketingplattformen für KMU.

Die Abgrenzung wird anhand realer Anbieter und belegbarer Merkmale dokumentiert. Kernscale beansprucht nicht, einzelne Teilfunktionen erfunden zu haben. Der Innovationsanspruch bezieht sich auf die für lokale KMU zugängliche Verbindung aus dauerhafter Kontextbasis, kanalübergreifender Analyse, betreuter Generierung, Umsetzung, Ergebnismessung und überprüftem Lernen.

## GSA-Jurylogik

### Innovation und Mehrwert

- vorhandene technische Grundlage plus klar abgegrenzte Neuentwicklung;
- kanalübergreifender Kontext- und Lernloop;
- Fachstellungnahme mit Stand der Technik und Konkurrenzvergleich;
- Belege durch Architektur, UI, Quellcode und Prototyp.

### Markt

- klarer Einstieg über lokale KMU und Dienstleister;
- vier bisherige zahlende Kunden als Beleg für Marktzugang;
- bestehende Kundenleistungen ehrlich vom neuen System getrennt;
- Pilotzusagen, Zahlungsbereitschaft und Preisannahmen noch zu erheben;
- Wettbewerbs- und Marktvergleich noch quellenbasiert zu erstellen.

### Umsetzbarkeit

- komplementäre Gründerrollen;
- vorhandenes Dashboard und bestehende Datenmodelle;
- modularer, nicht vollautonomer Ansatz;
- konkrete Risiken und Freigabegrenzen;
- Arbeits-, Investitions-, Umsatz-, Liquiditäts- und Finanzierungsplanung noch zu ergänzen.

## Bewusst vertagte Entscheidungen

- Entwicklungs- und Förderzeitraum;
- Reihenfolge einzelner Schnittstellen;
- konkrete Pakete und Preise;
- Umsatz-, Kosten- und Liquiditätsannahmen;
- Anzahl und Auswahl der Pilotkunden;
- genauer Umfang der ersten Mediengenerierung;
- Projektname;
- geeignete Hochschule oder fachkundige Stelle für die Innovationsstellungnahme.

## Quellen

- [GSA-Programmseite](https://www.gsa-schwerin.de/foerderung/gruendungsstipendien)
- [GSA-Bewertungskriterien, Stand 07.07.2026](https://www.gsa-schwerin.de/sites/default/files/2026-07/pd2i-bewertungskriterien-fuer-projektideen-gruendungsstipendien-ab-07072026.pdf)
- [GSA-Merkblatt zur fachlichen Stellungnahme, Stand 08.07.2026](https://www.gsa-schwerin.de/sites/default/files/2026-07/pd2i-merkblatt-fachliche-stellungnahme-gruendungsstipendien-ab-08072026.pdf)
- Kernscale Dashboard: `docs/plans/active-feature-roadmap.md`
- Kernscale Dashboard: `docs/architecture/kernscale-intelligence-engine.md`
- Kernscale Dashboard: `app/Models/WorkspaceSource.php`
- Kernscale Dashboard: `resources/js/components/layout/domain-shell.tsx`
- Kernscale Infrastructure: `documents/README.md`
- Kernscale Infrastructure: `documents/01-system-architecture.md`

