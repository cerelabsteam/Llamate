import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Llamate/",
  build: {
    rollupOptions: {
      external: ["pdfmake/build/pdfmake", "pdfmake/build/vfs_fonts"],
    },
  },
});
