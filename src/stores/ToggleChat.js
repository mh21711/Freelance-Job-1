import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useToggleChat = defineStore("toggleChat", () => {
  let newChat = ref(true);
  let history = ref(false);
  let count = ref(0);

  let showChat = () => {
    newChat.value = true;
    history.value = false;
    count.value++;
  };

  let showHistory = () => {
    history.value = true;
    newChat.value = false;
    count.value++;
  };

  // to delte response when click new chat

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useToggleChat, import.meta.hot));
  }

  return { newChat, history, count, showChat, showHistory };
});
