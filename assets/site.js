/* Biomefit — shared behaviour for every page.
   Loaded with `defer`, so the DOM is ready by the time this runs.
   Everything below no-ops gracefully when its element isn't on the page. */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Nav background once you've scrolled off the hero
     --------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('stuck')) {
    var onScroll = function () { nav.classList.toggle('stuck', window.scrollY > 40); };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------
     Menu — the browser Back button closes it instead of leaving the page.

     Opening pushes a history entry, so Back pops it and we just close.
     Closing by any other route (button, link, Escape) rewinds that entry
     itself, so we never leave a dead state stacked up in history.
     --------------------------------------------------------------- */
  var burger = document.getElementById('burger');
  var pushedByMenu = false;

  function menuIsOpen() { return document.body.classList.contains('open'); }

  function setMenu(open) {
    document.body.classList.toggle('open', open);
    document.body.classList.toggle('lock', open);
    if (burger) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }

  function openMenu() {
    setMenu(true);
    try { history.pushState({ bfMenu: true }, ''); pushedByMenu = true; }
    catch (e) { pushedByMenu = false; }
  }

  function closeMenu() {
    setMenu(false);
    if (pushedByMenu) { pushedByMenu = false; history.back(); }
  }

  if (burger) {
    burger.addEventListener('click', function () {
      menuIsOpen() ? closeMenu() : openMenu();
    });
  }

  // Back button while the menu is open: close it, don't navigate away.
  addEventListener('popstate', function () {
    if (menuIsOpen()) { pushedByMenu = false; setMenu(false); }
  });

  addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuIsOpen()) closeMenu();
  });

  // Menu links.
  // Same-page anchors were landing nowhere: the browser applied the #hash,
  // then closeMenu()'s history.back() rewound it straight back off again.
  // So handle the scroll ourselves after the menu entry has been popped.
  document.querySelectorAll('.menu-list a').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var href = a.getAttribute('href') || '';
      var hash = href.indexOf('#');
      var samePage = href.charAt(0) === '#';

      if (samePage) {
        ev.preventDefault();
        var target = document.querySelector(href);
        var go = function () {
          if (!target) return;
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', href);   // keep the URL honest, no new entry
        };
        if (pushedByMenu) {
          pushedByMenu = false;
          setMenu(false);
          addEventListener('popstate', function once () {
            removeEventListener('popstate', once);
            setTimeout(go, 20);
          });
          history.back();
        } else {
          setMenu(false);
          setTimeout(go, 20);
        }
        return;
      }

      // Cross-page link: drop the menu entry first, or Back lands on a menu state.
      if (pushedByMenu) {
        ev.preventDefault();
        pushedByMenu = false;
        setMenu(false);
        history.back();
        setTimeout(function () { location.href = href; }, 60);
      } else {
        setMenu(false);
      }
    });
  });

  /* ---------------------------------------------------------------
     Arriving with a #hash from another page.

     The browser makes its jump before the hero video and webfonts have
     settled the layout, so the target moves afterwards and the jump is
     lost — you land at the top. Re-apply it once things have stopped
     shifting, and again after load for slower connections.
     --------------------------------------------------------------- */
  if (location.hash.length > 1) {
    var landTo = function () {
      var t;
      try { t = document.querySelector(location.hash); } catch (e) { return; }
      if (t) t.scrollIntoView({ behavior: 'auto', block: 'start' });
    };
    landTo();
    setTimeout(landTo, 120);
    addEventListener('load', function () { setTimeout(landTo, 60); });
  }

  /* ---------------------------------------------------------------
     Back link — go back if there's somewhere to go, else home.
     --------------------------------------------------------------- */
  document.querySelectorAll('[data-back]').forEach(function (el) {
    el.addEventListener('click', function (ev) {
      ev.preventDefault();
      // Only trust history if we actually arrived from somewhere on this site.
      var sameOrigin = document.referrer && document.referrer.indexOf(location.origin) === 0;
      if (history.length > 1 && sameOrigin) history.back();
      else location.href = el.getAttribute('href') || 'index.html';
    });
  });

  /* ---------------------------------------------------------------
     Background video — autoplay gets blocked or silently paused
     (hidden tab, Safari power saver, iOS low power). Nudge it back.
     --------------------------------------------------------------- */
  var vids = [].slice.call(document.querySelectorAll('video[autoplay]'));
  function kick(v) {
    v.muted = true;                    // must be a property, not just the attribute
    v.playsInline = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  function kickAll() { vids.forEach(function (v) { if (v.paused) kick(v); }); }
  vids.forEach(function (v) {
    kick(v);
    v.addEventListener('loadeddata', function () { kick(v); });
    v.addEventListener('pause', function () {
      if (!document.hidden) setTimeout(function () { kick(v); }, 80);
    });
  });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) kickAll(); });
  addEventListener('pageshow', kickAll);
  addEventListener('focus', kickAll);
  ['pointerdown', 'touchstart', 'keydown'].forEach(function (e) {
    addEventListener(e, kickAll, { once: true, passive: true });
  });

  /* ---------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------- */
  var rv = document.querySelectorAll('.rv');
  if (rv.length) {
    if (!('IntersectionObserver' in window)) {
      rv.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      rv.forEach(function (el, i) {
        el.style.transitionDelay = ((i % 4) * 0.06) + 's';
        io.observe(el);
      });
    }
  }

  /* ---------------------------------------------------------------
     Stat ticker. Content lives in window.STAT_SETS on the page itself,
     so the numbers stay easy to find and edit.
     --------------------------------------------------------------- */
  var lead = document.getElementById('sbLead'),
      set  = document.getElementById('sbSet'),
      dots = document.getElementById('sbDots'),
      SETS = window.STAT_SETS;

  if (lead && set && dots && SETS && SETS.length) {
    SETS.forEach(function (_, i) {
      var d = document.createElement('i');
      if (!i) d.className = 'on';
      dots.appendChild(d);
    });
    var paint = function (i) {
      var s = SETS[i];
      lead.innerHTML = s.lead;
      set.innerHTML = s.stats.map(function (x) {
        return '<div><b>' + x.n + '</b><span>' + x.l + '</span></div>';
      }).join('');
      [].forEach.call(dots.children, function (d, j) { d.className = j === i ? 'on' : ''; });
    };
    paint(0);
    var idx = 0;
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && SETS.length > 1) {
      setInterval(function () {
        if (document.hidden) return;
        lead.classList.add('out'); set.classList.add('out');
        setTimeout(function () {
          idx = (idx + 1) % SETS.length;
          paint(idx);
          lead.classList.remove('out'); set.classList.remove('out');
        }, 460);
      }, 4600);
    }
  }
})();
