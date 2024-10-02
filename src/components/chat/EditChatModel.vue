<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { RiDeleteBin6Fill, MdModeeditOutlined } from "oh-vue-icons/icons";
//NOTE stores
import { useModalToggleEdit } from "@/stores/ModalToggleEdit.js";
import { useFetchData } from "@/stores/FetchData.js";
const modalToggleEdi = useModalToggleEdit();
const fetchData = useFetchData();

const props = defineProps(["id"]);
// regeister icons
addIcons(RiDeleteBin6Fill, MdModeeditOutlined);
</script>
<template>
  <div
    class="d-flex flex-column justify-content-evenly align-items-center text-end"
  >
    <span
      class="delete mb-1 d-flex justify-content-end"
      @click="fetchData.deleteChat()"
    >
      <OhVueIcon name="ri-delete-bin-6-fill" />
      <span class="mx-2 col-9">حذف</span>
    </span>

    <span
      class="edit d-flex justify-content-end"
      @click="modalToggleEdi.showHeaderModal()"
    >
      <OhVueIcon name="md-modeedit-outlined" />
      <span class="mx-2 col-9">إعادة التسمية</span>
    </span>
  </div>
</template>

<style scoped>
div {
  height: 100px;
  width: 150px;
  padding: 10px;
  border: 1px solid #aaa;
  background-color: #313132;
  z-index: 105;
  position: absolute;
  right: calc(100% + 10px);
  border-radius: 10px;
  margin-top: 10px;
}

/* small screen  */
@media only screen and (max-width: 600px) {
  div {
    right: 100%;
  }
}
.edit svg {
  fill: #eee;
}
.delete svg {
  fill: tomato;
}
.delete {
  transition-duration: 0.3s;
  color: tomato;
}
.edit,
.delete {
  cursor: pointer;
  width: 80%;
}
.edit:hover,
.delete:hover {
  background-color: #666666;
}
</style>
