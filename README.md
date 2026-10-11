# Amlani · אתר תכשיטים בעבודת יד

אתר סטטי (HTML/CSS/JS) בעברית (RTL) של **Amlani** — תכשיטי כסף וזהב בעבודת יד
עם אבני חן טבעיות, מאת חגית עמלני (קיבוץ שמיר, גליל עליון).

האתר עצמו נמצא בתיקיית [`site/`](site/). התיעוד המלא (מבנה, הרצה מקומית,
הוספת מוצרים, פריסה) נמצא ב-[`site/README.md`](site/README.md).

## הרצה מקומית
```bash
cd site
python -m http.server 8777
```
ואז לפתוח בדפדפן: http://localhost:8777

> חשוב: לא לפתוח את הקבצים בלחיצה כפולה (file://) — תמיד דרך שרת או אחסון אמיתי.

## מבנה
- `site/` — האתר (index, collection, product, sizes, accessibility, privacy + styles.css, data.js, common.js, assets/)
- `Photos/`, `Videos/`, `Carousels/`, `logo.jpg` — חומרי מקור מהאינסטגרם (לבחירת תמונות/סרטונים)

## פריסה
אתר סטטי — אפשר לפרוס ל-Netlify (גרירת תיקיית `site`) או לחבר ריפו זה ל-Netlify
לפרסום אוטומטי. פרטים ב-`site/README.md`.
