/* Amlani CMS — styled live preview so editing looks like the real site.
   Sveltia exposes `CMS`, `html` (HTM), `h`, `createClass` globally after load. */
(function () {
  // 1) Load the real site stylesheet + fonts into the preview iframe,
  //    so previews use the site's colors, type and RTL — not the admin chrome.
  CMS.registerPreviewStyle(
    "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Assistant:wght@300;400;500;600&display=swap');",
    { raw: true }
  );
  CMS.registerPreviewStyle("/styles.css");
  CMS.registerPreviewStyle(
    "body{direction:rtl;background:var(--cream,#fff);margin:0;padding:20px;font-family:var(--font-body,'Assistant',sans-serif)}img{max-width:100%}",
    { raw: true }
  );

  // 2) Product preview — mirrors the real product page layout + classes.
  var ProductPreview = function (props) {
    var entry = props.entry;
    var getAsset = props.getAsset;
    var val = function (k) {
      var v = entry.getIn(["data", k]);
      return v && v.toJS ? v.toJS() : v;
    };
    var name = val("name") || "שם המוצר";
    var meta = val("meta") || "";
    var short = val("short") || "";
    var price = val("price") || "";
    var cover = entry.getIn(["data", "cover"]);
    var coverAsset = cover ? getAsset(cover) : null;
    var coverUrl = coverAsset ? coverAsset.url : cover ? "/" + cover : "";
    var longs = val("long") || [];
    var details = val("details") || [];

    return html`
      <div dir="rtl" class="product-inner">
        <div class="pg-layout">
          <div class="pg-gallery">
            <div class="pg-main">
              ${coverUrl
                ? html`<img src=${coverUrl} alt=${name} />`
                : html`<div style="aspect-ratio:4/5;background:#eee;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#999">אין תמונה</div>`}
            </div>
          </div>
          <div class="pg-info">
            <p class="pg-meta">${meta}</p>
            <h1>${name}</h1>
            ${price
              ? html`<p style="font-weight:600;font-size:1.25rem;color:var(--clay,#9E2B22);margin:.2rem 0 1rem">${price}</p>`
              : ""}
            <div class="pg-long">
              ${short ? html`<p>${short}</p>` : ""}
              ${longs.map(function (t) {
                return html`<p>${t}</p>`;
              })}
            </div>
            ${details.length
              ? html`<dl class="pg-specs">
                  ${details.map(function (d) {
                    return html`<div class="pg-spec"><dt>${d.label}</dt><dd>${d.value}</dd></div>`;
                  })}
                </dl>`
              : ""}
          </div>
        </div>
      </div>
    `;
  };

  CMS.registerPreviewTemplate("products", ProductPreview);

  // 3) Home-page preview — hero / story / custom sections in site type & color.
  var br = function (text) {
    // render literal "<br />" in a stored string as real line breaks
    var parts = String(text || "").split(/<br\s*\/?>/i);
    return parts.map(function (p, i) {
      return html`${i ? html`<br />` : ""}${p}`;
    });
  };
  var HomePreview = function (props) {
    var e = props.entry;
    var g = function (path) {
      return e.getIn(["data"].concat(path)) || "";
    };
    return html`
      <div dir="rtl" style="max-width:720px;margin:0 auto;padding:8px 4px">
        <section style="text-align:center;padding:1rem 0 2rem">
          <p class="eyebrow">${g(["hero", "eyebrow"])}</p>
          <h1 style="font-size:2.4rem;line-height:1.15;margin:.3rem 0">${br(g(["hero", "title"]))}</h1>
          <p class="lede">${g(["hero", "lede"])}</p>
        </section>
        <hr style="border:none;border-top:1px solid rgba(0,0,0,.12);margin:1.5rem 0" />
        <section style="padding:1rem 0">
          <p class="eyebrow">${g(["story", "eyebrow"])}</p>
          <h2 style="font-size:1.9rem;margin:.3rem 0 1rem">${g(["story", "heading"])}</h2>
          <p>${g(["story", "p1"])}</p>
          <p>${g(["story", "p2"])}</p>
          <p>${g(["story", "p3"])}</p>
        </section>
        <hr style="border:none;border-top:1px solid rgba(0,0,0,.12);margin:1.5rem 0" />
        <section style="padding:1rem 0">
          <p class="eyebrow">הזמנה אישית</p>
          <h2 style="font-size:1.9rem;margin:.3rem 0 1rem">${g(["custom", "heading"])}</h2>
          <p class="custom-lede">${g(["custom", "lede"])}</p>
        </section>
      </div>
    `;
  };
  CMS.registerPreviewTemplate("home", HomePreview);
})();
