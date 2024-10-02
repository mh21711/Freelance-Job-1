<script setup>
import { ref } from "vue";
import { MdKeyboardvoice, BiStopCircleFill } from "oh-vue-icons/icons";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

// stores
import { useFetchData } from "@/stores/FetchData";
// store variables
const fetchData = useFetchData();
// variables
let isRecording = ref(false);
let audioChunks = ref([]);
let recordedAudio = ref(null);
let mediaRecorder; // Define mediaRecorder here

const startRecording = async () => {
	try {
		// start calculate time to calculate length of the record
		let startTime = Date.now();

		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream); // Assign to the outer scoped mediaRecorder

		mediaRecorder.ondataavailable = (event) => {
			audioChunks.value.push(event.data);
		};

		mediaRecorder.onstop = () => {
			// calculate record time
			const elapsedTime = (Date.now() - startTime) / 1000; // Calculate elapsed time in seconds
			// check if record is to long
			if (elapsedTime >= 60) {
				Swal.fire({
					title: "التسجيل طويل جدًا",
					text: "الحد الأقصى للتسجيل دقيقة واحدة",
					icon: "error",
				});
				audioChunks.value = []; // Clear chunks if recording is too long
				return;
			}

			const audioBlob = new Blob(audioChunks.value, { type: "audio/mpeg" });
			let uniqueFilename = `${recordedAudio.name + uuidv4()}.mp3`;

			recordedAudio.value = new File([audioBlob], uniqueFilename, {
				type: "audio/mpeg",
			}); //<=== Create a File object with desired format
			audioChunks.value = [];
			mediaRecorder = null; // Set mediaRecorder to null when stopped
		};

		mediaRecorder.start();
		isRecording.value = true;
	} catch (error) {
		Swal.fire({
			title: "فشل في الوصول إلى الميكروفون",
			text: "الرجاء تمكين الميكروفون",
			icon: "question",
		});
	}
};

const stopRecording = () => {
	isRecording.value = false;
	mediaRecorder.stop(); // mediaRecorder is now accessible here
	setTimeout(() => {
		fetchData.sendRequestVoice(recordedAudio.value); // Pass recorded audio to the function
	}, 100);
};

//top running rocrds
function stopAudio() {
	let audioElement = document.querySelectorAll("audio");
	audioElement.forEach((e) => {
		e.pause();
	});
}
// register icons
addIcons(MdKeyboardvoice, BiStopCircleFill);
</script>

<template>
	<Transition>
		<button
			:disabled="fetchData.disableSend"
			@click.prevent="stopAudio()"
			class="record-btn btn"
			v-if="
				fetchData.question.length <= 0 && !fetchData.file && !fetchData.isImage
			"
		>
			<!-- start record -->
			<OhVueIcon
				fill="#AAAAAA"
				name="md-keyboardvoice"
				scale="2"
				@click="startRecording"
				v-if="!isRecording"
			/>
			<!-- stop record -->
			<OhVueIcon
				class="recording"
				scale="2"
				name="bi-stop-circle-fill"
				@click="stopRecording"
				v-if="isRecording"
			/>
		</button>
	</Transition>
</template>

<style scoped>
.record-btn {
	outline: none !important;
	border-color: transparent !important;
}
.v-enter-active,
.v-leave-active {
	transition: 0.6s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
	transform: translateY(30%);
}
.recording {
	fill: green;
	animation: pulse 1s infinite; /* Add animation to the recording class */
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
	100% {
		transform: scale(1);
	}
}
</style>
