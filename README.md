# TOPWASH Autowasch Spezialisten

Statische Website (Jamstack, GitHub-Pages-tauglich) für TOPWASH – textile Autowaschstraßen an vier Standorten in Rhein-Main (Bad Nauheim, Eschborn, Neu-Isenburg, Raunheim).

## Stack
- Semantisches HTML5, kein JS-Framework
- Tailwind CSS via CDN (`cdn.tailwindcss.com`)
- Keine Build-Pipeline nötig – Dateien direkt per GitHub Pages ausliefern

## Seiten
| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Standort-Schnellauswahl, Prozess, Preisübersicht, Hinweise, FAQ-Auszug |
| `standorte.html` | Alle 4 Standorte mit Adresse, Öffnungszeiten, Karte |
| `preise.html` | Vollständiger Vergleich der 5 Waschpakete |
| `faq.html` | Ausführliches FAQ (Ablauf, Fahrzeugeignung, Haftung, Bezahlung) |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtstexte |

## Vor dem Livegang zu prüfen
Direkter Zugriff auf top-wash.de war aus dieser Arbeitsumgebung nicht möglich (Netzwerk-Egress blockiert); alle
Standort-Adressen, Telefonnummern und Öffnungszeiten stammen aus recherchierten Suchmaschinen-Snippets (Stand der
Recherche: siehe Commit-Historie) und sollten vor Veröffentlichung gegen die tatsächlichen, aktuellen Daten geprüft
werden. Preise auf `preise.html`/`index.html` sind marktübliche Richtwerte und müssen durch die echten TOPWASH-Preise
ersetzt werden. `impressum.html`, `datenschutz.html` und `agb.html` enthalten mit `[BITTE ERGÄNZEN]` markierte
Platzhalter für Firmendaten (Rechtsform, Geschäftsführung, Handelsregister, USt-IdNr.), die aus Rechtsgründen nicht
automatisiert recherchiert wurden.

## Deployment
GitHub Pages: Repository-Einstellungen → Pages → Branch `main`, Root-Verzeichnis.
