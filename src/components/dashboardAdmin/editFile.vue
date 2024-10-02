<script setup>
let props = defineProps(["id", "file"]);

let emit = defineEmits(["closePopUp"]);

import { useAdminData } from "@/stores/AdminData.js";
let adminData = useAdminData();
const editFile = (status) => {
	adminData.updateFileStatus(status, props["id"]);
	emit("closePopUp");
};

// show edit file modal
const showFileEditPop = (id, file) => {
	adminData.showEditPopUpId = id;
	adminData.editFileData = file;
};
</script>
<template>
	<div
		class="pop-over text-center d-flex flex-column align-items-center justify-content-center"
	>
		<button @click.prevent="emit('closePopUp')" class="close-button">x</button>
		<span
			class="approve-btn"
			v-if="adminData.filter !== 'approved'"
			@click="editFile('approved')"
			>قبول</span
		>
		<span v-if="adminData.filter !== 'pending'" @click="editFile('pending')"
			>انتظار</span
		>
		<span v-if="adminData.filter !== 'rejected'" @click="editFile('rejected')"
			>رفض</span
		>
		<RouterLink to="/update-file">
			<span @click="showFileEditPop(props.id, props.file)">تعديل</span>
		</RouterLink>
		<span @click="adminData.deleteFiles(props.id)">حذف</span>
	</div>
</template>
<style scoped>
a {
	text-decoration: none;
	color: white;
	display: block;
	width: 100%;
}
a span {
	display: inline-block;
	width: 90%;
	border-radius: 5px;
	margin-top: 10px;
	padding: 4px;
	cursor: pointer;
	transition: 0.3s;
}

.approve-btn {
	margin-top: 30px;
}
.pop-over {
	position: relative;
	height: 240px;
	width: 100%;
	background-color: #444;
	color: white;
	position: absolute;
	left: 0;
	top: 75%;
	transform: translateY(-50%);
	z-index: 100;
	border-radius: 10px;
	transition: 0.3s;
	list-style: none;
}
.pop-over::before {
	content: "";
	position: absolute;
	top: -30px;
	left: 13px;
	width: 0;
	height: 0;
	border-width: 20px;
	border-style: solid;
	border-color: transparent transparent #444 transparent;
}
.pop-over span {
	width: 90%;
	border-radius: 5px;
	margin-top: 10px;
	padding: 4px;
	cursor: pointer;
	transition: 0.3s;
}
.pop-over span:hover {
	background-color: #333;
	color: white;
}
.close-button {
	position: absolute;
	right: -10px;
	top: -10px;
	font-weight: bold;
	font-size: 20px;
	color: red;
	background-color: transparent;
	outline: none;
	border-color: transparent;
	padding: 4px 10px;
	border-radius: 50%;
	margin-right: 5px;
}
</style>
