import { LanguageOption } from "./language.interface";

export const LANGUAGES: LanguageOption[] = [
  // --- Tier 1 (core) ---
  {
    code: "ua",
    label: "Українська",
    flagSrc: "flags/ukraine.svg",
    htmlLang: "uk",
  },
  {
    code: "en",
    label: "English",
    flagSrc: "flags/united-kingdom.svg",
    htmlLang: "en",
  },

  // --- Tier 2 (high priority EU) ---
  {
    code: "pl",
    label: "Polski",
    flagSrc: "flags/poland.svg",
    htmlLang: "pl",
  },
  {
    code: "de",
    label: "Deutsch",
    flagSrc: "flags/germany.svg",
    htmlLang: "de",
  },

  // --- Tier 4 (secondary EU) ---
  {
    code: "fr",
    label: "Français",
    flagSrc: "flags/france.svg",
    htmlLang: "fr",
  },
  {
    code: "es",
    label: "Español",
    flagSrc: "flags/spain.svg",
    htmlLang: "es",
  },
  {
    code: "it",
    label: "Italiano",
    flagSrc: "flags/italy.svg",
    htmlLang: "it",
  },
  {
    code: "nl",
    label: "Nederlands",
    flagSrc: "flags/netherlands.svg",
    htmlLang: "nl",
  },
  {
    code: "pt",
    label: "Português",
    flagSrc: "flags/portugal.svg",
    htmlLang: "pt",
  },

  // --- Tier 5 (regional / optional) ---
  {
    code: "ro",
    label: "Română",
    flagSrc: "flags/romania.svg",
    htmlLang: "ro",
  },
  {
    code: "hu",
    label: "Magyar",
    flagSrc: "flags/hungary.svg",
    htmlLang: "hu",
  },
  {
    code: "cs",
    label: "Čeština",
    flagSrc: "flags/czechia.svg",
    htmlLang: "cs",
  },
  {
    code: "sk",
    label: "Slovenčina",
    flagSrc: "flags/slovakia.svg",
    htmlLang: "sk",
  },
  {
    code: "bg",
    label: "Български",
    flagSrc: "flags/bulgaria.svg",
    htmlLang: "bg",
  },
  {
    code: "hr",
    label: "Hrvatski",
    flagSrc: "flags/croatia.svg",
    htmlLang: "hr",
  },
  {
    code: "sl",
    label: "Slovenščina",
    flagSrc: "flags/slovenia.svg",
    htmlLang: "sl",
  },
  {
    code: "el",
    label: "Ελληνικά",
    flagSrc: "flags/greece.svg",
    htmlLang: "el",
  },
];
