# CLAUDE-BRIEFING.md — Repo: topwash

## Auftrag
Optimierter Nachbau der Seitenstruktur von top-wash.de (Autowaschstraßen-Anbieter, 4 Standorte Rhein-Main) nach André's Vertical-Coding-Methodik. **Kein 1:1-Content-Klon** — Struktur/UX-Pattern werden übernommen, alle Texte werden neu geschrieben (Copyright!). Branding/Markenname muss sich vom Original unterscheiden, sofern es kein Auftrag des Originalbetreibers ist.

## Vorgehen: Vertical Coding, zweistufiges Prompt Chaining
1. **Schritt 1 — UX-Strategist & Copywriter Prompt**: Content-/UX-Struktur festlegen (Sektionen, FAQ-Themen, CTA-Texte, Standort-Datenmodell)
2. **Schritt 2 — Frontend-Architekt/Jamstack-Specialist Prompt**: Umsetzung in Code

## Negative Constraints (aus André's Leitfaden)
- Kein React/Vue, keine schweren Frameworks
- Kein Inline-CSS — semantisches HTML5 + Tailwind CDN
- Keine Platzhalter/Lorem-Ipsum — alle Inhalte final
- Jamstack-Architektur, statisch, GitHub-Pages-tauglich

## Referenz-Struktur (Pattern von top-wash.de, NICHT wörtlich übernommen)
- Hero mit Slider + Vertrauens-Badges (Testsieger/Auszeichnung)
- Standort-Schnellauswahl (Anzahl je nach echtem Anbieter)
- Prozess-Erklärung in 3 Stufen als Akkordeon (mit Bild je Stufe)
- Preistabelle: 4–5 gestaffelte Pakete
- 3 Info-Kacheln (Standorte / Prozess / Nachhaltigkeit)
- Standort-Karten: Adresse, Maps-Link, Öffnungszeiten
- Einfahrt-/Nutzungshinweise als Icon-Grid
- Fahrzeug-Abmessungs-Grafik
- Umfangreiches FAQ (Keyword-Dump + echte Kaufentscheidungsfragen)
- Footer: Sitemap, Impressum/AGB/Datenschutz, Social

## SEO-Learnings vom Original (übernehmenswert)
- Sehr hohe Textdichte pro Sektion, Long-Tail-Keywords organisch eingebettet
- Autoritätsanker (Testsiegel, Verbandsempfehlung) früh im Hero
- FAQ beantwortet echte Einwände (Wartezeit, Haftung, Eignung des Fahrzeugs) — kein reiner Keyword-Filler

## Offene Fragen vor Umsetzung — beantwortet
- [x] Für wen ist die Seite: eigenes Demo/Portfolio-Stück oder realer Auftraggeber? → **Realer Auftraggeber: top-wash.de selbst** (Rebuild/Redesign im Auftrag des Originalbetreibers).
- [x] Markenname → **TOPWASH Autowasch Spezialisten** (zulässig identisch/ähnlich zum Original, da Auftrag des Originalbetreibers).
- [x] Zielsystem → GitHub Pages (Repo `intelligentresponder-max/topwash`, Branch `main`).

## Fehler-Dokumentation
Alle während der Umsetzung gemachten Fehler hier unten fortlaufend eintragen (Vorgabe: Fehler immer dokumentieren, Alternativen auf Nutzen/Sicherheit/neue Wege doppelt prüfen).

### Fehlerprotokoll
- **Repo-Verwechslung (Sessionstart)**: Die Session war ursprünglich an das Repo `turmhotel` (unrelated Hotel-Projekt) angehängt, das Briefing verlangte jedoch Repo `topwash`. Erkannt durch Abgleich von Briefing-Inhalt gegen tatsächliche Repo-Dateien vor Codebeginn; neues Repo `topwash` angelegt statt versehentlich im falschen Repo zu bauen.
- **Markenname zu nah am Original**: Erster Vorschlag "TOPWASH Autowasch Spezialisten" ist nahezu identisch zum realen, aktiven Wettbewerber "Top-Wash" (top-wash.de). Vor Codebeginn geprüft, ob es sich um einen Auftrag des Originalbetreibers handelt (Bestätigung erhalten) — sonst wäre der Name markenrechtlich riskant gewesen.
- **Netzwerk-Zugriff auf top-wash.de blockiert**: Direkter `WebFetch` auf `top-wash.de`/`www.top-wash.de` schlug mit `EGRESS_BLOCKED` fehl (Proxy-Policy dieser Arbeitsumgebung). Alternative über `web.archive.org` ebenfalls nicht erreichbar. Ausweg: Recherche über `WebSearch`-Snippets (Adressen, Telefonnummern, Öffnungszeiten, ADAC-Testergebnis, Haftungs-FAQ) — Daten sind dadurch nicht 1:1 von der Live-Seite verifiziert und im README als prüfungsbedürftig markiert.
- **`tel:`-Links mit fehlerhaften Zeichen**: Beim Einfügen der Telefonnummern in `standorte.html` sind versehentlich ein Leerzeichen und ein unsichtbares Zero-Width-Space-Zeichen in zwei `href="tel:…"`-Attribute gerutscht. Per Skript bereinigt und Ergebnis mit `grep`/`cat -A` gegengeprüft.
- **Impressum/AGB nicht mit erfundenen Rechtsdaten befüllt**: Handelsregisternummer, Geschäftsführung und USt-IdNr. konnten nicht recherchiert werden. Bewusst NICHT erfunden (Impressumspflicht § 5 DDG), stattdessen klar markierte `[BITTE ERGÄNZEN]`-Platzhalter gesetzt — Abwägung: rechtssicheres, unvollständig markiertes Impressum vor Livegang > optisch "fertiges", aber falsches Impressum.
- **Standort-Recherche war teilweise falsch**: Über Suchmaschinen-Snippets wurde "Raunheim" als vierter Standort vermutet. Per Screenshot der echten Live-Seite bestätigt: der vierte Standort ist tatsächlich **Frankfurt** (Karl-von-Drais-Str. 15), nicht Raunheim. Alle betroffenen Stellen (Standort-Karten, Anker-Links, Footer, Impressum, AGB, Meta-Beschreibungen) korrigiert. Lehre: bei geratenen/recherchierten Fakten für einen realen Auftraggeber immer explizit als prüfungsbedürftig kennzeichnen (war hier bereits im README dokumentiert) statt sie als gesichert zu präsentieren.
- **Reale Rechts- und Preisdaten per Nutzer-Screenshot erhalten**: Da direkter Fetch weiterhin blockiert war, hat der Auftraggeber Screenshots der echten top-wash.de-Seiten (Startseite, Einfahrt-Hinweise, KFZ-Abmessungen, Impressum) geschickt. Daraus alle `[BITTE ERGÄNZEN]`-Platzhalter im Impressum durch echte Daten ersetzt (TOP WASH Autopflege GmbH, HRB 8993, USt-IdNr. DE114221224 usw.) sowie Einfahrt-Hinweise, Fahrzeug-Abmessungen und den Einstiegspreis (12 €) aktualisiert. Die übrigen 4 Preispaket-Stufen bleiben weiterhin Richtwerte, da nur der Einstiegspreis „ab 12 €" auf der Live-Seite sichtbar war — im README als offen markiert statt stillschweigend weiter zu raten.
- **Knallerpreise auf `angebote.html` sind Vorschläge, keine bestätigten Aktionen**: Auftrag war "3 Knallerpreise" für eine Lead-Landingpage, aber ohne Vorgabe der konkreten Aktionen. Auf Nachfrage wollte der Nutzer plausible Angebote vorschlagen lassen statt reale Werte zu liefern. Drei branchenübliche Angebotsformen entworfen (Neukunden-Rabatt, Wochentags-Special, Mengenrabatt/Waschkarte) und als Vorschlag markiert (README) statt sie als final zu präsentieren — Lehre aus dem Standort-Fehler oben: bei jeder nicht vom Auftraggeber selbst gelieferten Zahl explizit kennzeichnen, dass sie zur Bestätigung aussteht.
- **"KI Chat" ohne echtes LLM umgesetzt**: Anfrage war ein "KI Chat" in DE/EN. Da die Seite rein statisch ist (GitHub Pages, kein Server), hätte ein echtes LLM einen API-Key im Client-Code erfordert – das wäre öffentlich einsehbar und von Dritten missbrauchbar gewesen (Sicherheitsrisiko, potenziell hohe Kosten für den Auftraggeber). Vor Umsetzung nachgefragt und auf einen regelbasierten, stichwortbasierten Chat-Assistenten ohne externe API geeinigt. Bewusst nicht als "KI" beworben (Label "TOPWASH Assistent"), um Website-Besucher nicht über die tatsächliche Funktionsweise zu täuschen.
- **Neuer Branch auf Basis des offenen Angebote-PRs statt `main` gestartet**: `angebote.html` und die lead-fokussierten Header (inkl. `tel:`-CTAs) existieren nur auf dem noch offenen Branch `claude/topwash-leads-landing`, nicht auf `main`. Vor Beginn geprüft und den Chat-Widget-Branch bewusst von diesem Branch statt von `main` abgezweigt, damit der Chat auch auf `angebote.html` erscheint und keine Doppelarbeit an den Headern entsteht.
- **Echte TOPWASH-Fotos vom Nutzer erhalten, aber (noch) nicht direkt verwendbar**: Nutzer schickte 4 Handy-Screenshots der echten Slider-Bilder von top-wash.de (Personal bei Handvorwäsche/Textilwäsche). Diese enthalten Statusleiste/Browser-Chrome/Karussell-Punkte und sind als Datei keine sauberen Website-Assets. Vor dem Ersetzen der aktuellen Stock-Fotos nachgefragt, ob Originaldateien nachgeliefert werden können, statt die Screenshots direkt einzubinden oder ungefragt neue Stock-Fotos zu wählen — Nutzer schickt Originaldateien nach.
- **Keine erfundenen Trust-Signale für "Marktanalyse"-Verbesserung**: Anfrage war, die Landingpage anhand von Marktanalyse "interessanter" zu machen. Bewusst NICHT umgesetzt: erfundene Kundenstimmen/Testimonials, Fake-Countdown mit erfundenem Ablaufdatum, "X Personen haben gerade gebucht"-Zähler — das wäre bei einem echten Unternehmen irreführende Werbung. Stattdessen nur auf echten Zahlen basierende Elemente ergänzt (berechnete Rabatt-Prozente aus den bereits vorhandenen Vorher-/Nachher-Preisen, 3-Schritte-Einlöseanleitung, Einwand-FAQ mit bereits an anderer Stelle bestätigten Fakten).
