import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@jest/globals";

describe("global styles with Tailwind v4", () => {
  it("app/globals.css should exist", () => {
    const globalsPath = resolve(process.cwd(), "app/globals.css");
    expect(() => readFileSync(globalsPath, "utf-8")).not.toThrow();
  });

  it('should contain @import "tailwindcss"', () => {
    const globalsPath = resolve(process.cwd(), "app/globals.css");
    const content = readFileSync(globalsPath, "utf-8");
    expect(content).toContain('@import "tailwindcss"');
  });

  it("should define @theme block with font-sans", () => {
    const globalsPath = resolve(process.cwd(), "app/globals.css");
    const content = readFileSync(globalsPath, "utf-8");
    expect(content).toContain("--font-sans");
    expect(content).toContain('"Inter"');
  });

  it("should define color tokens (bg, fg, muted, subtle, border)", () => {
    const globalsPath = resolve(process.cwd(), "app/globals.css");
    const content = readFileSync(globalsPath, "utf-8");
    expect(content).toContain("--color-bg");
    expect(content).toContain("--color-fg");
    expect(content).toContain("--color-muted");
    expect(content).toContain("--color-subtle");
    expect(content).toContain("--color-border");
  });

  it("should define .section-pad utility class", () => {
    const globalsPath = resolve(process.cwd(), "app/globals.css");
    const content = readFileSync(globalsPath, "utf-8");
    expect(content).toContain(".section-pad");
    expect(content).toContain("py-24");
    expect(content).toContain("md:py-32");
  });

  it("should include html scroll-behavior: smooth", () => {
    const globalsPath = resolve(process.cwd(), "app/globals.css");
    const content = readFileSync(globalsPath, "utf-8");
    expect(content).toContain("scroll-behavior: smooth");
  });
});
