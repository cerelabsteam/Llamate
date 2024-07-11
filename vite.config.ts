import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

const externalDependencies = [
  "pdfmake/build/pdfmake",
  "pdfmake/build/vfs_fonts",
  "markdown-it",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Llamate/",
  build: {
    rollupOptions: {
      external: externalDependencies,
      output: {
        globals: {
          "pdfmake/build/pdfmake": "pdfMake",
          "pdfmake/build/vfs_fonts": "pdfFonts",
          "markdown-it": "markdownit",
        },
      },
    },
  },
});
