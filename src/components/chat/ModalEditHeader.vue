<script setup>
import { ref } from "vue";

let props = defineProps(["chatHeader"]);
// stores
import { useModalToggleEdit } from "@/stores/ModalToggleEdit.js";
import { useFetchData } from "@/stores/FetchData.js";

const modalToggleEdit = useModalToggleEdit();
const fetchData = useFetchData();

// functions
// update header
const updateHeader = () => {
  fetchData.updateHeader();
  modalToggleEdit.hideHeaderModal();
};
</script>
<template>
  <div
    class="modal-parent d-flex justify-content-center align-items-center"
    @click.self="modalToggleEdit.hideHeaderModal"
  >
    <div>
      <div
        class="modal-content container d-flex justify-content-center align-items-center flex-column"
      >
        <!-- modal header name -->
        <div class="modal-header">
          <h2>إعادة تسمية هذه المحادثة</h2>
        </div>
        <!-- modal body -->
        <div
          class="modal-body d-flex justify-content-center align-items-center"
        >
          <!-- form to get new name  -->
          <form
            @submit.prevent="updateHeader"
            class="d-flex justify-content-center align-items-center"
          >
            <input
              type="text"
              class="px-1 py-2"
              v-model="fetchData.newHeader"
            />
          </form>
        </div>
        <!-- modal btns -->
        <div class="modal-footer d-flex justify-content-between">
          <!-- close btn -->
          <button
            type="button"
            class="btn btn-secondary"
            @click="modalToggleEdit.hideHeaderModal"
          >
            إلغاء
          </button>
          <!-- save btn -->
          <button type="button" class="btn btn-primary" @click="updateHeader()">
            حفظ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-parent {
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
}
.modal-header {
  color: white;
  padding: 10px;
}
.modal-content {
  width: 500px;
  height: 200px;
  background-color: #202124;
  border-radius: 10px;
}
@media only screen and (max-width: 992px) {
  .modal-content {
    width: 400px;
  }
}

@media only screen and (max-width: 768px) {
  .modal-content {
    width: 300px;
  }
}

.modal-body {
  width: 100%;
}
.modal-body form {
  width: 100%;
}
.modal-body form input {
  width: 88%;
  border-radius: 5px;
  border: 1px solid #eee;
  background-color: #343541;
  color: white;
}
.modal-footer {
  width: 90%;
  padding: 10px;
}

/* animate in-out for modal */
</style>
