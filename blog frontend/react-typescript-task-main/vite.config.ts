import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Vite plugins used by our React + TypeScript application.
  plugins: [
    react(),

    // Enables Tailwind CSS v4 through Vite.
    tailwindcss(),
  ],
});