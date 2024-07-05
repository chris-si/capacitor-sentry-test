<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted } from "vue";

onMounted(() => {
  console.log("App mounted");
  throw new Error("Test error");
});
</script>
