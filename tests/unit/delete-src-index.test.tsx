import { existsSync } from "node:fs";
import { join } from "node:path";

describe("src/index.ts deletion", () => {
  const filePath = join(process.cwd(), "src", "index.ts");

  it("src/index.ts should not exist on disk", () => {
    expect(existsSync(filePath)).toBe(false);
  });

  it("nothing should import src/index.ts", () => {
    // Verify no file in the project references this module
    const { execSync } = require("node:child_process");
    let grepResult = "";
    try {
      grepResult = execSync(
        'grep -r "src/index" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.mjs" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist --exclude-dir=tests -l 2>/dev/null',
        { encoding: "utf-8" },
      );
    } catch {
      // grep returns exit code 1 when no matches found — that's the success case
      grepResult = "";
    }
    expect(grepResult.trim()).toBe("");
  });
});
