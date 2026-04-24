describe("resume.ts", () => {
  let profile: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  let skills: { category: string; items: string[] }[];
  let experience: {
    company: string;
    location: string;
    role: string;
    period: string;
    bullets: { label: string; body: string }[];
    stack: string[];
  }[];
  let education: { title: string; detail: string; status?: string }[];

  beforeEach(async () => {
    const mod = await import("../../src/content/resume");
    profile = mod.profile;
    skills = mod.skills;
    experience = mod.experience;
    education = mod.education;
  });

  describe("profile", () => {
    it("has correct name", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
    });

    it("has correct contact info", () => {
      expect(profile.location).toBe("San Francisco, CA");
      expect(profile.email).toBe("paul@emini.com");
      expect(profile.phone).toBe("(415) 694-3616");
      expect(profile.linkedin).toBe("https://www.linkedin.com/in/pvmini");
      expect(profile.github).toBe("https://github.com/Laptopmini");
    });

    it("has a non-empty summary", () => {
      expect(profile.summary.length).toBeGreaterThan(50);
    });
  });

  describe("skills", () => {
    it("has four skill categories", () => {
      expect(skills).toHaveLength(4);
    });

    it("includes Frontend category with expected items", () => {
      const frontend = skills.find((s) => s.category.toLowerCase().includes("frontend"));
      expect(frontend).toBeDefined();
      const frontendItems = frontend?.items ?? [];
      expect(frontendItems).toContain("React");
      expect(frontendItems).toContain("Next.js");
      expect(frontendItems).toContain("TypeScript");
    });

    it("includes AI category", () => {
      const ai = skills.find((s) => s.category.toLowerCase().includes("ai"));
      expect(ai).toBeDefined();
      expect(ai?.items.length).toBeGreaterThan(0);
    });
  });

  describe("experience", () => {
    it("has five entries in reverse chronological order", () => {
      expect(experience).toHaveLength(5);
      expect(experience[0].company).toContain("SmartThings");
      expect(experience[4].company).toContain("Imprivata");
    });

    it("first entry has correct role and period", () => {
      expect(experience[0].role).toContain("Senior Software Developer");
      expect(experience[0].period).toContain("2020");
    });

    it("each entry has bullets and stack", () => {
      for (const exp of experience) {
        expect(exp.bullets.length).toBeGreaterThan(0);
        expect(exp.stack.length).toBeGreaterThan(0);
        for (const bullet of exp.bullets) {
          expect(bullet.label).toBeTruthy();
          expect(bullet.body).toBeTruthy();
        }
      }
    });
  });

  describe("education", () => {
    it("has at least three entries", () => {
      expect(education.length).toBeGreaterThanOrEqual(3);
    });

    it("includes UCSC CS degree", () => {
      const ucsc = education.find(
        (e) => e.title.includes("Computer Science") || e.detail.includes("Santa Cruz"),
      );
      expect(ucsc).toBeDefined();
    });

    it("includes an in-progress certification", () => {
      const inProgress = education.find((e) => e.status?.toLowerCase().includes("in progress"));
      expect(inProgress).toBeDefined();
    });
  });
});
