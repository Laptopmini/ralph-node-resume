import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("globals.css", () => {
  const cssPath = join(process.cwd(), "app", "globals.css");
  let css: string;

  beforeEach(() => {
    css = readFileSync(cssPath, "utf-8");
  });

  it("file exists at app/globals.css", () => {
    expect(existsSync(cssPath)).toBe(true);
  });

  it("imports tailwindcss", () => {
    expect(css).toMatch(/@import\s+["']tailwindcss["']/);
  });

  it("defines a @theme block", () => {
    expect(css).toContain("@theme");
  });

  it("defines --font-sans with Inter", () => {
    expect(css).toMatch(/--font-sans:.*Inter/);
  });

  it("defines neutral palette tokens", () => {
    expect(css).toMatch(/--color-bg:\s*#ffffff/i);
    expect(css).toMatch(/--color-fg:\s*#0a0a0a/i);
    expect(css).toMatch(/--color-muted:\s*#6b7280/i);
    expect(css).toMatch(/--color-subtle:\s*#f5f5f7/i);
    expect(css).toMatch(/--color-border:\s*#e5e5ea/i);
  });

  it("sets smooth scroll behavior on html", () => {
    expect(css).toMatch(/scroll-behavior:\s*smooth/);
  });

  it("defines .section-pad utility class", () => {
    expect(css).toContain(".section-pad");
  });
});
