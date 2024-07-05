import { sentryVitePlugin } from "@sentry/vite-plugin";
/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    plugins: [
      vue(),
      legacy(),
      // sentryVitePlugin({
      //   org: process.env.SENTRY_ORG,
      //   project: process.env.SENTRY_PROJECT,
      //   authToken: process.env.SENTRY_AUTH_TOKEN,
      //   url: process.env.SENTRY_URL,
      // }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    test: {
      globals: true,
      environment: "jsdom",
    },

    build: {
      sourcemap: true,
    },
  });
};
