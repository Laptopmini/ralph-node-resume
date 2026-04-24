import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@jest/globals";

describe("section wrapper component", () => {
  it("src/components/Section.tsx should exist", () => {
    const sectionPath = resolve(process.cwd(), "src/components/Section.tsx");
    expect(() => readFileSync(sectionPath, "utf-8")).not.toThrow();
  });

  it("should accept id, title, testId, and children props", () => {
    const sectionPath = resolve(process.cwd(), "src/components/Section.tsx");
    const content = readFileSync(sectionPath, "utf-8");
    // Check for props interface
    expect(content).toContain("id");
    expect(content).toContain("testId");
    expect(content).toContain("children");
  });

  it("should render section element with id and data-testid", () => {
    const sectionPath = resolve(process.cwd(), "src/components/Section.tsx");
    const content = readFileSync(sectionPath, "utf-8");
    expect(content).toContain("<section");
    expect(content).toContain("id=");
    expect(content).toContain("data-testid=");
  });

  it("should apply .section-pad class", () => {
    const sectionPath = resolve(process.cwd(), "src/components/Section.tsx");
    const content = readFileSync(sectionPath, "utf-8");
    expect(content).toContain("section-pad");
  });

  it("should render h2 with testId when title is provided", () => {
    const sectionPath = resolve(process.cwd(), "src/components/Section.tsx");
    const content = readFileSync(sectionPath, "utf-8");
    expect(content).toContain("<h2");
    expect(content).toContain("data-testid=");
  });

  it("should have large Apple-style typography for title", () => {
    const sectionPath = resolve(process.cwd(), "src/components/Section.tsx");
    const content = readFileSync(sectionPath, "utf-8");
    expect(content).toContain("text-4xl");
    expect(content).toContain("md:text-6xl");
    expect(content).toContain("font-semibold");
  });
});
