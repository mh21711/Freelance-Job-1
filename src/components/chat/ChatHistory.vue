<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { MdHistory } from "oh-vue-icons/icons";
addIcons(MdHistory);
</script>
<template>
  <section class="px-2 py-3 mt-1 d-flex justify-content-center">
    <span class="ms-4"> سجل المحادثه</span>
    <OhVueIcon name="md-history" scale="1.5" class="history" />
  </section>
</template>
<style scoped>
.new-message {
  color: white;
}
</style>
