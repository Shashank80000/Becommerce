import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
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
