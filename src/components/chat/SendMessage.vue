<script setup>
import { watchEffect, ref } from "vue";
import FileUpload from "./FileUpload.vue";
import { useUserLimits } from "@/stores/UserLimits";
// voice record component
import MicrophoneChat from "./MicrophoneChat.vue";
import FileName from "./FileName.vue";
import { useFileData } from "@/stores/FileData";
const fileData = useFileData();

import { RiFileUploadLine, MdSend } from "oh-vue-icons/icons";
import { addIcons, OhVueIcon } from "oh-vue-icons";
// import vuuse upload file dialog

//stores
import { useToggleSidebar } from "@/stores/ToggleSidebar.js";
import { useFetchData } from "@/stores/FetchData.js";
const toggleSidebar = useToggleSidebar();
const fetchData = useFetchData();
let userLimits = useUserLimits();
const isDark = useDark();
// error handle
let reqError = ref("");
// handle text area size
let row = ref(1);
watchEffect(() => {
	reqError.value = fetchData.chatError;
});

// functions
// function to close sidebars when click in form
function closeSidebar() {
	toggleSidebar.showSidebar = false;
}

// use dark in vue use
import { useDark } from "@vueuse/core";
// check input before send request
function submitForm() {
	// check that user provide question
	if (!fetchData.question.trim()) {
		fetchData.chatError = "الرجاء إدخال النص.";
	} else {
		fetchData.file ? fetchData.sendRequestWithFile() : fetchData.sendRequest();
		fileData.showFile = false;
		row.value = 1;
	}
}

// check if the user click enter ot shift enter
function checkKeyPress(event) {
	// check key
	// check if sending or fetching data and disable send
	if (userLimits.textNum === 0 || fetchData.disableSend) {
	} else {
		//if no data is fetched
		// check key pressed
		if (event.key === "Enter") {
			// check if enter or shift enter
			if (event.shiftKey) {
				if (row.value >= 5) {
				} else {
					row.value++;
				}
				// Shift + Enter pressed
			} else {
				event.preventDefault();
				// Add your action here for Enter
				submitForm();
				row.value = 1; // Example: Submit the form
			}
		}
	}
}

// regester icons
addIcons(RiFileUploadLine, MdSend);
</script>

<template>
	<section
		@click="closeSidebar()"
		class="form-contanier d-flex flex-row justify-content-center align-items-center"
		:class="{ light: !isDark }"
	>
		<!-- handle error for form or chat using bootstrab5 alert -->
		<form
			@submit.prevent="submitForm"
			class="d-flex flex-row justify-content-center align-items-center p-1"
		>
			<!-- icon to upload files  -->
			<FileUpload />
			<!-- input for new question -->
			<div v-if="reqError" class="error-msg">
				<p>{{ reqError }}</p>
			</div>

			<!-- <textarea
				@click="fetchData.chatError = ''"
				name="input"
				type="text"
				placeholder="أدخل سؤالك"
				v-model.trim="fetchData.question"
				:class="[{ warning: reqError !== '' }, { light: !isDark }]"
				@keydown.enter.prevent="
					fetchData.file
						? fetchData.sendRequestWithFile()
						: fetchData.sendRequest()
				"
			></textarea> -->
			<div class="textarea-container">
				<FileName @deleteFile="console.log()" />
				<textarea
					@input="fetchData.chatError = ''"
					v-model.trim="fetchData.question"
					placeholder="أدخل سؤالك"
					:class="[{ warning: reqError !== '' }, { light: !isDark }]"
					class="text-area"
					:rows="row"
					@keydown="checkKeyPress($event)"
				></textarea>
				<!-- @keydown.enter.prevent="submitForm"
					@keydown.shift.enter.prevent="console.log('err')" -->
			</div>

			<!-- voice record remove when no voice chat avilable to user -->
			<MicrophoneChat v-if="userLimits.voiceNum > 0" />
			<!-- send data  comes for  form @submit -->
			<Transition>
				<!-- send text message show when user is want to text or voice or
					file or or image or  ther is no voice chat avilable -->

				<button
					v-if="
						fetchData.question ||
						fetchData.file ||
						fetchData.isImage ||
						userLimits.voiceNum === 0
					"
					class="btn"
					:disabled="
						(userLimits.textNum === 0 && !fetchData.isImage) ||
						(fetchData.isImage && userLimits.imageNum === 0) ||
						!fetchData.question ||
						fetchData.disableSend ||
						!fetchData.question.trim()
					"
				>
					<!-- !todo -->
					<OhVueIcon name="md-send" class="send-icon" scale="2" />
				</button>
			</Transition>
		</form>
	</section>
</template>

<style scoped>
.form-contanier {
	position: sticky;
	bottom: 0;
	padding: 20px;
	background-color: #343541;
}
@media screen and (max-width: 768px) {
	.form-contanier {
		padding: 20px 0px;
	}
}

.send-icon {
	transform: rotate(180deg);
	margin-right: 10px;
	color: #aaa;
}

form input {
	border-radius: 30px;
	border: 1px solid #aaa;
	width: 60vw;
	padding: 15px;
	background-color: #343541;
	color: white;
}

form textarea {
	border-radius: 30px;
	border: 1px solid #aaa;
	width: 60vw;
	max-height: 150px;
	padding: 15px 20px 15px;
	background-color: #343541;
	color: white;
	resize: none;
}
.btn {
	border-color: transparent;
}
#fileUpload {
	width: 0px;
	height: 0px;
}

/* text area design */
.textarea-container {
	border: 1px solid #aaa;
	border-radius: 15px;
}
.text-area {
	border: none !important;
	outline: non;
}
.text-area:focus {
	border: none;
	outline: none;
}
/* handle form in error */
.warning {
	border: 1px solid #dc3545;
}
.error-msg {
	position: absolute;
	top: -10px;
	color: #dc3545;
}

/* transition buttons send message */

.v-enter-active,
.v-leave-active {
	transition: transform 0.1s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
	position: absolute;
	transform: translateY(30%);
}
/*NOTE handle dark mode and light mode  */

.light {
	background-color: #fdfeff;
	color: black;
}
/* eset textarea scroll */
/* width */
::-webkit-scrollbar {
	width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
	background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: transparent;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: transparent;
}
</style>
