<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { MdDeleteoutlineTwotone } from "oh-vue-icons/icons";

import { useDark } from "@vueuse/core";
const isDark = useDark();

addIcons(MdDeleteoutlineTwotone);
</script>
<template>
  <span class="delete-parent">
    <OhVueIcon
      name="md-deleteoutline-twotone"
      scale="1.25"
      class="delete"
      :class="{ light: !isDark }"
    />
  </span>
</template>

<style scoped>
.delete-parent {
  position: absolute;
  right: 79%;
}
.delete {
  color: white;
  cursor: pointer;
}
.delete:hover {
  color: #aaa;
}
.light {
  color: #111;
}
</style>
