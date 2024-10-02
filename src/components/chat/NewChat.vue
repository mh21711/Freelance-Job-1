<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiChatLeftDots } from "oh-vue-icons/icons";
addIcons(BiChatLeftDots);
</script>
<template>
  <section class="px-2 py-3 mt-1 d-flex justify-content-center">
    <span class="ms-4"> محادثة جديدة </span>
    <OhVueIcon name="bi-chat-left-dots" scale="1.5" class="new-message" />
  </section>
</template>
<style scoped>
.new-message {
  color: white;
}
</style>
