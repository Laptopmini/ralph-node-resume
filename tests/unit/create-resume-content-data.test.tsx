describe("Resume content data", () => {
  let profile: any;
  let skills: any;
  let experience: any;
  let education: any;

  beforeEach(async () => {
    const mod = await import("@/src/content/resume");
    profile = mod.profile;
    skills = mod.skills;
    experience = mod.experience;
    education = mod.education;
  });

  describe("profile", () => {
    it("has required fields", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
      expect(profile.title).toBeDefined();
      expect(profile.tagline).toBeDefined();
      expect(profile.location).toBe("San Francisco, CA");
      expect(profile.email).toBe("paul@emini.com");
      expect(profile.phone).toBe("(415) 694-3616");
      expect(profile.linkedin).toContain("pvmini");
      expect(profile.github).toContain("Laptopmini");
      expect(profile.summary).toContain("Lead Frontend Engineer");
    });
  });

  describe("skills", () => {
    it("is an array with 4 categories", () => {
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBe(4);
    });

    it("each entry has category and items", () => {
      for (const skill of skills) {
        expect(skill.category).toBeDefined();
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });

    it("contains expected categories", () => {
      const categories = skills.map((s: any) => s.category);
      expect(categories).toEqual(
        expect.arrayContaining([
          expect.stringContaining("Frontend"),
          expect.stringContaining("AI"),
          expect.stringContaining("Infra"),
          expect.stringContaining("Backend"),
        ]),
      );
    });
  });

  describe("experience", () => {
    it("is a non-empty array in reverse chronological order", () => {
      expect(Array.isArray(experience)).toBe(true);
      expect(experience.length).toBeGreaterThanOrEqual(5);
    });

    it("first entry is the most recent (SmartThings)", () => {
      expect(experience[0].company).toContain("SmartThings");
      expect(experience[0].role).toContain("Senior");
    });

    it("each entry has required shape", () => {
      for (const exp of experience) {
        expect(exp.company).toBeDefined();
        expect(exp.location).toBeDefined();
        expect(exp.role).toBeDefined();
        expect(exp.period).toBeDefined();
        expect(Array.isArray(exp.bullets)).toBe(true);
        expect(exp.bullets.length).toBeGreaterThan(0);
        for (const bullet of exp.bullets) {
          expect(bullet.label).toBeDefined();
          expect(bullet.body).toBeDefined();
        }
        expect(Array.isArray(exp.stack)).toBe(true);
      }
    });
  });

  describe("education", () => {
    it("is a non-empty array", () => {
      expect(Array.isArray(education)).toBe(true);
      expect(education.length).toBeGreaterThanOrEqual(2);
    });

    it("each entry has title and detail", () => {
      for (const edu of education) {
        expect(edu.title).toBeDefined();
        expect(edu.detail).toBeDefined();
      }
    });

    it("includes UCSC degree", () => {
      const ucsc = education.find((e: any) => e.detail?.includes("Santa Cruz"));
      expect(ucsc).toBeDefined();
      expect(ucsc.title).toContain("B.A.");
    });
  });
});
