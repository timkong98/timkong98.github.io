/* ==========================================================================
   Page swap: in-site navigation without a full page load
   --------------------------------------------------------------------------
   Every page shares the same top bar, banner, sidebar and footer, so a normal
   link click tears all of that down and repaints it, and the browser shows a
   blank (white) canvas in between. Instead, intercept clicks on links to other
   pages of this site, fetch the page, and replace only the content column
   inside #main. The URL, title, back/forward buttons and the active link in
   the top bar all behave as they would for a real navigation.

   Anything unusual falls back to an ordinary page load: other origins, files
   (PDFs, images, feeds), new-tab/download links, modified clicks, error
   responses, redirect stubs, pages whose sidebar or hero differs, and content
   that carries its own scripts. Without JS the links are plain links.

   This lives in an external file on purpose: _layouts/compress.html collapses
   newlines in inline scripts, which breaks any line comment.
   ========================================================================== */

(function () {
  if (!window.history || !history.pushState || !window.fetch ||
      !window.DOMParser || !document.querySelector) { return; }

  var main = document.getElementById('main');
  if (!main) { return; }

  var cache = {};          /* url -> Promise<string> of the page's HTML */
  var current = key(location.href);
  var pending = null;      /* url of the navigation in flight, if any */

  /* Path + query, without the hash: two URLs with the same key are the same
     page. */
  function key(href) {
    var u = new URL(href, location.href);
    return u.origin + u.pathname + u.search;
  }

  function squash(s) {
    return (s || '').replace(/\s+/g, ' ').trim();
  }

  /* A link we can handle in-page: same origin, a page rather than a file,
     no target/download, and not just a jump within the current page. */
  function swappable(a) {
    if (!a || !a.href || a.hasAttribute('download') ||
        a.hasAttribute('data-no-swap')) { return false; }
    if (a.target && a.target !== '_self') { return false; }
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin) { return false; }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') { return false; }
    var last = u.pathname.split('/').pop();
    if (last.indexOf('.') !== -1 && !/\.html?$/i.test(last)) { return false; }
    if (key(u.href) === current && u.hash) { return false; }
    return true;
  }

  function load(url) {
    if (!cache[url]) {
      cache[url] = fetch(url, { credentials: 'same-origin' }).then(function (r) {
        var type = r.headers.get('content-type') || '';
        if (!r.ok || type.indexOf('text/html') === -1) { throw new Error('not a page'); }
        return r.text();
      });
      /* a failed fetch must not poison later attempts */
      cache[url].catch(function () { delete cache[url]; });
    }
    return cache[url];
  }

  /* The parts of #main that belong to the page itself: everything except the
     sidebar, which stays put. */
  function contentOf(root) {
    var out = [];
    for (var i = 0; i < root.children.length; i++) {
      if (!root.children[i].classList.contains('sidebar')) {
        out.push(root.children[i]);
      }
    }
    return out;
  }

  function sameSidebar(doc) {
    var a = main.querySelector(':scope > .sidebar');
    var b = doc.querySelector('#main > .sidebar');
    if (!a || !b) { return !a && !b; }
    return squash(a.textContent) === squash(b.textContent);
  }

  /* Copy the active link from the fetched page's top bar, which Liquid already
     worked out (including collection pages such as /publication/paper-2 ->
     Publications). Matched by URL, because greedy-nav may have moved items
     between the visible and overflow lists. */
  function setActiveLink(doc, url) {
    var active = {};
    var marked = doc.querySelectorAll('#site-nav .is-active a');
    for (var i = 0; i < marked.length; i++) {
      active[key(new URL(marked[i].getAttribute('href'), url).href)] = true;
    }
    var items = document.querySelectorAll('#site-nav .masthead__menu-item');
    for (var j = 0; j < items.length; j++) {
      var link = items[j].querySelector('a');
      var on = !!(link && active[key(link.href)]);
      items[j].classList.toggle('is-active', on);
      if (link) {
        if (on) { link.setAttribute('aria-current', 'page'); }
        else { link.removeAttribute('aria-current'); }
      }
    }
  }

  function closeOverflowMenu() {
    var hidden = document.querySelector('#site-nav .hidden-links');
    var btn = document.querySelector('#site-nav button');
    if (hidden) { hidden.classList.add('hidden'); }
    if (btn) { btn.classList.remove('close'); }
  }

  /* Re-run what the theme and MathJax normally do once, on page load, for the
     newly inserted content. */
  function initContent(nodes) {
    var $ = window.jQuery;
    if ($ && $.fn.fitVids) { $(nodes).fitVids(); }
    var MJ = window.MathJax;
    if (MJ && MJ.Hub && MJ.Hub.Queue) {
      MJ.Hub.Queue(function () {
        var tex = MJ.InputJax && MJ.InputJax.TeX;
        if (tex && tex.resetEquationNumbers) { tex.resetEquationNumbers(); }
      });
      for (var i = 0; i < nodes.length; i++) {
        MJ.Hub.Queue(['Typeset', MJ.Hub, nodes[i]]);
      }
    }
  }

  function scrollAfterSwap(hash, y) {
    if (typeof y === 'number') { window.scrollTo(0, y); return; }
    if (hash) {
      var id = decodeURIComponent(hash.slice(1));
      var target = document.getElementById(id);
      if (target) { target.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }

  function rememberScroll() {
    var state = history.state || {};
    state.pageSwap = true;
    state.scrollY = window.scrollY;
    history.replaceState(state, '');
  }

  /* Returns true if the page was swapped in, false if the caller should fall
     back to a normal navigation. */
  function swap(html, url, opts) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var next = doc.getElementById('main');
    if (!next || doc.querySelector('meta[http-equiv="refresh" i]')) { return false; }
    if (!sameSidebar(doc)) { return false; }
    if (!!doc.querySelector('.page__hero, .page__hero--overlay') !==
        !!document.querySelector('.page__hero, .page__hero--overlay')) { return false; }

    var incoming = contentOf(next);
    for (var i = 0; i < incoming.length; i++) {
      var scripts = incoming[i].querySelectorAll('script');
      for (var s = 0; s < scripts.length; s++) {
        if (!/^math\//.test(scripts[s].type)) { return false; }
      }
    }

    var old = contentOf(main);
    for (var o = 0; o < old.length; o++) { main.removeChild(old[o]); }
    var added = [];
    for (var n = 0; n < incoming.length; n++) {
      added.push(main.appendChild(document.adoptNode(incoming[n])));
    }

    document.title = doc.title;
    if (opts.push) {
      history.pushState({ pageSwap: true, scrollY: 0 }, '', url);
    }
    current = key(location.href);

    setActiveLink(doc, url);
    closeOverflowMenu();
    /* the bold active link changes the bar's width; let greedy-nav re-measure */
    window.dispatchEvent(new Event('resize'));

    scrollAfterSwap(new URL(url, location.href).hash, opts.scrollY);
    initContent(added);

    /* tell assistive tech where we are: focus the new page title */
    var h1 = main.querySelector('h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
    return true;
  }

  function navigate(url, opts) {
    pending = url;
    main.setAttribute('aria-busy', 'true');
    load(key(url)).then(function (html) {
      if (pending !== url) { return; } /* superseded by a later click */
      if (!swap(html, url, opts)) { location.assign(url); }
    }).catch(function () {
      if (pending === url) { location.assign(url); }
    }).then(function () {
      if (pending === url) {
        pending = null;
        main.removeAttribute('aria-busy');
      }
    });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) { return; }
    var a = e.target.closest && e.target.closest('a');
    if (!swappable(a)) { return; }
    e.preventDefault();
    if (key(a.href) === current && !new URL(a.href).hash) {
      closeOverflowMenu();
      window.scrollTo(0, 0);
      return;
    }
    rememberScroll();
    navigate(a.href, { push: true });
  });

  /* Warm the cache on hover / touch so the swap is usually instant. */
  function prefetch(e) {
    var a = e.target.closest && e.target.closest('a');
    if (swappable(a) && key(a.href) !== current) {
      load(key(a.href)).catch(function () {});
    }
  }
  document.addEventListener('mouseover', prefetch);
  document.addEventListener('touchstart', prefetch, { passive: true });
  document.addEventListener('focusin', prefetch);

  window.addEventListener('popstate', function (e) {
    /* a hash change within the same page: leave it to the browser */
    if (key(location.href) === current) { return; }
    var y = e.state && typeof e.state.scrollY === 'number' ? e.state.scrollY : 0;
    navigate(location.href, { push: false, scrollY: y });
  });

  /* Scroll positions are restored by hand: on back/forward between swapped
     pages the browser would otherwise jump the OLD content to the saved
     position before the new content is in. Manual restoration also applies to
     full loads of this entry (reload, or Back from another site when the page
     is not in the back/forward cache), so the position saved on pagehide is
     put back once the page has laid out. */
  var saved = history.state && history.state.pageSwap &&
              typeof history.state.scrollY === 'number' ? history.state.scrollY : 0;
  if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
  if (saved && !location.hash) {
    window.addEventListener('load', function () {
      if (window.scrollY === 0) { window.scrollTo(0, saved); }
    });
  }
  window.addEventListener('pagehide', rememberScroll);
  history.replaceState({ pageSwap: true, scrollY: saved || window.scrollY }, '');
})();
