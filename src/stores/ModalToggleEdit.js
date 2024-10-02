import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalToggleEdit = defineStore("ModalToggleEdit", () => {
  let show = ref("");
  let showEditHeader = ref(false);

  // function to show model
  function getId(id) {
    show.value = id;
  }
  // show edit chat header
  function showHeaderModal() {
    showEditHeader.value = true;
  }
  // hide chat model header
  function hideHeaderModal() {
    showEditHeader.value = false;
  }

  return { getId, showHeaderModal, hideHeaderModal, show, showEditHeader };
});
