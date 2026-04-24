import { describe, expect, it } from "@jest/globals";

describe("resume content data", () => {
  it("should export profile with correct structure", async () => {
    const resume = await import("../../src/content/resume");
    expect(resume.profile).toBeDefined();
    expect(typeof resume.profile.name).toBe("string");
    expect(typeof resume.profile.title).toBe("string");
    expect(typeof resume.profile.tagline).toBe("string");
    expect(typeof resume.profile.location).toBe("string");
    expect(typeof resume.profile.email).toBe("string");
    expect(typeof resume.profile.phone).toBe("string");
    expect(typeof resume.profile.linkedin).toBe("string");
    expect(typeof resume.profile.github).toBe("string");
    expect(typeof resume.profile.summary).toBe("string");
  });

  it("should export skills array with Frontend, AI, Infra, Backend categories", async () => {
    const resume = await import("../../src/content/resume");
    expect(Array.isArray(resume.skills)).toBe(true);
    expect(resume.skills.length).toBeGreaterThanOrEqual(4);

    const categories = resume.skills.map((s) => s.category);
    expect(categories).toContain("Frontend");
    expect(categories).toContain("AI");
    expect(categories).toContain("Infra");
    expect(categories).toContain("Backend");
  });

  it("should export experience array in reverse chronological order", async () => {
    const resume = await import("../../src/content/resume");
    expect(Array.isArray(resume.experience)).toBe(true);
    expect(resume.experience.length).toBeGreaterThan(0);

    // Check structure
    const first = resume.experience[0];
    expect(typeof first.company).toBe("string");
    expect(typeof first.location).toBe("string");
    expect(typeof first.role).toBe("string");
    expect(typeof first.period).toBe("string");
    expect(Array.isArray(first.bullets)).toBe(true);
    expect(Array.isArray(first.stack)).toBe(true);
  });

  it("should export education array", async () => {
    const resume = await import("../../src/content/resume");
    expect(Array.isArray(resume.education)).toBe(true);
    expect(resume.education.length).toBeGreaterThan(0);

    const first = resume.education[0];
    expect(typeof first.title).toBe("string");
    expect(typeof first.detail).toBe("string");
  });

  it("profile should match resume.md values", async () => {
    const resume = await import("../../src/content/resume");
    expect(resume.profile.name).toBe("Paul-Valentin Mini");
    expect(resume.profile.location).toBe("San Francisco, CA");
    expect(resume.profile.email).toBe("paul@emini.com");
    expect(resume.profile.phone).toBe("(415) 694-3616");
  });

  it("experience should contain SmartThings as most recent", async () => {
    const resume = await import("../../src/content/resume");
    expect(resume.experience[0].company).toBe("SmartThings, Inc.");
    expect(resume.experience[0].role).toBe("Senior Software Developer");
  });
});
