// i18n.js

let currentLang = "en";      // current language
let translations = {};       // cached translations

/**
 * Load a language JSON file and apply translations
 * @param {string} lang - "en", "fr", etc.
 */
async function loadLanguage(lang) {
  currentLang = lang;

  try {
    const res = await fetch(`lang/${lang}.json`);
    if (!res.ok) throw new Error("Language file not found");

    translations = await res.json();

    // Apply translations to the whole document
    applyTranslations(document);

    // Set document language for accessibility
    document.documentElement.lang = lang;

    // Remember user's choice
    localStorage.setItem("lang", lang);

  } catch (err) {
    console.error("i18n load error:", err);
  }
}

/**
 * Translate all elements with data-i18n inside a root
 * @param {HTMLElement|Document} root
 */
function applyTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;

    // Only replace text if a translation exists
    if (translations && translations[key]) {
      el.textContent = translations[key];
    }
    // Otherwise leave fallback text intact
  });
}

/**
 * Optional helper to switch language dynamically
 * @param {string} lang
 */
function switchLanguage(lang) {
  loadLanguage(lang);
}
