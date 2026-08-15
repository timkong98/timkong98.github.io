/* ==========================================================================
   Light / dark mode toggle
   --------------------------------------------------------------------------
   This lives in an external file on purpose. _layouts/compress.html (the
   jekyll-compress-html layout that default.html wraps everything in) collapses
   every newline inside inline script blocks into a space, which turns any
   double-slash line comment into one that swallows the rest of the file.
   External scripts are copied verbatim and are immune to that.

   The pre-paint half -- reading localStorage and setting <html data-theme>
   before the first frame so there is no flash of the wrong theme -- has to stay
   inline in _includes/head/custom.html. It uses only block comments.
   ========================================================================== */

(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) { return; }

  function prefersDark() {
    return !!(window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  /* The theme actually in effect: an explicit choice if there is one,
     otherwise whatever the OS reports. */
  function effective() {
    var t = root.getAttribute('data-theme');
    return (t === 'light' || t === 'dark') ? t : (prefersDark() ? 'dark' : 'light');
  }

  function sync() {
    var next = effective() === 'dark' ? 'light' : 'dark';
    var text = 'Switch to ' + next + ' mode';
    btn.setAttribute('aria-label', text);
    btn.setAttribute('title', text);

    /* The head script sets colorScheme and backgroundColor inline so the canvas
       is right before the stylesheet parses. By the time this file runs the
       stylesheet is applied, so drop them and let the CSS tokens be the single
       source of truth -- otherwise they go stale the moment the user toggles. */
    root.style.colorScheme = '';
    root.style.backgroundColor = '';

    /* Once the user has chosen explicitly, the two media-scoped theme-color
       meta tags can disagree with the page, so collapse them into one. */
    if (root.getAttribute('data-theme')) {
      var metas = document.querySelectorAll('meta[name="theme-color"]');
      for (var i = metas.length - 1; i >= 0; i--) {
        metas[i].parentNode.removeChild(metas[i]);
      }
      var m = document.createElement('meta');
      m.setAttribute('name', 'theme-color');
      m.setAttribute('content', effective() === 'dark' ? '#161514' : '#fdfbf8');
      document.head.appendChild(m);
    }
  }

  btn.addEventListener('click', function () {
    var next = effective() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { window.localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });

  /* With no explicit choice, keep following the OS if it changes live. */
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () {
      if (!root.getAttribute('data-theme')) { sync(); }
    };
    if (mq.addEventListener) { mq.addEventListener('change', onChange); }
    else if (mq.addListener) { mq.addListener(onChange); }
  }

  sync();
})();
