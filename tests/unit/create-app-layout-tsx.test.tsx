import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@jest/globals";

describe("app root layout component", () => {
  it("app/layout.tsx should exist", () => {
    const layoutPath = resolve(process.cwd(), "app/layout.tsx");
    expect(() => readFileSync(layoutPath, "utf-8")).not.toThrow();
  });

  it("should export a RootLayout function", async () => {
    // We need to check the file content since we can't dynamically import Next.js app pages
    const layoutPath = resolve(process.cwd(), "app/layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    expect(content).toContain("RootLayout");
  });

  it('should render html lang="en"', async () => {
    const layoutPath = resolve(process.cwd(), "app/layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    expect(content).toContain('lang="en"');
  });

  it('should have body with data-testid="app-body"', async () => {
    const layoutPath = resolve(process.cwd(), "app/layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    expect(content).toContain('data-testid="app-body"');
  });

  it("should import Inter from next/font/google", async () => {
    const layoutPath = resolve(process.cwd(), "app/layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    expect(content).toContain("next/font/google");
    expect(content).toContain("Inter");
  });

  it("should export metadata with title and description", async () => {
    const layoutPath = resolve(process.cwd(), "app/layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    expect(content).toContain("metadata");
    expect(content).toContain("title");
    expect(content).toContain("description");
    expect(content).toContain("Paul-Valentin Mini");
  });

  it("should import globals.css", async () => {
    const layoutPath = resolve(process.cwd(), "app/layout.tsx");
    const content = readFileSync(layoutPath, "utf-8");
    expect(content).toContain("./globals.css");
  });
});
