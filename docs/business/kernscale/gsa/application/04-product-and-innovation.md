# Levial by Kernscale – Produkt- und Innovationsanalyse aus dem Repository

**Stand:** 16.08.2026  
**Produktname:** Levial by Kernscale — Layered Evidence, Validated Intelligence, Actionable Learning  
**Quellrepository:** `/Users/jonasknppel/Businesses/Kernscale/Kernscale (Data)/Kernscale-Dashboard`  
**Zweck:** Technischer Nachweis für Projektidee, Unternehmenskonzept, fachliche Innovationsstellungnahme und Jurypräsentation.  
**Status:** Codebasierte Bestandsaufnahme; Entwicklungszeiträume werden später ergänzt.

## 1. Ergebnis in Kürze

Das Kernscale Dashboard ist mehr als eine Idee oder reine UI-Studie. Im Repository besteht eine funktionsfähige, workspace-isolierte Softwaregrundlage für folgenden Teilprozess:

```text
Quelle
-> Artefakt
-> regelbasiertes Signal
-> menschliche Prüfung
-> Wissenseintrag mit Herkunft
-> Empfehlung
-> Entscheidungsanforderung
```

Belegt sind insbesondere:

- eine Laravel-/React-Anwendung mit PostgreSQL-Ausrichtung;
- getrennte Kernscale- und Kunden-Workspaces;
- zentrale Mandanten-/Workspace-Grenzen für Abfragen, Mutationen und Route Model Binding;
- Datenmodelle, APIs und UI für Quellen, Artefakte, Signale und Empfehlungen;
- eine konkrete regelbasierte Signalerkennung;
- Annahme und Ablehnung von Signalen und Empfehlungen;
- Promotion akzeptierter Signale in eine Knowledge Base mit Herkunftsangaben;
- Knowledge Base, Knowledge Graph und Decision Queue;
- ein Graphiti-Bridge-Service für freigegebene Wissensepisoden;
- operative Oberflächen für Aufgaben, Kommunikation, Dateien, Kalender und weitere Unternehmensprozesse.

Nicht belegt beziehungsweise noch nicht produktiv vorhanden sind:

- echte Konnektoren zu GA4, Search Console, Google Ads, Meta, Instagram, Facebook Ads oder HubSpot;
- KI-basierte kanalübergreifende Analyse;
- Generierung von Strategien, Skripten und Medienvarianten innerhalb eines Marken- und Geschäftskontexts;
- Publishing- und Kampagnenaktivierung aus der Plattform;
- ein Datenmodell für Experimente, Ausgangs-/Ergebnissnapshots und bestätigte Lernrecords;
- ein technisch geschlossener Analyse–Maßnahme–Ergebnis–Lernkreislauf;
- produktive Social-, Search-, Ads- und AI-Oberflächen;
- echte Kennzahlen auf der aktuellen Dashboard-Startseite.

Der förderrelevante Entwicklungsgegenstand ist damit klar abgrenzbar: Aus einer vorhandenen, prüfbaren Daten- und Entscheidungsgrundlage soll ein produktiver Media Intelligence Loop entstehen.

## 2. Prüfmethode und Belegstufen

Die Analyse unterscheidet vier Zustände:

| Zustand | Bedeutung |
|---|---|
| **Implementiert** | Datenmodell, Backend-Verhalten und/oder reale UI sind im Code vorhanden |
| **Teilweise implementiert** | technische Grundlage ist vorhanden, aber Integration, Automatisierung oder Betriebsnachweis fehlt |
| **Shell/Illustration** | Route oder Design existiert, verarbeitet aber noch keine entsprechende produktive Fachdatenlogik |
| **Geplant** | nur in Architektur-/Roadmap-Dokumenten beschrieben oder aus dem Zielprodukt abgeleitet |

Provider-Bezeichnungen, Paketabhängigkeiten und Architekturtexte werden nicht automatisch als funktionsfähige Integration gewertet. Ebenso gelten Demo-Daten, Screenshots und fest codierte Dashboard-Kennzahlen nicht als Kunden- oder Produktnachweis.

Das Dashboard-Repository enthielt während der Analyse eine uncommittete Änderung an `contexts/integrations/CONTEXT.md`. Sie wurde weder verändert noch als Nachweis für bereits implementierte Produktfunktion verwendet.

## 3. Technische Grundlage

### 3.1 Anwendungsschicht

Die Anwendung verwendet:

- Laravel 13 und PHP 8.3;
- React 19 und TypeScript;
- Vite und Tailwind CSS;
- relationale, workspace-bezogene Modelle mit PostgreSQL-Ausrichtung;
- Laravel-Queues, Realtime-/Broadcasting- und Observability-Abhängigkeiten;
- PHPUnit für Backend- und Playwright für Browserprüfungen.

Diese Abhängigkeiten belegen die technische Ausrichtung, nicht automatisch ihren vollständigen produktiven Betrieb.

### 3.2 Workspace- und Mandantenmodell

Der Workspace ist die zentrale Kundengrenze. Die Implementierung umfasst:

- direkte Workspace-Mitgliedschaften;
- beaufsichtigte Kunden-Workspaces für berechtigte Kernscale-Rollen;
- Auflösung und Prüfung des aktuellen Workspace-Kontexts;
- einen globalen Workspace-Scope für workspace-eigene Datensätze;
- automatische Workspace-Zuordnung bei der Erstellung;
- workspace-begrenztes Route Model Binding;
- Policy-/Capability-Prüfungen für Bearbeitung, Knowledge Base, Finance, HR und AI.

Die relevanten Data-APIs laufen hinter `EnforceCurrentWorkspaceTenant`. Bestehende Feature-Tests prüfen unter anderem, dass fremde Quellen, Artefakte, Signale, Empfehlungen und Wissenseinträge nicht gelesen oder verändert werden können.

**Bewertung:** implementiert und für den geplanten Service-Software-Hybrid wesentlich. Die Trennung ist jedoch erst nach produktiver Konfigurations-, Penetrations- und Datenschutzprüfung als vollständig belastbar zu behandeln.

## 4. Funktionsinventar

| Produktbereich | Aktueller Zustand | Codebasierter Nachweis | Förderrelevante Erweiterung |
|---|---|---|---|
| Workspace-Isolation | **implementiert** | `BelongsToWorkspace`, Tenant-Middleware, Resolver, Policies und Feature-Tests | produktive Sicherheitsprüfung, Auditierung und Datenschutzdokumentation |
| Quellenregister | **implementiert** | CRUD-API und UI für Name, Typ, Provider, Status, Herkunft und externe Referenz | echte autorisierte Konnektoren und Synchronisationszustände |
| Quellenprovider | **nur Klassifikation** | Enums nennen Google, GA4, Search Console, Google Ads, Meta, Instagram, Facebook Ads und HubSpot | Provider-Clients, OAuth/Connection Credentials, Sync-Jobs, Fehlerbehandlung und Datenverträge |
| Artefakte | **implementiert** | Dokument-, Metrics-, API-, MCP-, Website-, Screenshot-, Report-, Notiz- und Agent-Output-Artefakte mit JSON-Payload | automatisierte Aufnahme, Normalisierung, Versionierung und Qualitätskontrolle |
| Signalerkennung | **teilweise implementiert** | regelbasierter Extraktor erkennt prozentuale Veränderungen ab 20 % | statistische/AI-gestützte Cross-Channel-Signale, Baselines, Saisonalität und Datenqualitätslogik |
| Signalprüfung | **implementiert** | Review-Status, Reviewer, Zeitstempel, Accept/Reject/Archive in API und UI | fachliche Begründungen, Review-Guidelines und Qualitätsmetriken |
| Knowledge Promotion | **implementiert** | nur akzeptierte Signale werden als Entwurf mit Evidenz und Provenienz übernommen | kanonische Lernrecords mit Ergebnisbezug, Widerspruchs- und Gültigkeitslogik |
| Knowledge Base | **implementiert** | Draft/Canonical/Archive, Evidenz, Tags, Entity Links, Provenienz, Confidence und Promotion Queue | retrieval-fähiger Marken-/Angebots-/Zielgruppen-/Funnel-Kontext |
| Knowledge Graph | **teilweise implementiert** | Knoten, Kanten, Episoden, lokale Projektion und Graphiti-Bridge-Code | produktiver Betrieb, Such-/Retrieval-Nutzen, Konfliktbehandlung und kontrollierte AI-Nutzung |
| Empfehlungen | **implementierte manuelle Grundlage** | Empfehlung mit Aktion, Begründung, Evidenz, Unsicherheit, Sensitivität und Wirkungseinschätzung | automatische, beleggebundene Vorschläge aus mehreren Quellen |
| Decision Queue | **implementiert** | Empfehlungen können priorisierte Approval-Items erzeugen; Accept/Reject ist workspace-begrenzt | einheitliche Freigaben für Inhalte, Kampagnen, Agentenaktionen und Lernrecords |
| Agenten/MCP | **Shell beziehungsweise Grundgerüst** | lokaler Laravel-MCP-Server existiert, enthält aber keine Tools, Ressourcen oder Prompts | workspace-sichere Tools, Agentenpässe, Runs, Auditlogs und Freigaben |
| Socials, Search und Ads | **Shell/Illustration** | Routen und Navigation vorhanden; `DomainOverviewPage` weist ausdrücklich auf spätere Fachlogik hin | produktive Daten, Analysen, Empfehlungen und kanalbezogene Arbeitsflächen |
| Data Workflows | **Shell/Illustration** | Route ist auf `DomainPlaceholderPage` gemountet | Workflow- und Decision-Tree-Modelle, Aufgaben-/Maßnahmenbezug |
| Dashboard-Startseite | **illustrative UI** | Trends, MRR, Health, Decisions und AI-Aktivität sind fest codierte Arrays | API-gestützte Workspace- und Funnel-Kennzahlen |
| Datei-/Cloud-Schicht | **teilweise implementiert** | Nextcloud-WebDAV-Flows für Dateien und Workspace-Zuordnung | direkte Verbindung relevanter Dateien mit Quellen, Artefakten, Maßnahmen und Belegen |
| Outcome Measurement | **geplant** | Roadmap nennt Experimente, Outcome Measurements und Learning Records; keine First-Class-Modelle im Code | Ausgangs-/Ergebnissnapshots, Experimentdesign, Störfaktoren und Lernpromotion |

## 5. Bestehende Daten- und Entscheidungslogik

### 5.1 Quellen und Artefakte

Nutzer mit entsprechender Berechtigung können im aktuellen Workspace Quellen und zugehörige Artefakte erstellen und bearbeiten. Ein Artefakt kann strukturierte JSON-Daten enthalten. Die UI lädt Quellen, Artefakte, Signale und Empfehlungen über reale API-Funktionen.

Der Quelltyp unterstützt bereits verschiedene Herkunftskategorien, darunter Upload, Website, API, MCP, Matrix, Agent und manuelle Erfassung. Dies ist ein brauchbares generisches Datenmodell, aber noch kein Beleg für automatisierte externe Synchronisation.

### 5.2 Regelbasierte Signale

Der vorhandene Extraktor durchsucht verschachtelte Artefakt-Payloads nach Feldern wie `change_percent`, `change_pct`, `delta_percent` oder `delta_pct`. Ab einer absoluten Veränderung von 20 Prozent erzeugt er ein prüfpflichtiges Risiko- oder Opportunity-Signal.

Aktuelle Regeln:

- unter 20 %: kein Signal;
- ab 20 %: mittlere Schwere;
- ab 40 %: hohe Schwere;
- ab 75 %: kritische Schwere;
- feste Confidence von 85 für erkannte Regelereignisse.

Diese Logik ist nachvollziehbar und testbar, aber fachlich noch sehr einfach. Sie berücksichtigt weder Basisgröße, Saisonalität, Stichprobengröße, Datenqualität, Kanalabhängigkeit noch alternative Erklärungen. Im Antrag wird sie deshalb als funktionaler Baseline-Extraktor und nicht als KI-Analyse bezeichnet.

### 5.3 Menschliche Prüfung und Wissenspromotion

Signale werden zunächst als `review_required` gespeichert. Berechtigte Nutzer können sie annehmen, ablehnen oder archivieren. Nur angenommene Signale dürfen in die Knowledge Base übernommen werden.

Bei der Promotion werden unter anderem gespeichert:

- Signalzusammenfassung und Rohbeleg;
- Verbindung zur Quelle und zum Artefakt;
- Herkunfts-/Provenienzangaben;
- Confidence;
- Tags und Graph-Beziehungen;
- Reviewer- beziehungsweise Erfassungszeitpunkt.

Der resultierende Wissenseintrag bleibt zunächst ein Entwurf. Die Promotion zu kanonischem Wissen besitzt einen eigenen Entscheidungsweg. Dieses Muster ist eine starke Grundlage für den geplanten Human-in-the-loop-Lernprozess.

### 5.4 Empfehlungen und Decision Queue

Empfehlungen können Signale, Wissen, Aufgaben und Entscheidungsobjekte verknüpfen. Sie tragen:

- vorgeschlagene Maßnahme;
- Begründung;
- Evidenz;
- Unsicherheit und Sensitivität;
- erwartete Wirkung und Impact Score;
- Review-Status.

Eine Empfehlung kann eine Approval-Anforderung in der Decision Queue erzeugen. Deren Priorität steigt bei kritischer Sensitivität, hoher Unsicherheit oder hohem Impact Score. Dies ist ein implementiertes Governance-Muster, aber noch keine automatische Empfehlungserzeugung aus KI- oder Cross-Channel-Analyse.

### 5.5 Knowledge Graph und Graphiti

Das Repository enthält lokale Graphknoten, Graphkanten und Graph-Episoden. Wissenseinträge können als workspace-begrenzte Episoden in einen kleinen FastAPI-/Graphiti-Bridge-Service übertragen werden. Der Bridge-Endpunkt verlangt je nach Konfiguration einen Bearer-Token und gruppiert Episoden nach Workspace.

Der Code und Feature-Tests belegen die Integrationslogik. Nicht geprüft wurde, ob Neo4j, Graphiti und erforderliche Modellzugänge aktuell produktiv konfiguriert und dauerhaft betrieben werden. Der Laravel-Datenbestand bleibt laut Architektur die fachliche Quelle der Wahrheit.

## 6. Analyse der aktuellen UI

### 6.1 Reale Produktoberfläche: Data Sources

`/data/sources` ist die derzeit wichtigste funktionsfähige Oberfläche für den Media Intelligence Loop. Sie umfasst:

- API-gestützte Statuskarten für Quellen;
- Quellenliste und Detailauswahl;
- Erstellen und Bearbeiten von Quellen;
- Erstellen und Bearbeiten von Artefakten;
- manuelle Signalausführung auf Artefakten;
- Anzeige offener und akzeptierter Signale;
- Accept/Reject und Promotion in Wissen;
- Erstellung von Empfehlungen aus Signalen;
- Accept/Reject von Empfehlungen;
- Anforderung einer formellen Entscheidung;
- berechtigungsabhängige Lese- und Bearbeitungszustände;
- Lade-, Leer-, Fehler- und Erfolgszustände.

Die Oberfläche bildet damit bereits den Weg von einer strukturierten Quelle bis zu einer prüfbaren Entscheidung ab. Sie ist jedoch noch operator- und datenmodellorientiert. Für kleine Kunden fehlen eine geführte Einrichtung, verständliche Funnel-Sicht, automatische Synchronisation, klare Ergebnisbezüge und vereinfachte Handlungsempfehlungen.

### 6.2 Knowledge Base und Graph

Die Knowledge-Base-UI ist ebenfalls API-gestützt. Sie unterstützt Suche, Statusfilter, Erstellen/Bearbeiten, Promotion, Archivierung, Wiederherstellung und Graphnavigation. Das ist eine gute Basis für Organisationsgedächtnis, wirkt für den späteren Kunden aber noch wie ein Wissens-/Datenwerkzeug und nicht wie ein unmittelbar verständlicher Medienverbesserungsprozess.

### 6.3 Shell- und Platzhalteroberflächen

Socials, Search, Ads und AI verfügen über Navigation, Seitenrahmen und Beschreibungen, aber noch nicht über entsprechende produktive Fachdatenlogik. Die gemeinsame Komponente erklärt ausdrücklich, dass Backend-Wahrheit und Domain-Verhalten später verdrahtet werden.

Die Seiten `/ai/agents`, `/ai/tooling` und `/data/workflows` verwenden eine explizite Placeholder-Komponente. Der lokale Laravel-MCP-Server enthält noch keine Tools, Ressourcen oder Prompts.

### 6.4 Illustrative Dashboard-Startseite

Die aktuelle Startseite vermittelt bereits das gewünschte Control-Plane-Konzept mit Decisions, Blockern, Workspace Health, Signalen, AI Activity und Pipeline. Ihre Werte sind jedoch als lokale Arrays im Frontend fest codiert, einschließlich MRR- und Health-Angaben. Sie dürfen weder im Antrag noch in Präsentationen als reale Geschäfts- oder Kundendaten verwendet werden.

### 6.5 UI-Schlussfolgerung

Die UI ist in zwei Reifegrade geteilt:

1. **funktionsfähige operative Bereiche** für Data Sources, Knowledge, Decision Queue und Unternehmensorganisation;
2. **visuell vorbereitete Zieldomänen** für Social, Search, Ads, Workflows und AI.

Für das Fördervorhaben ist dies positiv, weil Produkt- und Navigationskonzept bereits sichtbar sind. Gleichzeitig muss jede Präsentation deutlich kennzeichnen, welche Screens reale Datenverarbeitung zeigen und welche nur Zielbild oder Designstudie sind.

## 7. Dokumentationskonflikt im Repository

Die `active-feature-roadmap.md` wurde am 19.06.2026 überprüft und behauptet an einer Stelle, es gebe noch keine First-Class-Modelle für Quellen, Artefakte, Signale und Empfehlungen. Die zugehörigen Modelle, APIs, Services, UI-Flows und Tests wurden laut Git-Historie anschließend am 22.06.2026 umgesetzt.

Für die GSA-Unterlagen hat daher der aktuelle Code Vorrang vor dieser veralteten Roadmap-Passage. Die Roadmap bleibt für Experimente, Outcomes, Agent Governance und Self-Improvement-Loops relevant, muss aber vor einer externen technischen Prüfung aktualisiert werden.

## 8. Integration des Media Intelligence Loop

### 8.1 Heute belegt

```text
manuell registrierte Quelle
-> manuell/strukturiert erfasstes Artefakt
-> regelbasiertes Veränderungssignal
-> menschliche Annahme oder Ablehnung
-> Wissensentwurf mit Herkunft
-> manuell erstellte Empfehlung
-> menschliche Entscheidung
```

### 8.2 Zielbild des Fördervorhabens

```text
autorisierte öffentliche und interne Quellen
-> normalisierte, versionierte Medien- und Leistungsartefakte
-> Datenqualitätsprüfung und kanalübergreifende Signale
-> dauerhafter Marken-, Angebots-, Zielgruppen- und Funnel-Kontext
-> beleggebundene Empfehlungen
-> Strategien, Skripte und Medienvarianten
-> menschliche Prüfung und Freigabe
-> Umsetzung beziehungsweise kontrollierte Aktivierung
-> Ausgangs-/Ergebnissnapshot
-> menschlich bestätigter Lernrecord
-> verbesserte nächste Analyse und Maßnahme
```

### 8.3 Konkrete Integrationspunkte in der vorhandenen UI

- **Data Sources:** Verbindung, Sync-Status, Herkunft, Artefakte und Datenqualität;
- **Socials:** Content-Leistung, Reichweite, Interaktion, Zielgruppen- und Formaterkenntnisse;
- **Search:** Suchanfragen, Sichtbarkeit, Seitenleistung und priorisierte Chancen;
- **Ads:** Ausgaben, Conversions, Akquisitionskosten, Varianten und Optimierung;
- **Knowledge Base/Graph:** Marke, Angebot, Zielgruppe, Funnel, frühere Entscheidungen und bestätigte Erkenntnisse;
- **Recommendations:** begründete Maßnahmen mit Evidenz, Unsicherheit und Wirkungshypothese;
- **Decision Queue:** Prüfung, Freigabe oder Ablehnung kundenwirksamer Schritte;
- **AI:** Analyse und Generierung innerhalb der Workspace-, Daten- und Freigabegrenzen;
- **Dashboard:** zusammengeführter Funnel, Handlungsbedarf, Datenqualität und Ergebnisentwicklung.

## 9. Innovationsabgrenzung nach Code- und Wettbewerbsanalyse

Der Code belegt keine neue Einzeltechnologie, sondern eine besondere Ausgangsbasis für die geplante Verbindung. Wettbewerber bieten bereits AI, Markenwissen, Cross-Channel-Daten, Freigaben, Publishing und Messung in verschiedenen Kombinationen.

Der belastbare Innovationsanspruch lautet daher:

> Kernscale entwickelt die vorhandene workspace-isolierte Daten-, Wissens- und Entscheidungsschicht zu einem betreuten Medienverbesserungssystem für kleine lokale Unternehmen weiter. Öffentliche Medieninformationen und freigegebene interne Leistungsdaten werden in einem dauerhaften Unternehmenskontext verbunden. Empfehlungen und generierte Ergebnisse bleiben menschlich prüfbar. Umgesetzte Maßnahmen werden mit ihrem Ausgangszustand und Ergebnis verknüpft und erst nach Bewertung als wiederverwendbare Erkenntnis gespeichert.

Die wichtigste technische Differenzierung ist der geplante **bestätigte Lernrecord**. Er soll nicht nur eine Metrik oder AI-Zusammenfassung enthalten, sondern:

- Ausgangsproblem und Baseline;
- verwendete Quellen und Datenqualität;
- Signal und Hypothese;
- vorgeschlagene und freigegebene Maßnahme;
- tatsächliche Umsetzung;
- Ergebnis und Messfenster;
- alternative Erklärungen und Unsicherheit;
- menschliche Bestätigung, Ablehnung oder Einstufung als unklar;
- spätere Wiederverwendung der Erkenntnis.

## 10. Entwicklungsgegenstand ohne Zeitplanung

### Arbeitspaket A – Produktive Datenquellen

- Connection-Credential-Modell und sichere Autorisierung;
- erste direkte Medien-, Analytics-, Search-, Ads- oder Shop-Konnektoren;
- standardisierte Importpfade für nicht direkt integrierbare Quellen;
- inkrementelle Synchronisation, Retry, Rate-Limit- und Fehlerzustände;
- Datenherkunft, Frische, Qualität und Löschbarkeit.

### Arbeitspaket B – Marken- und Funnel-Kontext

- strukturierte Modelle für Marke, Angebot, Zielgruppen, Kanäle und Conversion-Schritte;
- Verbindung von öffentlichen Medienartefakten und internen Leistungsresultaten;
- Gültigkeit, Versionierung, Widersprüche und Freigaben;
- retrieval-fähiger, workspace-begrenzter Kontext.

### Arbeitspaket C – Cross-Channel-Analyse

- Baselines und Zeitfenster;
- Datenqualitäts- und Mindestmengenregeln;
- Signale über mehrere Quellen;
- belegbare Anomalien, Risiken und Chancen;
- Unsicherheit und alternative Erklärungen;
- fachliche Evaluation gegen menschliche Analyse.

### Arbeitspaket D – Generierung und Freigabe

- Strategien, Skripte und Medienvarianten aus freigegebenem Kontext;
- Markenkonsistenz und Quellenbezug;
- Entwurfs-, Review- und Approval-Zustände;
- Kosten-/Tokenprotokollierung;
- keine automatische kundenwirksame Veröffentlichung ohne definierte Freigabe.

### Arbeitspaket E – Umsetzung und Ergebnismessung

- Maßnahmen- und Experimentobjekte;
- Ausgangs- und Ergebnissnapshots;
- Zuordnung zu Content, Kampagnen, Website-/Shop-Änderungen oder Offline-Maßnahmen;
- Messfenster, Störfaktoren und Vergleichswerte;
- verständliche Ergebnisberichte.

### Arbeitspaket F – Bestätigter Lernloop

- Review des Ergebnisses;
- bestätigte, verworfene oder unklare Erkenntnisse;
- Rückführung in Knowledge Base und Graph;
- spätere Retrieval- und Empfehlungsnutzung;
- Audit Trail über Quelle, Entscheidung, Umsetzung und Wiederverwendung.

### Arbeitspaket G – Kundenverständliche Oberflächen

- reale Social-, Search-, Ads-, Data- und AI-Domainseiten;
- geführtes Onboarding;
- verständlicher Funnel statt reiner Datenobjektansicht;
- priorisierte nächste Maßnahmen;
- sichtbare Datenfrische, Unsicherheit und Freigabestatus;
- klare Trennung von Entwurf, Empfehlung, Entscheidung und bestätigtem Wissen.

## 11. Technische Risiken und Gegenmaßnahmen

| Risiko | Code-/Produktbezug | Gegenmaßnahme |
|---|---|---|
| Provider-Enums werden mit echten Integrationen verwechselt | Namen sind vorhanden, Clients fehlen | externe Darstellung nach Implementiert/Teilweise/Geplant; Connector-Nachweis pro Provider |
| Datenqualität erzeugt falsche Signale | aktueller Extraktor wertet Feldnamen und Prozentwerte aus | Mindestmengen, Baselines, Herkunft, Frische, Plausibilitäts- und Konfliktprüfungen |
| AI-Halluzination oder unbelegte Strategie | noch keine AI-Analyse vorhanden | Evidence-Binding, Unsicherheit, Human Review, Evaluationsdatensatz und Ablehnungsoption |
| Cross-Workspace-Datenleck | gemeinsames System mit mehreren Kunden | bestehende Tenant-Grenzen beibehalten, Integrationstests, Auditlogs und unabhängige Sicherheitsprüfung |
| Token- und Agentenkosten steigen stark | bis zu 2.000 EUR variable Monatskosten vorgesehen | Kosten pro Workspace/Aktion, Budgets, Modellrouting, Caching und nutzungsabhängige Preislogik |
| API-Änderungen und Rate Limits | geplante Fremdplattformen | modulare Adapter, Backoff/Retry, Importe und nachvollziehbare Sync-Fehler |
| Scheinkausalität bei Ergebnissen | Outcome-Modell fehlt | Baseline, Messfenster, alternative Erklärungen, Vergleichs-/Experimentdesign und menschliche Bewertung |
| Serviceaufwand skaliert linear | Hybridmodell enthält Betreuung | standardisierte Onboarding-, Review- und Reportingprozesse; Leistungsrahmen pro Paket |
| UI verspricht mehr als Backend liefert | mehrere Zieldomänen sind Shells | Feature-State-Kennzeichnung, reale API-Kennzahlen und keine Demo-Werte in Förderbelegen |
| Graph/AI-Dienste werden ungeprüft produktiv genutzt | Bridge-Code vorhanden, Betriebsstatus offen | Service-Authentisierung, Netzwerkgrenzen, Observability, Datenminimierung und Fail-closed-Verhalten |

## 12. Datenschutz- und Governance-Grundsätze

Die bestehende Workspace- und Decision-Queue-Architektur unterstützt folgende Produktregeln:

- nur öffentliche oder ausdrücklich freigegebene interne Daten;
- getrennte Kunden-Workspaces;
- geschützte Connection Credentials außerhalb gewöhnlicher Nutzdaten;
- Provenienz und Qualitätsmetadaten je Import oder Ableitung;
- Trennung von Rohdaten, maschinellen Entwürfen und bestätigtem Wissen;
- menschliche Prüfung vor kundenwirksamer Nutzung;
- keine organisationsübergreifende Verwendung identifizierbarer Kundendaten ohne Rechtsgrundlage und Freigabe;
- Rollen-, Lösch-, Export- und Auditkonzepte;
- begrenzte Agentenwerkzeuge, die ihre Autorisierung nicht selbst erweitern können.

Diese Grundsätze sind teilweise architektonisch vorbereitet, müssen für reale Medien- und Kundendaten jedoch technisch, rechtlich und organisatorisch vollständig umgesetzt werden.

## 13. Nachweise für die fachliche Stellungnahme

Für eine fachkundige Stelle sollten folgende nicht vertrauliche Belege vorbereitet werden:

1. Architekturdiagramm von Workspace, Quelle, Artefakt, Signal, Wissen, Empfehlung und Decision Queue;
2. Screenshot oder Demo der realen `/data/sources`-Oberfläche;
3. Beispiel eines regelbasierten Signals mit Herkunft;
4. Beispiel der Promotion in Knowledge mit Provenienz;
5. Beispiel einer Empfehlung mit Unsicherheit und Decision Queue;
6. Kennzeichnung der Shell-Seiten als geplante Produktsurfaces;
7. Datenmodell des geplanten Ergebnis- und Lernrecords;
8. Vergleich mit Adobe GenStudio, HubSpot, Hootsuite/Sprout, Funnel und regionalen Agenturen;
9. Risiko- und Evaluationsplan;
10. klarer Funktionsstatus: vorhanden, teilweise vorhanden, geplant.

## 14. Repository-Belege

Zentrale Dateien im analysierten Repository:

- `AGENTS.md` und `CONTEXT-MAP.md`;
- `contexts/workspaces/CONTEXT.md`, `contexts/intelligence/CONTEXT.md` und `contexts/integrations/CONTEXT.md`;
- `app/Models/Concerns/BelongsToWorkspace.php`;
- `app/Http/Middleware/EnforceCurrentWorkspaceTenant.php`;
- `app/Models/WorkspaceSource.php`;
- `app/Models/WorkspaceSourceArtifact.php`;
- `app/Models/WorkspaceSignal.php` und `WorkspaceSignalExtractionRun.php`;
- `app/Models/WorkspaceRecommendation.php` und `DecisionQueueItem.php`;
- `app/Models/WorkspaceKnowledgeEntry.php` sowie Graphmodelle;
- `app/Services/Data/Extractors/RuleBasedSignalExtractor.php`;
- `app/Services/Data/SignalExtractionService.php`;
- `app/Services/Data/PromoteSignalToKnowledgeService.php`;
- `app/Services/Data/RecommendationDecisionGateService.php`;
- `app/Support/WorkspaceGraphSyncService.php`;
- `services/graphiti-bridge/app/main.py`;
- `app/Mcp/Servers/KernscaleDevServer.php`;
- `routes/web.php`;
- `resources/js/components/data/workspace-data-sources-surface.tsx`;
- `resources/js/components/data/workspace-knowledge-base-surface.tsx`;
- `resources/js/components/layout/domain-shell.tsx`;
- `resources/js/pages/dashboard/page.tsx`;
- `resources/js/spa-root.tsx`;
- `tests/Feature/WorkspaceSourceTest.php`;
- `tests/Feature/WorkspaceSourceArtifactTest.php`;
- `tests/Feature/WorkspaceSignalTest.php`;
- `tests/Feature/WorkspaceRecommendationTest.php`;
- `tests/Feature/KnowledgeBaseTest.php`;
- `tests/Feature/DecisionQueueInboxTest.php`;
- `tests/Feature/WorkspaceOwnedRecordTest.php`;
- `docs/architecture/kernscale-intelligence-engine.md`;
- `docs/plans/active-feature-roadmap.md`;
- `docs/plans/2026-08-10-data-sources-baseline-design.md`.

## 15. Schlussfolgerung

Das Repository belegt eine ernsthafte technische Vorleistung: Kernscale besitzt bereits eine workspace-isolierte Daten-, Wissens-, Review- und Entscheidungsschicht sowie eine reale Arbeitsoberfläche für den ersten Teil des Intelligence-Prozesses. Dies reduziert das Umsetzungsrisiko gegenüber einer reinen Konzeptidee.

Die eigentliche Innovation ist jedoch noch nicht fertiggestellt. Fördergegenstand bleibt die Entwicklung produktiver Medien- und Leistungsdatenverbindungen, eines strukturierten Unternehmenskontexts, der Cross-Channel-Analyse und Generierung sowie insbesondere eines nachvollziehbaren Ergebnis- und Lernrecords.

Diese ehrliche Trennung stärkt den Antrag: Sie zeigt vorhandene technische Kompetenz und substanzielle Vorarbeit, ohne geplante Funktionen als bereits marktreif auszugeben.
