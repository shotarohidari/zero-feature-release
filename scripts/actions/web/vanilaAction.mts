import { $, fs as $Fs } from "zx"
// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { writeFile } from "node:fs/promises"

export async function setUpVanilaAction() {
  // dev dependencies
  await $`pnpm install -D vite`

  // vite.config.ts
  await writeFile(
    "vite.config.ts",
    `
    import { defineConfig } from "vite";
    
    export default defineConfig({
    
    });
    `
  )

  // index.html
  await $Fs.outputFile(
    "index.html",
    `<!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="utf8"/>
        <title>My Cool App!</title>
      </head>
      <body>
        <h1>Hello,World</h1>
        <script type="module" src="./src/index.ts"></script>
      </body>
    </html>
    `
  )

  const packageJson = (await import("../../../package.json")).default

  const newPackageInfo = {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
    },
    scripts: { ...packageJson.scripts, dev: "pnpm vite" },
  }

  await writeFile("package.json", JSON.stringify(newPackageInfo, null, 2))
}
