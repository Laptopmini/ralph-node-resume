import { existsSync } from "node:fs";
import path from "node:path";

describe("Delete old entry point", () => {
  const entryPath = path.resolve(__dirname, "../../src/index.ts");

  it("src/index.ts should not exist on disk", () => {
    expect(existsSync(entryPath)).toBe(false);
  });

  it("no file imports src/index", () => {
    const { execSync } = require("node:child_process");
    const root = path.resolve(__dirname, "../..");
    let grepResult = "";
    try {
      grepResult = execSync(
        `grep -r --include="*.ts" --include="*.tsx" --include="*.js" --include="*.mjs" "from.*src/index" "${root}/src" "${root}/app" 2>/dev/null || true`,
        { encoding: "utf8" },
      );
    } catch {
      grepResult = "";
    }
    expect(grepResult.trim()).toBe("");
  });
});
