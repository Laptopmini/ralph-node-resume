import { existsSync } from "node:fs";
import path from "node:path";

describe("Next.js config", () => {
  const configPath = path.resolve(__dirname, "../../next.config.mjs");

  it("next.config.mjs exists", () => {
    expect(existsSync(configPath)).toBe(true);
  });

  it("exports correct configuration", async () => {
    const mod = await import(configPath);
    const config = mod.default;

    expect(config.output).toBe("export");
    expect(config.basePath).toBe("/ralph-node-resume");
    expect(config.assetPrefix).toBe("/ralph-node-resume");
    expect(config.images).toEqual({ unoptimized: true });
    expect(config.trailingSlash).toBe(true);
    expect(config.reactStrictMode).toBe(true);
  });
});
