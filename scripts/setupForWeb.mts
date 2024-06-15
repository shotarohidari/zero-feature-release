import { $, fs as $Fs } from "zx"
import { writeFile, readFile } from "node:fs/promises"

// dependencies
await $`pnpm install react react-dom @remix-run/node @remix-run/react @remix-run/serve isbot@4`
// dev dependencies
await $`pnpm install -D vite @remix-run/dev @types/react @types/react-dom`

// vite.config.ts
await writeFile(
  "vite.config.ts",
  `import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [remix()],
});
`
)

// app/index.html
await $Fs.outputFile(
  "app/index.html",
  `<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>My Cool App!</title>
  </head>
  <body>
    <div id="app"><!-- Remix SPA --></div>
  </body>
</html>
`
)

// app/entry.server.tsx
await $Fs.outputFile(
  "app/entry.server.tsx",
  `import fs from "node:fs";
import path from "node:path";

import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const shellHtml = fs
    .readFileSync(
      path.join(process.cwd(), "app/index.html")
    )
    .toString();

  const appHtml = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  const html = shellHtml.replace(
    "<!-- Remix SPA -->",
    appHtml
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode,
  });
}
`
)

// app/entry.client.tsx
await $Fs.outputFile(
  "app/entry.client.tsx",
  `import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import React from "react";
const app = document.querySelector("#app");
if(!app) throw new Error("#app not found.")
startTransition(() => {
  hydrateRoot(
    app,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
`
)

// app/root.tsx
await $Fs.outputFile(
  "app/root.tsx",
  `import React from "react";
import {Scripts,Outlet} from "@remix-run/react";
export function HydrateFallback() {
  return (
    <>
      <p>Loading...</p>
      <Scripts />
    </>
  );
}

export default function Component() {
  return (
    <>
      <Outlet />
      <Scripts />
    </>
  );
}

`
)

// app/routes/_index.tsx
await $Fs.outputFile(
  "app/routes/_index.tsx",
  `import React from "react";

export default function Index() {
    return <h1>Hello, World!</h1>
}`
)

const packageJson = (await import("../package.json")).default
const newPackageInfo = {
  ...packageJson,
  scripts: { ...packageJson.scripts, dev: "pnpm remix vite:dev" },
}

const tsconfigString = await readFile("tsconfig.json", "utf-8")

await writeFile("package.json", JSON.stringify(newPackageInfo, null, 2))
await writeFile(
  "tsconfig.json",
  tsconfigString.replace(/\/\/ "jsx": "(.+)"/, '"jsx": "react"')
)
