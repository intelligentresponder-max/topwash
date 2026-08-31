# TOPWASH Autowasch Spezialisten

Statische Website (Jamstack, GitHub-Pages-tauglich) für TOPWASH – textile Autowaschstraßen an vier Standorten in Rhein-Main (Bad Nauheim, Eschborn, Frankfurt, Neu-Isenburg).

## Stack
- Semantisches HTML5, kein JS-Framework
- Tailwind CSS via CDN (`cdn.tailwindcss.com`)
- Keine Build-Pipeline nötig – Dateien direkt per GitHub Pages ausliefern

## Seiten
| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Standort-Schnellauswahl, Prozess, Preisübersicht, Hinweise, FAQ-Auszug |
| `angebote.html` | Lead-Landingpage mit 3 Knallerpreisen (Neukunden-, Montags- und Vielfahrer-Angebot) |
| `standorte.html` | Alle 4 Standorte mit Adresse, Öffnungszeiten, Karte |
| `preise.html` | Vollständiger Vergleich der 5 Waschprogramme |
| `faq.html` | Ausführliches FAQ (Ablauf, Fahrzeugeignung, Haftung, Bezahlung) |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtstexte |
| `blog/die-top-wash-formel.html` | USP-Pillar-Beitrag „Die Top Wash Formel" (Übersicht aller 4 Themen, verlinkt auf die Cluster-Seiten) |
| `blog/schmirgel-effekt-vermeiden.html` | Cluster-Seite: Schmirgel-Effekt und die TOPWASH-Vorwäsche (inkl. FAQPage-Schema) |
| `blog/sb-waschplaetze-bad-nauheim.html` | Cluster-Seite: SB-Waschboxen am Standort Bad Nauheim |
| `blog/lotus-glanz-poliertrocknung.html` | Cluster-Seite: Lotus-Glanz-Versiegelung und textile Poliertrocknung |
| `blog/online-shop-eroeffnung.html` | Ankündigung Online-Shop (Wertkarten/Waschabos), mit echtem Countdown bis 1.10.2026 |
| `chat.js` | Zweisprachiger (DE/EN) Chat-Assistent, auf jeder Seite eingebunden |

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
der Startseite, mit zwei Buttons zum echten Google-Maps-Eintrag (`https://maps.app.goo.gl/EVwrtbTB2TpMaKg87`,
vom Auftraggeber bestätigt). Nav-Link „Bewertungen" (Desktop + Mobile) sowie Anker-Eintrag in der
`scroll-margin-top`-Liste ergänzt. Bewusst NICHT umgesetzt aus einem vom Nutzer vorgelegten Widget-Entwurf:
zwei namentlich zugeordnete Kundenzitate („Juan Ignacio", „Steve C.") — unverifiziert, auf Nachfrage vom
Nutzer selbst zum Weglassen entschieden; ein referenziertes Logo-Asset (`assets/logos/google-g.svg`), das im
Repo nicht existiert und dessen Pfadkonvention (`assets/logos/`) auch nicht zum bestehenden `images/`-Schema
passt; sowie ein Platzhalter-Link mit `placeid=IHRE_PLACE_ID` — durch den echten, vom Auftraggeber gelieferten
Maps-Link ersetzt. Keine `AggregateRating`-JSON-LD ergänzt, da dafür ein vollständiges, korrekt verknüpftes
`LocalBusiness`-Schema nötig wäre, das `index.html` bisher nicht hat — außerhalb des Umfangs dieser Änderung.

## Deployment
GitHub Pages: Repository-Einstellungen → Pages → Branch `main`, Root-Verzeichnis.
