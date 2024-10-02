<script setup>
//imports
import { ref, computed } from "vue";

// components
import EditChatModel from "./EditChatModel.vue";

// vue use
import { onClickOutside } from "@vueuse/core";

//* vue-oh-icons
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiThreeDotsVertical } from "oh-vue-icons/icons";
//* stores
import { useFetchHistory } from "@/stores/FetchDataHistory.js";
import { useModalToggleEdit } from "../../stores/ModalToggleEdit.js";

// variables

// assign store to variable
const fetchHistory = useFetchHistory();
const ModalToggleEdit = useModalToggleEdit();

// assing icon
addIcons(BiThreeDotsVertical);
// edit modal
const editModal = ref(null);

//* functions
let data = [""];
//gte current header id
function getCurrentID(id) {
  ModalToggleEdit.getId(id);
  fetchData.editData(id);
}
// close edit modal
onClickOutside(editModal, () => {
  ModalToggleEdit.show = "";
});
</script>

<template>
  <div class="history" v-for="history in data" :key="history.id">
    <!-- history  -->
    <div class="d-flex justify-content-evenly align-items-center">
      <RouterLink :to="`/chat/${history.id}`" class="history-nav">
        <p class="history-title col-9 mt-3">
          {{ history.title }}
        </p>
      </RouterLink>

      <!-- delete history icon -->
      <span class="edit-btn col-2" @click="getCurrentID(history.id)">
        <OhVueIcon name="bi-three-dots-vertical" class="edit-icon" />
      </span>
    </div>

    <!--  contain edit tool -->
    <EditChatModel
      v-if="parseInt(ModalToggleEdit.show) === parseInt(history.id)"
      ref="editModal"
    />
  </div>
</template>

<style scoped>
.history {
  height: 50px;
  width: 100%;
  margin-bottom: 5px;
  text-align: center;
  border-radius: 15px;
  color: white;
  transition-duration: 0.5s;
}

.history:hover {
  background-color: #444444;
}
.history-title {
  max-height: 20px;
  cursor: pointer;
}
.history-nav {
  width: 100%;
  color: white;
  text-decoration: none;
}
</style>
