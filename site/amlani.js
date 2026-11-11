/* Amlani — vanilla interactions for the new design.
   Grid from products.json, WhatsApp links from content/site.json, header, menu. */
(function () {
  "use strict";

  // ---- WhatsApp links (number from CMS site.json) ----
  var waNumber = "972502023525"; // fallback; overwritten by site.json
  function waLink(msg) {
    return "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(msg || "");
  }
  function applyWa(root) {
    (root || document).querySelectorAll("[data-wa]").forEach(function (el) {
      el.href = waLink(el.getAttribute("data-wa") || "");
      el.target = "_blank"; el.rel = "noreferrer";
    });
  }
  window.waLink = waLink;
  window.applyWa = applyWa;
  fetch("content/site.json").then(function (r) { return r.ok ? r.json() : null; })
    .then(function (s) { if (s && s.whatsapp) { waNumber = String(s.whatsapp); } })
    .catch(function () {})
    .finally(function () { applyWa(); });

  // ---- Header solidify on scroll ----
  var header = document.querySelector(".am-header");
  function onScroll() { if (header) header.classList.toggle("is-solid", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- Mobile drawer ----
  var burger = document.querySelector(".am-burger");
  var drawer = document.getElementById("am-drawer");
  if (burger && drawer) {
    function setDrawer(open) {
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", function () { setDrawer(!drawer.classList.contains("is-open")); });
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setDrawer(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });
  }

  // ---- Collection grid from products.json ----
  var grid = document.getElementById("am-grid");
  var filtersEl = document.getElementById("am-filters");
  var CATS = [
    { key: "all", label: "הכל", match: function () { return true; } },
    { key: "rings", label: "טבעות", match: function (p) { return has(p, "rings"); } },
    { key: "necklaces", label: "שרשראות ותליונים", match: function (p) { return has(p, "necklaces"); } },
    { key: "bracelets", label: "צמידים", match: function (p) { return has(p, "bracelets"); } },
    { key: "stones", label: "עם אבן חן", match: function (p) { return has(p, "stones"); } }
  ];
  function has(p, c) { return Array.isArray(p.cats) && p.cats.indexOf(c) !== -1; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }

  function cardHTML(p) {
    var price = p.price ? "₪" + esc(p.price) : "לפרטים ומחיר";
    return '<a class="am-card" href="product.html?id=' + encodeURIComponent(p.id) + '">' +
      '<span class="am-card__frame">' +
      '<img src="' + esc(p.cover) + '" alt="' + esc(p.name) + '" loading="lazy" />' +
      (p.short ? '<span class="am-card__peek">' + esc(p.short) + "</span>" : "") +
      "</span>" +
      '<span class="am-card__name">' + esc(p.name) + "</span>" +
      '<span class="am-card__meta">' + esc(p.meta || "") + "</span>" +
      '<span class="am-card__price">' + price + "</span>" +
      "</a>";
  }

  if (grid) {
    fetch("products.json").then(function (r) { return r.ok ? r.json() : []; }).then(function (products) {
      if (!Array.isArray(products)) products = [];
      var active = "all";
      function render() {
        var cat = CATS.filter(function (c) { return c.key === active; })[0] || CATS[0];
        var list = products.filter(cat.match);
        grid.innerHTML = list.length ? list.map(cardHTML).join("") :
          '<p style="color:var(--muted)">אין פריטים בקטגוריה זו כרגע.</p>';
      }
      if (filtersEl) {
        filtersEl.innerHTML = CATS.filter(function (c) {
          return c.key === "all" || products.some(c.match);
        }).map(function (c) {
          var n = c.key === "all" ? products.length : products.filter(c.match).length;
          return '<button type="button" class="am-filter" data-cat="' + c.key + '" aria-pressed="' +
            (c.key === "all" ? "true" : "false") + '">' + c.label + "<small>" + n + "</small></button>";
        }).join("");
        filtersEl.addEventListener("click", function (e) {
          var btn = e.target.closest(".am-filter");
          if (!btn) return;
          active = btn.getAttribute("data-cat");
          filtersEl.querySelectorAll(".am-filter").forEach(function (b) {
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
          });
          render();
        });
      }
      render();
    }).catch(function () { if (grid) grid.innerHTML = '<p style="color:var(--muted)">לא ניתן לטעון את הקולקציה.</p>'; });
  }

  // ---- Accessibility menu (built dynamically; on every page) ----
  (function () {
    var KEY = "amlani-a11y";
    var state = { size: 1, contrast: false, gray: false, links: false, font: false, spacing: false, still: false };
    try { Object.assign(state, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}

    var TOGGLES = [
      { k: "contrast", label: "ניגודיות גבוהה", cls: "a11y-contrast" },
      { k: "gray", label: "גווני אפור", cls: "a11y-gray" },
      { k: "links", label: "הדגשת קישורים", cls: "a11y-links" },
      { k: "font", label: "גופן קריא", cls: "a11y-font" },
      { k: "spacing", label: "ריווח טקסט", cls: "a11y-spacing" },
      { k: "still", label: "עצירת אנימציות", cls: "a11y-still" }
    ];

    function apply() {
      document.documentElement.style.setProperty("--fs-scale", state.size);
      TOGGLES.forEach(function (t) { document.documentElement.classList.toggle(t.cls, !!state[t.k]); });
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    }

    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "am-a11y-btn"; btn.setAttribute("aria-label", "תפריט נגישות");
    btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "am-a11y");
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="4.5" r="1.8" fill="currentColor" stroke="none"></circle><path d="M5 8.5c2.3.8 4.6 1.1 7 1.1s4.7-.3 7-1.1M12 9.6v4.6m0 0-3 6.3m3-6.3 3 6.3" stroke-linecap="round"></path></svg>';

    var panel = document.createElement("div");
    panel.className = "am-a11y-panel"; panel.id = "am-a11y"; panel.hidden = true;
    panel.innerHTML =
      '<h2>נגישות</h2>' +
      '<div class="am-a11y-size" role="group" aria-label="גודל טקסט">' +
        '<button type="button" data-size="-">א−</button>' +
        '<button type="button" data-size="0">איפוס</button>' +
        '<button type="button" data-size="+">א+</button>' +
      '</div>' +
      '<div class="am-a11y-toggles">' +
        TOGGLES.map(function (t) {
          return '<button type="button" data-tog="' + t.k + '" aria-pressed="false">' + t.label + "</button>";
        }).join("") +
      '</div>' +
      '<a href="accessibility.html">להצהרת הנגישות</a>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    function sync() {
      panel.querySelectorAll("[data-tog]").forEach(function (b) {
        b.setAttribute("aria-pressed", state[b.getAttribute("data-tog")] ? "true" : "false");
      });
    }
    function setOpen(open) {
      panel.hidden = !open; btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    btn.addEventListener("click", function () { setOpen(panel.hidden); sync(); });
    panel.addEventListener("click", function (e) {
      var s = e.target.getAttribute && e.target.getAttribute("data-size");
      var t = e.target.getAttribute && e.target.getAttribute("data-tog");
      if (s) {
        if (s === "+") state.size = Math.min(1.5, +(state.size + 0.1).toFixed(2));
        else if (s === "-") state.size = Math.max(0.85, +(state.size - 0.1).toFixed(2));
        else state.size = 1;
        apply();
      } else if (t) { state[t] = !state[t]; apply(); sync(); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    apply(); sync();
  })();
})();

(function(){function fr(p){var f=String(p&&p.cover_frame||"").trim().split(/\s+/).map(Number);return f.length===3&&!f.some(isNaN)?f:null;}var map=null;function apply(){if(!map)return;document.querySelectorAll(".am-card__frame img, .am-pd__frame img").forEach(function(img){var f=map[img.getAttribute("src")];if(!f)return;img.style.objectFit="contain";img.style.translate=f[0]+"% "+f[1]+"%";img.style.scale=String(f[2]);});}fetch("/products.json",{cache:"no-store"}).then(function(r){return r.ok?r.json():[];}).then(function(ps){map={};(ps||[]).forEach(function(p){var f=fr(p);if(f&&p.cover)map[p.cover]=f;});apply();new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});}).catch(function(){});})();
