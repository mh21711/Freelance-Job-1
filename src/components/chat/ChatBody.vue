<script setup>
import { ref, onMounted, watch, onUpdated, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

// import Swal from "sweetalert2";
import ModalHeader from "./ModalHeader.vue";
import ModalEditHeader from "./ModalEditHeader.vue";
import UserName from "./UserName.vue";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import LoadingFlash from "./LoadingFlash.vue";
// oh vue icon
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiArrowDownCircleFill, BiFileEarmarkText } from "oh-vue-icons/icons";
// the loading animation
// import TheLoader from "./TheLoader.vue";
import DeleteMessage from "./DeleteMessage.vue";
// stores
import { useModalToggleEdit } from "@/stores/ModalToggleEdit";
import { useToggleSidebar } from "@/stores/ToggleSidebar.js";
import { useFetchData } from "@/stores/FetchData.js";
import { useFetchHistory } from "@/stores/FetchDataHistory.js";
import { useToggleChat } from "@/stores/ToggleChat.js";
import { useUserLimits } from "@/stores/UserLimits";
import { useSubscribePlan } from "@/stores/SubscribePlan";
// vue use dark is dark
import { useDark } from "@vueuse/core";

const toggleSidebar = useToggleSidebar();
const modalToggleEdit = useModalToggleEdit();
const fetchData = useFetchData();
const fetchHistory = useFetchHistory();
const ToggleChat = useToggleChat();
const userLimits = useUserLimits();
const subscribePlan = useSubscribePlan();
let router = useRouter();
let responses = ref([]);

let chatHistory = ref([]);

let loading = ref(false);
// check if it is dark or not
const isDark = useDark();

// removw history
watch(
	() => ToggleChat.count,
	(newVal, oldVal) => {
		// if change count remove history
		if (newVal > oldVal) {
			responses.value = [];
			fetchData.userCurrentData = [];
			responses.value = fetchData.userCurrentData;
		}
	},
	{ immediate: true }
);

// watch data to remove it from the chat body
watch(
	() => fetchData.userCurrentData,
	(newVal, oldVal) => {
		// if change count remove history
		if (newVal.value <= 0) {
			responses.value = [];
		} else {
			responses.value = fetchData.userCurrentData;
		}
	},
	{ immediate: true }
);

// watch history
watch(
	() => fetchHistory.history,
	(newVal, oldVAl) => {
		// if (newVal.length <= 0) {
		// 	// chatHistory.value = [];
		// } else {
		// }
		chatHistory.value = fetchHistory.history;
	},
	{ immediate: true }
);

function simulateTyping() {
  typingResponses.value.forEach((response, index) => {
    if (response.typingIndex < response.text.length) {
      let interval = setInterval(() => {
        response.displayText += response.text[response.typingIndex++];
        if (response.typingIndex >= response.text.length) {
          clearInterval(interval);
        }
      }, 50); // Adjust speed by changing the interval time
    }
  });
}

function scrollTobottom() {
	const lastResponse = document.querySelector(".last");
	if (lastResponse) {
		lastResponse.scrollIntoView();
	}
}

// delete current chat
let deleteChat = (id) => {
	fetchData.deleteChat(id);
};

//  on update scroll
onUpdated(() => {
	scrollTobottom();
	userLimits.getUserLimits();
});

onMounted(() => {
	scrollTobottom();
	userLimits.getUserLimits();
	// Scroll to the last response element when the page loads
});

// get subscribe plan and check if it is active before mount
onBeforeMount(() => {
	subscribePlan.getSubscribe();
});

// regeister icons
addIcons(BiArrowDownCircleFill, BiFileEarmarkText);
</script>
<template>
	<section class="parent" :class="{ light: !isDark }">
		<ModalHeader />
		<!--* show user current chat -->
		<!-- NOTE show when no responses -->
		<div
			class="no_response"
			v-if="responses.length <= 0 && ToggleChat.newChat"
		></div>

		<!--* show current chat  -->
		<TransitionGroup name="fade">
			<template v-if="ToggleChat.showChat">
				<section
					class="py-1"
					v-for="response in responses"
					@click="toggleSidebar.showSidebar = false"
				>
					<!-- user questions -->
					<article class="user-question">
						<UserName />
						<p class="user-question-text" :class="{ 'text-light': !isDark }" v-if="!response.user_file">
							{{ response.question }}
						</p>
						<!-- show file icon when user send file -->
						<div class="file-icon-container d-flex flex-row-reverse justify-content-end mb-4" v-if="response.IsFile">
							<p>{{response.fileName}}</p>
							<OhVueIcon name="bi-file-earmark-text" scale="2" fill="#3A811D" />
						</div>
						<!--! skeleton loading -->
						<LoadingSkeleton
							v-if="!response.question && !response.image"
							height="30px"
						/>
						<!-- user audio -->
						<div class="audio-container mb-5" v-if="response.user_file">
							<audio controls>
								<source :src="response.user_file" type="audio/mpeg" />
								Your browser does not support the audio element.
							</audio>
						</div>
						<!-- <LoadingFlash v-if="!response.question && !response.image" /> -->
					</article>
					<!-- chat gpt response -->
					<article class="chat-answer">
						<div class="chat-logo">
							<img src="/favicon.svg" alt="chat-logo" />
							<span class="chat-name" :class="{ 'text-light': !isDark }"
								>المعرفة المجتمعية</span
							>
							<!--* delete message icon -->
							<DeleteMessage
								@click="deleteChat(response.id)"
								v-if="response.id"
							/>
						</div>
						<!-- imageresponse -->
						<div
							class="image-container d-flex justify-content-center align-items-center"
							v-if="response.image"
						>
							<a :href="response.image" target="_blank">
								<img :src="response.image" alt="response image" />
							</a>
						</div>
						<!-- textresponse -->
						<p class="text" :class="{ 'text-light': !isDark }" v-if="typeof response.text === 'string' && !response.user_file">
							{{ response.displayText }}<span v-if="response.typingIndex < response.text.length">|</span>
						</p>
						
						<!--! skeleton loading for bot answer -->
						<!-- <LoadingSkeleton
							v-if="!response.text && !response.image"
							height="300px"
						/> -->
						<LoadingFlash v-if="!response.text && !response.image" />
						<!-- audio  -->
						<div v-if="response.BotVoice" class="audio-container">
							<audio controls>
								<source :src="response.BotVoice" type="audio/mpeg" />
								Your browser does not support the audio element.
							</audio>
						</div>
					</article>
				</section>
			</template>
		</TransitionGroup>

		<!--NOTE show back ground when no history -->
		<div
			class="no_history"
			v-if="chatHistory.length <= 0 && ToggleChat.history"
		>
			<div>
				<img src="/favicon.svg" alt="logo" />
			</div>
			<h1>لا يوجد سجل سابق</h1>
		</div>

		<!--* show old chat  -->
		<TransitionGroup name="fade">
			<template v-if="ToggleChat.history">
				<!--NOTE to show when no current massages  -->
				<section
					class="py-1"
					v-for="history in chatHistory"
					@click="toggleSidebar.showSidebar = false"
					:key="history.id"
				>
					<!-- user questions -->
					<article class="user-question">
						<UserName />
						<!-- show user message if exist -->
						<p
							v-if="history['message_content'] && !history.sent_file && !history.IsVoice"
							class="user-question-text"
							:class="{ 'text-light': !isDark }"
						>
							{{ history["message_content"] }}
								<!-- show file icon when user send file -->
						<div class="file-icon-container d-flex flex-row-reverse justify-content-end" v-if="history.IsFile">
							<p>{{history.fileName}}</p>
							<OhVueIcon name="bi-file-earmark-text" scale="2" fill="#3A811D" />
						</div>
						</p>

						<!-- show user audio -->
						<div
							class="audio-container mb-5"
							v-if="(history.sent_file && history.IsVoice) || history.user_file"
						>
							<audio controls>
								<source
									:src="history.sent_file || history.user_file"
									type="audio/mpeg"
								/>
								Your browser does not support the audio element.
							</audio>
						</div>
						<!--! skeleton loading user question in history -->
						<!-- TODO -->
						<!-- <LoadingSkeleton v-else height="30px" /> -->
						<LoadingSkeleton v-if="!history.id&& !history.message_content" height="30px" />
						<!-- <LoadingFlash v-else /> -->
					</article>
					<!-- chat ai response -->
					<article class="chat-answer">
						<div class="chat-logo">
							<img src="/favicon.svg" alt="chat-logo" />
							<span class="chat-name" :class="{ 'text-light': !isDark }"
								>المعرفة المجتمعية</span
							>
							<DeleteMessage
								@click="deleteChat(history.id)"
								v-if="history.id"
							/>
						</div>
						<!-- image -->
						<div v-if="history['bot_file']">
							<div
								class="image-container"
								:class="{ 'text-light': !isDark }"
								v-if="
									history['bot_file'].includes('.jpg') ||
									history['bot_file'].includes('.png') ||
									history['bot_file'].includes('.gif') ||
									history['bot_file'].includes('.jpeg') ||
									history['bot_file'].includes('.svg') ||
									history['bot_file'].includes('oaidalleapiprodscus')
								"
							>
								<a :href="history['bot_file']" target="_blank">
									<img :src="history['bot_file']" alt="image" loading="lazy" />
								</a>
							</div>
						</div>
						<!-- text -->
						<!-- !history['bot_file'] && -->
						<p
							v-if="
								history['bot_answer'] !== '' &&
								history['bot_answer'] !== 'voice message'&&
								!history.bot_file && !history.bot_answer !== 'voice message'
							"
							class="text"
							:class="{ 'text-light': !isDark }"
						>
							{{ history["bot_answer"] }}
						</p>

						<!-- show voice -->
						<div
							v-if="
								history.bot_answer !== 'voice message' &&
								history['user_audio'] !== null
							"
						>
							<div
								v-if="
									history.bot_file && history.bot_answer !== 'voice message'
								"
							>
								<div class="audio-container">
									<audio controls>
										<source :src="history.bot_file" type="audio/mpeg" />
										Your browser does not support the audio element.
									</audio>
								</div>
							</div>
						</div>
						<!--! skeleton loading -->
						<!-- <LoadingSkeleton v-if="!history.id" height="300px" /> -->
						<LoadingFlash v-if="!history.id" />
					</article>
				</section>
			</template>
		</TransitionGroup>

		<!-- loading dots  -->
		<!-- <TheLoader v-if="loading" class="mb-5" /> -->
		<teleport to="#app">
			<ModalEditHeader v-if="modalToggleEdit.showEditHeader" />
		</teleport>
		<!-- element to scroll to -->
		<span class="last"></span>
	</section>
</template>

<style scoped>
.scroll-btn {
	position: fixed;
	z-index: 99;
	bottom: 150px;
	right: 10px;
}

.parent {
	position: relative;
	height: 100vh;
	background-color: #343541;
	color: white;
	padding-top: 50px;
	line-height: 1.6;
	font-size: 18px;
	word-spacing: 2px;
	overflow-y: auto;
	scroll-behavior: smooth;
}

.parent .image-container a {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.parent .image-container img {
	margin-top: 50px;
	width: 65%;
	/* max-height: 500px; */
	background-color: #3435;
	margin-bottom: 40px;
}
.text {
	padding: 10px 55px 10px 10px;
}
.user-question-text {
	padding: 10px 55px 10px 10px;
}

.audio-container {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin: 5px;
}
/* audio tag  */
audio {
	width: 85%;
	/* margin-right: auto; */
}

.file-icon-container {
	border: .5px solid #555;
	border-radius: 10px;
	padding:10px;
	margin-top: 5px;
	/*  */
}

.file-icon-container p {
	margin-top: 5px;

}


.parent .chat-logo img {
	width: 40px;
	height: 40px;
	scale: 1.7;
}
.chat-name {
	font-weight: bold;
	margin-right: 10px;
}

article {
	padding-left: 250px;
	padding-right: 250px;
	white-space: pre-line;
}
/* reassign padding  in msdium  screen and less*/
@media only screen and (max-width: 992px) {
	article {
		padding-left: 70px;
		padding-right: 70px;
	}
}
@media only screen and (max-width: 600px) {
	article {
		padding-left: 50px;
		padding-right: 50px;
	}
}
p {
	color: #ccc;
}

/* NOTE handle light mode  */
.light {
	background-color: #fdfeff;
	color: black;
}
.text-light {
	color: black !important;
}

/* transition animation for change page  */
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scale(0.9);
}

.no_response {
	height: 80%;
	width: 100%;
	background-image: url("/favicon.svg");
	background-size: 40%;
	background-repeat: no-repeat;
	background-position: center;
	opacity: 0.5;
	position: absolute;
}
.no_history {
	height: 80%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 50%;
	color: #aaa;
	position: relative;
	flex-direction: column;
}
.no_history div img {
	width: 100px;
	height: 100px;
}

/* reset scroll */
/* reset scroll */
/* width */
::-webkit-scrollbar {
	width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
	background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #212121;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
