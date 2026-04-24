import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@jest/globals";

describe("home page with section stubs", () => {
  it("app/page.tsx should exist", () => {
    const pagePath = resolve(process.cwd(), "app/page.tsx");
    expect(() => readFileSync(pagePath, "utf-8")).not.toThrow();
  });

  it('should render main with data-testid="home"', () => {
    const pagePath = resolve(process.cwd(), "app/page.tsx");
    const content = readFileSync(pagePath, "utf-8");
    expect(content).toContain('data-testid="home"');
    expect(content).toContain("<main");
  });

  it("should render Section components for hero, profile, skills, experience, education", () => {
    const pagePath = resolve(process.cwd(), "app/page.tsx");
    const content = readFileSync(pagePath, "utf-8");
    expect(content).toContain("Section");
    expect(content).toContain("section-hero");
    expect(content).toContain("section-profile");
    expect(content).toContain("section-skills");
    expect(content).toContain("section-experience");
    expect(content).toContain("section-education");
  });

  it("should pass correct testId props to Section components", () => {
    const pagePath = resolve(process.cwd(), "app/page.tsx");
    const content = readFileSync(pagePath, "utf-8");
    expect(content).toContain('testId="section-hero"');
    expect(content).toContain('testId="section-profile"');
    expect(content).toContain('testId="section-skills"');
    expect(content).toContain('testId="section-experience"');
    expect(content).toContain('testId="section-education"');
  });

  it("should pass id props to Section components", () => {
    const pagePath = resolve(process.cwd(), "app/page.tsx");
    const content = readFileSync(pagePath, "utf-8");
    expect(content).toContain('id="hero"');
    expect(content).toContain('id="profile"');
    expect(content).toContain('id="skills"');
    expect(content).toContain('id="experience"');
    expect(content).toContain('id="education"');
  });
});
