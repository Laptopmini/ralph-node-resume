import { describe, expect, it } from "@jest/globals";

// Since we can't actually import the module that doesn't exist yet,
// we'll test via dynamic import after the file is created
describe("basePath utility library", () => {
  it("should export BASE_PATH constant", async () => {
    const { BASE_PATH } = await import("../../src/lib/basePath");
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  it("should export withBasePath helper function", async () => {
    const { withBasePath } = await import("../../src/lib/basePath");
    expect(typeof withBasePath).toBe("function");
  });

  it("withBasePath should prepend BASE_PATH to paths", async () => {
    const { withBasePath } = await import("../../src/lib/basePath");
    expect(withBasePath("/assets/image.png")).toBe("/ralph-node-resume/assets/image.png");
  });

  it("withBasePath should handle paths without leading slash", async () => {
    const { withBasePath } = await import("../../src/lib/basePath");
    expect(withBasePath("assets/image.png")).toBe("/ralph-node-resume/assets/image.png");
  });

  it("withBasePath should handle empty string", async () => {
    const { withBasePath } = await import("../../src/lib/basePath");
    expect(withBasePath("")).toBe("/ralph-node-resume/");
  });
});
