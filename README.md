# danielalleved.se

One-page-sajt för Daniel Alleved, nöjesvärd och konferencier. Byggd från den godkända designen i [`design-handoff/`](design-handoff/) (desktop ≥ 821 px, mobil ≤ 820 px).

Sajten är ren HTML, CSS och JavaScript utan byggsteg, så den kan läggas upp direkt på GitHub Pages, Netlify eller vilket webbhotell som helst.

## Struktur

| Sökväg | Vad |
|---|---|
| `index.html` | Hela sidan: alla sektioner, SEO-taggar och JSON-LD |
| `css/tokens.css` | Färger, typsnitt och mått från designen |
| `css/style.css` | All layout; mobilanpassningen ligger i `@media (max-width: 820px)` |
| `js/main.js` | Mobilmeny, info-modal, kopiera-knappar, marquee, karusell och formulär |
| `assets/img/` | Komprimerade WebP-bilder (genererade) och OG-bild |
| `scripts/optimize_images.py` | Gör om originalbilder till WebP: `python3 scripts/optimize_images.py design-handoff/assets/img` |
| `design-handoff/` | Originaldesign, spec och originalbilder (referens, används inte av sajten) |

## Titta lokalt

Öppna `index.html` i webbläsaren, eller starta en liten server:

```sh
python3 -m http.server 8000
# gå till http://localhost:8000
```

## Publicera på Loopia

Sajten laddas upp automatiskt till Loopia-webbhotellet via FTP varje gång något ändras på `main` (se `.github/workflows/deploy-loopia.yml`). Bara själva sajten skickas upp; `design-handoff/`, `scripts/` och README stannar på GitHub.

Engångsinställning:

1. **Loopia Kundzon:** se till att danielalleved.se är kopplad till webbhotellet och slå på SSL-certifikat (gratis Let's Encrypt). Ta fram FTP-användarnamn och lösenord (under FTP-konton eller webbhotellets inställningar).
2. **GitHub:** gå till *Settings → Secrets and variables → Actions → New repository secret* och lägg till
   - `LOOPIA_FTP_USER`: FTP-användarnamnet
   - `LOOPIA_FTP_PASSWORD`: FTP-lösenordet
   - `LOOPIA_FTP_DIR` (bara om sajten ska ligga någon annanstans än `/danielalleved.se/public_html/`)
3. Gå till fliken *Actions → Publicera till Loopia → Run workflow* för att ladda upp första gången.

HTTPS slås på med "Tvinga SSL" under domänens inställningar i Loopia Kundzon (när SSL-certifikatet är aktivt).

## Kontaktformuläret

I `js/main.js` finns `FORM_ENDPOINT` högst upp. Så länge den är tom öppnar formuläret besökarens e-postprogram med förfrågan ifylld till info@danielalleved.se.

För att få förfrågningar skickade direkt (rekommenderas), t.ex. med [Formspree](https://formspree.io):

1. Skapa ett gratiskonto och ett formulär som skickar till info@danielalleved.se.
2. Kopiera formulärets adress (ser ut som `https://formspree.io/f/abcdwxyz`).
3. Klistra in den: `const FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';`

## Kvar att göra (platshållare)

- [ ] **Hero-video** (valfritt): byt bilden mot en video (instruktion finns som kommentar i `index.html`).
- [ ] **Referenscitat**: alla kort säger "[Klistra in en längre skriftlig referens här.]".
- [ ] **Kundlogotyper**: nu bara text.
- [ ] Kontrollera att `@danielalleved` på Instagram stämmer.

## SEO

- `<title>`, meta description, Open Graph och strukturerad data (JSON-LD: WebSite, Person, EntertainmentBusiness) ligger i `<head>` i `index.html`.
- `robots.txt` och `sitemap.xml` ligger i roten. Uppdatera `<lastmod>` i sitemap när innehållet ändras mycket.
