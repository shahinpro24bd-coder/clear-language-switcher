import { describe, expect, it } from "vitest";
import { SITE_LANGS, isSiteLang, getContentSnapshot } from "./server";
import { renderPage } from "./transform";

describe("public languages", () => {
  it("offers exactly English and Hebrew", () => {
    expect(SITE_LANGS).toEqual(["en", "he"]);
    expect(isSiteLang("he")).toBe(true);
    expect(isSiteLang("bn")).toBe(false);
  });

  it("bundles Hebrew for every English content key", async () => {
    const snapshot = await getContentSnapshot();
    expect(Object.keys(snapshot.langs.he).sort()).toEqual(Object.keys(snapshot.langs.en).sort());
    for (const [key, english] of Object.entries(snapshot.langs.en)) {
      if (/[a-z]/i.test(english) && english !== "WhatsApp" && english !== "4:00 PM – 7:00 PM") {
        expect(snapshot.langs.he[key]).toMatch(/[\u0590-\u05ff]/);
      }
    }
  });

  it("renders Hebrew right-to-left and English left-to-right", () => {
    const html = "<html><head></head><body>Home</body></html>";
    expect(renderPage(html, { texts: {}, images: {}, lang: "he" })).toContain('lang="he" dir="rtl"');
    expect(renderPage(html, { texts: {}, images: {}, lang: "en" })).toContain('lang="en" dir="ltr"');
  });
});