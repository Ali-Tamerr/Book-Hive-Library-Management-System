/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr(),
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  base: process.env.VITE_BASE || "/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5186",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
