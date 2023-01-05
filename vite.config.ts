import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ["resources/ts/main.ts"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/ts/", import.meta.url)),
        },
    },
});
