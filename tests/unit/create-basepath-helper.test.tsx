describe("basePath helper", () => {
  let BASE_PATH: string;
  let withBasePath: (path: string) => string;

  beforeEach(async () => {
    const mod = await import("@/src/lib/basePath");
    BASE_PATH = mod.BASE_PATH;
    withBasePath = mod.withBasePath;
  });

  it("exports BASE_PATH as /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  it("prepends basePath to absolute path", () => {
    expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  it("prepends basePath to relative path (adds leading slash)", () => {
    expect(withBasePath("profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  it("handles path that already starts with /", () => {
    expect(withBasePath("/images/photo.jpg")).toBe("/ralph-node-resume/images/photo.jpg");
  });
});
