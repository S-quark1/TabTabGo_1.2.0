import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    build: {
        target: "es2020",
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                content: "src/content.js",
                popup: "src/popup.js",
                background: "src/background.js"
            },
            output: {
                entryFileNames: "[name].js"
            }
        }
    },
    plugins: [
        viteStaticCopy({
            targets: [
                { src: "src/manifest.json", dest: "." },
                { src: "src/UI/*.html", dest: "UI" },
                { src: "src/UI/*.css", dest: "UI" },
                { src: "src/UI/icon*.png", dest: "UI" }
            ]
        })
    ]
});
