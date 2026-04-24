describe("basePath.ts", () => {
  let BASE_PATH: string;
  let withBasePath: (path: string) => string;

  beforeEach(async () => {
    const mod = await import("../../src/lib/basePath");
    BASE_PATH = mod.BASE_PATH;
    withBasePath = mod.withBasePath;
  });

  it("exports BASE_PATH as /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  it("withBasePath prepends BASE_PATH to an absolute path", () => {
    expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  it("withBasePath prepends BASE_PATH to a relative path (adds leading slash)", () => {
    expect(withBasePath("images/photo.jpg")).toBe("/ralph-node-resume/images/photo.jpg");
  });

  it("withBasePath handles root path", () => {
    expect(withBasePath("/")).toBe("/ralph-node-resume/");
  });
});
