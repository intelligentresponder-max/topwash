/* TOP WASH Chat-Assistent — regelbasiert, zweisprachig (DE/EN), kein Backend nötig */
(function () {
  "use strict";

  var PHONE_DISPLAY = "06047 98 69 15";
  var PHONE_TEL = "tel:+496047986915";

  // chat.js is loaded from every page at every folder depth (root, blog/, standorte/)
  // via a single shared script, but its answer texts contain page-relative links.
  // Without this prefix, a link like href="preise.html" written from within a page in
  // blog/ or standorte/ would incorrectly resolve to blog/preise.html (404) instead of
  // the real ../preise.html — this computes the right prefix once per page load.
  var BASE = /\/(blog|standorte)\//.test(location.pathname) ? "../" : "";

  var STRINGS = {
    de: {
      title: "TOP WASH Assistent",
      subtitle: "Schnelle Antworten auf Ihre Fragen",
      openLabel: "Chat öffnen",
      closeLabel: "Chat schließen",
      placeholder: "Frage eingeben …",
      send: "Senden",
      greeting: "Hallo! Ich bin der TOP WASH Assistent und beantworte häufige Fragen zu Preisen, Standorten und Öffnungszeiten. Was möchten Sie wissen?",
      chips: ["Öffnungszeiten", "Preise", "Standorte", "Aktuelle Angebote", "Fahrzeug geeignet?"],
      fallback: "Diese Frage kann ich leider nicht automatisch beantworten. Rufen Sie uns gerne direkt an: <a href=\"" + PHONE_TEL + "\" class=\"underline font-semibold\">" + PHONE_DISPLAY + "</a>, oder schauen Sie in unsere <a href=\"" + BASE + "faq.html\" class=\"underline font-semibold\">FAQ</a>.",
      langToggle: "EN"
    },
    en: {
      title: "TOP WASH Assistant",
      subtitle: "Quick answers to your questions",
      openLabel: "Open chat",
      closeLabel: "Close chat",
      placeholder: "Type a question …",
      send: "Send",
      greeting: "Hi! I'm the TOP WASH Assistant and can answer common questions about prices, locations and opening hours. What would you like to know?",
      chips: ["Opening hours", "Prices", "Locations", "Current offers", "Is my car suitable?"],
      fallback: "I can't answer that automatically yet. Feel free to call us directly: <a href=\"" + PHONE_TEL + "\" class=\"underline font-semibold\">" + PHONE_DISPLAY + "</a>, or check our <a href=\"" + BASE + "faq.html\" class=\"underline font-semibold\">FAQ</a>.",
      langToggle: "DE"
    }
  };

  // Knowledge base: each topic has DE/EN keyword lists (matched by substring on lowercased input)
  // and a DE/EN answer. Chip labels above map 1:1 to the first 5 topics by index.
  var KB = [
    {
      keywords: {
        de: ["öffnungszeit", "offen", "geöffnet", "wann habt", "uhrzeit", "wann ist auf"],
        en: ["opening", "hours", "open", "when are you", "what time"]
      },
      answer: {
        de: "Die Öffnungszeiten variieren leicht je Standort: meist Mo–Fr zwischen 08:00 und 19:00 Uhr (je nach Standort 08:30–18:30 bzw. 08:00–19:00 Uhr), Sa 08:00–18:00 Uhr, sonntags geschlossen. Genaue Zeiten je Standort auf der <a href=\"" + BASE + "standorte.html\" class=\"underline font-semibold\">Standorte-Seite</a>.",
        en: "Opening hours vary slightly by location: generally Mon–Fri between 8am and 7pm (8:30am–6:30pm or 8am–7pm depending on location), Sat 8am–6pm, closed Sundays. Exact hours per location on our <a href=\"" + BASE + "standorte.html\" class=\"underline font-semibold\">Locations page</a>."
      }
    },
    {
      keywords: {
        de: ["preis", "kosten", "was kostet", "euro", "€"],
        en: ["price", "cost", "how much", "euro", "€"]
      },
      answer: {
        de: "Unsere Waschprogramme starten bei 12 € (Soft-Schaum) und reichen bis 23 € (Superschaum). Alle Programme im Vergleich: <a href=\"" + BASE + "preise.html\" class=\"underline font-semibold\">Preise-Seite</a>. Unsere 3 beliebtesten Programme im Überblick: <a href=\"" + BASE + "angebote.html\" class=\"underline font-semibold\">Angebote ansehen</a>. Warum sich der Preis lohnt, erklärt unser Vergleich <a href=\"" + BASE + "blog/beste-autowaesche-im-vergleich.html\" class=\"underline font-semibold\">„Was ist die beste Autowäsche?“</a>.",
        en: "Our wash programs start at €12 (Soft-Schaum) and go up to €23 (Superschaum). Full comparison: <a href=\"" + BASE + "preise.html\" class=\"underline font-semibold\">Prices page</a>. Our 3 most popular programs at a glance: <a href=\"" + BASE + "angebote.html\" class=\"underline font-semibold\">see programs</a>. Curious why it's worth it? Read our comparison <a href=\"" + BASE + "blog/beste-autowaesche-im-vergleich.html\" class=\"underline font-semibold\">\"What's the best car wash?\"</a>."
      }
    },
    {
      keywords: {
        de: ["standort", "wo seid ihr", "wo ist", "adresse", "in der nähe", "bad nauheim", "eschborn", "frankfurt", "neu-isenburg", "neu isenburg"],
        en: ["location", "where are you", "address", "near me", "bad nauheim", "eschborn", "frankfurt", "neu-isenburg"]
      },
      answer: {
        de: "TOP WASH hat 4 Standorte in Rhein-Main: Bad Nauheim, Eschborn, Frankfurt und Neu-Isenburg. Adressen, Karte &amp; Routenplaner: <a href=\"" + BASE + "standorte.html\" class=\"underline font-semibold\">Standorte-Seite</a>. Am Standort Bad Nauheim gibt es zusätzlich überdachte <a href=\"" + BASE + "blog/sb-waschplaetze-bad-nauheim.html\" class=\"underline font-semibold\">SB-Waschboxen</a> für die eigene Nacharbeit.",
        en: "TOP WASH has 4 locations in the Rhein-Main area: Bad Nauheim, Eschborn, Frankfurt and Neu-Isenburg. Addresses, map &amp; directions: <a href=\"" + BASE + "standorte.html\" class=\"underline font-semibold\">Locations page</a>. Our Bad Nauheim location also has covered <a href=\"" + BASE + "blog/sb-waschplaetze-bad-nauheim.html\" class=\"underline font-semibold\">self-service wash bays</a> for your own finishing touches."
      }
    },
    {
      keywords: {
        de: ["angebot", "aktion", "rabatt", "knaller", "sparen", "gutschein"],
        en: ["offer", "deal", "discount", "promo", "voucher", "save"]
      },
      answer: {
        de: "Unsere 3 beliebtesten Programme: die Lotus-Wäsche (18 €), die Superschaum-Wäsche (23 €) und die 5er-Waschkarte Soft-Schaum zum Vorausbezahlen (60 €). Details: <a href=\"" + BASE + "angebote.html\" class=\"underline font-semibold\">Angebote ansehen</a>. Einen TOP WASH-Gutschein können Sie schon heute direkt per WhatsApp zusammenstellen: <a href=\"" + BASE + "gutschein-shop.html\" class=\"underline font-semibold\">Gutschein-Konfigurator</a> (so funktioniert's: <a href=\"" + BASE + "blog/whatsapp-bestellung-erklaert.html\" class=\"underline font-semibold\">Schritt-für-Schritt-Anleitung</a>).",
        en: "Our 3 most popular programs: the Lotus wash (€18), the Superschaum wash (€23), and the prepaid Soft-Schaum 5-wash card (€60). Details: <a href=\"" + BASE + "angebote.html\" class=\"underline font-semibold\">see programs</a>. You can already put together a TOP WASH voucher via WhatsApp today: <a href=\"" + BASE + "gutschein-shop.html\" class=\"underline font-semibold\">voucher configurator</a> (here's how it works: <a href=\"" + BASE + "blog/whatsapp-bestellung-erklaert.html\" class=\"underline font-semibold\">step-by-step guide</a>)."
      }
    },
    {
      keywords: {
        de: ["passt", "geeignet", "abmessung", "höhe", "breite", "suv", "van", "transporter", "fahrzeuggröße"],
        en: ["fit", "suitable", "dimension", "height", "width", "suv", "van", "vehicle size"]
      },
      answer: {
        de: "Unsere Anlagen sind für fast alle Fahrzeugtypen geeignet: bis 200 cm Breite und 205 cm Höhe (inkl. Spiegel, notfalls einklappen). Details &amp; Grafik auf der <a href=\"" + BASE + "index.html#prozess\" class=\"underline font-semibold\">Startseite</a> oder in den <a href=\"" + BASE + "faq.html\" class=\"underline font-semibold\">FAQ</a>. Was Sie vor der Einfahrt sonst noch beachten sollten (Antenne, Spiegel, Scheibenwischer &amp; Co.): <a href=\"" + BASE + "blog/12-game-changer-waschanlage.html\" class=\"underline font-semibold\">12 Game Changer-Checkliste</a>.",
        en: "Our facilities fit almost all vehicle types: up to 200 cm width and 205 cm height (incl. mirrors, fold in if needed). Details &amp; diagram on our <a href=\"" + BASE + "index.html#prozess\" class=\"underline font-semibold\">homepage</a> or in the <a href=\"" + BASE + "faq.html\" class=\"underline font-semibold\">FAQ</a>. What else to check before driving in (antenna, mirrors, wipers &amp; more): our <a href=\"" + BASE + "blog/12-game-changer-waschanlage.html\" class=\"underline font-semibold\">12 game-changer checklist</a>."
      }
    },
    {
      keywords: {
        de: ["wartezeit", "warten", "lange dauert", "schlange"],
        en: ["wait", "waiting", "how long", "queue"]
      },
      answer: {
        de: "In der Regel keine oder nur kurze Wartezeiten – je nach Andrang sind 2 bis 7 Mitarbeitende im Einsatz, unsere Anlagen waschen bis zu 60–70 Fahrzeuge pro Stunde.",
        en: "Usually little to no waiting — depending on demand, 2 to 7 staff members are on site, and our facilities can wash up to 60–70 vehicles per hour."
      }
    },
    {
      keywords: {
        de: ["haftung", "schaden", "kaputt", "kratzer", "versicherung"],
        en: ["liability", "damage", "scratch", "insurance", "broken"]
      },
      answer: {
        de: "Wie branchenüblich gelten Haftungsgrenzen, u. a. für nicht werkseitiges Zubehör, Vorschäden/Folierung und hochglanzpolierte Felgen. Details in unseren <a href=\"" + BASE + "agb.html\" class=\"underline font-semibold\">AGB</a> oder den <a href=\"" + BASE + "faq.html\" class=\"underline font-semibold\">FAQ</a>. Wie wir Kratzer durch den sogenannten Schmirgel-Effekt von vornherein vermeiden, erklärt unsere <a href=\"" + BASE + "blog/schmirgel-effekt-vermeiden.html\" class=\"underline font-semibold\">3-Stufen-Handvorwäsche</a>.",
        en: "As is standard in the industry, some liability limits apply — e.g. for non-factory accessories, pre-existing damage/wraps, and high-gloss polished wheels. Details in our <a href=\"" + BASE + "agb.html\" class=\"underline font-semibold\">terms</a> or <a href=\"" + BASE + "faq.html\" class=\"underline font-semibold\">FAQ</a>. How we prevent scratches from the so-called grit effect in the first place: our <a href=\"" + BASE + "blog/schmirgel-effekt-vermeiden.html\" class=\"underline font-semibold\">3-stage hand pre-wash</a>."
      }
    },
    {
      keywords: {
        de: ["zahlen", "bezahlen", "karte", "bar", "zahlungsart"],
        en: ["pay", "payment", "card", "cash"]
      },
      answer: {
        de: "Sie können an allen Standorten bar oder mit gängigen Bank-/Kreditkarten bezahlen.",
        en: "You can pay in cash or with common debit/credit cards at all locations."
      }
    },
    {
      keywords: {
        de: ["telefon", "anrufen", "nummer", "kontakt", "erreichen"],
        en: ["phone", "call", "number", "contact", "reach"]
      },
      answer: {
        de: "Sie erreichen uns telefonisch unter <a href=\"" + PHONE_TEL + "\" class=\"underline font-semibold\">" + PHONE_DISPLAY + "</a>.",
        en: "You can reach us by phone at <a href=\"" + PHONE_TEL + "\" class=\"underline font-semibold\">" + PHONE_DISPLAY + "</a>."
      }
    },
    {
      keywords: {
        de: ["ablauf", "wie funktioniert", "prozess", "wäsche läuft"],
        en: ["how does it work", "process", "steps"]
      },
      answer: {
        de: "Sauber wie von Hand gewaschen: gründliche Handvorwäsche im Freien (Felgen, Schmutzlöser, Hochdruck, Handwäsche), 3 Textilwäsche-Stufen in der Waschhalle, dann doppelte Trocknung mit 2 Gebläsen plus polierender Textiltrocknung. Mehr dazu auf der <a href=\"" + BASE + "index.html#prozess\" class=\"underline font-semibold\">Startseite</a> oder in unserem Artikel <a href=\"" + BASE + "blog/die-top-wash-formel.html\" class=\"underline font-semibold\">„Die TOP WASH Formel“</a>, warum das sicherer als klassische Handwäsche ist.",
        en: "Clean as if washed by hand: thorough outdoor hand pre-wash (free rim cleaning, dirt loosener, pressure wash, hand wash), 3 textile wash stages inside, then double drying with 2 blowers plus a polishing textile dry. More on our <a href=\"" + BASE + "index.html#prozess\" class=\"underline font-semibold\">homepage</a> or in our article <a href=\"" + BASE + "blog/die-top-wash-formel.html\" class=\"underline font-semibold\">\"The TOP WASH Formula\"</a> on why that's safer than classic hand washing."
      }
    }
  ];

  function detectLang() {
    try {
      var stored = localStorage.getItem("topwashChatLang");
      if (stored === "de" || stored === "en") return stored;
    } catch (e) {}
    return (navigator.language || "de").toLowerCase().indexOf("de") === 0 ? "de" : "en";
  }

  function matchTopic(input, lang) {
    var text = input.toLowerCase();
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var kws = KB[i].keywords[lang];
      var score = 0;
      for (var j = 0; j < kws.length; j++) {
        if (text.indexOf(kws[j]) !== -1) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        best = KB[i];
      }
    }
    return best;
  }

  function init() {
    var lang = detectLang();

    var root = document.createElement("div");
    root.id = "topwash-chat-root";
    root.innerHTML =
      '<button id="topwash-chat-toggle" aria-label="" class="fixed z-50 right-4 bottom-20 md:bottom-6 w-14 h-14 rounded-full bg-brand-600 text-white shadow-xl grid place-items-center hover:bg-brand-700 transition">' +
        '<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>' +
      '</button>' +
      '<div id="topwash-chat-panel" hidden style="height:min(55vh,420px);display:none" class="fixed z-50 right-4 bottom-20 md:bottom-6 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden" role="dialog" aria-modal="false" aria-label="TOP WASH Chat">' +
        '<div class="bg-brand-700 text-white px-4 py-3 flex items-center justify-between">' +
          '<div>' +
            '<p id="topwash-chat-title" class="font-bold leading-tight"></p>' +
            '<p id="topwash-chat-subtitle" class="text-xs text-brand-100 leading-tight"></p>' +
          '</div>' +
          '<div class="flex items-center gap-1">' +
            '<button id="topwash-chat-lang" class="min-w-[40px] min-h-[40px] text-xs font-semibold border border-white/40 rounded px-2 py-1 hover:bg-white/10"></button>' +
            '<button id="topwash-chat-close" aria-label="" class="min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-white/10 rounded-lg">' +
              '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div id="topwash-chat-messages" class="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm" aria-live="polite"></div>' +
        '<div id="topwash-chat-chips" class="px-4 pb-2 flex flex-wrap gap-2"></div>' +
        '<form id="topwash-chat-form" class="border-t border-slate-200 p-3 flex gap-2">' +
          '<input id="topwash-chat-input" type="text" autocomplete="off" class="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />' +
          '<button type="submit" class="rounded-full bg-brand-600 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-700 transition">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>' +
          '</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(root);

    var toggleBtn = document.getElementById("topwash-chat-toggle");
    var panel = document.getElementById("topwash-chat-panel");
    var closeBtn = document.getElementById("topwash-chat-close");
    var langBtn = document.getElementById("topwash-chat-lang");
    var titleEl = document.getElementById("topwash-chat-title");
    var subtitleEl = document.getElementById("topwash-chat-subtitle");
    var messagesEl = document.getElementById("topwash-chat-messages");
    var chipsEl = document.getElementById("topwash-chat-chips");
    var formEl = document.getElementById("topwash-chat-form");
    var inputEl = document.getElementById("topwash-chat-input");

    var greeted = false;
    // Records every message as language-independent data (a KB topic index,
    // "greeting"/"fallback", or literal user text) so the whole conversation
    // can be re-rendered in the new language when the user toggles DE/EN —
    // otherwise only newly-added messages would switch, while everything
    // already on screen stayed in the old language.
    var history = [];

    function addMessage(html, from) {
      var bubble = document.createElement("div");
      bubble.className = from === "user"
        ? "ml-auto max-w-[85%] bg-brand-600 text-white rounded-2xl rounded-br-sm px-3.5 py-2"
        : "mr-auto max-w-[85%] bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm px-3.5 py-2";
      bubble.innerHTML = html;
      messagesEl.appendChild(bubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function renderEntry(entry) {
      if (entry.from === "user") {
        addMessage(escapeHtml(entry.text), "user");
      } else if (entry.kind === "greeting") {
        addMessage(STRINGS[lang].greeting, "bot");
      } else if (entry.kind === "fallback") {
        addMessage(STRINGS[lang].fallback, "bot");
      } else {
        addMessage(KB[entry.kind].answer[lang], "bot");
      }
    }

    function pushMessage(entry) {
      history.push(entry);
      renderEntry(entry);
    }

    function rerenderHistory() {
      messagesEl.innerHTML = "";
      history.forEach(renderEntry);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function renderChips() {
      var s = STRINGS[lang];
      chipsEl.innerHTML = "";
      s.chips.forEach(function (label, idx) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "text-xs rounded-full border border-brand-200 text-brand-700 px-3 py-1.5 hover:bg-brand-50 transition";
        chip.textContent = label;
        chip.addEventListener("click", function () {
          handleUserInput(label, idx);
        });
        chipsEl.appendChild(chip);
      });
    }

    function applyLang() {
      var s = STRINGS[lang];
      titleEl.textContent = s.title;
      subtitleEl.textContent = s.subtitle;
      toggleBtn.setAttribute("aria-label", s.openLabel);
      closeBtn.setAttribute("aria-label", s.closeLabel);
      langBtn.textContent = s.langToggle;
      inputEl.setAttribute("placeholder", s.placeholder);
      renderChips();
      try { localStorage.setItem("topwashChatLang", lang); } catch (e) {}
    }

    function handleUserInput(text, chipIndex) {
      if (!text.trim()) return;
      pushMessage({ from: "user", text: text });
      inputEl.value = "";
      var topic = typeof chipIndex === "number" ? KB[chipIndex] : matchTopic(text, lang);
      var kind = topic ? KB.indexOf(topic) : "fallback";
      setTimeout(function () { pushMessage({ from: "bot", kind: kind }); }, 250);
    }

    function escapeHtml(str) {
      var div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    function openChat() {
      // Panel and toggle button both carry Tailwind display utility classes
      // (flex / grid). Author-stylesheet rules like ".flex{display:flex}"
      // override the user-agent default "[hidden]{display:none}" regardless
      // of specificity, so toggling the `hidden` attribute alone has no
      // visible effect once Tailwind's CSS has loaded. Setting `display`
      // inline guarantees the correct visibility regardless of load order.
      panel.hidden = false;
      panel.style.display = "flex";
      toggleBtn.hidden = true;
      toggleBtn.style.display = "none";
      if (!greeted) {
        applyLang();
        pushMessage({ from: "bot", kind: "greeting" });
        greeted = true;
      }
    }

    function closeChat() {
      panel.hidden = true;
      panel.style.display = "none";
      toggleBtn.hidden = false;
      toggleBtn.style.display = "grid";
    }

    toggleBtn.addEventListener("click", openChat);
    closeBtn.addEventListener("click", closeChat);
    langBtn.addEventListener("click", function () {
      lang = lang === "de" ? "en" : "de";
      applyLang();
      rerenderHistory();
    });
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handleUserInput(inputEl.value);
    });

    applyLang();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
