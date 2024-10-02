<script setup>
//stores
import { useToggleSidebar } from "../../stores/ToggleSidebar";
const toggleSidebar = useToggleSidebar();

// import icons
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { CoHamburgerMenu } from "oh-vue-icons/icons";
// register icons
addIcons(CoHamburgerMenu);
</script>
<template setup>
  <header class="header">
    <OhVueIcon
      name="co-hamburger-menu"
      scale="2"
      @click="toggleSidebar.ToggleSidebar()"
    />
  </header>
</template>
<style scoped>
.header {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 70px;
  padding: 10px;
}
</style>
