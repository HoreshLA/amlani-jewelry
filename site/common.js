/* ======================================================
   amlani · shared behavior across all pages
   ====================================================== */
(function () {
  "use strict";

  var NUMBER = window.WHATSAPP_NUMBER || "972502023525";

  /* Build a wa.me link with an encoded message */
  window.waLink = function (msg) {
    return "https://wa.me/" + NUMBER + "?text=" + encodeURIComponent(msg || "");
  };

  /* Static [data-wa] elements → WhatsApp links */
  function wireWa() {
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.setAttribute("href", window.waLink(el.getAttribute("data-wa")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }
  wireWa();
  fetch("site.json", { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (s) { if (s && s.whatsapp) { NUMBER = s.whatsapp; wireWa(); } })
    .catch(function () {});

  /* Header background on scroll */
  var header = document.getElementById("header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile navigation */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  /* Scroll reveal (also re-runnable for injected content) */
  window.observeReveals = function (scope) {
    var reveals = (scope || document).querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  };
  window.observeReveals(document);

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

/* ======================================================
   Accessibility widget (תפריט נגישות)
   Real, working controls, persisted in localStorage,
   injected on every page. Applies to <html> element.
   ====================================================== */
(function () {
  "use strict";

  var STORE_KEY = "amlani_a11y";
  var SCALES = [0.9, 1, 1.1, 1.25, 1.4];
  var root = document.documentElement;

  var TOGGLES = [
    { key: "contrast",  label: "ניגודיות גבוהה", sym: "◐" },
    { key: "grayscale", label: "גווני אפור",      sym: "▧" },
    { key: "links",     label: "הדגשת קישורים",   sym: "A̲" },
    { key: "readable",  label: "גופן קריא",        sym: "Aa" },
    { key: "spacing",   label: "ריווח טקסט",       sym: "↔" },
    { key: "nomotion",  label: "עצירת אנימציות",  sym: "⏸" }
  ];

  /* ---- state ---- */
  var state = { scaleIdx: 1, contrast: false, grayscale: false, links: false, readable: false, spacing: false, nomotion: false };
  try {
    var saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    Object.keys(saved).forEach(function (k) { if (k in state) state[k] = saved[k]; });
  } catch (e) {}

  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function setVideos(paused) {
    document.querySelectorAll("video").forEach(function (v) {
      try { if (paused) { v.pause(); v.removeAttribute("autoplay"); } else { v.play().catch(function(){}); } } catch (e) {}
    });
  }

  function apply() {
    root.style.fontSize = Math.round(SCALES[state.scaleIdx] * 100) + "%";
    TOGGLES.forEach(function (t) { root.classList.toggle("a11y-" + t.key, !!state[t.key]); });
    setVideos(state.nomotion);
  }

  /* ---- build UI ---- */
  var wrap = document.createElement("div");
  wrap.className = "a11y";
  wrap.innerHTML =
    '<button class="a11y-fab" id="a11yFab" aria-label="פתיחת תפריט נגישות" aria-expanded="false" aria-controls="a11yPanel">' +
      '<svg viewBox="0 0 24 24" width="27" height="27" aria-hidden="true">' +
        '<circle cx="12" cy="4.2" r="2.2" fill="currentColor"/>' +
        '<path d="M12 7v6M12 13l-3 6M12 13l3 6M6 9h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '</svg>' +
    '</button>' +
    '<div class="a11y-panel" id="a11yPanel" role="dialog" aria-label="אפשרויות נגישות" hidden>' +
      '<div class="a11y-head"><span>נגישות</span>' +
        '<button class="a11y-close" id="a11yClose" aria-label="סגירה">✕</button>' +
      '</div>' +
      '<div class="a11y-scale" role="group" aria-label="גודל טקסט">' +
        '<button class="a11y-scale-btn" data-scale="-1" aria-label="הקטנת טקסט">A−</button>' +
        '<span class="a11y-scale-val" id="a11yScaleVal">100%</span>' +
        '<button class="a11y-scale-btn" data-scale="1" aria-label="הגדלת טקסט">A+</button>' +
      '</div>' +
      '<div class="a11y-opts" id="a11yOpts"></div>' +
      '<button class="a11y-reset" id="a11yReset">איפוס הגדרות</button>' +
      '<a class="a11y-statement" href="accessibility.html">להצהרת הנגישות המלאה</a>' +
    '</div>';
  document.body.appendChild(wrap);

  var optsBox = wrap.querySelector("#a11yOpts");
  optsBox.innerHTML = TOGGLES.map(function (t) {
    return '<button class="a11y-opt" data-key="' + t.key + '" aria-pressed="false">' +
      '<span class="a11y-opt-sym" aria-hidden="true">' + t.sym + '</span>' + t.label + '</button>';
  }).join("");

  var fab = wrap.querySelector("#a11yFab");
  var panel = wrap.querySelector("#a11yPanel");
  var scaleVal = wrap.querySelector("#a11yScaleVal");

  function refreshUI() {
    scaleVal.textContent = Math.round(SCALES[state.scaleIdx] * 100) + "%";
    optsBox.querySelectorAll(".a11y-opt").forEach(function (b) {
      var on = !!state[b.getAttribute("data-key")];
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function openPanel() {
    panel.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    var first = panel.querySelector(".a11y-scale-btn");
    if (first) first.focus();
  }
  function closePanel() {
    panel.hidden = true;
    fab.setAttribute("aria-expanded", "false");
    fab.focus();
  }

  fab.addEventListener("click", function () { panel.hidden ? openPanel() : closePanel(); });
  wrap.querySelector("#a11yClose").addEventListener("click", closePanel);

  wrap.querySelectorAll(".a11y-scale-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var dir = +b.getAttribute("data-scale");
      state.scaleIdx = Math.min(SCALES.length - 1, Math.max(0, state.scaleIdx + dir));
      apply(); refreshUI(); persist();
    });
  });

  optsBox.querySelectorAll(".a11y-opt").forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-key");
      state[k] = !state[k];
      apply(); refreshUI(); persist();
    });
  });

  wrap.querySelector("#a11yReset").addEventListener("click", function () {
    state = { scaleIdx: 1, contrast: false, grayscale: false, links: false, readable: false, spacing: false, nomotion: false };
    apply(); refreshUI(); persist();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) closePanel();
  });
  document.addEventListener("click", function (e) {
    if (!panel.hidden && !wrap.contains(e.target)) closePanel();
  });

  /* ---- skip-to-content link ---- */
  var main = document.querySelector("main") ||
             document.querySelector(".hero, .page-head, .product-page, .legal-page") ||
             document.querySelector("section");
  if (main) {
    if (!main.id) main.id = "main-content";
    main.setAttribute("tabindex", "-1");
    var skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#" + main.id;
    skip.textContent = "דילוג לתוכן";
    skip.addEventListener("click", function (e) {
      e.preventDefault();
      main.focus();
      main.scrollIntoView();
    });
    document.body.insertBefore(skip, document.body.firstChild);
  }

  apply();
  refreshUI();
})();
