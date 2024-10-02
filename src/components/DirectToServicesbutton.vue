<script setup>
// import icons
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiArrowLeftShort } from "oh-vue-icons/icons";
// register icons
addIcons(BiArrowLeftShort);
</script>
<template>
  <div>
    <RouterLink to="/serives">
      <button class="btn">
        <slot></slot>
        <OhVueIcon name="bi-arrow-left-short" />
      </button>
    </RouterLink>
  </div>
</template>
<style scoped>
button {
  width: 200px;
  height: 50px;
  padding: 10px;
  background-color: #c1c1c1;
  border: 1px solid #eee;
  border-radius: 10px;
  font-size: 20px;
  transition-duration: 0.3s;
}
button:hover {
  background-color: #aaa;
  color: black;
}
</style>
