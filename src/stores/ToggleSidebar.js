import { defineStore } from "pinia";
import { ref } from "vue";

export const useToggleSidebar = defineStore("ToggleSidebar", () => {
  let showSidebar = ref(false);

  function ToggleSidebar() {
    showSidebar.value = !showSidebar.value;
  }
  return { ToggleSidebar, showSidebar };
});
