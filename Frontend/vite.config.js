import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // React and the router change far less often than app code, so they
        // get their own long-cached chunk.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id))
            return "vendor";
        },
      },
    },
  },
  server: {
    proxy:
      mode === "development"
        ? {
            "/api": {
              target: process.env.VITE_DEV_API_TARGET || "http://localhost:5000",
              changeOrigin: true,
            },
          }
        : undefined,
  },
}));
