<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiFileEarmarkText } from "oh-vue-icons/icons";
import { useFileData } from "@/stores/FileData";
let fileData = useFileData();

addIcons(BiFileEarmarkText);
</script>
<template>
	<div class="file-detail d-flex align-items-center" v-if="fileData.showFile">
		<button @click="fileData.showFile = false">X</button>
		<span class="mx-1">
			<OhVueIcon class="file-icon" name="bi-file-earmark-text" scale="2" />
		</span>
		<p>{{ fileData.fileName }}</p>
	</div>
</template>
<style scoped>
.file-detail {
	position: relative;
	margin-top: 5px;
	margin-right: 5px;
	border: 1px solid #aaa;
	width: 150px;
	height: 50px;
	overflow: hidden;
	padding: 20px;
	border-radius: 10px;
	color: #eee;
	line-height: 1.4;
	font-size: 10px;
	white-space: nowrap; /* Ensure text doesn't wrap */
	overflow: hidden; /* Hide overflowing text */
	text-overflow: ellipsis; /* Show ellipsis for overflow */
}
.file-detail p {
	overflow: hidden;
	text-overflow: ellipsis;
	margin-top: 15px;
}
button {
	position: absolute;
	top: 0;
	right: 0;
	background-color: transparent;
	border: none;
	color: #aaa;
	font-weight: bold;
	padding: 5px 10px;
	transition-duration: 0.3s;
}

button:hover {
	color: #111;
}
.file-icon {
	color: green;
}
</style>
