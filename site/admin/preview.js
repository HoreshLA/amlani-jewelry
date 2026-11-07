/* Amlani CMS — styled live preview so editing looks like the real (redesigned) site.
   Sveltia exposes `CMS`, `html` (HTM), `h`, `createClass` globally after load. */
(function () {
  // 1) Load the real site stylesheet + fonts into the preview iframe,
  //    so previews use the new design's colors, type and RTL.
  CMS.registerPreviewStyle(
    "@import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Frank+Ruhl+Libre:wght@300;400;500&display=swap');",
    { raw: true }
  );
  CMS.registerPreviewStyle("/assets/amlani.css");
  CMS.registerPreviewStyle("/assets/amlani-pages.css");
  CMS.registerPreviewStyle(
    "body{direction:rtl;background:var(--ivory,#f6eee4);color:var(--ink,#2b0b12);margin:0;padding:22px;font-family:var(--f-body,'Assistant',sans-serif)}img{max-width:100%}.am-pd{padding:0!important}",
    { raw: true }
  );

  // 2) Product preview — mirrors the real product page layout + am-* classes.
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
      <div dir="rtl" class="am-body" style="background:var(--ivory)">
        <div class="am-pd__grid">
          <div class="am-pd__media">
            <div class="am-pd__frame">
              ${coverUrl
                ? html`<img src=${coverUrl} alt=${name} />`
                : html`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--muted)">אין תמונה</div>`}
            </div>
          </div>
          <div class="am-pd__info">
            <p class="am-pd__meta">${meta}</p>
            <h1>${name}</h1>
            ${price ? html`<p class="am-dialog__price">₪${price}</p>` : ""}
            <div class="am-pd__long">
              ${short ? html`<p>${short}</p>` : ""}
              ${longs.map(function (t) { return html`<p>${t}</p>`; })}
            </div>
            ${details.length
              ? html`<dl class="am-specs">
                  ${details.map(function (d) {
                    return html`<dt>${d.label}</dt><dd>${d.value}</dd>`;
                  })}
                </dl>`
              : ""}
          </div>
        </div>
      </div>
    `;
  };

  CMS.registerPreviewTemplate("products", ProductPreview);

  // 3) Home-page preview — hero / story / custom in the new wine/gold system.
  var br = function (text) {
    var parts = String(text || "").split(/<br\s*\/?>/i);
    return parts.map(function (p, i) { return html`${i ? html`<br />` : ""}${p}`; });
  };
  var HomePreview = function (props) {
    var e = props.entry;
    var g = function (path) { return e.getIn(["data"].concat(path)) || ""; };
    return html`
      <div dir="rtl" class="am-body" style="background:var(--ivory);max-width:760px;margin:0 auto">
        <section style="background:var(--wine);color:var(--ivory);border-radius:16px;padding:34px 26px;text-align:center">
          <div class="am-latin" style="font-family:var(--f-latin);font-size:2.6rem;letter-spacing:.2em;color:var(--gold-pale)">AMLANI</div>
          <span class="am-kicker">${g(["hero", "eyebrow"])}</span>
          <h1 style="font-family:var(--f-display);font-weight:300;font-size:2.4rem;line-height:1.15;margin:.5rem 0;color:var(--ivory)">${br(g(["hero", "title"]))}</h1>
          <p style="color:rgba(246,238,228,.85);max-width:30rem;margin:.6rem auto 0">${g(["hero", "lede"])}</p>
        </section>

        <section style="padding:30px 6px 10px">
          <span class="am-kicker">${g(["story", "eyebrow"])}</span>
          <h2 class="am-section-title" style="color:var(--wine);font-size:2rem;margin:.3rem 0 1rem">${g(["story", "heading"])}</h2>
          <p style="color:#4a2a31;margin:.6rem 0">${g(["story", "p1"])}</p>
          <p style="color:#4a2a31;margin:.6rem 0">${g(["story", "p2"])}</p>
          <blockquote class="am-quote" style="color:var(--wine)">${g(["story", "p3"])}</blockquote>
        </section>

        <section style="background:var(--wine);color:var(--ivory);border-radius:16px;padding:28px 26px;margin-top:20px">
          <span class="am-kicker" style="color:var(--gold)">made for you</span>
          <h2 style="font-family:var(--f-display);font-weight:300;font-size:1.9rem;margin:.3rem 0 .8rem;color:var(--ivory)">${g(["custom", "heading"])}</h2>
          <p style="color:rgba(246,238,228,.85)">${g(["custom", "lede"])}</p>
        </section>
      </div>
    `;
  };
  CMS.registerPreviewTemplate("home", HomePreview);
})();
