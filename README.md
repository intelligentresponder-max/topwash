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
| `preise.html` | Vollständiger Vergleich der 5 Waschpakete |
| `faq.html` | Ausführliches FAQ (Ablauf, Fahrzeugeignung, Haftung, Bezahlung) |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtstexte |
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

**Die 3 Knallerpreise auf `angebote.html` (Neukunden-Rabatt 14,90 €, Montags-Special 22,90 €, 5er-Waschkarte 48 €)
sind vorgeschlagene, noch nicht vom Auftraggeber bestätigte Angebote** – vor Livegang mit den echten,
gewünschten Aktionen/Preisen und Gültigkeitszeiträumen abgleichen.

`angebote.html` wurde zusätzlich um markterprobte Conversion-Elemente ergänzt: berechnete Rabatt-Badges (aus den
echten Vorher-/Nachher-Preisen, keine erfundenen Werte), eine 3-Schritte-Einlöse-Anleitung sowie eine
Einwand-FAQ (Anmeldung nötig? Kombinierbar? Gültigkeitsdauer?). Bewusst **keine** erfundenen Kundenstimmen,
Countdown-Timer oder "X Personen haben gerade gebucht"-Zähler – das wäre bei einem realen Unternehmen irreführende
Werbung.

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

## Prozessbeschreibung (Quelle: offizielles TOPWASH-Werbevideo)
Der Auftraggeber hat den vollständigen Text des offiziellen Werbevideos geliefert. Die Prozess-Sektion auf
`index.html` (Anker `#prozess`), der „Ablauf"-Eintrag in `faq.html` (inkl. JSON-LD) sowie die entsprechende
Chat-Antwort in `chat.js` wurden daran ausgerichtet: (1) Handvorwäsche im Freien mit kostenloser Felgenreinigung,
Schmutzlöser, Hochdruckreiniger und Handwäsche von Ecken/Kanten/Scheiben/Spiegeln/Heck, (2) **drei** Textilwäsche-Stufen
in der Waschhalle – „zwei mehr als bei herkömmlichen Autowaschanlagen" laut Original –, (3) doppelte Trocknung aus
zwei Gebläsen **plus** einer zusätzlich polierenden Textiltrocknung. Der bis dahin nicht abgebildete Zusatz
**„Lotusglanz"** wurde als Deluxe-Feature auf `index.html`/`preise.html` ergänzt sowie als einzeln buchbare Option
vermerkt (Preis dafür nicht bekannt – bitte am Terminal erfragen, siehe `preise.html`).

## Vor dem Livegang zu prüfen
Direkter Zugriff auf top-wash.de war aus dieser Arbeitsumgebung nicht möglich (Netzwerk-Egress blockiert). Folgende
Daten wurden zwischenzeitlich per Screenshot der echten Seite bestätigt und eingepflegt: Impressum (TOP WASH
Autopflege GmbH, Stammheimer Straße 11, 63674 Altenstadt/Hessen, Amtsgericht Friedberg/HRB 8993, USt-IdNr.
DE114221224, Geschäftsführer Dipl.-Ing. Michael Börstler), die 4 echten Standorte (Bad Nauheim, Eschborn, **Frankfurt**
statt des ursprünglich recherchierten Raunheim, Neu-Isenburg), die Einfahrt-Hinweise, die zulässigen
Fahrzeug-Abmessungen sowie der Einstiegspreis „Autowäsche ab 12 €".

Noch zu prüfen: Die genauen Adressen/Telefonnummern/Öffnungszeiten der Standorte Bad Nauheim, Eschborn und
Neu-Isenburg stammen weiterhin aus Suchmaschinen-Recherche (nicht von der Live-Seite bestätigt). Die vier
gestaffelten Preispakete auf `preise.html`/`index.html` sind bis auf den bestätigten Basic-Einstiegspreis (12 €)
weiterhin marktübliche Richtwerte und sollten durch die echten TOPWASH-Paketpreise ersetzt werden.

## Deployment
GitHub Pages: Repository-Einstellungen → Pages → Branch `main`, Root-Verzeichnis.
