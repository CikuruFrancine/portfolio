/* =====================================================================
   Portfolio — Francine Cikuru Cishibanji
   Script principal (aucune dépendance hors Bootstrap 5)
   Les données (coordonnées, projets…) proviennent de js/config.js
   ===================================================================== */
(function () {
  'use strict';

  const CFG = window.PORTFOLIO_CONFIG || {};
  const C = CFG.contact || {};
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Utilitaires de liens de contact
     ------------------------------------------------------------------ */
  const digits = (v) => String(v || '').replace(/\D/g, '');
  const isHttpUrl = (u) => /^https:\/\/[^\s]+$/i.test(String(u || '').trim());
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());

  const has = {
    email: isEmail(C.email),
    whatsapp: digits(C.whatsapp).length >= 8,
    telephone: digits(C.telephone).length >= 8
  };

  function mailtoUrl(subject, body) {
    const b = String(body || '').slice(0, 1800); // limite prudente pour les clients de messagerie
    return 'mailto:' + C.email.trim() + '?subject=' + encodeURIComponent(subject || '') + '&body=' + encodeURIComponent(b);
  }
  function waUrl(text) {
    return 'https://wa.me/' + digits(C.whatsapp) + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  function telUrl() { return 'tel:+' + digits(C.telephone); }
  function prettyPhone(n) {
    const d = digits(n);
    return '+' + d.replace(/^(\d{3})(\d{2,3})(\d{3})(\d+)$/, '$1 $2 $3 $4');
  }

  /* ------------------------------------------------------------------
     Coordonnées & réseaux (masqués s'ils ne sont pas configurés)
     ------------------------------------------------------------------ */
  function initContacts() {
    $$('[data-contact="email"]').forEach((a) => {
      if (!has.email) return;
      a.href = mailtoUrl(C.objetEmail, C.messageEmail);
      a.hidden = false;
    });
    $$('[data-contact="whatsapp"]').forEach((a) => {
      if (!has.whatsapp) return;
      a.href = waUrl(C.messageWhatsApp);
      a.hidden = false;
    });
    $$('[data-contact="telephone"]').forEach((a) => {
      if (!has.telephone) return;
      a.href = telUrl();
      a.hidden = false;
    });
    $$('[data-fill="email"]').forEach((el) => { el.textContent = has.email ? C.email.trim() : ''; });
    $$('[data-fill="telephone"]').forEach((el) => { el.textContent = has.telephone ? prettyPhone(C.telephone) : ''; });

    if (!has.email && !has.whatsapp && !has.telephone) $('#contactConfigNote').hidden = false;
    if (!has.whatsapp) {
      document.body.classList.add('no-wa');
      $$('[data-requires="whatsapp"]').forEach((el) => { el.hidden = true; });
    }

    const R = CFG.reseaux || {};
    ['github', 'linkedin'].forEach((k) => {
      $$('[data-social="' + k + '"]').forEach((a) => {
        if (!isHttpUrl(R[k])) return;
        a.href = R[k].trim();
        a.hidden = false;
      });
    });
  }

  /* ------------------------------------------------------------------
     Thème clair / sombre
     ------------------------------------------------------------------ */
  function initTheme() {
    const btn = $('#themeToggle');
    const root = document.documentElement;
    const sync = () => {
      const dark = root.getAttribute('data-bs-theme') === 'dark';
      btn.innerHTML = dark ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>' : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
      btn.setAttribute('aria-label', dark ? 'Activer le mode clair' : 'Activer le mode sombre');
      btn.setAttribute('aria-pressed', String(dark));
    };
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-bs-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* stockage indisponible */ }
      sync();
    });
    sync();
  }

  /* ------------------------------------------------------------------
     Navigation : fond au défilement, menu mobile, lien actif
     ------------------------------------------------------------------ */
  function initNav() {
    const nav = $('#mainNav');
    const toTop = $('#toTop');
    const collapseEl = $('#navLinks');
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 30);
      toTop.classList.toggle('show', y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Le menu mobile se referme après un clic sur un lien
    $$('#navLinks a').forEach((a) => a.addEventListener('click', () => {
      if (collapseEl.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
    }));
    // ... ou en cliquant ailleurs
    document.addEventListener('click', (e) => {
      if (collapseEl.classList.contains('show') && !nav.contains(e.target)) bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
    });
    collapseEl.addEventListener('show.bs.collapse', () => nav.classList.add('scrolled'));
    collapseEl.addEventListener('hidden.bs.collapse', onScroll);

    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // Lien actif selon la section visible
    const links = $$('#navLinks .nav-link');
    const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => {
          const on = l.getAttribute('href') === '#' + en.target.id;
          l.classList.toggle('active', on);
          if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  /* ------------------------------------------------------------------
     Texte rotatif de l'accueil
     ------------------------------------------------------------------ */
  function initRotator() {
    const el = $('#rotator');
    if (!el || reduceMotion) return;
    const words = ['des sites web professionnels', 'des applications de gestion', 'des bases de données fiables', 'des logiciels de facturation'];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-6px)' }], { duration: 250, fill: 'forwards' })
        .onfinish = () => {
          el.textContent = words[i];
          el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 300, fill: 'forwards' });
        };
    }, 2800);
  }

  /* ------------------------------------------------------------------
     Apparition au défilement
     ------------------------------------------------------------------ */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) { items.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el, idx) => {
      el.style.transitionDelay = (idx % 4) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     Projets : cartes, filtres, modale, galerie
     ------------------------------------------------------------------ */
  const CAT_LABEL = { gestion: 'Gestion commerciale', transport: 'Transport & mobilité', web: 'Sites web' };
  const projects = Array.isArray(CFG.projets) ? CFG.projets : [];

  function el(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (v === undefined || v === null || v === false) return;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v; // uniquement pour des icônes statiques
      else n.setAttribute(k, v === true ? '' : v);
    });
    [].concat(children).forEach((c) => c && n.appendChild(c));
    return n;
  }
  const icon = (cls) => el('i', { class: cls, 'aria-hidden': 'true' });

  function projectLinks(p, { inModal = false } = {}) {
    const frag = document.createDocumentFragment();
    if (isHttpUrl(p.demo)) {
      frag.appendChild(el('a', { class: 'btn btn-gradient', href: p.demo, target: '_blank', rel: 'noopener noreferrer' },
        [icon('fa-solid fa-play me-2'), document.createTextNode('Démonstration')]));
    }
    if (isHttpUrl(p.code)) {
      frag.appendChild(el('a', { class: 'btn btn-soft', href: p.code, target: '_blank', rel: 'noopener noreferrer' },
        [icon('fa-brands fa-github me-2'), document.createTextNode('Code source')]));
    }
    if (!isHttpUrl(p.demo) && !isHttpUrl(p.code) && inModal) {
      const b = el('button', { type: 'button', class: 'btn btn-soft', 'data-present': p.id },
        [icon('fa-regular fa-calendar-check me-2'), document.createTextNode('Demander une présentation')]);
      frag.appendChild(b);
    }
    return frag;
  }

  function renderProjects() {
    const grid = $('#projectGrid');
    projects.forEach((p) => {
      const cover = el('button', { type: 'button', class: 'project-cover' + (p.illustratif ? '' : ' is-real'), 'data-open': p.id, 'aria-label': 'Voir les détails : ' + p.titre }, [
        el('img', { src: p.captures[0], alt: 'Aperçu du projet ' + p.titre, loading: 'lazy', width: '1280', height: '800' }),
        el('span', { class: 'cover-cat', text: CAT_LABEL[p.categorie] || p.categorie }),
        p.illustratif ? el('span', { class: 'badge-illus', text: 'Aperçu illustratif' }) : null
      ]);
      const tags = el('div', { class: 'tech-tags' }, p.technologies.map((t) => el('span', { text: t })));
      const actions = el('div', { class: 'project-actions' }, [
        el('button', { type: 'button', class: 'btn btn-gradient', 'data-open': p.id }, [icon('fa-regular fa-eye me-2'), document.createTextNode('Voir les détails')])
      ]);
      actions.appendChild(projectLinks(p));
      const card = el('article', { class: 'project-card' }, [
        cover,
        el('div', { class: 'project-body' }, [el('h3', { text: p.titre }), el('p', { text: p.resume }), tags, actions])
      ]);
      grid.appendChild(el('div', { class: 'col-md-6 project-col', 'data-category': p.categorie }, [card]));
    });

    grid.addEventListener('click', (e) => {
      const t = e.target.closest('[data-open]');
      if (t) openProject(t.getAttribute('data-open'), t);
    });
  }

  function initFilters() {
    const btns = $$('.filter-btn');
    const empty = $('#projectEmpty');
    btns.forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.filter;
      btns.forEach((x) => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
      let visible = 0;
      $$('.project-col').forEach((col) => {
        const show = f === 'all' || col.dataset.category === f;
        if (show) visible++;
        if (show) {
          col.hidden = false;
          requestAnimationFrame(() => col.classList.remove('is-hiding'));
        } else {
          col.classList.add('is-hiding');
          setTimeout(() => { if (col.classList.contains('is-hiding')) col.hidden = true; }, reduceMotion ? 0 : 320);
        }
      });
      empty.classList.toggle('d-none', visible > 0);
    }));
  }

  let modal, currentProject = null, currentIndex = 0;

  function setMainImage(i) {
    const p = currentProject;
    currentIndex = i;
    const img = $('#galleryMainImg');
    img.src = p.captures[i];
    img.alt = p.titre + ' — écran ' + (i + 1) + ' sur ' + p.captures.length + (p.illustratif ? ' (aperçu illustratif)' : '');
    $$('#galleryThumbs button').forEach((b, idx) => b.setAttribute('aria-current', String(idx === i)));
  }

  function openProject(id) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    currentProject = p;
    $('#projectModalCat').textContent = CAT_LABEL[p.categorie] || '';
    $('#projectModalTitle').textContent = p.titre;
    $('#projectModalDesc').textContent = p.description;
    const fl = $('#projectModalFeatures'); fl.replaceChildren(...p.fonctionnalites.map((f) => el('li', { text: f })));
    const tt = $('#projectModalTech'); tt.replaceChildren(...p.technologies.map((t) => el('span', { text: t })));
    const lk = $('#projectModalLinks'); lk.replaceChildren(projectLinks(p, { inModal: true }));
    $('#galleryBadge').hidden = !p.illustratif;
    $('#galleryMain').classList.toggle('is-real', !p.illustratif);
    $('#projectModalNote').textContent = p.illustratif
      ? 'Les visuels présentés sont des aperçus illustratifs de l\'interface. Une présentation de l\'application peut être organisée sur demande.'
      : '';

    const thumbs = $('#galleryThumbs');
    thumbs.style.gridTemplateColumns = 'repeat(' + Math.max(p.captures.length, 2) + ', 1fr)';
    thumbs.replaceChildren(...p.captures.map((src, i) => {
      const b = el('button', { type: 'button', role: 'listitem', 'aria-label': 'Afficher l\'écran ' + (i + 1) }, [el('img', { src, alt: '', loading: 'lazy' })]);
      b.addEventListener('click', () => setMainImage(i));
      return b;
    }));
    setMainImage(0);
    modal.show();
  }

  function initProjectModal() {
    const mEl = $('#projectModal');
    modal = new bootstrap.Modal(mEl);
    $('#galleryMain').addEventListener('click', () => {
      const p = currentProject;
      Lightbox.open(p.captures, currentIndex, (i) => p.titre + ' — écran ' + (i + 1) + ' / ' + p.captures.length + (p.illustratif ? ' · aperçu illustratif' : ''), mEl);
    });
    // « Demander une présentation » : pré-remplit le formulaire de contact
    mEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-present]');
      if (!b) return;
      const p = projects.find((x) => x.id === b.dataset.present);
      mEl.addEventListener('hidden.bs.modal', () => {
        $('#cSubject').value = 'Présentation du projet : ' + p.titre;
        $('#cType').value = "Demande d'information";
        $('#cMessage').value = 'Bonjour Francine,\n\nJe souhaiterais avoir une présentation de votre projet « ' + p.titre + ' ».\n\n';
        $('#cMessage').dispatchEvent(new Event('input'));
        scrollToEl('#contact', '#cName');
      }, { once: true });
      modal.hide();
    });
  }

  /* ------------------------------------------------------------------
     Visionneuse d'images (agrandissement + navigation)
     ------------------------------------------------------------------ */
  const Lightbox = (function () {
    const box = $('#lightbox'), img = $('#lbImg'), cap = $('#lbCaption');
    let list = [], idx = 0, captionFn = null, opener = null, touchX = null;

    function show(i) {
      idx = (i + list.length) % list.length;
      img.src = list[idx];
      const c = captionFn ? captionFn(idx) : '';
      img.alt = c; cap.textContent = c;
      const multi = list.length > 1;
      $('#lbPrev').hidden = !multi; $('#lbNext').hidden = !multi;
    }
    function open(images, start, capFn, container) {
      list = images; captionFn = capFn; opener = document.activeElement;
      (container || document.body).appendChild(box); // dans la modale, pour rester compatible avec son piège à focus
      box.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      show(start || 0);
      $('#lbClose').focus();
    }
    function close() {
      box.hidden = true;
      if (!document.querySelector('.modal.show')) document.documentElement.style.overflow = '';
      if (opener && opener.focus) opener.focus();
    }
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', () => show(idx - 1));
    $('#lbNext').addEventListener('click', () => show(idx + 1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'Tab') { // garde le focus dans la visionneuse
        const f = $$('.lb-btn', box).filter((b) => !b.hidden);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    box.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      touchX = null;
    });
    return { open, close };
  })();

  /* ------------------------------------------------------------------
     Formulaires : validation, envoi réel, WhatsApp
     ------------------------------------------------------------------ */
  function feedbackFor(ctrl) {
    const col = ctrl.closest('[class*="col-"]') || ctrl.parentElement;
    return col ? col.querySelector('.invalid-feedback') : null;
  }
  function validateField(ctrl) {
    const v = ctrl.value.trim();
    let ok = true;
    if (ctrl.required && !v) ok = false;
    if (ok && v && ctrl.minLength > 0 && v.length < ctrl.minLength) ok = false;
    if (ok && v && ctrl.maxLength > 0 && v.length > ctrl.maxLength) ok = false;
    if (ok && v && ctrl.type === 'email' && !isEmail(v)) ok = false;
    ctrl.classList.toggle('is-invalid', !ok);
    ctrl.classList.toggle('is-valid', ok && !!v);
    ctrl.setAttribute('aria-invalid', String(!ok));
    const fb = feedbackFor(ctrl);
    if (fb) {
      if (!fb.id) fb.id = ctrl.id + '-error';
      fb.classList.toggle('d-block', !ok);
      if (!ok) ctrl.setAttribute('aria-describedby', fb.id); else ctrl.removeAttribute('aria-describedby');
    }
    return ok;
  }
  function validateForm(form) {
    const ctrls = $$('input:not([name="_gotcha"]), select, textarea', form);
    let firstBad = null;
    ctrls.forEach((c) => { if (!validateField(c) && !firstBad) firstBad = c; });
    form.dataset.touched = '1';
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  function data(form) {
    const o = {};
    new FormData(form).forEach((v, k) => { o[k] = String(v).trim(); });
    return o;
  }

  function setStatus(form, type, iconCls, text, actions = []) {
    const box = $('.form-status', form);
    box.className = 'form-status is-' + type;
    const content = el('div', {}, [el('div', { text })]);
    if (actions.length) content.appendChild(el('div', { class: 'status-actions' }, actions));
    box.replaceChildren(icon(iconCls), content);
  }
  function clearStatus(form) { const b = $('.form-status', form); b.className = 'form-status'; b.replaceChildren(); }

  function composeText(kind, d) {
    if (kind === 'devis') {
      return {
        subject: 'Demande de devis — ' + d.service,
        body: 'Bonjour Francine,\n\nJe souhaite obtenir un devis.\n\n' +
          '• Nom : ' + d.nom + '\n• E-mail : ' + d.email + '\n• Service souhaité : ' + d.service + '\n' +
          (d.budget ? '• Budget indicatif : ' + d.budget + '\n' : '') +
          '\nDescription du projet :\n' + d.description + '\n\nMerci et à bientôt.'
      };
    }
    return {
      subject: d.objet + ' [' + d.type + ']',
      body: d.message + '\n\n—\n' + d.nom + '\n' + d.email
    };
  }

  function fallbackActions(kind, d) {
    const t = composeText(kind, d);
    const acts = [];
    if (has.email) acts.push(el('a', { class: 'btn btn-gradient btn-sm', href: mailtoUrl(t.subject, t.body) }, [icon('fa-regular fa-envelope me-2'), document.createTextNode('Envoyer via ma messagerie')]));
    if (has.whatsapp) acts.push(el('a', { class: 'btn btn-whatsapp btn-sm', href: waUrl(t.subject + '\n\n' + t.body), target: '_blank', rel: 'noopener noreferrer' }, [icon('fa-brands fa-whatsapp me-2'), document.createTextNode('Envoyer via WhatsApp')]));
    return acts;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const kind = form.dataset.kind;
    clearStatus(form);
    if (!validateForm(form)) {
      setStatus(form, 'error', 'fa-solid fa-triangle-exclamation', 'Veuillez corriger les champs signalés avant d\'envoyer.');
      return;
    }
    const d = data(form);
    if (d._gotcha) return; // robot détecté : aucun envoi

    const endpoint = String((CFG.formulaires || {}).endpoint || '').trim();
    if (!/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint)) {
      const acts = fallbackActions(kind, d);
      setStatus(form, 'info', 'fa-solid fa-circle-info',
        'L\'envoi en ligne n\'est pas encore activé sur ce site : votre message n\'a pas été envoyé.' +
        (acts.length ? ' Vous pouvez le transmettre directement avec l\'un des boutons ci-dessous (votre texte est déjà prérempli).' : ' Merci de réessayer ultérieurement.'),
        acts);
      return;
    }
    if (!navigator.onLine) {
      setStatus(form, 'error', 'fa-solid fa-wifi', 'Vous semblez hors connexion : le message n\'a pas été envoyé. Vérifiez votre connexion puis réessayez.', fallbackActions(kind, d));
      return;
    }

    const btn = $('button[type="submit"]', form);
    const label = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Envoi en cours…';
    const t = composeText(kind, d);
    const fd = new FormData(form);
    fd.append('_subject', t.subject);
    fd.append('formulaire', kind === 'devis' ? 'Demande de devis' : 'Contact');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        $$('.is-valid, .is-invalid', form).forEach((c) => c.classList.remove('is-valid', 'is-invalid'));
        $$('.char-count', form).forEach(updateCount);
        delete form.dataset.touched;
        setStatus(form, 'success', 'fa-solid fa-circle-check', kind === 'devis'
          ? 'Merci ! Votre demande de devis a bien été transmise. Nous vous répondrons à l\'adresse indiquée.'
          : 'Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.');
      } else {
        let msg = 'Le serveur d\'envoi a refusé la demande (code ' + res.status + ') : votre message n\'a pas été envoyé.';
        try { const j = await res.json(); if (j && j.errors && j.errors[0] && j.errors[0].message) msg += ' Détail : ' + j.errors[0].message; } catch (_) { /* réponse non JSON */ }
        setStatus(form, 'error', 'fa-solid fa-triangle-exclamation', msg, fallbackActions(kind, d));
      }
    } catch (err) {
      setStatus(form, 'error', 'fa-solid fa-triangle-exclamation', 'Impossible de joindre le service d\'envoi : votre message n\'a pas été envoyé. Réessayez ou utilisez un contact direct.', fallbackActions(kind, d));
    } finally {
      btn.disabled = false;
      btn.innerHTML = label;
    }
  }

  function updateCount(counter) {
    const ctrl = document.getElementById(counter.dataset.for);
    if (ctrl) counter.textContent = ctrl.value.length + ' / ' + ctrl.maxLength;
  }

  function initForms() {
    $$('form[data-kind]').forEach((form) => {
      form.addEventListener('submit', handleSubmit);
      $$('input, select, textarea', form).forEach((c) => {
        const live = () => { if (form.dataset.touched) validateField(c); };
        c.addEventListener('input', live);
        c.addEventListener('change', live);
        c.addEventListener('blur', () => { if (c.value.trim()) validateField(c); });
      });
    });
    $$('.char-count').forEach((cnt) => {
      const ctrl = document.getElementById(cnt.dataset.for);
      ctrl.addEventListener('input', () => updateCount(cnt));
      updateCount(cnt);
    });

    // Devis → WhatsApp : vérification puis récapitulatif avant ouverture
    const waModal = new bootstrap.Modal($('#waModal'));
    $('#quoteWhatsApp').addEventListener('click', () => {
      const form = $('#quoteForm');
      clearStatus(form);
      if (!validateForm(form)) {
        setStatus(form, 'error', 'fa-solid fa-triangle-exclamation', 'Complétez les champs signalés pour préparer votre demande WhatsApp.');
        return;
      }
      const t = composeText('devis', data(form));
      const msg = '*' + t.subject + '*\n\n' + t.body;
      $('#waPreview').textContent = msg;
      $('#waConfirm').href = waUrl(msg);
      waModal.show();
    });
    $('#waConfirm').addEventListener('click', () => waModal.hide());

    // Boutons « Demander un devis » des services
    $$('[data-quote]').forEach((b) => b.addEventListener('click', () => {
      const sel = $('#qService');
      sel.value = b.dataset.quote;
      if ($('#quoteForm').dataset.touched) validateField(sel);
      scrollToEl('#devis', '#qName');
    }));
  }

  function scrollToEl(sel, focusSel) {
    const target = $(sel);
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (focusSel) setTimeout(() => $(focusSel).focus({ preventScroll: true }), reduceMotion ? 0 : 650);
  }

  /* ------------------------------------------------------------------
     Démarrage
     ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    $('#year').textContent = new Date().getFullYear();
    initContacts();
    initTheme();
    initNav();
    initRotator();
    renderProjects();
    initFilters();
    initProjectModal();
    initForms();
    initReveal();
  });
})();
