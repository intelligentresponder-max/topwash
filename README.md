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
| `standorte.html` | Alle 4 Standorte mit Adresse, Öffnungszeiten, Karte |
| `preise.html` | Vollständiger Vergleich der 5 Waschpakete |
| `faq.html` | Ausführliches FAQ (Ablauf, Fahrzeugeignung, Haftung, Bezahlung) |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtstexte |

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
