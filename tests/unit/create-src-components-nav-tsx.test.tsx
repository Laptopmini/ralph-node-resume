import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@jest/globals";

describe("navigation component", () => {
  it("src/components/Nav.tsx should exist", () => {
    const navPath = resolve(process.cwd(), "src/components/Nav.tsx");
    expect(() => readFileSync(navPath, "utf-8")).not.toThrow();
  });

  it("should be a client component", () => {
    const navPath = resolve(process.cwd(), "src/components/Nav.tsx");
    const content = readFileSync(navPath, "utf-8");
    expect(content).toContain("'use client'");
  });

  it('should have data-testid="nav"', () => {
    const navPath = resolve(process.cwd(), "src/components/Nav.tsx");
    const content = readFileSync(navPath, "utf-8");
    expect(content).toContain('data-testid="nav"');
  });

  it('should have data-testid="nav-brand" with name', () => {
    const navPath = resolve(process.cwd(), "src/components/Nav.tsx");
    const content = readFileSync(navPath, "utf-8");
    expect(content).toContain('data-testid="nav-brand"');
    expect(content).toContain("Paul-Valentin Mini");
  });

  it("should have nav links with correct testids and anchors", () => {
    const navPath = resolve(process.cwd(), "src/components/Nav.tsx");
    const content = readFileSync(navPath, "utf-8");
    expect(content).toContain('data-testid="nav-link-profile"');
    expect(content).toContain('data-testid="nav-link-skills"');
    expect(content).toContain('data-testid="nav-link-experience"');
    expect(content).toContain('data-testid="nav-link-education"');
    expect(content).toContain("#profile");
    expect(content).toContain("#skills");
    expect(content).toContain("#experience");
    expect(content).toContain("#education");
  });

  it('should have data-testid="nav-toggle" for mobile hamburger', () => {
    const navPath = resolve(process.cwd(), "src/components/Nav.tsx");
    const content = readFileSync(navPath, "utf-8");
    expect(content).toContain('data-testid="nav-toggle"');
  });

  it('should have data-testid="nav-menu" for dropdown panel', () => {
    const navPath = resolve(process.cwd(), "src/components/Nav.tsx");
    const content = readFileSync(navPath, "utf-8");
    expect(content).toContain('data-testid="nav-menu"');
  });

  it("should have sticky positioning styles", () => {
    const navPath = resolve(process.cwd(), "src/components/Nav.tsx");
    const content = readFileSync(navPath, "utf-8");
    expect(content).toContain("sticky");
    expect(content).toContain("top-0");
    expect(content).toContain("z-50");
  });
});
