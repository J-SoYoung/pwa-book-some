import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: "auto",

      pwaAssets: {
        disabled: false,
        config: true
      },

      manifest: {
        name: "book-some",
        short_name: "book-some",
        description: "책과 친해지는 어플",
        theme_color: "#ffffff"
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module"
      }
    })
  ],
  resolve: {
    alias: [
      { find: "@/", replacement: "/src" },
      { find: "@/pages", replacement: "/src/pages" }
    ]
  }
});
