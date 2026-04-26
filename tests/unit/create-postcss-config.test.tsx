import { existsSync } from "node:fs";
import path from "node:path";

describe("PostCSS config", () => {
  const configPath = path.resolve(__dirname, "../../postcss.config.mjs");

  it("postcss.config.mjs exists", () => {
    expect(existsSync(configPath)).toBe(true);
  });

  it("exports @tailwindcss/postcss plugin", async () => {
    const mod = await import(configPath);
    const config = mod.default;

    expect(config.plugins).toBeDefined();
    expect(config.plugins["@tailwindcss/postcss"]).toEqual({});
  });
});
