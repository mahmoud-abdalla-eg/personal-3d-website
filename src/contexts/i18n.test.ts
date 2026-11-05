import { strict as assert } from "node:assert";
import { test, beforeEach, afterEach } from "node:test";
import { getBrowserLanguage, detectInitialLanguage } from "./i18n-context";
import {
  translations,
  SKILL_DESCRIPTIONS_ZH,
  EXPERIENCE_ZH,
  PROJECTS_ZH,
} from "../data/translations";
import { SKILLS, EXPERIENCE } from "../data/constants";
import projects from "../data/projects";
import { config } from "../data/config";
import fs from "node:fs";
import path from "node:path";

test("Language detection: detects Chinese when browser language starts with zh", () => {
  const originalNav = globalThis.navigator;

  // Test various Chinese locales
  for (const locale of ["zh", "zh-CN", "zh-TW", "zh-HK", "zh-SG", "ZH-cn"]) {
    Object.defineProperty(globalThis, "navigator", {
      value: { language: locale, languages: [locale] },
      configurable: true,
      writable: true,
    });
    assert.equal(getBrowserLanguage(), "zh", `Failed to detect Chinese for locale ${locale}`);
  }

  Object.defineProperty(globalThis, "navigator", {
    value: originalNav,
    configurable: true,
    writable: true,
  });
});

test("Language detection: defaults to English for English and all non-Chinese languages", () => {
  const originalNav = globalThis.navigator;

  for (const locale of ["en", "en-US", "en-GB", "fr", "de", "es", "ja", "ar", "ru", ""]) {
    Object.defineProperty(globalThis, "navigator", {
      value: { language: locale, languages: locale ? [locale] : [] },
      configurable: true,
      writable: true,
    });
    assert.equal(getBrowserLanguage(), "en", `Failed to default to English for locale ${locale}`);
  }

  Object.defineProperty(globalThis, "navigator", {
    value: originalNav,
    configurable: true,
    writable: true,
  });
});

test("detectInitialLanguage: respects localStorage preference if set", () => {
  const originalNav = globalThis.navigator;
  const originalLocal = globalThis.localStorage;

  // Mock localStorage
  const storage = new Map<string, string>();
  const mockStorage = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
  };

  Object.defineProperty(globalThis, "localStorage", {
    value: mockStorage,
    configurable: true,
    writable: true,
  });

  // Browser is English, but user selected Chinese in localStorage
  Object.defineProperty(globalThis, "navigator", {
    value: { language: "en-US", languages: ["en-US"] },
    configurable: true,
    writable: true,
  });
  mockStorage.setItem("portfolio-lang", "zh");
  assert.equal(detectInitialLanguage(), "zh");

  // Browser is Chinese, but user selected English in localStorage
  Object.defineProperty(globalThis, "navigator", {
    value: { language: "zh-CN", languages: ["zh-CN"] },
    configurable: true,
    writable: true,
  });
  mockStorage.setItem("portfolio-lang", "en");
  assert.equal(detectInitialLanguage(), "en");

  // No localStorage saved, should fallback to browser detection
  mockStorage.clear();
  assert.equal(detectInitialLanguage(), "zh");

  Object.defineProperty(globalThis, "navigator", {
    value: originalNav,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, "localStorage", {
    value: originalLocal,
    configurable: true,
    writable: true,
  });
});

test("Translations completeness: English and Chinese dictionaries have matching keys", () => {
  const checkKeys = (enObj: any, zhObj: any, path = "") => {
    for (const key of Object.keys(enObj)) {
      const fullPath = path ? `${path}.${key}` : key;
      assert.ok(
        key in zhObj,
        `Missing Chinese translation for key "${fullPath}"`
      );
      if (typeof enObj[key] === "object" && enObj[key] !== null) {
        checkKeys(enObj[key], zhObj[key], fullPath);
      } else {
        assert.equal(typeof zhObj[key], "string", `Value at "${fullPath}" in Chinese must be a string`);
        assert.ok(zhObj[key].length > 0, `Value at "${fullPath}" in Chinese must not be empty`);
      }
    }
  };

  checkKeys(translations.en, translations.zh);
});

test("Translations completeness: All skills have Chinese descriptions", () => {
  for (const skill of Object.values(SKILLS)) {
    assert.ok(
      skill.name in SKILL_DESCRIPTIONS_ZH,
      `Skill "${skill.name}" is missing a Chinese description`
    );
    assert.ok(
      SKILL_DESCRIPTIONS_ZH[skill.name].length > 0,
      `Skill "${skill.name}" Chinese description is empty`
    );
  }
});

test("Translations completeness: All experiences have Chinese translations", () => {
  assert.equal(EXPERIENCE_ZH.length, EXPERIENCE.length);
  for (let i = 0; i < EXPERIENCE.length; i++) {
    const en = EXPERIENCE[i];
    const zh = EXPERIENCE_ZH[i];
    assert.equal(zh.id, en.id);
    assert.ok(zh.title.length > 0);
    assert.ok(zh.company.length > 0);
    assert.equal(zh.description.length, en.description.length);
  }
});

test("Translations completeness: All projects have Chinese translations", () => {
  for (const project of projects) {
    assert.ok(
      project.id in PROJECTS_ZH,
      `Project "${project.id}" is missing Chinese details`
    );
    const zh = PROJECTS_ZH[project.id];
    assert.ok(zh.category.length > 0);
    assert.ok(zh.subtitle.length > 0);
    assert.ok(zh.overview.length > 0);
    assert.ok(zh.features.length > 0);
  }
});

test("Language listener: window languagechange updates language dynamically", () => {
  const originalNav = globalThis.navigator;
  const originalWindow = globalThis.window;
  const originalDoc = globalThis.document;

  const listeners: Record<string, Function[]> = {};
  const mockWindow = {
    addEventListener: (type: string, fn: Function) => {
      listeners[type] = listeners[type] || [];
      listeners[type].push(fn);
    },
    removeEventListener: (type: string, fn: Function) => {
      listeners[type] = (listeners[type] || []).filter((f) => f !== fn);
    },
    dispatchEvent: (event: { type: string }) => {
      (listeners[event.type] || []).forEach((fn) => fn(event));
    },
  };

  const mockDoc = {
    documentElement: { lang: "en" },
  };

  Object.defineProperty(globalThis, "window", {
    value: mockWindow,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, "document", {
    value: mockDoc,
    configurable: true,
    writable: true,
  });

  // Start with English
  Object.defineProperty(globalThis, "navigator", {
    value: { language: "en-US", languages: ["en-US"] },
    configurable: true,
    writable: true,
  });

  let currentLang = getBrowserLanguage();
  assert.equal(currentLang, "en");

  // Simulate user changing browser language to Chinese
  const handleLanguageChange = () => {
    currentLang = getBrowserLanguage();
    mockDoc.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  };
  mockWindow.addEventListener("languagechange", handleLanguageChange);

  // Switch browser setting to Chinese
  Object.defineProperty(globalThis, "navigator", {
    value: { language: "zh-CN", languages: ["zh-CN", "en"] },
    configurable: true,
    writable: true,
  });
  mockWindow.dispatchEvent({ type: "languagechange" });

  assert.equal(currentLang, "zh");
  assert.equal(mockDoc.documentElement.lang, "zh-CN");

  // Switch browser setting to English
  Object.defineProperty(globalThis, "navigator", {
    value: { language: "en-GB", languages: ["en-GB"] },
    configurable: true,
    writable: true,
  });
  mockWindow.dispatchEvent({ type: "languagechange" });

  assert.equal(currentLang, "en");
  assert.equal(mockDoc.documentElement.lang, "en");

  // Switch to non-Chinese language (e.g. French), should default to English
  Object.defineProperty(globalThis, "navigator", {
    value: { language: "fr-FR", languages: ["fr-FR"] },
    configurable: true,
    writable: true,
  });
  mockWindow.dispatchEvent({ type: "languagechange" });

  assert.equal(currentLang, "en");
  assert.equal(mockDoc.documentElement.lang, "en");

  // Cleanup
  mockWindow.removeEventListener("languagechange", handleLanguageChange);
  Object.defineProperty(globalThis, "navigator", {
    value: originalNav,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, "window", {
    value: originalWindow,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, "document", {
    value: originalDoc,
    configurable: true,
    writable: true,
  });
});

test("CV language routing: correctly maps to English and Chinese CVs", () => {
  // Check that English CV drive link points to Mahmoud's English CV
  assert.ok(config.resume.en.includes("1HAKa4iuu_Cb3SEoo41dqoFmvt1e-U767"));

  // Check that Chinese CV drive link points to Mahmoud's Chinese CV
  assert.ok(config.resume.zh.includes("1bX1Zm-6_KMHQ_L4LXrrd-s5EpYIhYALs"));

  // Check that local PDF files exist in the public directory
  const publicDir = path.resolve(__dirname, "../../public");
  const enPdfPath = path.join(publicDir, config.resume.enPdf);
  const zhPdfPath = path.join(publicDir, config.resume.zhPdf);

  assert.ok(fs.existsSync(enPdfPath), `Missing English PDF file: ${enPdfPath}`);
  assert.ok(fs.existsSync(zhPdfPath), `Missing Chinese PDF file: ${zhPdfPath}`);

  // Both files must have valid PDF sizes
  assert.ok(fs.statSync(enPdfPath).size > 10000, "English CV PDF is too small or corrupted");
  assert.ok(fs.statSync(zhPdfPath).size > 10000, "Chinese CV PDF is too small or corrupted");
});
