<script setup>
import FileName from "./FileName.vue";
import Swal from "sweetalert2";

import { useFetchData } from "@/stores/FetchData.js";
import { useUserLimits } from "@/stores/UserLimits";
import { useFileData } from "@/stores/FileData";
let fileData = useFileData();
// oh vue icons
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { RiFileUploadLine, MdDrawOutlined } from "oh-vue-icons/icons";
// vueuse
import { useFileDialog } from "@vueuse/core";
import { watchEffect } from "vue";

// vue use dark and light mode
import { useDark } from "@vueuse/core";
// vueuse handle file upload
let { files, open, reset, onChange } = useFileDialog({
	accept: ".docx,.doc,.pptx,.pdf", //accepts .docx, .pptx, and .pdf files
	multiple: false, // Set to accept only one file
});

const fetchData = useFetchData();
const userLimits = useUserLimits();
const isDark = useDark();

function resetData() {
	reset();
	fetchData.file = "";
}
// watch file data to reset when user press cancel
watchEffect(() => {
	if (!fileData.showFile) {
		resetData();
	}
});

watchEffect(() => {
	if (fetchData.file === "") {
		reset();
	}
});

// function to check if file is valid type
function chechFileType(filename) {
	var allowedExtensions = /(\.pdf|\.docx|\.doc|\.pptx)$/i;
	if (!allowedExtensions.exec(filename)) {
		Swal.fire({
			icon: "error",
			title: "حدث خطأ.",
			text: "الرجاء اختيار نوع ملف صالح.",
		});
		resetData();
	}
}

onChange(() => {
	if (files.value && files.value.length > 0) {
		fileData.showFile = true;
		fileData.fileName = files.value[0].name;
		chechFileType(files.value[0].name);
		fetchData.file = files.value[0];
	}
});

// regester icons
addIcons(RiFileUploadLine, MdDrawOutlined);
</script>
<template>
	<div class="d-inline position-relative">
		<!-- file name component -->
		<label for="btn-upload" @click="fetchData.isImage = false">
			<input type="button" id="btn-upload" @click="open()" />
			<OhVueIcon
				v-if="userLimits.textNum > 0"
				name="ri-file-upload-line"
				class="upload-icon"
				scale="1.75"
				:class="[{ 'active-file': files }, { light: !isDark }]"
			/>
		</label>
		<!-- create image check box -->
		<OhVueIcon
			v-if="!files && userLimits.imageNum > 0"
			name="md-draw-outlined"
			scale="1.75"
			class="create-image"
			@click="fetchData.isImage = !fetchData.isImage"
			:class="[{ 'active-image': fetchData.isImage }, { light: !isDark }]"
		/>
	</div>
</template>
<style scoped>
.create-image,
.upload-icon {
	margin-left: 5px;
	color: #eee;
	transition-duration: 0.3s;
}
.upload-icon:hover {
	color: green;
}

#btn-upload {
	background: transparent;
	border: none;
	width: 0px;
	height: 0px;
}

/* add glow when file is exist */
.active-file {
	fill: #49a67b;
}

.active-image {
	fill: #49a67b;
}

.light {
	color: black;
	/* background-color: white; */
}
/* resize icons */
@media screen and (max-width: 768px) {
	.upload-icon,
	.create-image {
		margin-left: 0px;

		transform: scale(0.8);
	}
}
</style>
