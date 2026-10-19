/* Daniel Alleved: interaktioner (mobilmeny, info-modal, kopiera, marquee, karusell, formulär) */

/* ------------------------------------------------------------------
   INSTÄLLNINGAR
   FORM_ENDPOINT: adressen formuläret skickas till, t.ex. en Formspree-adress
   ("https://formspree.io/f/abcdwxyz"). Så länge den är tom öppnas besökarens
   e-postprogram med förfrågan ifylld och adresserad till CONTACT_EMAIL.
   ------------------------------------------------------------------ */
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = 'kontakt@danielalleved.se';

/* Texter till "?"-knapparna i formuläret */
const INFO = {
  mingel: ['Mingel', 'Jag memorerar gästernas namn under mingelmomentet och skapar en personlig kontakt med varje gäst redan innan kvällen börjar på riktigt.'],
  middag: ['Middagsunderhållning', 'Medan ni äter håller jag i stämningen — bakgrundsmusik, presentationer och nöjesvärdskap. Jag går runt bland borden och pratar med gästerna genom hela middagen.'],
  quiz: ['Music quiz', '50–100 olika moment att välja bland. Exempel: "Spännande utmaningar" — alla som sjunger med i låten får poäng. "Dansbandskampen" — alla som dansar med i kategorin poängsätts.'],
  kvall: ['Kvällsunderhållning', 'Jag bjuder in till allsång, dans och andra upptåg — och plockar fram saxofonen vid kvällens höjdpunkter.'],
  eldshow: ['Eldshow på kvällen', '[Beskriv eldshowen här — längd, upplägg och vad som krävs av lokalen.]'],
  liveband: ['Ett till liveband', '[Beskriv tillägget med ett extra liveband här — sättning, genre och längd på set.]'],
  styltgang: ['Mingel med styltgång', '[Beskriv styltgången under minglet här.]'],
  eldmingel: ['Eld-mingel vid entré', '[Beskriv eld-minglet vid entrén här.]']
};

const mobileQuery = window.matchMedia('(max-width: 820px)');

/* ---------- Mobilmeny ---------- */
(function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobilmeny');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
    menu.hidden = !open;
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  mobileQuery.addEventListener('change', () => setOpen(false));
})();

/* ---------- Info-modal ---------- */
(function initInfoModal() {
  const dialog = document.getElementById('info-modal');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const title = document.getElementById('info-title');
  const text = document.getElementById('info-text');
  let opener = null;

  document.querySelectorAll('[data-info]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = INFO[btn.dataset.info];
      if (!item) return;
      opener = btn;
      title.textContent = item[0];
      text.textContent = item[1];
      dialog.showModal();
    });
  });

  dialog.querySelector('.info-modal__close').addEventListener('click', () => dialog.close());
  // Klick på bakgrunden (utanför panelen) stänger
  dialog.addEventListener('click', (e) => {
    if (!e.target.closest('.info-modal__panel')) dialog.close();
  });
  // Esc hanteras av <dialog>; återställ fokus när den stängs
  dialog.addEventListener('close', () => {
    if (opener) opener.focus();
  });
})();

/* ---------- Kopiera e-post / telefon ---------- */
(function initCopy() {
  const status = document.getElementById('copy-status');
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    let timer;
    btn.addEventListener('click', () => {
      if (!navigator.clipboard || !navigator.clipboard.writeText) return;
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        btn.classList.add('is-copied');
        if (status) status.textContent = 'Kopierat: ' + btn.dataset.copy;
        clearTimeout(timer);
        timer = setTimeout(() => {
          btn.classList.remove('is-copied');
          if (status) status.textContent = '';
        }, 1800);
      }, () => {});
    });
  });
})();

/* ---------- Marquee: duplicera innehållet för sömlös loop ---------- */
(function initMarquees() {
  document.querySelectorAll('[data-marquee] .marquee__track').forEach((track) => {
    Array.from(track.children).forEach((child) => {
      const clone = child.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('data-clone', '');
      track.appendChild(clone);
    });
  });
})();

/* ---------- Prickindikator för citatkarusellen (mobil) ---------- */
(function initCarouselDots() {
  const scroller = document.querySelector('.quotes');
  const dotsWrap = document.querySelector('.carousel-dots');
  if (!scroller || !dotsWrap) return;
  const cards = Array.from(scroller.querySelectorAll('.quote-card:not([data-clone])'));
  const dots = cards.map(() => dotsWrap.appendChild(document.createElement('span')));

  const update = () => {
    const left = scroller.scrollLeft;
    let active = 0;
    let best = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft - scroller.offsetLeft - left - parseFloat(getComputedStyle(scroller).paddingLeft));
      if (d < best) { best = d; active = i; }
    });
    // Sista kortet kan inte snäppa till vänsterkanten; välj det när vi nått slutet
    if (left + scroller.clientWidth >= scroller.scrollWidth - 2) active = cards.length - 1;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === active));
  };

  let raf;
  scroller.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
})();

/* ---------- Offertformulär ---------- */
(function initForm() {
  const form = document.getElementById('offertformular');
  const thanks = document.getElementById('tack');
  if (!form) return;
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('[type="submit"]');

  const required = [
    { input: form.elements.namn, valid: (v) => v.trim().length > 0 },
    { input: form.elements.epost, valid: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }
  ];

  const validateField = ({ input, valid }) => {
    const ok = valid(input.value);
    const error = document.getElementById(input.getAttribute('aria-describedby'));
    input.setAttribute('aria-invalid', String(!ok));
    if (error) error.hidden = ok;
    return ok;
  };

  required.forEach((field) => {
    field.input.addEventListener('blur', () => {
      if (field.input.value) validateField(field);
    });
    field.input.addEventListener('input', () => {
      if (field.input.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  const showThanks = () => {
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
  };

  // Bygger en läsbar sammanställning av förfrågan (används för mejl-läget)
  const summarize = (data) => {
    const rows = [
      ['Namn', data.get('namn')],
      ['E-post', data.get('epost')],
      ['Telefon', data.get('telefon')],
      ['Antal gäster', data.get('antal')],
      ['Datum', data.get('datum')],
      ['Plats', data.get('plats')],
      ['Aktiv tid', [data.get('tid_fran'), data.get('tid_till')].filter(Boolean).join('–')],
      ['Intresserad av', data.getAll('tjanster').join(', ')],
      ['Kompletterande underhållning', data.getAll('tillagg').join(', ')],
      ['Övrigt', data.get('ovrigt')]
    ];
    return rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';

    const results = required.map(validateField);
    const firstInvalid = required.find((_, i) => !results[i]);
    if (firstInvalid) {
      firstInvalid.input.focus();
      return;
    }

    const data = new FormData(form);

    if (!FORM_ENDPOINT) {
      const subject = `Offertförfrågan från ${data.get('namn')}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summarize(data))}`;
      showThanks();
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Skickar…';
    try {
      // Kryssrutor med samma namn slås ihop till en kommaseparerad rad
      const payload = {};
      for (const key of new Set(data.keys())) payload[key] = data.getAll(key).join(', ');
      payload._subject = `Offertförfrågan från ${payload.namn}`;
      payload._replyto = payload.epost;

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(res.status);
      showThanks();
    } catch (err) {
      status.innerHTML = `Något gick fel när förfrågan skulle skickas. Försök igen eller mejla direkt till <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`;
    } finally {
      submit.disabled = false;
      submit.textContent = 'Skicka förfrågan';
    }
  });
})();

/* ---------- Årtal i footern ---------- */
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
