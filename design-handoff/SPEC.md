# Spec: danielalleved.se

One-page-sajt på svenska (`lang="sv"`). Målgrupp: företag som bokar nöjesvärd/konferencier till personalfester, kick-offer och konferenser. Huvudmål: **få offertförfrågningar** via formuläret, telefon eller mejl.

## Brytpunkter

- **Desktop ≥ 821 px**: följer `design/desktop.dc.html`. Innehållsbredd 1140 px, gutter 32 px.
- **Mobil ≤ 820 px**: följer `design/mobile.dc.html`. Designad för 390 px, gutter 22 px. Ska fungera ner till 320 px.

## Sektioner (i ordning)

| # | Sektion | Ankare | Desktop | Mobil |
|---|---|---|---|---|
| 1 | Navigation | – | Logotyp vänster, 4 länkar, guld-CTA "Få offert" | Sticky topbar 60 px: logotyp + hamburgare. Menyn fälls ut under baren (stora Playfair-länkar + guld-CTA) och stängs vid klick på länk |
| 2 | Hero | `#top` | 660 px hög, helbild + mörk gradient, centrerat: namn (Pinyon Script, guldgradient), "Nöjesvärd & Konferencier", ornamentlinje, 4 tjänster, "20 års erfarenhet…", 2 knappar | 640 px. Tjänsterna i 2×2-rutnät, knapparna staplade på full bredd |
| 3 | Vad jag erbjuder | `#erbjudande` | Navy med bakgrundsbild. Citat + 4 rader bild/text som växlar sida (Ett–Fyra) | Bild överst i varje kort, guldetikett "Ett/Två…" som överlappar bildens nederkant |
| 4 | Exempelupplägg | `#upplagg` | Ljus bakgrundsbild. Vertikal tidslinje med 9 punkter (tid, rubrik, text) + avslutande citat | Kompaktare tidslinje: tid och rubrik på samma rad, kortare texter. Sista punkten (Fest) i tegelröd |
| 5 | Referenser | `#jobbat-for` / `#m-referenser` | Två oändliga marquee-rader: citatkort (vänster) och kundnamn (höger), paus vid hover | Citatkort som horisontell swipe-karusell med scroll-snap + prickindikator. Kundnamn som marquee |
| 6 | Om Daniel | `#om-daniel` | Teal panel, porträtt 4:5 vänster, text höger, taggar | Porträtt i full bredd överst, text under, taggar som chips |
| 7 | Logistik | – | Text + checklista, 2 kolumner | Staplat |
| 8 | Kontakt / Få offert | `#kontakt` | Kontaktinfo vänster (med kopiera-knappar), formulär 2 kolumner höger | Snabbknappar "Ring" / "Mejla" överst, formulär i 1 kolumn, checkbox-rader i full bredd med "?"-knapp till höger |
| 9 | Footer | – | Ljus. Logotyp, länkar, kontaktrader, copyright | Navy. Logotyp, länkar i 2×2, copyright |
| – | Sticky CTA (mobil) | – | – | Fast bar längst ner: ring-ikon + guld "Få offert". Respektera `env(safe-area-inset-bottom)` |

## Interaktioner

1. **Mobilmeny**: hamburgare ↔ kryss, `aria-expanded`, stäng på länkklick och Esc.
2. **Info-modal ("?")** på varje val i formuläret: desktop centrerad dialog, mobil bottom sheet. Stäng via ×, klick utanför och Esc. Fokusfälla + returnera fokus. Texterna finns i `INFO`-objektet i båda designfilerna.
3. **Kopiera e-post/telefon** (desktop): kopierar till urklipp och visar en bock i 1,8 s.
4. **Marquee**: CSS-animation, 55 s (mobil 40 s), innehållet duplicerat för sömlös loop. Paus vid hover. **Stäng av vid `prefers-reduced-motion`.**
5. **Mjuk scroll** till ankare, med offset för sticky header på mobil.
6. **Formulär**: fälten namn, e-post, telefon, antal gäster, datum, plats, aktiv tid (från–till), 4 tjänster (checkbox), 4 tillägg (checkbox), övrigt. Validera namn + e-post som obligatoriska. Visa tack-läge efter skickat. Ska skicka till kontakt@danielalleved.se.

## Platshållare att ersätta (innehåll som saknas)

- [ ] **Hero-video**: nu `hero-temp.jpg` + etiketten "Temporär bild — ersätts av video". Planen är en bakgrundsvideo (muted, autoplay, loop, playsinline) med bilden som poster/fallback.
- [ ] **Referenscitat**: alla kort säger "[Klistra in en längre skriftlig referens här.]" / "Namn Efternamn" / "Roll, företag".
- [ ] **Telefonnummer**: `+46 70-000 00 00` / `tel:+46700000000` är påhittat.
- [ ] **Tilläggstexter** i info-modalen: eldshow, extra liveband, styltgång, eld-mingel.
- [ ] **Kundlogotyper**: nu bara text. Byt till riktiga logotyper (SVG, enfärgade) om tillstånd finns.
- [ ] Kontrollera att `@danielalleved` på Instagram och `kontakt@danielalleved.se` stämmer.

## Krav för produktion

- Bilder: konvertera till WebP/AVIF, `srcset`, lazy-load allt under hero. Bakgrunds-PNG:erna är 2–2,5 MB och behöver komprimeras kraftigt.
- SEO: title "Daniel Alleved — Nöjesvärd & Konferencier", meta description, Open Graph-bild, JSON-LD (`LocalBusiness`/`Person`).
- Tillgänglighet: kontrast AA (mobilens sekundära text använder #4A5A5B av den anledningen), synliga fokusringar, labels på alla fält, tryckytor ≥ 44 px.
- Inputs på mobil ≥ 16 px teckenstorlek (förhindrar zoom på iOS).
- Lighthouse-mål: ≥ 90 på alla fyra.

## Bilder i `assets/img/`

Används: `hero-temp.jpg`, `mingel-oktoberfest.jpg`, `middag.jpg`, `musicquiz.jpg`, `kvall.jpg`, `daniel-portratt.jpg`, `bg-gold-navy-rot.png` (erbjudande), `bg-upplagg.png` (upplägg), `bg-referenser.png` (referenser). De två sista är identiska.
Reserv/alternativ: `bg-gold-navy.png`, `bg-guld-lopande.png`, `guldkavaj.jpg`, `mingel.jpg` (identisk med mingel-oktoberfest).
Fler originalfoton (fotografering, Oktoberfest m.m.) finns i projektets ursprungliga zip under `uploads/`.
