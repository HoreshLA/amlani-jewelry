# Admin CMS for Amlani — Design Spec

**תאריך:** 2026-10-11
**מטרה:** לאפשר לחגית (לא־טכנית) להתחבר ולערוך את האתר בממשק גרפי בעברית — מוצרים, מחירים, תמונות, וטקסטי דף הבית — בלי לגעת בקוד, כך שכל שינוי מתפרסם אוטומטית לאתר החי.

---

## 1. החלטות שאושרו

- **CMS:** Sveltia CMS (יורש מודרני ל־Decap, תמיכה טובה ב־RTL/עברית, קובץ יחיד מ־CDN, חינמי).
- **Backend / התחברות:** GitHub backend עם OAuth של Netlify (בלי Netlify Identity שהוצא משימוש, בלי Cloudflare Worker). חגית מתחברת עם חשבון GitHub חינמי שיוזמן ל־repo עם הרשאת write.
- **מקור נתונים:** כל מוצר קובץ JSON נפרד ב־`site/content/products/` (folder collection — slug אוטומטי מהשם). טקסטי דף הבית ב־`site/content/home.json`. מספר וואטסאפ ב­־`site/content/site.json`.
- **בנייה זעירה ב־Netlify:** סקריפט Node ללא תלויות שמאחד את קבצי המוצרים ל־`site/products.json`, ומזריק את טקסטי `home.json` לתוך אזורים מסומנים ב־`index.html` (לשמירת SEO — הטקסט נשאר ב־HTML סטטי).
- **טעינה בזמן ריצה:** `collection.html` ו־`product.html` טוענים `products.json` ב־`fetch` עם `cache:'no-store'` (תמיד עדכני, בלי בעיית cache). `common.js` טוען `site.json` למספר הוואטסאפ.

---

## 2. מבנה קבצים (אחרי השינוי)

```
/ (repo root)
  netlify.toml              # חדש: build command + publish dir
  build.js                  # חדש: Node, ללא תלויות
  site/                     # publish directory (קיים)
    admin/
      index.html            # חדש: טוען את Sveltia
      config.yml            # חדש: הגדרת ה-CMS
    content/                # חדש: מקור האמת שה-CMS עורך
      products/
        ring-labradorite.json
        ring-silver-wide.json
        ...                 # 12 קבצים (המרה מ-data.js הקיים)
      home.json
      site.json
    products.json           # נוצר ע"י build; מחויב ל-git לצורך dev מקומי
    index.html              # עם אזורי <!--cms:key-->...<!--/cms:key-->
    collection.html         # שינוי: fetch products.json
    product.html            # שינוי: fetch products.json
    common.js               # שינוי: fetch site.json למספר וואטסאפ
    data.js                 # נמחק (מוחלף ע"י content/ + products.json)
    styles.css              # ללא שינוי
    ...שאר העמודים ללא שינוי
```

---

## 3. מודל נתונים

### 3.1 מוצר — `site/content/products/<slug>.json`
```json
{
  "name": "טבעת לברדוריט",
  "meta": "כסף 925 · לברדוריט טבעי",
  "cats": ["rings", "stones"],
  "price": "",
  "cover": "assets/products/ring-labradorite.jpg",
  "gallery": [
    { "type": "image", "src": "assets/products/ring-labradorite.jpg", "alt": "טבעת כסף רחבה משובצת לברדוריט" }
  ],
  "short": "אבן לברדוריט עם ברק כחול-ירוק...",
  "long": ["פסקה ראשונה...", "פסקה שנייה..."],
  "details": [
    { "label": "מתכת", "value": "כסף סטרלינג 925" }
  ],
  "wa": "שלום, התעניינתי בטבעת הלברדוריט 💍 אשמח לפרטים, מידות ומחיר"
}
```
- **id/slug:** שם הקובץ (ללא `.json`). Sveltia יוצר אותו אוטומטית מהשם בלועזית בעת יצירת מוצר חדש → חגית לא מזינה id ידנית.
- **cats:** מערך (היה מחרוזת מופרדת ברווחים ב-data.js). ערכים אפשריים: `rings`, `necklaces`, `bracelets`, `stones`. ב-CMS = בחירה מרובה מרשימה עם תוויות עברית.
- **price:** חדש. מחרוזת חופשית (למשל `"₪450"`) או ריק. **לא מוצג באתר ב-v1** (ראה §8) — נאסף עכשיו, יוצג כשנחליט.
- שאר השדות: זהים ל-data.js הקיים.

### 3.2 טקסטי דף הבית — `site/content/home.json`
מפתחות לכל אזור טקסט נערך ב-index.html. ייקבעו במדויק בזמן המימוש לפי האזורים הקיימים (hero כותרת/תת-כותרת, "הסיפור שלי", "החומרים", "הזמנה אישית", "יצירת קשר"). כל מפתח → אזור `<!--cms:key-->...<!--/cms:key-->` תואם ב-index.html.

### 3.3 הגדרות אתר — `site/content/site.json`
```json
{ "whatsapp": "972502023525" }
```

---

## 4. סקריפט הבנייה — `build.js` (Node, ללא תלויות)

רץ ב-Netlify בכל פרסום (`node build.js`). שתי פעולות בלבד:

1. **איחוד מוצרים:** קורא את כל `site/content/products/*.json`, מוסיף לכל אחד `id` (= שם הקובץ), כותב מערך ל-`site/products.json`. סדר: אלפביתי לפי שם קובץ (או שדה סדר עתידי — YAGNI כרגע).
2. **הזרקת טקסטים:** קורא `site/content/home.json`; לכל מפתח, מחליף את התוכן בין `<!--cms:key-->` ל-`<!--/cms:key-->` ב-`site/index.html`. **אידמפוטנטי** — הסימונים נשארים, רק התוכן הפנימי מוחלף, כך שהרצות חוזרות בטוחות.

הסקריפט לא מוסיף תלויות npm (רק מודול `fs` המובנה). נכתב עם בדיקת-עצמי קטנה (ראה §9).

---

## 5. הגדרת ה-CMS — `site/admin/`

### 5.1 `admin/index.html`
עמוד מינימלי שטוען את Sveltia מ-CDN:
```html
<!doctype html><html lang="he" dir="rtl"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ניהול · Amlani</title></head><body>
<script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
</body></html>
```
(גרסה תיונעל בזמן המימוש; CDN מדויק יאומת.)

### 5.2 `admin/config.yml`
- `backend: { name: github, repo: HoreshLA/amlani-jewelry, branch: main, base_url: <Netlify OAuth> }`
- `media_folder: "site/assets/products"`, `public_folder: "assets/products"`
- **collections:**
  - `products` — folder collection על `site/content/products`, `create: true`, שדות כמו §3.1, תוויות בעברית, widget מתאים לכל שדה (string / list / image / select / markdown).
  - `home` — file collection על `site/content/home.json`.
  - `site` — file collection על `site/content/site.json`.

---

## 6. שינויים בעמודי האתר

- **`collection.html`** (~שורה 87): במקום `var products = window.AMLANI_PRODUCTS || []` → `fetch('products.json', {cache:'no-store'})` ואז הרינדור הקיים. התאמת סינון `cats` ממחרוזת למערך.
- **`product.html`** (~שורה 88): אותו שינוי — fetch, ואז רינדור המוצר הקיים.
- **`common.js`** (~שורה 7): `fetch('site.json', {cache:'no-store'})` לקבלת `whatsapp`, ואז חיווט קישורי `[data-wa]` ו-`waLink` (ברירת מחדל נשמרת אם ה-fetch נכשל).
- **כל 6 העמודים:** הסרת `<script src="data.js?v=1">`.
- **`index.html`:** הוספת אזורי `<!--cms:key-->...<!--/cms:key-->` סביב הטקסטים הנערכים (ללא שינוי ויזואלי).
- **מחיקת `data.js`.**

---

## 7. פריסה והתחברות (הגדרה חד-פעמית)

1. **`netlify.toml`:** `[build] command = "node build.js"`, `publish = "site"`.
2. **GitHub OAuth App:** רישום אפליקציה ב-GitHub (Settings → Developer settings → OAuth Apps), callback ל-endpoint של Netlify.
3. **Netlify:** הזנת client id/secret של ה-OAuth כדי להפעיל את ה-OAuth המובנה.
4. **חגית:** פתיחת חשבון GitHub חינמי → הזמנה ל-repo עם הרשאת write. מאז היא נכנסת ל-`/admin`, לוחצת "Sign in with GitHub", ועורכת.

ערכי ה-OAuth המדויקים והצעדים ב-Netlify יאומתו מול התיעוד בזמן המימוש (הם משתנים לפעמים).

---

## 8. מה מחוץ ל-scope של v1 (YAGNI)

- **הצגת מחיר באתר** — השדה נאסף אבל לא מוצג. הצגה = שינוי קטן נפרד כשתחליטו.
- **תשלום אונליין** — שלב עתידי נפרד לגמרי (CLAUDE.md).
- **ניהול הרשאות/תפקידים ב-CMS** — יורש מהרשאות ה-repo ב-GitHub. אין צורך במנגנון נוסף.
- **מניעת קונפליקטים בעריכה מרובת-משתמשים** — עורכת אחת בפועל; לא רלוונטי.
- **עריכת טקסטים בעמודי נגישות/פרטיות/מידות** — משתנים נדירות; נערכים ע"י Horesh לפי בקשה. אפשר להוסיף כ-collection בהמשך אם יידרש.

---

## 9. בדיקות

- **`build.js`:** בדיקת-עצמי (`node build.js --self-test` או בלוק בתחתית) שמריצה על fixture קטן ומוודאת: (א) מוצר בודד מתאחד נכון עם id; (ב) הזרקת home.json אידמפוטנטית — הרצה פעמיים נותנת פלט זהה. assert בלבד, ללא framework.
- **ידני אחרי מימוש:** הרצת האתר מקומית (`cd site && python -m http.server 8777`) ובדיקה ש-collection/product/index נטענים זהה למצב הקיים; הרצת `node build.js` ווידוא שהפלט תקין; פרסום ל-Netlify ובדיקת כניסה ל-`/admin`.

---

## 10. סיכונים

- **CDN/גרסת Sveltia** — ננעל לגרסה; נאמת שה-URL פעיל בזמן המימוש.
- **OAuth setup** — החלק הכי fiddly; תלוי בתיעוד עדכני של Netlify/Sveltia. אם נתקע — fallback ל-Decap עם אותו GitHub backend.
- **SEO** — נפתר ע"י הזרקת טקסט ב-build (טקסט נשאר ב-HTML). המוצרים ממילא נטענו ב-JS גם קודם.
