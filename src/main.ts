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

import * as Sentry from "@sentry/vue";
import * as SentryVue from "@sentry/vue";

const vueApp = createApp(App);

Sentry.init(
  {
    app: vueApp,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: "capacitor-sentry-test@0.0.1",
    dist: "1",
    integrations: [new SentryVue.BrowserTracing(), new SentryVue.Replay()],
  },
  // Forward the init method from @sentry/vue
  SentryVue.init
);
console.log("Sentry initialized");

vueApp.config.errorHandler = async (err, vm, info) => {
  console.error("Unhandled error catched by global error handler");
  console.error("err: ", err);
  console.error("vm: ", vm);
  console.error("info: ", info);
  Sentry.captureException(err, { extra: { info, vm } });
};

vueApp.use(IonicVue).use(router);

router.isReady().then(() => {
  vueApp.mount("#app");
});
