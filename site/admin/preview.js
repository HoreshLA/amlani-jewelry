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
    var meta = [].concat(val("materials") || [], val("meta") || []).filter(Boolean).join(" · ");
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
                ? html`<img src=${coverUrl} alt=${name} style=${window.amFrameStyle(entry)} />`
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

(function(){var R=window.CMS&&CMS.React;var h=window.h||(R&&R.createElement);function parse(s){var f=String(s||"").trim().split(/\s+/).map(Number);return f.length===3&&!f.some(isNaN)?{x:f[0],y:f[1],z:f[2]}:null;}window.amFrameStyle=function(entry){var v=parse(entry&&entry.getIn(["data","cover_frame"]));return v?{objectFit:"contain",translate:v.x+"% "+v.y+"%",scale:String(v.z)}:undefined;};var ratios={},drag=null;function fill(r){return r?Math.round(Math.max(0.8/r,r/0.8)*100)/100:1;}function Ctl(props){var cover=props.entry&&props.entry.getIn(["data","cover"]);var a=cover&&props.getAsset?props.getAsset(cover):null;var url=a&&a.url?a.url:cover?"/"+cover:"";function base(){return parse(props.value)||{x:0,y:0,z:fill(ratios[url])};}function set(n){props.onChange(Math.round(n.x*10)/10+" "+Math.round(n.y*10)/10+" "+Math.round(n.z*100)/100);}if(!url)return h("p",{style:{opacity:0.7}},"קודם בוחרים תמונת שער, ואז אפשר למקם אותה כאן.");var v=base();return h("div",{dir:"rtl"},h("div",{style:{position:"relative",width:"100%",maxWidth:"300px",aspectRatio:"4 / 5",overflow:"hidden",borderRadius:"12px",background:"#ede1d2",cursor:"grab",touchAction:"none",userSelect:"none"},onPointerDown:function(e){var b=e.currentTarget.getBoundingClientRect();e.currentTarget.setPointerCapture(e.pointerId);drag={sx:e.clientX,sy:e.clientY,v:base(),w:b.width,h:b.height};},onPointerMove:function(e){if(!drag)return;set({x:drag.v.x+(e.clientX-drag.sx)/drag.w*100,y:drag.v.y+(e.clientY-drag.sy)/drag.h*100,z:drag.v.z});},onPointerUp:function(){drag=null;},onPointerCancel:function(){drag=null;}},h("img",{src:url,alt:"",draggable:false,onLoad:function(e){var i=e.currentTarget;ratios[url]=i.naturalWidth/i.naturalHeight;if(!parse(props.value))i.style.scale=String(fill(ratios[url]));},style:{width:"100%",height:"100%",display:"block",objectFit:"contain",translate:v.x+"% "+v.y+"%",scale:String(v.z),pointerEvents:"none"}})),h("label",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"10px",maxWidth:"300px"}},"הקטנה",h("input",{type:"range",min:"0.3",max:"4",step:"0.01",value:v.z,style:{flex:1},onChange:function(e){var b=base();b.z=+e.target.value;set(b);}}),"הגדלה"),h("div",{style:{display:"flex",gap:"8px",marginTop:"8px"}},h("button",{type:"button",onClick:function(){set({x:0,y:0,z:fill(ratios[url])});}},"מילוי המסגרת"),h("button",{type:"button",onClick:function(){set({x:0,y:0,z:1});}},"כל התמונה")),h("p",{style:{fontSize:"13px",opacity:0.75,marginTop:"6px"}},"גררי את התמונה כדי להזיז אותה. הפס מגדיל או מקטין אותה."));}CMS.registerFieldType("imageframe",Ctl);})();
