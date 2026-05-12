// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const tanstackBrowserProcessEnvPatch = {
  name: "tanstack-browser-process-env-patch",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    const normalizedId = id.replace(/\\/g, "/");

    if (
      !normalizedId.includes("/@tanstack/start-client-core/src/") &&
      !normalizedId.includes("/@tanstack/start-client-core/dist/esm/")
    ) {
      return null;
    }

    return code
      .replaceAll("process.env.TSS_ROUTER_BASEPATH", JSON.stringify("/"))
      .replaceAll("process.env.TSS_SERVER_FN_BASE", JSON.stringify("/_server"));
  },
};

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  plugins: [tanstackBrowserProcessEnvPatch],
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    define: {
      "process.env.TSS_ROUTER_BASEPATH": JSON.stringify("/"),
      "process.env.TSS_SERVER_FN_BASE": JSON.stringify("/_server"),
    },
  },
});
