/* ============================================================
   PH Help Center — page logic (vanilla JS, no dependencies)
   Pages: category (index.html) / product (pN/index.html) / contact
   v1.6: collapsible sections + batch collapse + sticky chip nav +
         numbering + email channel + videos removed from category page.
   The go/viber fallback page is standalone and does NOT use this file.
   ============================================================ */
(function () {
  'use strict';

  var LANG_KEY = 'phc_lang';
  var PRODUCT_KEY = 'phc_product';     // last product page visited (for contact prefill)
  var ISSUE_KEY = 'phc_issue';         // wizard path taken (session-scoped)

  var state = {
    lang: 'en',
    page: 'category',                  // category | product | contact
    product: null,                     // product id when page=product
    wizard: null,                      // { tid, nodeId, path: [labels] }
    searchIndex: []
  };

  /* ── tiny helpers ─────────────────────────────────────── */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function t(key) { return (window.PHC.ui && window.PHC.ui[key]) || key; }

  /* data files store asset paths relative to the site root; product/contact
     pages live one level deeper, so prefix accordingly (v1.8 fix) */
  function asset(path) {
    if (!path) return path;
    return (state.page === 'category' ? '' : '../') + path;
  }

  function productById(id) {
    return window.PHC.products.filter(function (p) { return p.id === id; })[0] || null;
  }
  function productName(id) {
    var p = productById(id);
    return p ? p.name : id;
  }

  /* ── collapse state (v1.10: session-only, never persisted —
        every page load starts with all sections expanded) ──── */
  var collapsedNow = {};                 // id -> true
  function getCollapsed() {
    return Object.keys(collapsedNow);
  }
  function setCollapsedIds(ids) {
    collapsedNow = {};
    ids.forEach(function (id) { collapsedNow[id] = true; });
  }

  /* ── data access filtered for the current page ────────── */
  function pageProducts() {
    if (state.page === 'product' && state.product) {
      return window.PHC.products.filter(function (p) { return p.id === state.product; });
    }
    return window.PHC.products;
  }
  function pageFaq() {
    var pid = state.page === 'product' ? state.product : null;
    return window.PHC.faq.filter(function (f) {
      return !pid || f.productIds.length === 0 || f.productIds.indexOf(pid) !== -1;
    });
  }
  function pageWizard() {
    var pid = state.page === 'product' ? state.product : null;
    return window.PHC.troubleshoot.filter(function (tr) {
      return !pid || tr.productIds.length === 0 || tr.productIds.indexOf(pid) !== -1;
    });
  }
  function pageVideos() {
    var pid = state.page === 'product' ? state.product : null;
    return window.PHC.videos.filter(function (v) {
      return !pid || v.productIds.length === 0 || v.productIds.indexOf(pid) !== -1;
    });
  }

  /* ── collapsible section (v1.6) ───────────────────────── */
  function collapsibleSection(id, title, children) {
    var collapsed = getCollapsed().indexOf(id) !== -1;
    var sec = el('section', { class: 'collapsible', 'data-sec': id, 'data-title': title,
      'data-open': collapsed ? 'false' : 'true', id: id });
    var head = el('button', { type: 'button', class: 'sec-head',
      'aria-expanded': collapsed ? 'false' : 'true', 'aria-controls': id + '-body' });
    head.appendChild(el('h2', { text: title }));
    head.appendChild(el('span', { class: 'chev', text: '▸', 'aria-hidden': 'true' }));
    head.addEventListener('click', function () {
      setSectionOpen(sec, sec.getAttribute('data-open') !== 'true');
    });
    var body = el('div', { class: 'sec-body', id: id + '-body' });
    children.forEach(function (c) { if (c) body.appendChild(c); });
    sec.appendChild(head);
    sec.appendChild(body);
    return sec;
  }

  function setSectionOpen(sec, open) {
    sec.setAttribute('data-open', open ? 'true' : 'false');
    var head = sec.querySelector(':scope > .sec-head, :scope > .faq-group-head');
    if (head) head.setAttribute('aria-expanded', open ? 'true' : 'false');
    var ids = getCollapsed();
    var sid = sec.getAttribute('data-sec');
    var at = ids.indexOf(sid);
    if (open && at !== -1) { ids.splice(at, 1); setCollapsedIds(ids); }
    if (!open && at === -1) { ids.push(sid); setCollapsedIds(ids); }
    refreshCollapseAllBtn();
  }

  /* file:// fix (v1.10a): directory URLs do not auto-serve index.html when the
     site is opened from the local disk, so append it there only; published
     sites keep the clean directory URLs (server resolves index.html itself) */
  function navUrl(u) {
    try {
      if (location.protocol === 'file:' && /\/$/.test(u)) return u + 'index.html';
    } catch (e) {}
    return u;
  }

  /* global back: same-site history if we came from this site, else the category page */
  function globalBack(fallback) {
    var sameOrigin = false;
    try {
      sameOrigin = !!document.referrer && new URL(document.referrer).origin === location.origin;
    } catch (e) {}
    if (sameOrigin && history.length > 1) history.back();
    else location.href = navUrl(fallback);
  }

  function sectionAncestor(node) {
    while (node && !(node.classList && node.classList.contains('collapsible'))) {
      node = node.parentElement;
    }
    return node;
  }

  /* ── header: back + title + collapse-all + language toggle + search ── */
  function renderHeader(root, opts) {
    opts = opts || {};
    var phc = window.PHC;
    var current = el('button', { type: 'button', 'aria-pressed': 'true', text: state.lang === 'en' ? 'EN' : 'FIL' });
    var other = el('button', { type: 'button', 'aria-pressed': 'false', text: state.lang === 'en' ? 'FIL' : 'EN',
      onclick: function () { switchLang(state.lang === 'en' ? 'fil' : 'en'); } });
    var toggle = el('div', { class: 'lang-toggle', role: 'group', 'aria-label': 'Language' }, [current, other]);

    var head = el('header', { class: 'site-head' });
    var wrap = el('div', { class: 'wrap head-row' });
    // global back button (v1.7): sits next to the batch-collapse button
    if (opts.showBack) {
      var backBtn = el('button', { type: 'button', class: 'back-btn', 'aria-label': t('backLabel'),
        onclick: function () { globalBack(opts.backFallback || '../'); } });
      backBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      wrap.appendChild(backBtn);
    }
    var h1 = el('h1', { text: phc.meta.category });
    h1.appendChild(el('span', { class: 'tagline', text: phc.meta.tagline }));
    wrap.appendChild(h1);
    if (opts.hasSections) {
      var btn = el('button', { type: 'button', class: 'collapse-all', id: 'collapse-all', 'aria-label': t('collapseAll') });
      btn.innerHTML =
        '<svg class="ic-collapse" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7-7 7 7M5 15l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<svg class="ic-expand" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15l7 7 7-7M5 9l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      btn.addEventListener('click', function () {
        var secs = $all('.collapsible');
        var anyOpen = secs.some(function (s) { return s.getAttribute('data-open') === 'true'; });
        secs.forEach(function (s) { setSectionOpen(s, !anyOpen); });
      });
      wrap.appendChild(btn);
    }
    wrap.appendChild(toggle);
    head.appendChild(wrap);

    // search (F2): product pages only since v1.9 (homepage is just a model picker)
    if (state.page === 'product') {
      var search = el('div', { class: 'search wrap' });
      var input = el('input', { type: 'search', placeholder: t('searchPlaceholder'),
        'aria-label': t('searchPlaceholder'), autocomplete: 'off' });
      search.appendChild(input);
      head.appendChild(search);
      wireSearch(input);
    }
    root.appendChild(head);
  }

  function refreshCollapseAllBtn() {
    var btn = $('#collapse-all');
    if (!btn) return;
    var secs = $all('.collapsible');
    var allClosed = secs.length > 0 && secs.every(function (s) { return s.getAttribute('data-open') === 'false'; });
    btn.setAttribute('data-mode', allClosed ? 'expand' : 'collapse');
    btn.setAttribute('aria-label', allClosed ? t('expandAll') : t('collapseAll'));
  }

  /* ── sticky chip nav (v1.6) ───────────────────────────── */
  function buildSectionNav(afterHeader) {
    if (state.page === 'category') return; // homepage has a single section — no nav (v1.9)
    var secs = $all('.collapsible');
    if (!secs.length) return;
    var nav = el('nav', { class: 'section-nav', 'aria-label': t('sectionNav') });
    var row = el('div', { class: 'wrap chip-row' });
    secs.forEach(function (s) {
      var chip = el('button', { type: 'button', class: 'chip',
        'data-target': s.getAttribute('data-sec'), text: s.getAttribute('data-title') });
      chip.addEventListener('click', function () {
        setSectionOpen(s, true);
        s.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      row.appendChild(chip);
    });
    nav.appendChild(row);
    afterHeader.parentNode.insertBefore(nav, afterHeader.nextSibling);
    positionNav();
    window.addEventListener('resize', positionNav);
    // scroll spy
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          $all('.chip').forEach(function (c) {
            c.classList.toggle('active', c.getAttribute('data-target') === en.target.getAttribute('data-sec'));
          });
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      secs.forEach(function (s) { io.observe(s); });
    }
  }
  function positionNav() {
    var nav = $('.section-nav');
    var head = $('.site-head');
    if (nav && head) {
      nav.style.top = head.offsetHeight + 'px';
      // scroll offset so jumped-to sections clear the sticky header + nav (v1.7 fix)
      document.documentElement.style.setProperty('--sticky-total',
        (head.offsetHeight + nav.offsetHeight) + 'px');
    }
  }

  /* ── search (F2): substring match, tokenized, case-insensitive ── */
  function buildSearchIndex() {
    var idx = [];
    pageProducts().forEach(function (p, i) {
      idx.push({ kind: 'searchProducts', label: (i + 1) + '. ' + p.name, anchor: 'grid-' + p.id,
        hay: (p.name + ' ' + p.short).toLowerCase() });
    });
    pageWizard().forEach(function (tr, i) {
      var hay = tr.symptom.toLowerCase();
      tr.nodes.forEach(function (n) {
        hay += ' ' + (n.question || n.answer || '').toLowerCase();
      });
      idx.push({ kind: 'searchWizard', label: (i + 1) + '. ' + tr.symptom, anchor: 'wz-' + tr.id, hay: hay });
    });
    pageFaq().forEach(function (f, i) {
      idx.push({ kind: 'searchFaq', label: (i + 1) + '. ' + f.q, anchor: 'faq-' + f.id,
        hay: (f.q + ' ' + f.a).toLowerCase() });
    });
    state.searchIndex = idx;
  }

  function wireSearch(input) {
    var list = null;
    function close() { if (list) { list.remove(); list = null; } }
    input.addEventListener('input', function () {
      close();
      var q = input.value.trim().toLowerCase();
      if (!q) return;
      var tokens = q.split(/\s+/);
      var hits = state.searchIndex.filter(function (item) {
        return tokens.every(function (tok) { return item.hay.indexOf(tok) !== -1; });
      }).slice(0, 12);
      list = el('ul', { class: 'search-results', role: 'listbox' });
      if (!hits.length) {
        var li = el('li', {});
        var empty = el('div', { class: 'search-empty', text: t('emptySearch') + ' ' });
        empty.appendChild(el('a', { href: contactUrl(), text: t('contactTitle') }));
        li.appendChild(empty);
        list.appendChild(li);
      } else {
        hits.forEach(function (hit) {
          var btn = el('button', { type: 'button', onclick: function () {
            close(); input.value = '';
            goToAnchor(hit.anchor);
          }});
          btn.appendChild(el('span', { class: 'kind', text: t(hit.kind) }));
          btn.appendChild(document.createTextNode(hit.label));
          list.appendChild(el('li', {}, [btn]));
        });
      }
      input.parentNode.appendChild(list);
    });
    document.addEventListener('click', function (e) {
      if (list && !list.contains(e.target) && e.target !== input) close();
    });
  }

  function goToAnchor(id) {
    // wizard anchors: open that symptom's inline panel (v1.8)
    if (id.indexOf('wz-') === 0 && state.wizardTrees) {
      var tid = id.slice(3);
      var exists = state.wizardTrees.some(function (tr) { return tr.id === tid; });
      if (exists) {
        var wsec = document.getElementById('sec-wizard');
        if (wsec && wsec.getAttribute('data-open') === 'false') setSectionOpen(wsec, true);
        startWizard(tid);
        var wbtn = document.getElementById(id);
        if (wbtn) wbtn.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    var target = document.getElementById(id);
    if (!target) return;
    // make sure the containing section AND faq group are expanded before scrolling (v1.6/v1.7)
    var sec = sectionAncestor(target);
    if (sec && sec.getAttribute('data-open') === 'false') setSectionOpen(sec, true);
    var grp = null;
    try { grp = target.closest('.faq-group[data-sec]'); } catch (e) {}
    if (grp && grp.getAttribute('data-open') === 'false') setSectionOpen(grp, true);
    if (target.classList.contains('faq-item')) setFaqOpen(target, true);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── FAQ accordion (F6) ────────────────────────────────── */
  function setFaqOpen(item, open) {
    item.setAttribute('data-open', open ? 'true' : 'false');
    $('> button', item).setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function renderFaqChildren() {
    var faq = pageFaq();
    var groups = [];
    var counter = 0; // continuous numbering across groups (v1.6)
    window.PHC.groups.forEach(function (g) {
      var items = faq.filter(function (f) { return f.group === g.id; });
      if (!items.length) return;
      counter += 0; // numbering continues across groups
      // group header is itself collapsible (v1.7), persisted with its own id
      var gid = 'faqg-' + g.id;
      var gCollapsed = getCollapsed().indexOf(gid) !== -1;
      var group = el('div', { class: 'faq-group', 'data-sec': gid, 'data-open': gCollapsed ? 'false' : 'true' });
      var gh = el('button', { type: 'button', class: 'faq-group-head',
        'aria-expanded': gCollapsed ? 'false' : 'true', 'aria-controls': gid + '-body' });
      gh.appendChild(el('h3', { text: g.label }));
      gh.appendChild(el('span', { class: 'chev', text: '▸', 'aria-hidden': 'true' }));
      gh.addEventListener('click', function () {
        setSectionOpen(group, group.getAttribute('data-open') !== 'true');
      });
      var gbody = el('div', { class: 'faq-group-body', id: gid + '-body' });
      items.forEach(function (f) {
        counter += 1;
        var btn = el('button', { type: 'button', 'aria-expanded': 'false' });
        btn.appendChild(el('span', { class: 'qtext' }, [
          el('span', { class: 'num', text: counter + '. ' }),
          document.createTextNode(f.q)
        ]));
        btn.appendChild(el('span', { class: 'chev', text: '▸', 'aria-hidden': 'true' }));
        var body = el('div', { class: 'body' });
        body.appendChild(el('p', { class: 'answer-text', text: formatAnswer(f.a) }));
        if (f.productIds && f.productIds.length) {
          var names = f.productIds.map(productName).join(', ');
          body.appendChild(el('p', {}, [el('span', { class: 'tag', text: names })]));
        }
        if (f.videoId) {
          var vid = window.PHC.videos.filter(function (v) { return v.id === f.videoId; })[0];
          if (vid) body.appendChild(videoNode(vid));   // inline mount (F5 #2)
        }
        // v1.8: videos may also bind FROM the video side (videos[].faqId) with productIds
        // scoping — allows several model-specific videos under one shared FAQ entry.
        // Rendered on product pages only, so a video still mounts in exactly one view.
        if (state.page === 'product') {
          var pagePid = state.product;
          window.PHC.videos.forEach(function (v) {
            if (v.faqId !== f.id) return;
            if (f.videoId && v.id === f.videoId) return; // already rendered above
            if (v.productIds.length && v.productIds.indexOf(pagePid) === -1) return;
            var vn = videoNode(v);
            if (vn) body.appendChild(vn);
          });
        }
        var item = el('div', { class: 'faq-item', id: 'faq-' + f.id, 'data-open': 'false' }, [btn, body]);
        btn.addEventListener('click', function () {
          setFaqOpen(item, item.getAttribute('data-open') !== 'true');
        });
        gbody.appendChild(item);
      });
      group.appendChild(gh);
      group.appendChild(gbody);
      groups.push(group);
    });
    return groups;
  }

  /* ── videos (F5): one mount only, youtube lazy / tiktok link ── */
  function videoNode(v) {
    var card = el('div', { class: 'video-card' });
    card.appendChild(el('div', { class: 'vtitle', text: v.title }));
    if (v.youtubeId) {
      var emb = el('div', { class: 'video-embed' });
      var btn = el('button', { type: 'button', 'aria-label': v.title });
      btn.appendChild(el('img', { src: asset(v.poster || 'images/video-placeholder.svg'), alt: '', loading: 'lazy' }));
      var play = el('span', { class: 'play', 'aria-hidden': 'true' });
      play.innerHTML = '<span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>';
      btn.appendChild(play);
      btn.addEventListener('click', function () {
        if (emb.querySelector('iframe')) return;
        var ifr = el('iframe', { src: 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.youtubeId),
          title: v.title, allow: 'encrypted-media; picture-in-picture',
          allowfullscreen: 'true' });
        emb.innerHTML = '';
        emb.appendChild(ifr);
      });
      emb.appendChild(btn);
      card.appendChild(emb);
    } else if (v.tiktokUrl) {
      var link = el('a', { class: 'video-link', href: v.tiktokUrl, target: '_blank', rel: 'noopener' });
      link.appendChild(el('img', { src: asset(v.poster || 'images/video-placeholder.svg'), alt: '', loading: 'lazy' }));
      link.appendChild(el('span', { class: 'go', text: '▶ Watch on TikTok' }));
      card.appendChild(link);
    } else {
      return null; // nothing mountable — show no empty frame (F5 hard rule #2)
    }
    return card;
  }

  /* ── wizard (F4) — inline accordion panels (v1.8) ──────── */
  function nodeById(tree, id) {
    return tree.nodes.filter(function (n) { return n.id === id; })[0] || null;
  }

  function renderWizard(root) {
    var trees = pageWizard();
    if (!trees.length) return;
    state.wizard = null;
    state.wizardTrees = trees;
    var wrap = el('div', { class: 'symptoms', role: 'group' });
    trees.forEach(function (tr, i) {
      var item = el('div', { class: 'wizard-item', id: 'wz-' + tr.id, 'data-open': 'false' });
      var btn = el('button', { type: 'button', class: 'wz-btn', 'aria-expanded': 'false',
        onclick: function () { toggleWizard(tr.id); } });
      btn.appendChild(el('span', { class: 'num', text: (i + 1) + '. ' }));
      btn.appendChild(el('span', { class: 'wz-label', text: tr.symptom }));
      btn.appendChild(el('span', { class: 'arrow', 'aria-hidden': 'true', text: '›' }));
      var host = el('div', { class: 'wz-panel-host' });
      item.appendChild(btn);
      item.appendChild(host);
      wrap.appendChild(item);
    });
    root.appendChild(collapsibleSection('sec-wizard', t('problemsTitle'), [wrap]));
  }

  function toggleWizard(tid) {
    if (state.wizard && state.wizard.tid === tid) {
      state.wizard = null;
      drawWizard();
      return;
    }
    startWizard(tid);
  }

  function startWizard(tid) {
    var tree = state.wizardTrees.filter(function (tr) { return tr.id === tid; })[0];
    if (!tree) return;
    state.wizard = { tid: tid, nodeId: null, path: [tree.symptom] };
    drawWizard();
  }

  function wizardPathString() {
    return state.wizard ? state.wizard.path.join(' > ') : '';
  }

  function drawWizard() {
    $all('.wizard-item').forEach(function (item) {
      var active = !!(state.wizard && item.id === 'wz-' + state.wizard.tid);
      item.setAttribute('data-open', active ? 'true' : 'false');
      var btn = item.querySelector(':scope > .wz-btn');
      if (btn) btn.setAttribute('aria-expanded', active ? 'true' : 'false');
      var host = item.querySelector(':scope > .wz-panel-host');
      if (!host) return;
      host.innerHTML = '';
      if (!active) return;
      var tree = state.wizardTrees.filter(function (tr) { return tr.id === state.wizard.tid; })[0];
      var node = nodeById(tree, state.wizard.nodeId || tree.nodes[0].id);
      if (!node) return;
      var panel = el('div', { class: 'wizard-panel', role: 'group', 'aria-label': tree.symptom });

      if (state.wizard.path.length > 1) {
        panel.appendChild(el('p', { class: 'crumb', text: state.wizard.path.join(' › ') }));
      }

      if (node.question) {
        panel.appendChild(el('p', { class: 'q', text: node.question }));
        var row = el('div', { class: 'row' });
        node.options.forEach(function (opt) {
          row.appendChild(el('button', { type: 'button', onclick: function () {
            state.wizard.nodeId = opt.next;
            state.wizard.path.push(opt.label);
            drawWizard();
          }, text: opt.label }));
        });
        panel.appendChild(row);
      } else if (node.answer) {
        panel.appendChild(el('p', { class: 'answer answer-text', text: formatAnswer(node.answer) }));
        // v1.8: an answer node may carry a videoId — the video card renders inline here
        if (node.videoId) {
          var vid = window.PHC.videos.filter(function (v) { return v.id === node.videoId; })[0];
          if (vid) { var vn = videoNode(vid); if (vn) panel.appendChild(vn); }
        }
        var actions = el('div', { class: 'row' });
        actions.appendChild(el('button', { type: 'button', class: 'primary',
          text: t('wizardContact'), onclick: function () { goContact(state.wizard.tid); } }));
        panel.appendChild(actions);
      }

      var links = el('div', { class: 'links' });
      if (state.wizard.path.length > 1) {
        links.appendChild(el('button', { type: 'button', text: '← ' + t('wizardBack'), onclick: function () {
          state.wizard.path = [tree.symptom];
          state.wizard.nodeId = null;
          drawWizard();
        }}));
      }
      links.appendChild(el('button', { type: 'button', text: t('wizardRestart'), onclick: function () {
        state.wizard.path = [tree.symptom];
        state.wizard.nodeId = null;
        drawWizard();
      }}));
      panel.appendChild(links);
      host.appendChild(panel);
    });
  }

  /* ── contact plumbing ──────────────────────────────────── */
  function contactUrl() {
    return navUrl(state.page === 'contact' ? 'contact/' : (state.page === 'product' ? '../contact/' : 'contact/'));
  }

  function goContact(fromTid) {
    try {
      sessionStorage.setItem(ISSUE_KEY, wizardPathString());
    } catch (e) { /* private mode — summary will just omit the issue */ }
    location.href = contactUrl();
  }

  /* ── answer text auto line-breaks (v1.10): numbered steps AND
        sentence boundaries each on their own line ──────────── */
  function formatAnswer(text) {
    return String(text)
      .replace(/\s+(\d{1,2}\)\s)/g, '\n$1')
      .replace(/([.!?])\s+(?=[A-Za-z0-9"'“])/g, '$1\n');
  }

  /* ── category page (v1.9: just the model picker; v1.10: plain header, no collapse) ── */
  function renderCategory(root) {
    var grid = el('ul', { class: 'product-grid' });
    pageProducts().forEach(function (p, i) {
      var link = el('a', { href: navUrl(p.page), id: 'grid-' + p.id });
      link.appendChild(el('span', { class: 'badge', text: String(i + 1), 'aria-hidden': 'true' }));
      link.appendChild(el('img', { src: asset(p.image), alt: p.name, loading: 'lazy', width: '104', height: '104' }));
      link.appendChild(el('span', { class: 'pname', text: p.name }));
      grid.appendChild(el('li', {}, [link]));
    });
    var sec = el('section', {});
    var head = el('div', { class: 'plain-sec-head' });
    head.appendChild(el('h2', { text: t('selectTitle') }));
    sec.appendChild(head);
    sec.appendChild(grid);
    root.appendChild(sec);
    // no wizard / FAQ / search / chip nav / collapse here — the homepage only selects a model
  }

  /* ── product page (F9) ─────────────────────────────────── */
  function renderProduct(root) {
    var p = productById(state.product);
    if (!p) { renderCategory(root); return; }
    try { localStorage.setItem(PRODUCT_KEY, p.id); localStorage.setItem('phc_product_name', p.name); } catch (e) {}

    // back button now lives in the sticky header (v1.7) — no separate back bar
    var hero = el('section', { class: 'hero' });
    hero.appendChild(el('img', { src: asset(p.image), alt: p.name, width: '104', height: '104' }));
    var htxt = el('div', {});
    htxt.appendChild(el('h2', { class: 'name', text: p.name }));
    htxt.appendChild(el('p', { class: 'short', text: p.short }));
    hero.appendChild(htxt);
    root.appendChild(hero);

    // model facts — v1.9: placed above the symptom entry (user decision)
    var f = p.facts || {};
    // generic facts table (v1.11): every key in facts[] renders with a ui label
    var FACT_LABELS = {
      ssid: 'factsSsid', password: 'factsPassword', portal: 'factsPortal',
      login: 'factsLogin', sim: 'factsSim', carriers: 'factsCarriers',
      reset: 'factsReset', app: 'factsApp', network: 'factsNetwork',
      install: 'factsInstall', trial: 'factsTrial', iccid: 'factsIccid',
      topup: 'factsTopup', usage: 'factsUsage', plan: 'factsPlan',
      battery: 'factsBattery', standby: 'factsStandby',
      accuracy: 'factsAccuracy', size: 'factsSize'
    };
    var dl = el('dl', { class: 'facts' });
    Object.keys(f).forEach(function (k) {
      if (k === 'note' || !f[k]) return;
      var uiKey = FACT_LABELS[k] || ('fact_' + k);
      dl.appendChild(el('div', {}, [el('dt', { text: t(uiKey) }), el('dd', { text: f[k] })]));
    });
    var factsChildren = [dl];
    if (f.note) factsChildren.push(el('p', { class: 'model-note', text: f.note }));
    root.appendChild(collapsibleSection('sec-facts', t('factsTitle'), factsChildren));

    // v1.9: Model info sits ABOVE the symptom entry (user decision)
    renderWizard(root);

    var faqChildren = renderFaqChildren();
    if (faqChildren.length) root.appendChild(collapsibleSection('sec-faq', t('faqTitle'), faqChildren));
  }

  /* ── contact page (F7 / F10, v1.9: no model picker, per-channel reply times) ── */
  function rememberedProduct() {
    try { return localStorage.getItem(PRODUCT_KEY) || ''; } catch (e) { return ''; }
  }

  function currentSummary() {
    var phc = window.PHC;
    var model = rememberedProduct();
    var issue = '';
    try { issue = sessionStorage.getItem(ISSUE_KEY) || ''; } catch (e) {}
    var tpl;
    if (issue) tpl = phc.contact.summaryTemplate;
    else if (model) tpl = phc.contact.summaryNoSymptomTemplate;
    else tpl = phc.contact.summaryNoModelTemplate;
    return tpl
      .replace('{product}', model ? productName(model) : '')
      .replace('{symptom}', issue)
      .replace('{url}', location.href);
  }

  function singleLineSummary() {
    var phc = window.PHC;
    var model = rememberedProduct();
    var issue = '';
    try { issue = sessionStorage.getItem(ISSUE_KEY) || ''; } catch (e) {}
    var tpl;
    if (issue) tpl = phc.contact.summarySingleLineTemplate;
    else if (model) tpl = phc.contact.summaryNoSymptomTemplate.replace(/\n/g, ' ');
    else tpl = phc.contact.summarySingleLineNoModelTemplate;
    var s = tpl
      .replace('{product}', model ? productName(model) : '')
      .replace('{symptom}', issue)
      .replace('{url}', location.href)
      .replace(/\s*\n\s*/g, ' ');
    return s.slice(0, 280);   // Viber prefill: single line, ≤280 chars (F7)
  }

  function buildEmailHref() {
    var phc = window.PHC;
    var addr = (phc.contact.emailAddress || '').trim();
    if (!addr) return 'mailto:' + phc.contact.emailAddress; // placeholder stays visible as-is
    var model = rememberedProduct();
    var subject = 'Need help with my device' + (model ? ' – ' + productName(model) : '');
    return 'mailto:' + addr + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(currentSummary());
  }

  function copyText(text, done, fail) {
    // three-level fallback chain (F10)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text, done, fail); });
    } else {
      legacyCopy(text, done, fail);
    }
  }
  function legacyCopy(text, done, fail) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');   // must run inside the click gesture
      document.body.removeChild(ta);
      if (ok) done(); else fail();
    } catch (e) { fail(); }
  }

  function renderContact(root) {
    var phc = window.PHC;
    // back button now lives in the sticky header (v1.7) — no separate back bar

    // ① advice card: platform shop chat is fastest — plain text, NO button/link (v1.6)
    var advice = el('section', { class: 'advice-card' });
    advice.appendChild(el('p', { class: 'advice-title', text: phc.contact.fastestTitle }));
    advice.appendChild(el('p', { class: 'advice-body', text: phc.contact.fastestNote }));
    root.appendChild(advice);

    // ② fallback line: 24 h no reply → FB / Viber (v1.6)
    root.appendChild(el('p', { class: 'fallback-line', text: phc.contact.fallbackNote }));

    // ③ copy summary (F10) — model is auto-remembered from the last product page
    var copySec = el('section', { class: 'copy-block' });
    var copyBtn = el('button', { type: 'button', class: 'btn-primary', text: t('copyButton') });
    copyBtn.addEventListener('click', function () {
      var text = currentSummary();
      copyText(text, function () { flash(copyBtn, t('copyDone'), t('copyButton')); }, function () {
        var ta = el('textarea', { class: 'copy-preview', readonly: 'readonly', 'aria-label': t('summaryPreviewTitle') });
        ta.value = text;
        ta.style.minHeight = '120px';
        copyBtn.after(ta);
        ta.focus(); ta.select();
        flash(copyBtn, t('summaryPreviewTitle'), t('copyButton'));
      });
    });
    copySec.appendChild(copyBtn);
    copySec.appendChild(el('p', { class: 'copy-preview-title', text: t('summaryPreviewTitle') }));
    var preview = el('pre', { class: 'copy-preview', id: 'copy-preview', 'aria-live': 'polite' });
    copySec.appendChild(preview);
    root.appendChild(copySec);

    // ④⑤⑥ channels: Messenger (primary) → Viber (fallback page) → Email (mailto)
    // reply time is stated on each channel's own hint line (v1.9)
    var chSec = el('section', {});
    chSec.appendChild(el('h2', { text: t('contactTitle') }));
    var chans = el('div', { class: 'channels' });
    var viberCh = phc.contact.channels.filter(function (c) { return c.id === 'viber'; })[0];
    phc.contact.channels.forEach(function (c) {
      var node;
      if (c.id === 'viber') {
        node = el('a', { class: 'channel secondary', href: navUrl(viberCh.fallbackPage) });
      } else {
        node = el('a', { class: 'channel primary', href: c.href, target: '_blank', rel: 'noopener' });
      }
      node.appendChild(el('span', { class: 'cname', text: c.label }));
      node.appendChild(el('span', { class: 'chint', text: c.hint }));
      chans.appendChild(node);
    });
    // email channel is optional (v1.10a): hidden when emailAddress is empty/placeholder
    var emailAddr = (phc.contact.emailAddress || '').trim();
    if (emailAddr && emailAddr !== '__FILL_ME__') {
      var email = el('a', { class: 'channel secondary', id: 'email-channel', href: buildEmailHref() });
      email.appendChild(el('span', { class: 'cname', text: 'Email' }));
      email.appendChild(el('span', { class: 'chint', text: phc.contact.emailHint }));
      chans.appendChild(email);
      // selectable raw address under the email button (mailto fallback)
      chSec.appendChild(el('p', { class: 'email-addr' }, [
        document.createTextNode(t('emailAddrLabel') + ' '),
        el('span', { class: 'addr user-select-all', text: emailAddr })
      ]));
    }
    chSec.appendChild(chans);
    root.appendChild(chSec);

    preview.textContent = currentSummary();

    // pull back to self-service — goes to the homepage model picker (v1.9)
    var hint = el('p', { class: 'hint-back' });
    hint.appendChild(el('a', { href: navUrl('../'), text: t('selfServeHint') }));
    root.appendChild(hint);
  }

  function flash(btn, msg, restore) {
    btn.textContent = msg;
    btn.disabled = true;
    setTimeout(function () { btn.textContent = restore; btn.disabled = false; }, 2000);
  }

  /* ── footer ────────────────────────────────────────────── */
  function renderFooter(root) {
    var foot = el('footer', { class: 'site-foot' });
    var wrap = el('div', { class: 'wrap' });
    if (state.page !== 'contact') {
      var btn = el('a', { class: 'btn-primary', href: contactUrl(), text: t('footerContact'),
        onclick: function () {
          try { sessionStorage.setItem(ISSUE_KEY, wizardPathString()); } catch (e) {}
        } });
      wrap.appendChild(btn);
    }
    var brand = window.PHC.meta.brand;
    if (brand && brand !== '__FILL_ME__') {
      wrap.appendChild(el('p', { class: 'fineprint', text: '© ' + new Date().getFullYear() + ' ' + brand }));
    }
    foot.appendChild(wrap);
    root.appendChild(foot);
  }

  /* ── language (F1) ─────────────────────────────────────── */
  function detectLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'fil') return saved;
    } catch (e) {}
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /^fil|^tl/i.test(nav) ? 'fil' : 'en';
  }

  function switchLang(lang) {
    if (lang === state.lang) return;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    loadLang(lang, function () { boot(true); });
  }

  function loadLang(lang, cb) {
    var base = state.page === 'product' ? '../data/' : (state.page === 'contact' ? '../data/' : 'data/');
    var s = document.createElement('script');
    s.src = base + lang + '.js';
    s.onload = cb;
    s.onerror = cb;
    document.head.appendChild(s);
  }

  /* ── boot ──────────────────────────────────────────────── */
  function boot(reRender) {
    var app = $('#app');
    app.innerHTML = '';
    document.documentElement.lang = state.lang === 'fil' ? 'fil' : 'en';
    buildSearchIndex();
    renderHeader(app, {
      hasSections: state.page === 'product',
      showBack: state.page !== 'category',
      backFallback: '../'
    });
    var main = el('main', { class: 'wrap' });
    app.appendChild(main);
    if (state.page === 'category') renderCategory(main);
    else if (state.page === 'product') renderProduct(main);
    else if (state.page === 'contact') renderContact(main);
    renderFooter(app);
    buildSectionNav($('.site-head'));
    refreshCollapseAllBtn();
  }

  function init() {
    var body = document.body;
    state.page = body.getAttribute('data-page') || 'category';
    state.product = body.getAttribute('data-product') || null;
    state.lang = detectLang();
    document.documentElement.lang = state.lang === 'fil' ? 'fil' : 'en';
    boot(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
