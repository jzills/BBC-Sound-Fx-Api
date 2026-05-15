import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            outDir: "dist",
            rollupTypes: true
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "BBCSoundFxApi",
            fileName: "bbc-sound-fx-api",
        },
        rollupOptions: {
            output: [{
                entryFileNames: "bbc-sound-fx-api.js",
                format: "esm",
            },
            {
                entryFileNames: "bbc-sound-fx-api.cjs",
                format: "cjs",
            }],
            external: ["tslib"],
        },
        target: "esnext"
    }
});
