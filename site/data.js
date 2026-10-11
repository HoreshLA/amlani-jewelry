/* ======================================================
   amlani · single source of truth for products
   Used by collection.html and product.html
   ====================================================== */

window.WHATSAPP_NUMBER = "972502023525"; // ← change the number here once

/* Each product:
   id       – slug used in product.html?id=…
   name     – Hebrew title
   meta     – material line
   cats     – filter tags: rings | necklaces | stones (space separated)
   cover    – card / main image
   gallery  – array of media { type:'image'|'video', src, alt }
   short    – one-line description (collection card)
   long     – array of paragraphs (product page)
   details  – array of {label,value} spec rows
   wa       – prefilled WhatsApp message
*/
window.AMLANI_PRODUCTS = [
  {
    id: "ring-labradorite",
    name: "טבעת לברדוריט",
    meta: "כסף 925 · לברדוריט טבעי",
    cats: "rings stones",
    cover: "assets/products/ring-labradorite.jpg",
    gallery: [
      { type: "image", src: "assets/products/ring-labradorite.jpg", alt: "טבעת כסף רחבה משובצת לברדוריט" }
    ],
    short: "אבן לברדוריט עם ברק כחול-ירוק, בתושבת כסף רחבה ומרוקעת ביד.",
    long: [
      "לברדוריט היא אבן של אור — בכל תנועה היא מגלה גוון אחר של כחול, ירוק וזהוב. כאן היא יושבת בתושבת כסף 925 רחבה, שנבנתה ורוקעה ביד סביב האבן.",
      "כל אבן ייחודית, ולכן גם הברק וגוני הצבע משתנים מטבעת לטבעת. פריט שמרגישים בו את החומר האמיתי."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "אבן", value: "לברדוריט טבעי" },
      { label: "מידה", value: "בהתאמה אישית" }
    ],
    wa: "שלום, התעניינתי בטבעת הלברדוריט 💍 אשמח לפרטים, מידות ומחיר"
  },
  {
    id: "ring-silver-wide",
    name: "טבעות כסף רחבות",
    meta: "כסף 925 · מלוטש",
    cats: "rings",
    cover: "assets/products/ring-silver-wide.jpg",
    gallery: [
      { type: "image", src: "assets/products/ring-silver-wide.jpg", alt: "שתי טבעות כסף רחבות וחלקות על יד" },
      { type: "image", src: "assets/mood/rings-wine-bw.jpg", alt: "טבעות כסף רחבות אוחזות כוס יין, בשחור-לבן" }
    ],
    short: "קו נקי ומעוגל, נעים למגע. יפות כבודדות או כסט מוערם.",
    long: [
      "טבעות כסף רחבות עם פרופיל מעוגל ומלוטש — נוכחות רכה ונקייה שמתאימה לכל יום.",
      "אפשר לענוד בודדת לאמירה מינימלית, או להעמיד כמה יחד לצד משוחרר ומודרני."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "גימור", value: "מלוטש / מָט לבחירה" },
      { label: "מידה", value: "בהתאמה אישית" }
    ],
    wa: "שלום, התעניינתי בטבעות הכסף הרחבות 💍 אשמח לפרטים, מידות ומחיר"
  },
  {
    id: "ring-bark-texture",
    name: "טבעת מרקם קליפת עץ",
    meta: "כסף 925 · מרקם ידני",
    cats: "rings",
    cover: "assets/products/ring-bark-texture.jpg",
    gallery: [
      { type: "image", src: "assets/products/ring-bark-texture.jpg", alt: "טבעת כסף במרקם קליפת עץ מונחת על גזע" }
    ],
    short: "מרקם אורגני שנחקק ביד, בהשראת קליפת עץ. כל טבעת שונה מעט מחברתה.",
    long: [
      "מרקם עשיר שנחקק ידנית במתכת, בהשראת קליפת עץ ופני טבע. הטבעת מרגישה חיה ומחוספסת בדיוק במידה הנכונה.",
      "כמו בטבע — אין שתי טבעות זהות. כל אחת נושאת את החתימה של הרגע שבו נוצרה."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "מרקם", value: "חקיקה ידנית" },
      { label: "מידה", value: "בהתאמה אישית" }
    ],
    wa: "שלום, התעניינתי בטבעת מרקם קליפת העץ 💍 אשמח לפרטים, מידות ומחיר"
  },
  {
    id: "ring-hammered-set",
    name: "טבעות מרוקעות · סט",
    meta: "כסף 925 · ריקוע ידני",
    cats: "rings",
    cover: "assets/products/ring-hammered-set.jpg",
    gallery: [
      { type: "image", src: "assets/products/ring-hammered-set.jpg", alt: "שלוש טבעות כסף דקות ומרוקעות" },
      { type: "video", src: "assets/videos/v-rings-hammered.mp4", alt: "סרטון של הטבעות המרוקעות" }
    ],
    short: "שלוש טבעות דקות עם ריקוע עדין שתופס אור. יפות להערמה יחד.",
    long: [
      "סט של שלוש טבעות דקות, כל אחת מרוקעת ביד כך שהמשטח תופס את האור בעדינות ומנצנץ בתנועה.",
      "מושלמות להערמה יחד על אצבע אחת, או לפיזור בין כמה אצבעות למראה חופשי."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "כמות", value: "סט של 3 (או בודדת)" },
      { label: "מידה", value: "בהתאמה אישית" }
    ],
    wa: "שלום, התעניינתי בסט הטבעות המרוקעות 💍 אשמח לפרטים, מידות ומחיר"
  },
  {
    id: "pendant-gold-sun",
    name: "תליון שמש",
    meta: "זהב · יצוק ומרוקע ביד",
    cats: "necklaces",
    cover: "assets/products/pendant-gold-sun.jpg",
    gallery: [
      { type: "image", src: "assets/products/pendant-gold-sun.jpg", alt: "תליון שמש מזהב על חוט, מול נוף ים" },
      { type: "image", src: "assets/mood/gold-sun-worn.jpg", alt: "תליון השמש מזהב ענוד על הצוואר" }
    ],
    short: "שמש קטנה עם קרניים אורגניות. תלויה על חוט עדין — ביום ובערב.",
    long: [
      "תליון שמש עם קרניים אורגניות, יצוק ומרוקע ביד לגימור חם ומעט לא-סימטרי — בדיוק כמו שמש אמיתית.",
      "תלוי על חוט עדין ומתאים בול לכל אורך. חמים על עור שזוף, יפה גם על לבן."
    ],
    details: [
      { label: "מתכת", value: "זהב, בעבודת יד" },
      { label: "שרשרת", value: "חוט עדין, אורך לבחירה" },
      { label: "עיצוב", value: "יצוק ומרוקע ביד" }
    ],
    wa: "שלום, התעניינתי בתליון השמש ☀️ אשמח לפרטים ומחיר"
  },
  {
    id: "necklace-chalcedony",
    name: "שרשרת צ'לסדוני",
    meta: "זהב · אבן צ'לסדוני טבעית",
    cats: "necklaces stones",
    cover: "assets/products/necklace-chalcedony.jpg",
    gallery: [
      { type: "image", src: "assets/products/necklace-chalcedony.jpg", alt: "שרשרת זהב עם תליון אבן צ'לסדוני ירוקה" }
    ],
    short: "אבן בגוון תכלת-ירוק בתושבת זהב מרוקעת, על צווארון קשיח מעודן.",
    long: [
      "אבן צ'לסדוני בגוון תכלת-ירוק רך, בתושבת זהב מרוקעת שמדגישה את העומק שלה.",
      "יושבת על צווארון קשיח ומעודן שנח יפה על עצם הבריח — תכשיט אמירה שקט ובוגר."
    ],
    details: [
      { label: "מתכת", value: "זהב, בעבודת יד" },
      { label: "אבן", value: "צ'לסדוני טבעי" },
      { label: "עיצוב", value: "צווארון קשיח" }
    ],
    wa: "שלום, התעניינתי בשרשרת הצ'לסדוני 💚 אשמח לפרטים ומחיר"
  },
  {
    id: "ring-gold-wide",
    name: "טבעות זהב רחבות",
    meta: "זהב · מרקם ומלוטש",
    cats: "rings",
    cover: "assets/products/ring-gold-wide.jpg",
    gallery: [
      { type: "image", src: "assets/products/ring-gold-wide.jpg", alt: "טבעות זהב רחבות על יד" }
    ],
    short: "נוכחות חמה וגדולה. מבחר רוחבים ומרקמים, לבד או בערמה.",
    long: [
      "טבעות זהב רחבות עם נוכחות חמה ונדיבה. חלקן מלוטשות וחלקן במרקם ידני עדין.",
      "יפות כטבעת הצהרה בודדת, או מוערמות יחד לערב שדורש קצת יותר."
    ],
    details: [
      { label: "מתכת", value: "זהב, בעבודת יד" },
      { label: "גימור", value: "מלוטש / מרקם לבחירה" },
      { label: "מידה", value: "בהתאמה אישית" }
    ],
    wa: "שלום, התעניינתי בטבעות הזהב הרחבות 🧡 אשמח לפרטים, מידות ומחיר"
  },
  {
    id: "ring-moonstone-aqua",
    name: "טבעת אבן ירח ואקוומרין",
    meta: "כסף 925 · שתי אבנים טבעיות",
    cats: "rings stones",
    cover: "assets/products/ring-moonstone-aqua.jpg",
    gallery: [
      { type: "image", src: "assets/products/ring-moonstone-aqua.jpg", alt: "טבעת כסף פתוחה עם אבן ירח ואקוומרין גולמי" },
      { type: "image", src: "assets/mood/hero-hand-dandelion.jpg", alt: "הטבעת ענודה על יד המחזיקה פרח שן-הארי" },
      { type: "video", src: "assets/videos/v-moonstone.mp4", alt: "סרטון של טבעת אבן הירח והאקוומרין" }
    ],
    short: "אבן ירח מלוטשת מול אקוומרין גולמי, בטבעת פתוחה שמתאימה לכל אצבע.",
    long: [
      "מפגש בין שתי אבנים: אבן ירח מלוטשת עם ברק כחלחל, מול אקוומרין גולמי שנשאר קרוב לצורתו הטבעית.",
      "הטבעת פתוחה מאחור, כך שאותה טבעת מתאימה למגוון מידות ואצבעות — ומתקבלת נהדר גם כמתנה."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "אבנים", value: "אבן ירח · אקוומרין גולמי" },
      { label: "מידה", value: "טבעת פתוחה, גמישה" }
    ],
    wa: "שלום, התעניינתי בטבעת אבן הירח והאקוומרין 💍 אשמח לפרטים ומחיר"
  },
  {
    id: "ring-turquoise-quartz",
    name: "טבעת טורקיז וקוורץ ורוד",
    meta: "כסף 925 · טורקיז · רוז קוורץ",
    cats: "rings stones",
    cover: "assets/products/ring-turquoise-quartz.jpg",
    gallery: [
      { type: "image", src: "assets/products/ring-turquoise-quartz.jpg", alt: "טבעת כסף עם טורקיז וקוורץ ורוד" }
    ],
    short: "שילוב של טורקיז חמים וקוורץ ורוד רך, בטבעת פתוחה ומינימלית.",
    long: [
      "טורקיז בגוון ים חמים לצד רוז קוורץ ורוד ורך — שתי אבנים גולמיות שיושבות בטבעת כסף פתוחה ומינימלית.",
      "צירוף עדין של צבע ואנרגיה, לכל יום ולכל מצב רוח."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "אבנים", value: "טורקיז · רוז קוורץ" },
      { label: "מידה", value: "טבעת פתוחה, גמישה" }
    ],
    wa: "שלום, התעניינתי בטבעת הטורקיז והקוורץ 💍 אשמח לפרטים ומחיר"
  },
  {
    id: "necklace-citrine-garnet",
    name: "שרשרת סיטרין וגארנט",
    meta: "כסף 925 · סיטרין · גארנט",
    cats: "necklaces stones",
    cover: "assets/products/necklace-citrine-garnet.jpg",
    gallery: [
      { type: "image", src: "assets/products/necklace-citrine-garnet.jpg", alt: "שרשרת עדינה עם סיטרין וגארנט מול שקיעה" }
    ],
    short: "שתי אבנים מלוטשות — צהוב חמים ואדום עמוק — על שרשרת דקה ומנצנצת.",
    long: [
      "סיטרין בגוון צהוב חמים לצד גארנט אדום עמוק, שתיהן מלוטשות ומשובצות בכסף על שרשרת דקה ומנצנצת.",
      "עדינה ובכל זאת נוכחת — יפה לבד או בשכבות עם שרשראות נוספות."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "אבנים", value: "סיטרין · גארנט" },
      { label: "שרשרת", value: "אורך לבחירה" }
    ],
    wa: "שלום, התעניינתי בשרשרת הסיטרין והגארנט ✨ אשמח לפרטים ומחיר"
  },
  {
    id: "ring-green-tourmaline",
    name: "טבעת טורמלין ירוק",
    meta: "כסף 925 · טורמלין טבעי",
    cats: "rings stones",
    cover: "assets/products/ring-green-tourmaline.jpg",
    gallery: [
      { type: "image", src: "assets/products/ring-green-tourmaline.jpg", alt: "טבעת כסף עם טורמלין ירוק" }
    ],
    short: "טורמלין ירוק בתושבת ציפורניים עשויה ביד, עם אופי גולמי ואמיתי.",
    long: [
      "טורמלין ירוק עם אופי גולמי, מוחזק בתושבת ציפורניים שנבנתה ביד סביב האבן.",
      "טבעת עם נשמה — האבן שומרת על המראה הטבעי שלה, בלי לזייף שום דבר."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "אבן", value: "טורמלין ירוק טבעי" },
      { label: "מידה", value: "בהתאמה אישית" }
    ],
    wa: "שלום, התעניינתי בטבעת הטורמלין הירוק 💚 אשמח לפרטים ומחיר"
  },
  {
    id: "pendant-silver-texture",
    name: "תליון כסף במרקם",
    meta: "כסף 925 · יציקה ידנית",
    cats: "necklaces",
    cover: "assets/products/pendant-silver-texture.jpg",
    gallery: [
      { type: "image", src: "assets/products/pendant-silver-texture.jpg", alt: "תליון כסף ארוך במרקם עשיר בעבודת יד" }
    ],
    short: "תליון פסל קטן — מרקם עשיר ולא-שגרתי, אמירה שקטה על הצוואר.",
    long: [
      "תליון שהוא כמעט פסל קטן: מרקם עשיר ולא-שגרתי שנוצק ביד, עם משחק אור וצל לאורך כל המשטח.",
      "אמירה אמנותית ושקטה — לאנשים שאוהבים תכשיט עם סיפור."
    ],
    details: [
      { label: "מתכת", value: "כסף סטרלינג 925" },
      { label: "עיצוב", value: "יציקה ידנית" },
      { label: "שרשרת", value: "אורך לבחירה" }
    ],
    wa: "שלום, התעניינתי בתליון הכסף במרקם 🤍 אשמח לפרטים ומחיר"
  }
];
