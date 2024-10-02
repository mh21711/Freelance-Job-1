<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

// the main navigation
import TheMainNavigation from "./components/TheMainNavigation.vue";

let route = useRoute();

let showHeader = ref(false);

let regEx = /^\/chat\/([^/]+?)\/?$/i;
watchEffect(() => {
  let currentPath = route.path;
  if (currentPath === "/chat") {
    showHeader.value = true;
  } else {
    showHeader.value = regEx.test(currentPath);
  }
});
</script>

<template>
  <header v-if="!showHeader">
    <TheMainNavigation />
  </header>
  <main>
    <!-- spa render here  -->
    <RouterView />
  </main>
</template>

<style scoped></style>
