import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/display.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import * as Sentry from "@sentry/capacitor";
import * as SentryVue from "@sentry/vue";

const vueApp = createApp(App);

vueApp.config.errorHandler = (err, vm, info) => {
  try {
    console.error("Unhandled error catched by global error handler");
    console.error("err: ", err);
    console.error("vm: ", vm);
    console.error("info: ", info);
  } catch (error) {
    Sentry.captureException(error, { extra: { info, vm } });
  }
};

Sentry.init(
  {
    app: vueApp,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: "capacitor-sentry-test@0.0.1",
    dist: "1",
    debug: import.meta.env.VITE_ENABLE_DEBUG === "true",
    integrations: [
      SentryVue.vueIntegration(),
      new SentryVue.BrowserTracing({
        // tracePropagationTargets: [
        //   "localhost",
        //   // /^https:\/\/yourserver\.io\/api/,
        // ],
        // routingInstrumentation: SentryVue.vueRouterInstrumentation(router),
      }),
      new SentryVue.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  },
  // Forward the init method from @sentry/vue
  SentryVue.init
);
console.log("Sentry initialized");

vueApp.use(IonicVue).use(router);

router.isReady().then(() => {
  vueApp.mount("#app");
});
