import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import RemixRouter from "vite-plugin-remix-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    RemixRouter({
      routesDirectory: "src/pages",
    }),
    tsconfigPaths(),
  ],
});
