# Daniel Alleved: hemsida, överlämning till kod

Det här paketet innehåller den godkända designen för danielalleved.se: en desktopversion och en mobilversion, med bilder, design-tokens och en spec. Det är tänkt som startpunkt för att koda upp den riktiga sajten.

## Starta här (att klistra in i Claude Code)

> Läs `README.md` och `SPEC.md` i den här mappen. Bygg en responsiv one-page-sajt som matchar `design/desktop.dc.html` (≥ 821 px) och `design/mobile.dc.html` (≤ 820 px) pixelnära. Använd färger och typsnitt från `tokens.css` och bilderna i `assets/img/`. Förslag på stack: Astro + vanlig CSS (statisk, snabb, lätt att hosta). Kontaktformuläret ska skicka till kontakt@danielalleved.se, till exempel via Formspree, Netlify Forms eller en enkel serverless-funktion. Fråga mig innan du väljer formulärtjänst och hosting.

## Innehåll

| Sökväg | Vad |
|---|---|
| `SPEC.md` | Sektioner, layout per brytpunkt, interaktioner, platshållare och öppna frågor |
| `tokens.css` | Färger, typsnitt, avstånd och radier som CSS-variabler |
| `design/desktop.dc.html` | Desktopdesign (1280 px, innehållsbredd 1140 px) |
| `design/mobile.dc.html` | Mobildesign (390 px) |
| `assets/img/` | Alla bilder (används och reserver) |

### Om `.dc.html`-filerna

De är exporterade från designverktyget och är **referens, inte produktionskod**. Läs dem för exakta mått, färger, texter och struktur. Vissa saker är verktygsspecifika och ska skrivas om:

- `<x-dc>`, `<helmet>` och `support.js`: verktygets ramverk. Ignorera.
- `style-hover="…"`: blir `:hover`-regler i CSS.
- `<sc-if value="{{ x }}">`: villkorlig rendering (meny öppen, info-modal, "kopierad"-bock).
- `onClick="{{ handler }}"`: händelser. Logiken finns i `<script type="text/x-dc">` längst ner i varje fil.
- Inline-`style` överallt: flytta till klasser/komponenter.
