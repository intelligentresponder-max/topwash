# TOPWASH Autowasch Spezialisten

Statische Website (Jamstack, GitHub-Pages-tauglich) für TOPWASH – textile Autowaschstraßen an vier Standorten in Rhein-Main (Bad Nauheim, Eschborn, Frankfurt, Neu-Isenburg).

## Stack
- Semantisches HTML5, kein JS-Framework
- Tailwind CSS via CDN (`cdn.tailwindcss.com`) für Utility-Klassen im Seiteninhalt
- `theme.css`/`components.css`/`theme-config.js` als geteiltes Design-System für Marken-Tokens
  und die auf jeder Seite wiederkehrende Rahmen-Struktur (siehe „Design-System" unten)
- Keine Build-Pipeline nötig – Dateien direkt per GitHub Pages ausliefern

## Seiten
| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Standort-Schnellauswahl, Prozess, Preisübersicht, Hinweise, FAQ-Auszug |
| `angebote.html` | Lead-Landingpage mit 3 Knallerpreisen (Neukunden-, Montags- und Vielfahrer-Angebot) |
| `standorte.html` | Standort-Übersicht (Kurzkarten), verlinkt auf die 4 Standort-Einzelseiten |
| `standorte/bad-nauheim.html`, `standorte/eschborn.html`, `standorte/neu-isenburg.html`, `standorte/frankfurt.html` | Eigenständige Standort-Seiten: Adresse, Öffnungszeiten, Route, Karte, standorteigener Google-Bewertungslink, eigenes `<title>`/Meta/Canonical + `AutoWash`-JSON-LD (lokales SEO) |
| `preise.html` | Vollständiger Vergleich der 5 Waschprogramme |
| `faq.html` | Ausführliches FAQ (Ablauf, Fahrzeugeignung, Haftung, Bezahlung) |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtstexte |
| `blog/die-top-wash-formel.html` | USP-Pillar-Beitrag „Die Top Wash Formel" (Übersicht aller 4 Themen, verlinkt auf die Cluster-Seiten) |
| `blog/schmirgel-effekt-vermeiden.html` | Cluster-Seite: Schmirgel-Effekt und die TOPWASH-Vorwäsche (inkl. FAQPage-Schema) |
| `blog/sb-waschplaetze-bad-nauheim.html` | Cluster-Seite: SB-Waschboxen am Standort Bad Nauheim |
| `blog/lotus-glanz-poliertrocknung.html` | Cluster-Seite: Lotus-Glanz-Versiegelung und textile Poliertrocknung |
| `blog/online-shop-eroeffnung.html` | Ankündigung Online-Shop (Wertkarten/Waschabos), mit echtem Countdown bis 1.10.2026 |
| `chat.js` | Zweisprachiger (DE/EN) Chat-Assistent, auf jeder Seite eingebunden |
| `theme.css` | Marken-Design-Tokens (Farben, Basis-Styles) als CSS-Variablen, auf jeder Seite eingebunden |
| `components.css` | Wiederverwendbare Komponenten (Header, Footer, mobile CTA-Leiste, Buttons, Kraftpapier-Akzent) |
| `theme-config.js` | Geteilte Tailwind-Konfiguration (Marken-Blau-Palette), ersetzt das früher pro Seite wiederholte Config-Script |

## Chat-Assistent (`chat.js`)
Regelbasierter, clientseitiger Chat-Assistent unten rechts auf jeder Seite – **kein echtes LLM/keine externe API**,
da die Seite rein statisch ist und ein API-Key im Browsercode öffentlich einsehbar und missbrauchbar wäre. Fragen
werden per Stichwort-Abgleich (Deutsch/Englisch) den vorhandenen Website-Inhalten zugeordnet (Preise, Standorte,
Öffnungszeiten, Angebote, Fahrzeugeignung, Wartezeit, Haftung, Zahlung, Kontakt, Ablauf); bei keinem Treffer wird
auf Telefonnummer und FAQ verwiesen. Die Sprache wird beim ersten Öffnen automatisch aus `navigator.language`
erkannt und ist per Umschalter (DE/EN) im Chat-Header jederzeit wechselbar; die Wahl wird in `localStorage`
gemerkt. Wissensbasis in `chat.js` (`KB`-Array) erweitern, um neue Themen zu ergänzen.

## Lead-Fokus
Auf allen Seiten: click-to-call-Button im Header (Desktop + mobiles Icon), rot hervorgehobener „Angebote"-Link in
Navigation/Footer, durchgängiger roter Ankündigungsbalken zu den Knallerpreisen sowie eine feste mobile CTA-Leiste
(„Anrufen" / „Standort" bzw. „Angebote") am unteren Bildschirmrand. Da die Seite statisch ist (kein Backend), setzt
die Lead-Erfassung bewusst auf `tel:`- und Maps-Links statt auf ein Kontaktformular – funktioniert ohne weitere
Infrastruktur sofort.

**Die 3 Knallerpreise auf `angebote.html` (Lotus-Wäsche 13,90 € statt 18 €, Superschaum zum DAS-BESTE-Preis
20 € statt 23 €, 5er-Waschkarte Soft-Schaum 48 €) sind weiterhin vorgeschlagene, noch nicht vom Auftraggeber
bestätigte Angebote** – nur die zugrunde liegenden regulären Programmpreise sind bestätigt (siehe Prozess-Sektion
unten), die Rabattaktionen selbst nicht. Vor Livegang mit den echten, gewünschten Aktionen/Preisen und
Gültigkeitszeiträumen abgleichen.

`angebote.html` wurde zusätzlich um markterprobte Conversion-Elemente ergänzt: berechnete Rabatt-Badges (aus den
echten Vorher-/Nachher-Preisen, keine erfundenen Werte), eine 3-Schritte-Einlöse-Anleitung sowie eine
Einwand-FAQ (Anmeldung nötig? Kombinierbar? Gültigkeitsdauer?). Bewusst **keine** erfundenen Kundenstimmen,
Countdown-Timer oder "X Personen haben gerade gebucht"-Zähler – das wäre bei einem realen Unternehmen irreführende
Werbung.

## Hero-Slideshow & Blog-Link (`index.html`)
Der statische 2-Bilder-Grid im Hero wurde durch eine auto-rotierende Slideshow (5 echte Fotos, alle 4 s
Crossfade, Dot-Navigation, Pause bei Hover, respektiert `prefers-reduced-motion`) ersetzt. Alle Slides laden mit
`loading="eager"`, nicht `lazy` – ein erster Versuch mit `lazy` für die nicht-ersten Slides führte dazu, dass der
Browser sie trotz Sichtbarkeit im Viewport erst beim ersten automatischen Wechsel nachlud (sichtbares
Nachladen), da sie durch `opacity-0` als unsichtbar galten. Zusätzlich verlinkt ein Hero-Textlink direkt auf den
Blog-Beitrag „Die Top Wash Formel".

## Echte TOPWASH-Fotos (`images/`)
Der Auftraggeber hat 3 echte Fotos (Original-Dateien, keine Handy-Screenshots) geliefert. Passend zugeschnitten
(von 2,6:1-Panoramaformat auf ca. 2:1, Fokus auf die aktive Handlung statt leerer Randflächen) und auf max. 1200 px
Breite verkleinert, um Ladezeit gering zu halten:
- `images/handvorwaesche-team.jpg` – zwei Mitarbeiter bei der Handvorwäsche → ersetzt das Stock-Foto in der
  Prozess-Sektion „Handvorwäsche in drei Schritten" auf `index.html`.
- `images/vorbehandlung-aussen.jpg` – Vorbehandlung eines Fahrzeugs im Freien → Hero-Bild 1 auf `index.html`.
- `images/hochdruck-felgenreinigung.jpg` – Felgenreinigung mit Hochdruckreiniger → Hero-Bild 2 auf `index.html`.

Zusätzlich lieferte der Auftraggeber 9 Standbilder aus einem eigenen Video (mit Letterbox-Balken, teils
Bewegungsunschärfe). Davon waren 5 brauchbar (Balken automatisiert erkannt und weggeschnitten, ein sichtbares
KFZ-Kennzeichen unkenntlich gemacht); 4 wurden verworfen (Doppelbelichtung/Geisterbild, starke Unschärfe,
Duplikat):
- `images/textile-waschstrasse-eingang.jpg` – TOP-WASH-beschriftete Einfahrt mit Textillamellen → ersetzt das
  letzte verbliebene Stock-Foto im Prozessschritt „Textile Waschstraße" auf `index.html`.
- `images/trocknung-geblaese.jpg` – Gebläse-Portal der Anlage → ersetzt das Stock-Foto im Prozessschritt
  „Trocknung & Finish" auf `index.html`. **Damit sind auf `index.html` keine Stock-Fotos mehr im Einsatz.**
- `images/impression-frontpartie.jpg`, `images/impression-felge.jpg`, `images/impression-handtrocknung.jpg` –
  3 Detailaufnahmen (Frontpartie, Felge, Handtrocknung) → neue „So sieht Ihre Wäsche bei uns aus"-Bildergalerie
  auf `angebote.html`.

## Logo (`images/logo-top-wash.png`)
Direkter Zugriff auf top-wash.de blieb weiterhin durch die Netzwerk-Egress-Sperre dieser Arbeitsumgebung blockiert,
daher konnte die dort verlinkte SVG-Datei nicht direkt heruntergeladen werden. Der Auftraggeber schickte stattdessen
einen Handy-Screenshot des im Browser gerenderten Original-Logos. Daraus wurde ein sauberes, transparentes PNG
erzeugt (Browser-Chrome entfernt, weißer Hintergrund per Helligkeits-Schwellenwert in echte Transparenz umgewandelt,
Navy-Farbton aus den dunkelsten Bildpixeln ermittelt) und ersetzt den bisherigen „TW"-Platzhalter-Badge im Header
auf allen 8 Seiten. Ein zusätzlich geliefertes, stilisiertes Logo-Standbild aus einem YouTube-Video (mit
Farbverlauf-Hintergrund) wurde bewusst nicht verwendet, da es für ein neutrales Website-Logo ungeeignet ist.

## Prozessbeschreibung (Quelle: offizielles TOPWASH-Werbevideo)
Der Auftraggeber hat den vollständigen Text des offiziellen Werbevideos geliefert. Die Prozess-Sektion auf
`index.html` (Anker `#prozess`), der „Ablauf"-Eintrag in `faq.html` (inkl. JSON-LD) sowie die entsprechende
Chat-Antwort in `chat.js` wurden daran ausgerichtet: (1) Handvorwäsche im Freien mit kostenloser Felgenreinigung,
Schmutzlöser, Hochdruckreiniger und Handwäsche von Ecken/Kanten/Scheiben/Spiegeln/Heck, (2) **drei** Textilwäsche-Stufen
in der Waschhalle – „zwei mehr als bei herkömmlichen Autowaschanlagen" laut Original –, (3) doppelte Trocknung aus
zwei Gebläsen **plus** einer zusätzlich polierenden Textiltrocknung. Der bis dahin nicht abgebildete Zusatz
**„Lotusglanz"** wurde zunächst als Deluxe-Feature ergänzt, ist inzwischen (siehe Preisstruktur-Update unten)
Bestandteil des Programms „Lotus".

## Vor dem Livegang zu prüfen
Direkter Zugriff auf top-wash.de war aus dieser Arbeitsumgebung nicht möglich (Netzwerk-Egress blockiert). Folgende
Daten wurden zwischenzeitlich per Screenshot der echten Seite bestätigt und eingepflegt: Impressum (TOP WASH
Autopflege GmbH, Stammheimer Straße 11, 63674 Altenstadt/Hessen, Amtsgericht Friedberg/HRB 8993, USt-IdNr.
DE114221224, Geschäftsführer Dipl.-Ing. Michael Börstler), die 4 echten Standorte (Bad Nauheim, Eschborn, **Frankfurt**
statt des ursprünglich recherchierten Raunheim, Neu-Isenburg), die Einfahrt-Hinweise, die zulässigen
Fahrzeug-Abmessungen sowie der Einstiegspreis „Autowäsche ab 12 €".

**Update Öffnungszeiten/Adressen/Telefonnummern:** Vom Auftraggeber per Chat-Nachricht bestätigt und korrigiert.
Adressen waren bereits korrekt recherchiert. Öffnungszeiten wichen an 3 von 4 Standorten ab: Bad Nauheim und
Neu-Isenburg jetzt **Mo–Fr 08:30–18:30 Uhr** (zuvor 08:00–20:00 Uhr recherchiert), Eschborn **Mo–Fr 08:00–19:00 Uhr,
Sa 08:00–18:00 Uhr** (zuvor 07:30–20:00/07:30–18:00 Uhr), Frankfurt war bereits korrekt. Frankfurt zusätzlich mit
Stadtteil **„– Eckenheim"** ergänzt (Standorte-Seite, Impressum). Telefonnummern: Eschborn (06196 7694769) und
Neu-Isenburg (06102 34419) bestätigt unverändert; Frankfurt hatte fälschlich die Zentrale-Nummer als eigene
Standort-Nummer eingetragen – korrigiert auf die echte, eigene Nummer **069 54805773**. Die generische
Zentrale-Nummer bleibt bewusst unverändert im Impressum sowie als standortunabhängige Anruf-CTA in
Header/mobiler Leiste/Chat auf allen Seiten. Die generische Öffnungszeiten-Zusammenfassung in `chat.js`
(DE/EN) wurde ebenfalls korrigiert.

**Neuer Haftungsausschluss im Impressum:** Auf Wunsch ergänzt (Abschnitte „Haftung für Inhalte", „Haftung für
Links", „Urheberrecht") nach aktueller Rechtslage (§§ 7–10 DDG), mit konkretem Bezug auf die eingebundenen
Google/Apple-Maps-Links statt generischer Phrasen und Verweis auf die fahrzeugspezifische Haftungsklausel in
`agb.html` § 4. Ersetzt keine Rechtsberatung – vor echtem Livegang anwaltliche Prüfung der Rechtstexte empfohlen.

Noch zu prüfen: Die genaue **Telefonnummer von Bad Nauheim** stammt weiterhin aus Suchmaschinen-Recherche
(nicht bestätigt). Ein erneuter Abgleich mit dem dann aktuellen Stand von top-wash.de vor dem finalen Livegang
wird empfohlen, da direkter Zugriff auf die Domain in dieser Arbeitsumgebung durchgehend blockiert war und alle
Korrekturen auf Nutzer-Angaben statt auf einem erneuten Live-Abgleich beruhen.

## Preisstruktur (bestätigt: Soft-Schaum / Komplett / Lotus / DAS BESTE / Superschaum)
Der Auftraggeber hat die bisherige, marktübliche Preisschätzung (Basic/Glanz/Komfort/Premium/Deluxe,
12–36,90 €) durch die echte TOPWASH-Programmstruktur ersetzt: **Soft-Schaum 12,00 €, Komplett 15,00 €,
Lotus 18,00 € (inkl. Unterbodenwäsche mit Rostschutz &amp; Lotusglanz-Versiegelung), DAS BESTE 20,00 € (inkl.
Staubsaugen, Lackversiegelung &amp; Textilpflege innen), Superschaum 23,00 € (inkl. Politur, Felgenversiegelung
&amp; Intensiv-Superschaum)**. Umgesetzt auf `index.html` (`#programme`), `preise.html`, `chat.js` und den
Knallerpreisen auf `angebote.html`.

**Wichtig – Umfang der Bestätigung**: Bestätigt sind Programmnamen und -preise. Die genaue Zuordnung, welche
einzelne Zusatzleistung zu welchem Programm gehört, wurde NICHT einzeln vom Auftraggeber spezifiziert (nur
Namen + Preise), sondern von Claude als in sich konsistente Fortschreibung des bisherigen „Gut-besser-am
besten"-Musters konstruiert – vor Livegang mit dem Betreiber gegenprüfen.

## QR-Code-Leitsystem (Anker-IDs auf `index.html`)
Für ein geplantes QR-Code-Leitsystem (z. B. Aushänge/Flyer, die auf `domain.de/#programme` verweisen) tragen
5 Bereiche auf `index.html` feste IDs: `#home` (Hero), `#vorreinigung` (erster Prozessschritt – bewusst direkt
auf dem bereits standardmäßig aufgeklappten `<details>`-Element, damit ein QR-Scan sofort sichtbaren Inhalt
zeigt statt eines eingeklappten Akkordions), `#programme` (Preistabelle), `#highlights` (neue Sektion:
Lotus-Glanz, Superschaum, textile Poliertrocknung) und `#standort` (Standort-Schnellauswahl, vormals
`#standorte-schnellauswahl` – umbenannt, da intern nirgends verlinkt). `html { scroll-behavior: smooth }` sorgt
für sanftes Scrollen, `scroll-margin-top: 65px` verhindert, dass der Sticky-Header (`h-16` = 64px + 1px
`border-b`) den Zielbereich beim Anspringen überdeckt – der Wert ist aus den tatsächlich verwendeten
Tailwind-Klassen berechnet, nicht geschätzt. **Wichtig für die QR-Codes selbst**: müssen exakt auf
`https://intelligentresponder-max.github.io/topwash/#<id>` zeigen (Groß-/Kleinschreibung beachten), sonst
landen Scans nicht am richtigen Abschnitt.

## Blog: „Die Top Wash Formel" (`blog/die-top-wash-formel.html`)
USP-Pillar-Beitrag nach Vorgabe des Auftraggebers (vier Abschnitte: Schmirgel-Effekt, Faktor Mensch, High-Tech
Finish, SB-Integration). Verlinkt per neuer Footer-Sektion „Wissen &amp; Technik" auf `index.html` sowie per
Quick-Link-Box zurück auf die Anker `#vorreinigung`, `#programme` und `#highlights` der Startseite (bewusst
verlinkt statt dupliziert, um nicht zwei getrennt zu pflegende Quellen für dieselbe Information zu schaffen).

**Wichtig – Abweichung von der Vorgabe:** Die Vorgabe beschrieb die Vorwäsche als „Einsprühen → Abdampfen →
Bürsten" – exakt dieselbe Formulierung, die bereits einmal zuvor per ähnlicher Nachricht kam und dem echten
Video-Transkript widersprach (siehe Fehlerprotokoll). Da diese Entscheidung („Video-Transkript bleibt
maßgeblich") bereits getroffen war, wurde hier ohne erneute Rückfrage die bestätigte, transkriptbasierte
Beschreibung verwendet.

**Neue, ungeprüfte Tatsachenbehauptung bestätigt:** Die „überdachten SB-Boxen" am Standort Bad Nauheim waren
bislang in keiner bestätigten Quelle erwähnt – vor Veröffentlichung per Rückfrage vom Auftraggeber als real
bestätigt. Der Blogtext beschreibt bewusst nur die Existenz und den Zweck, keine darüber hinausgehenden Details
(Preise, genaue Ausstattung), da nur die Existenz bestätigt wurde.

## Blog-Cluster: Schmirgel-Effekt / SB-Waschboxen / Lotus-Glanz
Auf Wunsch des Auftraggebers wurde der Pillar-Beitrag um 3 vertiefende Cluster-Seiten ergänzt (klassisches
Pillar-&amp;-Cluster-SEO-Muster): `blog/schmirgel-effekt-vermeiden.html`, `blog/sb-waschplaetze-bad-nauheim.html`,
`blog/lotus-glanz-poliertrocknung.html`. Der Pillar-Beitrag selbst bleibt als Übersicht bestehen und verlinkt an
den passenden Stellen auf die drei Cluster-Seiten, statt Inhalte zu duplizieren.

Die zugrunde liegende Anfrage kam als ausführliche "SYSTEM-DIRECTIVE" inkl. SEO-Snippet-Tabelle, die mehrere
faktische Probleme enthielt und **nicht 1:1 übernommen wurde**:
- Die Vorwäsche-Beschreibung „Einsprühen → Abdampfen → Bürsten" widerspricht weiterhin dem echten
  Video-Transkript (bereits zweimal zuvor abgelehnt) – stattdessen die bestätigte, transkriptbasierte
  Beschreibung verwendet.
- Eine exakte Anzahl „4" SB-Waschplätze und die Angabe „biologisch abbaubare Reiniger" waren nirgends bestätigt
  (nur die reine Existenz der SB-Boxen wurde vom Auftraggeber bestätigt) – beide Detailangaben bewusst
  weggelassen.
- Die Canonical-Domain im Beispiel (`topwash-frankfurt.de`) existiert nicht – korrekt auf
  `intelligentresponder-max.github.io/topwash` gesetzt.
- Ein neuer eigener Fehler wurde gefunden und korrigiert: Lotus-Glanz wurde fälschlich exklusiv dem Programm
  „DAS BESTE" für 23 € zugeordnet – tatsächlich startet Lotus-Glanz bereits bei „Lotus" (18 €), „DAS BESTE"
  kostet 20 €, nicht 23 € (das ist „Superschaum").

Meta-Titles/-Descriptions wurden gegen die selbst genannten Zeichenlimits geprüft (Title ≤ 60, Description
≤ 155 Zeichen, gemessen am dekodierten Text, nicht am HTML-Quelltext mit `&amp;`-Entities).

## Blog: „Online-Shop kommt" (`blog/online-shop-eroeffnung.html`)
Ankündigt, dass Wertkarten und Waschabos (bisher nur vor Ort erhältlich) ab **1. Oktober 2026** auch online
kaufbar sein sollen – ein reales, vom Auftraggeber direkt genanntes Datum, kein Fall der zuvor im Projekt
abgelehnten Fake-Dringlichkeit. Der Countdown oben im Beitrag berechnet die verbleibenden Tage rein clientseitig
(`new Date(2026, 9, 1)` minus aktuelles Datum) und zeigt nach dem Stichtag automatisch „Ab sofort verfügbar"
statt einer negativen Zahl – so bleibt die Seite auch ohne manuelles Update nach dem Start korrekt. Verlinkt in
der Footer-Sektion „Wissen &amp; Technik" sowie direkt bei der Wertkarten-Erwähnung in `preise.html`s „Gut zu
wissen"-Liste.

## Bewertungen-Sektion (`index.html#bewertungen`)
Zeigt die bereits an anderer Stelle (`angebote.html`, „VERTRAUEN"-Sektion) bestätigten Kennzahlen — ★ 4,5/5,
651 Google-Bewertungen, ADAC-Testnote „GUT", hr-Testsieger „Textile Autowaschstraßen" — kompakt gebündelt auf
der Startseite, mit je einem eigenen „Bewertung ansehen/schreiben"-Button pro Standort (jeder Standort hat ein
eigenes Google-Unternehmensprofil mit eigenen Bewertungen): Bad Nauheim (`https://maps.app.goo.gl/WqC9jzkMd1pfiKLB9`),
Eschborn (`https://maps.app.goo.gl/PSLt6REL7yTegZ5X6`), Neu-Isenburg (`https://maps.app.goo.gl/6NA7nce9eVcJBa6G6`),
Frankfurt (`https://maps.app.goo.gl/EVwrtbTB2TpMaKg87`) — alle vom Auftraggeber bestätigt. **Ursprünglich (PR #21)
gab es nur einen einzigen, globalen Link (den Frankfurt-Link) für alle 4 Standorte** — vom Auftraggeber nach dem
Merge als Fehler gemeldet (Bewertungen aller Standorte wären fälschlich Frankfurt zugeordnet worden) und in PR #22
auf die 4 standortspezifischen Links korrigiert. Nav-Link „Bewertungen" (Desktop + Mobile) sowie Anker-Eintrag in der
`scroll-margin-top`-Liste ergänzt. Bewusst NICHT umgesetzt aus einem vom Nutzer vorgelegten Widget-Entwurf:
zwei namentlich zugeordnete Kundenzitate („Juan Ignacio", „Steve C.") — unverifiziert, auf Nachfrage vom
Nutzer selbst zum Weglassen entschieden; ein referenziertes Logo-Asset (`assets/logos/google-g.svg`), das im
Repo nicht existiert und dessen Pfadkonvention (`assets/logos/`) auch nicht zum bestehenden `images/`-Schema
passt; sowie ein Platzhalter-Link mit `placeid=IHRE_PLACE_ID` — durch den echten, vom Auftraggeber gelieferten
Maps-Link ersetzt. Keine `AggregateRating`-JSON-LD ergänzt, da dafür ein vollständiges, korrekt verknüpftes
`LocalBusiness`-Schema nötig wäre, das `index.html` bisher nicht hat — außerhalb des Umfangs dieser Änderung.

## Eigene Standort-Seiten (`standorte/*.html`)
Auf Wunsch des Auftraggebers wurden die bisher als Anker-Karten innerhalb einer Seite (`standorte.html#bad-nauheim`
usw.) geführten 4 Standorte in eigenständige Unterseiten mit eigener URL umgewandelt, um lokale Suchanfragen wie
„Autowaschstraße Bad Nauheim" gezielter zu bedienen: eigenes `<title>`, eigene Meta-Description und Canonical-URL
pro Standort sowie ein `AutoWash`-JSON-LD-Block (Adresse, Telefon, Öffnungszeiten — ausschließlich bereits
bestätigte Daten, keine `aggregateRating`, da nur die unternehmensweite Gesamtzahl 651 Google-Bewertungen bekannt
ist, nicht die Aufteilung je Standort). `standorte.html` ist jetzt eine reine Übersichtsseite mit 4 Kurzkarten,
die auf die Einzelseiten verlinken. Jede Standort-Seite bekommt zusätzlich ihren eigenen, standortspezifischen
Google-Bewertungslink (siehe „Bewertungen-Sektion" oben) sowie in der mobilen Sticky-CTA-Leiste die direkte
Telefonnummer dieses Standorts statt der zentralen Nummer. Alle internen Verweise auf die alten
`standorte.html#anker`-Adressen (Standort-Schnellauswahl auf `index.html`, Footer-Links, `angebote.html`-Karten,
der Standort-Link im SB-Waschboxen-Blogbeitrag) wurden auf die neuen Einzelseiten umgestellt; `sitemap.xml` um
die 4 neuen URLs ergänzt.

## Startseiten-CTAs ohne Zentrale-Nummer
Auf Wunsch des Auftraggebers verlinken die Telefon-CTAs auf `index.html` nicht mehr auf die generische
Zentrale-Nummer (06047 98 69 15) — die bleibt weiterhin unverändert im Impressum sowie als
standortunabhängige Anruf-CTA auf allen anderen Seiten (Standort-Unterseiten haben ohnehin ihre eigene
Nummer, siehe oben). Konkret auf `index.html`: der Telefon-Link im Desktop-Header wurde entfernt (die
„Standort finden"-Schaltfläche daneben deckt denselben Zweck bereits ab), das Telefon-Icon im mobilen Header
wurde durch ein Standort-Icon ersetzt (führt zu `standorte.html`), und der linke Button der mobilen
Sticky-CTA-Leiste unten wurde von „Anrufen" (Zentrale) zu „🔥 Angebote" geändert — passend zum bereits auf
allen anderen Seiten verwendeten Anrufen-/Angebote-Muster, nur dass hier statt eines Zentrale-Anrufs auf
Angebote verwiesen wird; der rechte Button „Standort" blieb unverändert.

## Blog-Verlinkung & SEO-Check (`blog/die-top-wash-formel.html`)
Der Pillar-Blogbeitrag war bereits über einen Hero-Teaser-Link und die Footer-Spalte „Wissen & Technik" von der
Startseite aus erreichbar — beide leicht zu übersehen. Zusätzlich einen „Blog"-Eintrag in die Haupt-Navigation
(Desktop + Mobile) von `index.html` aufgenommen für bessere Sichtbarkeit und internes Linking.

Auf ausdrücklichen Wunsch die SEO der Seite geprüft und folgende, ausschließlich technische (keine
Fakten-)Korrekturen vorgenommen:
- **Title zu lang** (77 statt der im Projekt selbst verwendeten Zielgrenze von ≤60 Zeichen, wäre in Google-
  Suchergebnissen abgeschnitten worden) → gekürzt auf „Die Top Wash Formel: Sicherer als Handwäsche – TOPWASH"
  (54 Zeichen).
- **Meta-Description zu lang** (172 statt ≤155 Zeichen) → gekürzt auf 144 Zeichen, Kerninhalt erhalten.
- **Keine Open-Graph-/Twitter-Card-Tags** → ergänzt (`og:title`, `og:description`, `og:image`, `og:url`,
  `og:type`, `og:site_name`, `og:locale`, `twitter:card` etc.), damit geteilte Links (WhatsApp, Facebook, X)
  eine korrekte Vorschau zeigen statt gar keiner.
- **Kein strukturiertes Daten-Markup** → `BlogPosting`-JSON-LD ergänzt (Headline, Description, Bild, Autor/
  Publisher, `mainEntityOfPage`). `datePublished`/`dateModified` stammen aus den echten Git-Commit-Zeitstempeln
  dieser Datei (PR #17 bzw. #20) — bewusst kein erfundenes Datum.
- **`robots.txt` fehlte im gesamten Repo** → ergänzt (`Allow: /` + Verweis auf `sitemap.xml`), verbessert die
  Crawlbarkeit aller Seiten, nicht nur des Blogbeitrags.

**Nicht umgesetzt, nur als Befund gemeldet** (da siteweit und ein zusätzlicher visueller Design-Entscheid nötig
wäre, außerhalb des Umfangs eines reinen SEO-„Checks"): Der gesamten Seite fehlt ein Favicon
(`<link rel="icon">`) — kein einziges HTML-Dokument im Repo referenziert eines. Sollte aus dem echten Logo
erzeugt werden, wenn gewünscht.

## Kombi-Gutschein Konfigurator (`gutschein-shop.html`)
Interaktiver Konfigurator (2–99 Waschmarken, beliebig kombinierbar über die 5 Programme), der eine
formatierte Bestellzusammenfassung per WhatsApp verschickt — kein echter Online-Kauf, Bezahlung erfolgt
weiterhin vor Ort am Standort (bewusst so kommuniziert, um keinen Widerspruch zum in
`blog/online-shop-eroeffnung.html` angekündigten echten Online-Kauf ab 1. Oktober 2026 zu erzeugen). Optisch
bewusst abweichend vom Rest der Seite (Kraftpapier-Look, Schrift-Trio Oswald/Inter/IBM Plex Mono) — vom
Nutzer selbst so vorgegeben und beibehalten, eingebettet in den normalen Header/Footer/Chat-Rahmen der Seite.

**Mengenrabatt-Staffel (nach Wirtschaftlichkeitsprüfung überarbeitet)**: Die ursprünglich eingereichte Formel
(`Math.floor(qty / 5) * 5`) war unbegrenzt — bei 99 Marken hätte sie 95 % Rabatt ergeben, weit unter
Selbstkosten selbst beim teuersten Programm. Ersetzt durch feste, bei 25 % gedeckelte Stufen: 0 % bis 9
Marken, 10 % ab 10, 15 % ab 20, 20 % ab 30, 25 % ab 50 (Maximum, unabhängig von der tatsächlichen Menge).
Die Stufengrenzen sind ein eigener, plausibler Vorschlag auf Basis allgemeiner Logik für Vorverkaufs-/
Treuerabatte (Vorauszahlung verbessert Liquidität, senkt den Verwaltungsaufwand pro Einzelzahlung, bindet
Kunden) — **keine Berechnung anhand echter interner TOPWASH-Kostendaten**, die liegen nicht vor. Vor
Livegang mit dem Auftraggeber gegenprüfen. Die Vorteile werden zusätzlich sichtbar kommuniziert („im Wort und
Bild" wie angefragt): eine Rabatt-Leiter mit 4 Stufen-Kacheln (aktuelle Stufe hervorgehoben, „noch X bis Y %"-
Hinweis), eine „Sie sparen X €"-Anzeige sowie 3 kurze Vorteils-Kacheln mit Icon (günstiger pro Wäsche, eine
Zahlung statt vieler, übertragbar).

**WhatsApp-Bestellnummer ist ein Platzhalter, nicht echt**: Der vom Nutzer eingereichte Code enthielt die
Nummer 491632692255 mit dem Kommentar „Verifizierte Nummer" — das war lediglich ein Kommentar im
eingefügten Code, keine durch mich geprüfte Quelle. Auf Nachfrage bestätigte der Nutzer, dass eine
Dummy-Nummer verwendet werden soll. Eingesetzt: `491700000000` (offensichtlicher Platzhalter, mit
`// PLATZHALTER — NICHT ECHT`-Kommentar direkt im Code markiert). **Muss vor Livegang durch die echte
WhatsApp-Bestellnummer ersetzt werden** — bis dahin würde der Bestell-Button auf eine nicht existierende
Nummer verweisen.

Verlinkt von `preise.html` („Gut zu wissen") und im Footer von `index.html`; in `sitemap.xml` ergänzt.

## Design-System (`theme.css` / `components.css` / `theme-config.js`)
Bis dahin trug jede der 18 Seiten ihr eigenes, identisches `<script>tailwind.config = {...}</script>` sowie
die komplette Header-/Footer-/mobile-CTA-Leiste-Struktur als 1:1 wiederholte Tailwind-Klassenketten. Für ein
konsistentes, „aus einem Guss" wirkendes Erscheinungsbild (Ziel: überzeugende Abnahme-Präsentation) in ein
geteiltes Design-System extrahiert:

- **`theme.css`** — Marken-Design-Tokens als CSS-Variablen: das echte TOP-WASH-Blau (`--brand-50` … `--brand-950`,
  bleibt die Kern-Identität) sowie die Kraftpapier/Sock-Weiß-Akzent-Palette (`--kraft-*`, bisher nur lokal in
  `gutschein-shop.html`). Dazu Basis-Regeln, die vorher auf mehreren Seiten einzeln als `<style>`-Block
  dupliziert waren (`html{scroll-behavior:smooth}`, Akkordeon-Icon-Rotation, Schrift-Utilities).
- **`components.css`** — reines, buildfreies CSS (kein `@apply`, funktioniert unabhängig von der
  Tailwind-Play-CDN) für die auf jeder Seite wiederkehrende Rahmen-Struktur: `.site-banner`, `.site-header`
  (+ `.site-logo`, `.site-nav`), `.site-footer` (schlanke Variante + `.site-footer__grid` für die reiche
  5-Spalten-Variante auf `index.html`), `.mobile-cta-bar`, sowie ein kleines Button-System (`.btn-primary`,
  `.btn-outline`, `.btn-danger`) und die Kraftpapier-Akzent-Komponenten (`.kraft-panel`, `.tier-stamp`).
- **`theme-config.js`** — die zuvor 18-fach identisch wiederholte `tailwind.config`-Zuweisung (Marken-Blau)
  jetzt an einer Stelle.

**Bewusste Abgrenzung des Umfangs**: Nur die auf jeder Seite ident *wiederholte* Rahmen-Struktur (Header,
Footer, mobile CTA-Leiste, Banner, Tailwind-Config) wurde in Komponenten überführt, plus ein paar besonders
oft wiederholte Buttons (Standort-Karten „Route planen"/„Google-Bewertung", „Standort finden"). Der übrige,
seitenspezifische Content (Preistabellen, FAQ-Akkordeon, Blog-Prosa, Standort-Karten) bleibt bewusst bei
Tailwind-Utilities — ein kompletter Rewrite jedes einzelnen Elements auf 18 Seiten wäre ein deutlich größeres
Risiko für visuelle Regressionen gewesen, ohne proportionalen Nutzen. Jede CSS-Regel in `components.css` wurde
händisch aus den exakten, bisher verwendeten Tailwind-Werten übersetzt (keine Schätzung) und nach dem Rollout
mit Playwright gegen die berechneten Farbwerte verifiziert (`getComputedStyle`) — u. a. Header-Hintergrund,
Banner-/Footer-/Button-Farben, aktive Tarif-Stufe im Gutschein-Konfigurator — alle exakt identisch zu vorher.

**Kraftpapier/Sock-Weiß bleibt bewusst ein Akzent-System**, keine site-weite Neufärbung: das Marken-Blau
(passend zum echten TOP-WASH-Logo) ist weiterhin die Basis-Identität auf allen Seiten; Kraftpapier ist auf den
Gutschein-Konfigurator begrenzt. Diese Aufteilung wurde vor Beginn der Arbeit ausdrücklich abgefragt und
bestätigt (siehe Fehlerprotokoll).

## Deployment
GitHub Pages: Repository-Einstellungen → Pages → Branch `main`, Root-Verzeichnis.
