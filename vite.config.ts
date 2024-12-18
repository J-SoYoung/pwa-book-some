import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite-pwa-org.netlify.app/
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
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/images/logo.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/images/logo2.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "/screenshots/desktop.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "/screenshots/mobile.png",
            sizes: "360x640",
            type: "image/png",
            form_factor: "narrow"
          }
        ]
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module"
      }
    })
  ],
  resolve: {
    alias: [
      { find: "@/", replacement: "/src" },
      { find: "@/pages", replacement: "/src/pages" },
      { find: "@/components", replacement: "/src/components" },
      { find: "@/services", replacement: "/src/services" },
      { find: "@/bookApis", replacement: "/src/bookApis" },
      { find: "@/recoil", replacement: "/src/recoil" },
    ]
  },
  // 프록시 설정 (naver API)
  server: {
    proxy: {
      "/search/book": {
        target: "https://openapi.naver.com/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/search\/book/, "/search/book.json")
      }
    }
  }
});
