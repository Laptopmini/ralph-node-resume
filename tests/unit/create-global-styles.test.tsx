import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

describe("Global styles", () => {
  const cssPath = path.resolve(__dirname, "../../app/globals.css");

  it("app/globals.css exists", () => {
    expect(existsSync(cssPath)).toBe(true);
  });

  describe("content", () => {
    let css: string;

    beforeEach(() => {
      css = readFileSync(cssPath, "utf8");
    });

    it("imports tailwindcss", () => {
      expect(css).toMatch(/@import\s+["']tailwindcss["']/);
    });

    it("defines @theme block with --font-sans", () => {
      expect(css).toContain("@theme");
      expect(css).toMatch(/--font-sans/);
    });

    it("defines neutral palette tokens", () => {
      expect(css).toContain("--color-bg");
      expect(css).toContain("--color-fg");
      expect(css).toContain("--color-muted");
      expect(css).toContain("--color-subtle");
      expect(css).toContain("--color-border");
    });

    it("includes smooth scroll behavior", () => {
      expect(css).toMatch(/scroll-behavior:\s*smooth/);
    });

    it("defines .section-pad utility class", () => {
      expect(css).toContain(".section-pad");
    });
  });
});
