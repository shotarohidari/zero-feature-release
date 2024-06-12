import { $ } from "zx"
import { writeFile,readFile } from "node:fs/promises"

await $`pnpm install react react-dom`
await $`pnpm install -D vite @vitejs/plugin-react @types/react @types/react-dom`

// viteの雛形ページ
await writeFile(
  "index.html",
  `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Vite サンプルページ</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="./src/index.tsx"></script>
</body>
</html>`
)

// reactのindex.tsx
await writeFile(
  "src/index.tsx",
  `import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

const app = document.getElementById("app")
if (!app) {
  throw new Error("#appが存在しません")
}
const root = createRoot(app)
root.render(<App />)`
)

// reactのApp.tsx
await writeFile(
  "src/App.tsx",
  `import React from "react";

export function App() {
    return <h1>Hello,World!</h1>
}`
)

const packageJson = (await import("../package.json")).default
const newPackageInfo = {
  ...packageJson,
  scripts: { ...packageJson.scripts, dev: "pnpm vite" },
}

const tsconfigString = await readFile("tsconfig.json","utf-8");

await writeFile("package.json", JSON.stringify(newPackageInfo, null, 2))
await writeFile(
  "tsconfig.json",
  tsconfigString.replace(/\/\/ "jsx": "(.+)"/,'"jsx": "react"')
)
